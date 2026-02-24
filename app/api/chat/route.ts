import { NextResponse, type NextRequest } from "next/server";
import { guardAIRequest, validateUserInput } from "@/lib/ai-guard";
import {
  ConversationStage,
  extractInputSignals,
  getStagePrompt,
  type ChatSessionState,
} from "@/lib/chat-funnel";
import {
  bumpChatSession,
  createInitialChatSession,
  readChatSession,
  writeChatSessionCookie,
} from "@/lib/chat-session-cookie";
import { checkPublicRateLimit } from "@/lib/public-rate-limit";
import { calculateSolarProjection } from "@/lib/solar-calculator";
import { saveQualifiedLead } from "@/lib/lead-service";
import { getDb } from "@/lib/mongodb";
import { generateResponse } from "@/lib/gemini";

export const runtime = "nodejs";

type ChatRequestBody = {
  message?: unknown;
};

const MAX_MESSAGE_LENGTH = 1500;
const REPEAT_WINDOW_MS = 60_000;
const REPEAT_THRESHOLD = 5;
const RESTART_REGEX = /\b(restart|start over|new quote|new calculation)\b/i;

type RepeatEntry = {
  count: number;
  windowStart: number;
};

type IntentKind = "greeting" | "faq" | "qualification" | "unknown";

const repeatMessageMap = new Map<string, RepeatEntry>();

const GREETING_INTENT_REGEX = /^(hi|hello|hey|good (morning|afternoon|evening))\b/i;
const SOLAR_FAQ_TOPIC_REGEX = /\b(solar|panel|inverter|subsidy|cost|savings|installation|benefit|price|scheme)\b/i;
const QUESTION_STRUCTURE_REGEX = /(\?|\b(how|what|why)\b|^(tell me|explain)\b)/i;
const QUALIFICATION_KEYWORDS_REGEX = /\b(calculate|estimate|want solar|install solar)\b/i;
const BILL_CONTEXT_REGEX = /\b(bill|rs|rupees?)\b/i;
const BILL_SOFT_GUIDE = "If you'd like a personalized estimate, share your monthly bill.";

function isStandaloneBillCandidate(message: string): boolean {
  const numericMatches = message.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];
  for (const raw of numericMatches) {
    const parsed = Number(raw.replace(/,/g, ""));
    if (Number.isFinite(parsed) && parsed >= 500 && parsed <= 200_000) {
      return true;
    }
  }
  return false;
}

function hasExplicitBillSignal(message: string): boolean {
  const hasCurrencySymbol = /₹/.test(message);
  const hasBillContext = BILL_CONTEXT_REGEX.test(message) && /\d/.test(message);
  if (hasCurrencySymbol && /\d/.test(message)) return true;
  if (hasBillContext) return true;
  return isStandaloneBillCandidate(message);
}

function classifyIntent(message: string): IntentKind {
  const normalized = message.trim();
  if (!normalized) return "unknown";

  if (GREETING_INTENT_REGEX.test(normalized)) return "greeting";
  if (hasExplicitBillSignal(normalized)) return "qualification";

  if (SOLAR_FAQ_TOPIC_REGEX.test(normalized) && QUESTION_STRUCTURE_REGEX.test(normalized)) {
    return "faq";
  }

  if (QUALIFICATION_KEYWORDS_REGEX.test(normalized)) return "qualification";

  return "unknown";
}

function buildFaqFallback(message: string): string {
  if (/\b(subsidy|scheme|mnre|pm surya)\b/i.test(message)) {
    return "Solar subsidies vary by state and policy. For rooftop systems, eligibility depends on location, consumer category, and DISCOM rules.";
  }
  if (/\b(cost|price|expensive|budget|investment)\b/i.test(message)) {
    return "Solar system cost depends on your consumption, roof conditions, and component quality. Higher monthly bills generally see faster payback.";
  }
  if (/\b(how many panels|panel needed|panels required)\b/i.test(message)) {
    return "Panel count depends on monthly usage, available roof area, and panel wattage. We estimate this from your bill and location.";
  }
  if (/\b(what is solar|how does solar)\b/i.test(message)) {
    return "Solar converts sunlight into electricity using PV panels and can reduce grid dependence through net metering where available.";
  }
  return "I can help with solar basics, cost drivers, subsidies, and system sizing.";
}

