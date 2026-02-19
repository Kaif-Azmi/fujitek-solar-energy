import { NextResponse, type NextRequest } from "next/server";
import { guardAIRequest, validateUserInput } from "@/lib/ai-guard";
import { calculateSolarProjection } from "@/lib/solar-calculator";
import { getNextLeadStage } from "@/lib/lead-flow";
import { extractLeadDetails } from "@/lib/lead-extractor";
import { saveQualifiedLead } from "@/lib/lead-service";
import { checkPublicRateLimit } from "@/lib/public-rate-limit";
import { getCachedResponse, setCachedResponse } from "@/lib/ai-cache";
import { GeminiRequestError, generateResponse } from "@/lib/gemini";
import { connectDB } from "@/lib/db";
import SolarSchemeModel from "@/models/SolarScheme";

export const runtime = "nodejs";

type ChatRequestBody = {
  message?: unknown;
};

type GeminiRequestInput = {
  userMessage: string;
  systemContext: string;
};

type GeminiModule = {
  generateResponse: (input: GeminiRequestInput) => Promise<string>;
};

const MAX_MESSAGE_LENGTH = 1500;
const BILL_CANDIDATE_REGEX =
  /(?:₹?\s?\d{3,6}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?\s*k\b|\d+(?:\.\d+)?\s*(?:rs|rupees)\b)/gi;
const CURRENCY_OR_WORD_REGEX = /₹|,|\b(?:rs|rupees)\b/gi;
const BILL_MIN = 500;
const BILL_MAX = 200_000;
const SCHEME_KEYWORD_REGEX = /\b(subsidy|scheme|mnre|pm\s*surya)\b/i;
const OWNED_PROPERTY_REGEX = /\b(own|owned|self[-\s]?owned)\b/i;
const RENTED_PROPERTY_REGEX = /\b(rent|rented|tenant)\b/i;
const TIMELINE_IMMEDIATE_REGEX = /\b(immediate|now|asap|right away)\b/i;
const TIMELINE_3MONTHS_REGEX = /\b(3\s*months?|three\s*months?|within\s*3\s*months?)\b/i;
const TIMELINE_EXPLORING_REGEX = /\b(exploring|just exploring|researching|browsing)\b/i;
const GEMINI_TIMEOUT_MS = 10_000;
const REPEAT_WINDOW_MS = 60_000;
const REPEAT_THRESHOLD = 5;

type RepeatEntry = {
  count: number;
  windowStart: number;
};

const repeatMessageMap = new Map<string, RepeatEntry>();
const BILL_FALLBACK_VARIANTS = [
  "I’d be happy to calculate your solar savings. What’s your monthly electricity bill?",
  "To give an accurate solar estimate, please share your monthly electricity bill.",
  "Solar savings depend on usage. Share your monthly bill amount, and I’ll estimate your potential savings.",
] as const;

function parseMonthlyBill(message: string): number | null {
  const normalized = message.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const parseAndValidate = (rawCandidate: string): number | null => {
    let cleaned = rawCandidate.replace(CURRENCY_OR_WORD_REGEX, "").trim();
    const hasK = /\bk\b/i.test(cleaned);
    if (hasK) {
      cleaned = cleaned.replace(/\bk\b/i, "").trim();
    }

    const parsed = Number(cleaned) * (hasK ? 1000 : 1);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    if (parsed < BILL_MIN || parsed > BILL_MAX) {
      return null;
    }
    return parsed;
  };

  for (const match of normalized.matchAll(BILL_CANDIDATE_REGEX)) {
    const candidate = match[0]?.trim();
    if (!candidate) {
      continue;
    }
    const parsed = parseAndValidate(candidate);
    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
}

function getBillFallbackMessage(): string {
  const randomIndex = Math.floor(Math.random() * BILL_FALLBACK_VARIANTS.length);
  return BILL_FALLBACK_VARIANTS[randomIndex] ?? BILL_FALLBACK_VARIANTS[0];
}

async function generateGeminiResponse(userMessage: string, systemContext: string): Promise<string> {
  const geminiModulePath = "@/lib/gemini";
  const loadedModule = (await import(geminiModulePath)) as unknown;

  if (
    typeof loadedModule !== "object" ||
    loadedModule === null ||
    !("generateResponse" in loadedModule) ||
    typeof loadedModule.generateResponse !== "function"
  ) {
    throw new Error("gemini_unavailable");
  }

  const gemini = loadedModule as GeminiModule;
  return gemini.generateResponse({ userMessage, systemContext });
}

function buildCacheKey(prefix: "scheme" | "faq", message: string): string {
  return `${prefix}:${message.trim().toLowerCase()}`;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const requestWithOptionalIp = request as NextRequest & { ip?: string };
  if (requestWithOptionalIp.ip) {
    return requestWithOptionalIp.ip;
  }

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

async function generateGeminiResponseWithTimeout(userMessage: string, systemContext: string): Promise<string> {
  const timeoutPromise = new Promise<string>((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), GEMINI_TIMEOUT_MS);
  });

  return Promise.race([generateGeminiResponse(userMessage, systemContext), timeoutPromise]);
}

function detectPropertyType(message: string): "owned" | "rented" | undefined {
  if (OWNED_PROPERTY_REGEX.test(message)) {
    return "owned";
  }
  if (RENTED_PROPERTY_REGEX.test(message)) {
    return "rented";
  }
  return undefined;
}