async function buildFaqResponse(message: string): Promise<string> {
  try {
    const aiText = await generateResponse({
      userMessage: message,
      context:
        "FAQ_MODE: answer only the user question in concise, factual solar terms. Do not request contact details or control conversation stage.",
    });
    return aiText;
  } catch (error) {
    console.error("[chat] faq_mode_fallback", error);
    return buildFaqFallback(message);
  }
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const requestWithOptionalIp = request as NextRequest & { ip?: string };
  if (requestWithOptionalIp.ip) return requestWithOptionalIp.ip;
  return "unknown";
}

function isSuspiciousRepeatedMessage(ip: string, message: string): boolean {
  const key = `${ip}:${message.toLowerCase()}`;
  const now = Date.now();
  const current = repeatMessageMap.get(key);

  if (!current) {
    repeatMessageMap.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (now - current.windowStart >= REPEAT_WINDOW_MS) {
    repeatMessageMap.set(key, { count: 1, windowStart: now });
    return false;
  }

  current.count += 1;
  repeatMessageMap.set(key, current);
  return current.count >= REPEAT_THRESHOLD;
}

function respond(payload: unknown, status: number, session: ChatSessionState): NextResponse {
  const response = NextResponse.json(payload, { status });
  writeChatSessionCookie(response, bumpChatSession(session));
  return response;
}

async function persistLeadDraft(session: ChatSessionState): Promise<void> {
  const db = await getDb();
  await db.collection("lead_drafts").updateOne(
    { sid: session.sid },
    {
      $set: {
        sid: session.sid,
        stage: session.stage,
        monthlyBill: session.slots.monthlyBill,
        state: session.slots.state,
        segment: session.slots.segment,
        ownership: session.slots.ownership,
        timeline: session.slots.timeline,
        projection: session.slots.projection,
        name: session.slots.name,
        phone: session.slots.phone,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );
}

function postValidationGuard(message: string) {
  const guardResult = guardAIRequest(message);
  if (guardResult.reason === "prompt_injection_detected") {
    return { blocked: true, status: 400, error: "prompt_injection_detected" as const };
  }
  if (guardResult.reason === "invalid_input") {
    return { blocked: true, status: 400, error: "invalid_input" as const };
  }
  return { blocked: false as const, nonSolar: guardResult.reason === "non_solar_topic" };
}

function handleBillCaptureTransition(session: ChatSessionState, message: string, signals: ReturnType<typeof extractInputSignals>) {
  if (signals.monthlyBill === undefined) {
    const guard = postValidationGuard(message);
    if (guard.blocked) return respond({ error: guard.error }, guard.status, session);
    const prompt = getStagePrompt(ConversationStage.BILL_CAPTURE);
    return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
  }

  session.slots.monthlyBill = signals.monthlyBill;
  if (signals.state) session.slots.state = signals.state;
  session.stage = session.slots.state ? ConversationStage.SEGMENT_CAPTURE : ConversationStage.STATE_CAPTURE;
  const prompt = getStagePrompt(session.stage);
  return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const isRateAllowed = await checkPublicRateLimit(ip);
    if (!isRateAllowed) {
      return NextResponse.json({ error: "rate_limit_exceeded" }, { status: 429 });
    }

    let body: ChatRequestBody;
    try {
      body = (await request.json()) as ChatRequestBody;
    } catch {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    if (typeof body.message !== "string" || body.message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    let message: string;
    try {
      message = validateUserInput(body.message);
    } catch {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    if (isSuspiciousRepeatedMessage(ip, message)) {
      return NextResponse.json({ error: "suspicious_activity" }, { status: 400 });
    }

    let session = readChatSession(request);
    const signals = extractInputSignals(message);

    if (RESTART_REGEX.test(message)) {
      session = createInitialChatSession();
    }

    switch (session.stage) {
      case ConversationStage.INTENT_GATE: {
        if (signals.monthlyBill !== undefined) session.slots.monthlyBill = signals.monthlyBill;
        if (signals.state) session.slots.state = signals.state;

        const intent = classifyIntent(message);
        const guard = postValidationGuard(message);
        if (guard.blocked) return respond({ error: guard.error }, guard.status, session);

        if (intent === "greeting") {
          const greetingText = session.slots.intentGateBillPrompted
            ? `Hi. I can explain solar basics, costs, subsidies, and panel sizing. ${BILL_SOFT_GUIDE}`
            : "Hi. I can explain solar basics, costs, subsidies, and panel sizing, then build a personalized savings estimate when you're ready.";
          return respond({ type: "ai_response", data: greetingText, nextStep: "ask_for_bill" }, 200, session);
        }

        if (intent === "faq") {
          const faqAnswer = await buildFaqResponse(message);
          session.slots.intentGateBillPrompted = true;
          return respond(
            {
              type: "ai_response",
              data: `${faqAnswer}\n\n${BILL_SOFT_GUIDE}`,
              nextStep: "ask_for_bill",
            },
            200,
            session,
          );
        }

        if (intent === "qualification") {
          session.stage = ConversationStage.BILL_CAPTURE;
          if (signals.monthlyBill !== undefined) {
            return handleBillCaptureTransition(session, message, signals);
          }

          const firstAsk = !session.slots.intentGateBillPrompted;
          session.slots.intentGateBillPrompted = true;
          return respond(
            {
              type: "ai_response",
              data: firstAsk
                ? "Great. Share your monthly electricity bill (example: ₹3500) so I can start your estimate."
                : "Understood. Please share your monthly electricity bill to continue your personalized solar estimate.",
              nextStep: "ask_for_bill",
            },
            200,
            session,
          );
        }

        if (!session.slots.intentGateBillPrompted) {
          session.slots.intentGateBillPrompted = true;
          return respond(
            {
              type: "ai_response",
              data: "I can help with solar estimates, subsidy checks, and system basics. Share your monthly electricity bill to start a personalized estimate.",
              nextStep: "ask_for_bill",
            },
            200,
            session,
          );
        }

        return respond(
          {
            type: "ai_response",
            data: `Happy to help with solar questions. ${BILL_SOFT_GUIDE}`,
            nextStep: "ask_for_bill",
          },
          200,
          session,
        );
      }

      case ConversationStage.BILL_CAPTURE: {
        return handleBillCaptureTransition(session, message, signals);
      }

      case ConversationStage.STATE_CAPTURE: {
        if (!signals.state) {
          const guard = postValidationGuard(message);
          if (guard.blocked) return respond({ error: guard.error }, guard.status, session);
          const prompt = getStagePrompt(ConversationStage.STATE_CAPTURE);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        session.slots.state = signals.state;
        session.stage = session.slots.monthlyBill !== undefined ? ConversationStage.SEGMENT_CAPTURE : ConversationStage.BILL_CAPTURE;
        const prompt = getStagePrompt(session.stage);
        return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
      }

      case ConversationStage.SEGMENT_CAPTURE: {
        if (!signals.segment) {
          const guard = postValidationGuard(message);
          if (guard.blocked) return respond({ error: guard.error }, guard.status, session);
          const prompt = getStagePrompt(ConversationStage.SEGMENT_CAPTURE);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        session.slots.segment = signals.segment;
        session.stage =
          signals.segment === "commercial" ? ConversationStage.TIMELINE_CAPTURE : ConversationStage.OWNERSHIP_CAPTURE;
        const prompt = getStagePrompt(session.stage);
        return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
      }

      case ConversationStage.OWNERSHIP_CAPTURE: {
        if (!signals.ownership) {
          const guard = postValidationGuard(message);
          if (guard.blocked) return respond({ error: guard.error }, guard.status, session);
          const prompt = getStagePrompt(ConversationStage.OWNERSHIP_CAPTURE);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        session.slots.ownership = signals.ownership;
        session.stage = ConversationStage.TIMELINE_CAPTURE;
        const prompt = getStagePrompt(session.stage);
        return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
      }

      case ConversationStage.TIMELINE_CAPTURE: {
        if (!signals.timeline) {
          const guard = postValidationGuard(message);
          if (guard.blocked) return respond({ error: guard.error }, guard.status, session);
          const prompt = getStagePrompt(ConversationStage.TIMELINE_CAPTURE);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        if (!session.slots.monthlyBill) {
          session.stage = ConversationStage.BILL_CAPTURE;
          const prompt = getStagePrompt(session.stage);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        session.slots.timeline = signals.timeline;
        session.slots.projection = await calculateSolarProjection({
          monthlyBill: session.slots.monthlyBill,
          state: session.slots.state,
        });
        session.stage = ConversationStage.RESULT_PRESENTATION;

        await persistLeadDraft(session);

        return respond(
          {
            type: "calculation",
            data: session.slots.projection,
            nextStep: "ask_for_contact",
          },
          200,
          session,
        );
      }

      case ConversationStage.RESULT_PRESENTATION: {
        if (signals.name) session.slots.name = signals.name;
        if (signals.phone) session.slots.phone = signals.phone;

        if (session.slots.name && session.slots.phone) {
          session.stage = ConversationStage.CONTACT_CONFIRMATION;
          const prompt = getStagePrompt(session.stage);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        session.stage = session.slots.name ? ConversationStage.CONTACT_PHONE_CAPTURE : ConversationStage.CONTACT_NAME_CAPTURE;
        const prompt = getStagePrompt(session.stage);
        return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
      }

      case ConversationStage.CONTACT_NAME_CAPTURE: {
        if (signals.name) session.slots.name = signals.name;
        if (signals.phone) session.slots.phone = signals.phone;

        if (!session.slots.name) {
          const guard = postValidationGuard(message);
          if (guard.blocked) return respond({ error: guard.error }, guard.status, session);
          const prompt = getStagePrompt(ConversationStage.CONTACT_NAME_CAPTURE);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        session.stage = session.slots.phone ? ConversationStage.CONTACT_CONFIRMATION : ConversationStage.CONTACT_PHONE_CAPTURE;
        const prompt = getStagePrompt(session.stage);
        return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
      }

      case ConversationStage.CONTACT_PHONE_CAPTURE: {
        if (signals.phone) session.slots.phone = signals.phone;
        if (signals.name && !session.slots.name) session.slots.name = signals.name;

        if (!session.slots.phone) {
          const guard = postValidationGuard(message);
          if (guard.blocked) return respond({ error: guard.error }, guard.status, session);
          const prompt = getStagePrompt(ConversationStage.CONTACT_PHONE_CAPTURE);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        session.stage = session.slots.name ? ConversationStage.CONTACT_CONFIRMATION : ConversationStage.CONTACT_NAME_CAPTURE;
        const prompt = getStagePrompt(session.stage);
        return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
      }

      case ConversationStage.CONTACT_CONFIRMATION: {
        if (signals.confirmation === "edit") {
          session.slots.name = undefined;
          session.slots.phone = undefined;
          session.stage = ConversationStage.CONTACT_NAME_CAPTURE;
          const prompt = getStagePrompt(session.stage);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        const implicitConfirm = Boolean(signals.name && signals.phone);
        const confirmed = signals.confirmation === "confirm" || implicitConfirm;

        if (!confirmed) {
          const prompt = getStagePrompt(ConversationStage.CONTACT_CONFIRMATION);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        if (!session.slots.name || !session.slots.phone || !session.slots.monthlyBill) {
          session.stage = ConversationStage.RESULT_PRESENTATION;
          const prompt = getStagePrompt(session.stage);
          return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
        }

        const savedLead = await saveQualifiedLead({
          name: session.slots.name,
          phone: session.slots.phone,
          state: session.slots.state,
          city: session.slots.state,
          monthlyBill: session.slots.monthlyBill,
          segment: session.slots.segment,
          propertyType: session.slots.ownership,
          installationTimeline: session.slots.timeline,
          projection: session.slots.projection,
          stage: ConversationStage.CONTACT_CONFIRMATION,
          conversationSummary: [
            `Stage: ${session.stage}`,
            `State: ${session.slots.state ?? "unknown"}`,
            `Segment: ${session.slots.segment ?? "unknown"}`,
            `Timeline: ${session.slots.timeline ?? "unknown"}`,
          ].join(" | "),
        });

        session.stage = ConversationStage.COMPLETED;
        return respond(
          {
            type: "lead_captured",
            message: "Thank you. Our solar expert will contact you shortly.",
            leadCategory: savedLead.category,
          },
          200,
          session,
        );
      }

      case ConversationStage.COMPLETED: {
        const prompt = getStagePrompt(ConversationStage.COMPLETED);
        return respond({ type: "ai_response", data: prompt.text }, 200, session);
      }

      default: {
        session = createInitialChatSession();
        const prompt = getStagePrompt(session.stage);
        return respond({ type: "ai_response", data: prompt.text, nextStep: prompt.nextStep }, 200, session);
      }
    }
  } catch (error) {
    console.error("[chat] internal error", error);
    return NextResponse.json({ error: "internal_server_error" }, { status: 500 });
  }
}