function detectInstallationTimeline(message: string): "immediate" | "3months" | "exploring" | undefined {
  if (TIMELINE_IMMEDIATE_REGEX.test(message)) {
    return "immediate";
  }
  if (TIMELINE_3MONTHS_REGEX.test(message)) {
    return "3months";
  }
  if (TIMELINE_EXPLORING_REGEX.test(message)) {
    return "exploring";
  }
  return undefined;
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

    if (typeof body.message !== "string") {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    if (body.message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    let cleanedMessage: string;
    try {
      cleanedMessage = validateUserInput(body.message);
    } catch {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    const guardResult = guardAIRequest(cleanedMessage);
    const safeMessage = guardResult.cleanedInput ?? cleanedMessage;
    const detectedBill = parseMonthlyBill(cleanedMessage) ?? parseMonthlyBill(safeMessage);
    if (!guardResult.allowed) {
      if (!(guardResult.reason === "non_solar_topic" && detectedBill !== null)) {
        return NextResponse.json({ error: guardResult.reason ?? "invalid_input" }, { status: 400 });
      }
    }

    if (isSuspiciousRepeatedMessage(ip, safeMessage)) {
      return NextResponse.json({ error: "suspicious_activity" }, { status: 400 });
    }

    await connectDB();

    const finalDetectedBill = detectedBill;
    const extracted = extractLeadDetails(safeMessage);
    const monthlyBillForLead = extracted.monthlyBill ?? finalDetectedBill ?? undefined;
    const leadStage = getNextLeadStage("initial", safeMessage);
    const looksLikeStateOnlyMessage =
      /^[a-z][a-z\s]{1,40}$/i.test(safeMessage) &&
      safeMessage.trim().split(/\s+/).length <= 3;
    const subsidyIntent =
      SCHEME_KEYWORD_REGEX.test(safeMessage) ||
      (leadStage === "qualification" && looksLikeStateOnlyMessage);

    if (extracted.name && extracted.phone && typeof monthlyBillForLead === "number" && monthlyBillForLead > 0) {
      const projection = await calculateSolarProjection({ monthlyBill: monthlyBillForLead, state: extracted.city });
      const savedLead = await saveQualifiedLead({
        name: extracted.name,
        phone: extracted.phone,
        city: extracted.city,
        monthlyBill: monthlyBillForLead,
        propertyType: detectPropertyType(safeMessage),
        installationTimeline: detectInstallationTimeline(safeMessage),
        projection,
        conversationSummary: safeMessage,
      });

      return NextResponse.json({
        type: "lead_captured",
        message: "Thank you. Our solar expert will contact you shortly.",
        leadCategory: savedLead.category,
      });
    }

    if (finalDetectedBill !== null) {
      const projection = await calculateSolarProjection({ monthlyBill: finalDetectedBill });
      return NextResponse.json({
        type: "calculation",
        data: projection,
        nextStep: "ask_for_contact",
      });
    }

    if (subsidyIntent) {
      const stateMatch = safeMessage.match(
        /\b(?:in|from|state(?:\s+is)?)\s+([a-z][a-z\s]{1,40})\b/i,
      );
      const state = stateMatch?.[1]?.trim() ?? (looksLikeStateOnlyMessage ? safeMessage.trim() : undefined);

      if (!state) {
        return NextResponse.json({
          type: "ai_response",
          data: "Please share your state so I can check available solar subsidy schemes.",
        });
      }

      await connectDB();

      const scheme = await SolarSchemeModel.findOne({
        state: new RegExp(state, "i"),
      }).lean();

      if (scheme) {
        const formatted = [
          `Solar subsidy details for ${state}:`,
          `Scheme: ${scheme.name}`,
          `Description: ${scheme.description}`,
          `Subsidy per kW: ₹${scheme.subsidyPerKW}`,
          `Maximum subsidy: ₹${scheme.maxSubsidy}`,
          `Maximum eligible system size: ${scheme.maxEligibleKW} kW`,
          `Eligibility: ${scheme.eligibility}`,
        ].join("\n");

        return NextResponse.json({
          type: "ai_response",
          data: formatted,
        });
      }

      const aiText = await generateResponse({
        userMessage: cleanedMessage,
        leadStage: "subsidy",
      });

      return NextResponse.json({
        type: "ai_response",
        data: aiText,
      });
    }

    if (
      guardResult.allowed &&
      finalDetectedBill === null &&
      !subsidyIntent &&
      leadStage !== "capture" &&
      leadStage !== "completed"
    ) {
      return NextResponse.json({
        type: "ai_response",
        data: getBillFallbackMessage(),
        nextStep: "qualification",
      });
    }

    const systemContext = [
      "You are a solar advisory assistant for a solar energy company.",
      "Only answer solar-related questions (solar systems, subsidy, net metering, bills, rooftop, inverter, battery, installation, savings).",
      "If user goes off-topic, redirect to solar advisory politely.",
      "Keep responses concise, practical, and lead-focused.",
      "Prioritize collecting user's monthly electricity bill and city/state for accurate estimate.",
      "After qualification, nudge user toward contact sharing for follow-up consultation.",
      `Current lead stage: ${leadStage}.`,
    ].join(" ");

    const faqCacheKey = buildCacheKey("faq", safeMessage);
    const cachedFaqResponse = getCachedResponse(faqCacheKey);
    if (cachedFaqResponse) {
      return NextResponse.json({
        type: "ai_response",
        data: cachedFaqResponse,
        nextStep: "qualification",
      });
    }

    const modelResponse = await generateGeminiResponseWithTimeout(safeMessage, systemContext);
    setCachedResponse(faqCacheKey, modelResponse);

    return NextResponse.json({
      type: "ai_response",
      data: modelResponse,
      nextStep: "qualification",
    });
  } catch (error) {
    if (error instanceof GeminiRequestError) {
      console.error("[chat] GeminiRequestError", {
        status: error.status,
        details: error.bodyPreview,
      });
      return NextResponse.json(
        {
          error: "gemini_request_failed",
          status: error.status,
          details: error.bodyPreview,
        },
        { status: 502 },
      );
    }

    console.error("[chat] internal error", error);
    return NextResponse.json({ error: "internal_server_error" }, { status: 500 });
  }
}
