import { extractLeadDetails } from "@/lib/lead-extractor";
import type { SolarProjectionResult } from "@/lib/solar-calculator";

export enum ConversationStage {
  INTENT_GATE = "intent_gate",
  BILL_CAPTURE = "bill_capture",
  STATE_CAPTURE = "state_capture",
  SEGMENT_CAPTURE = "segment_capture",
  OWNERSHIP_CAPTURE = "ownership_capture",
  TIMELINE_CAPTURE = "timeline_capture",
  RESULT_PRESENTATION = "result_presentation",
  CONTACT_NAME_CAPTURE = "contact_name_capture",
  CONTACT_PHONE_CAPTURE = "contact_phone_capture",
  CONTACT_CONFIRMATION = "contact_confirmation",
  COMPLETED = "completed",
}

export type CustomerSegment = "residential" | "commercial";
export type OwnershipStatus = "owned" | "rented";
export type InstallTimeline = "immediate" | "3months" | "exploring";
export type ConfirmationIntent = "confirm" | "edit" | "unknown";

export type ConversationSlots = {
  monthlyBill?: number;
  state?: string;
  segment?: CustomerSegment;
  ownership?: OwnershipStatus;
  timeline?: InstallTimeline;
  name?: string;
  phone?: string;
  projection?: SolarProjectionResult;
  intentGateBillPrompted?: boolean;
};

export type ChatSessionState = {
  sid: string;
  stage: ConversationStage;
  slots: ConversationSlots;
  rev: number;
  exp: number;
};

export type InputSignals = {
  monthlyBill?: number;
  state?: string;
  segment?: CustomerSegment;
  ownership?: OwnershipStatus;
  timeline?: InstallTimeline;
  name?: string;
  phone?: string;
  subsidyIntent: boolean;
  confirmation: ConfirmationIntent;
};

export type StagePrompt = {
  text: string;
  nextStep?: "ask_for_bill" | "qualification" | "ask_for_contact";
};

const BILL_CANDIDATE_REGEX =
  /(?:₹?\s?\d{3,6}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?\s*k\b|\d+(?:\.\d+)?\s*(?:rs|rupees)\b)/gi;
const CURRENCY_OR_WORD_REGEX = /₹|,|\b(?:rs|rupees)\b/gi;
const BILL_MIN = 500;
const BILL_MAX = 200_000;

const SUBSIDY_INTENT_REGEX = /\b(subsidy|scheme|mnre|pm\s*surya)\b/i;
const SEGMENT_COMMERCIAL_REGEX = /\b(commercial|industrial|factory|business)\b/i;
const SEGMENT_RESIDENTIAL_REGEX = /\b(residential|home|household|domestic)\b/i;
const OWNED_PROPERTY_REGEX = /\b(own|owned|self[-\s]?owned)\b/i;
const RENTED_PROPERTY_REGEX = /\b(rent|rented|tenant)\b/i;
const TIMELINE_IMMEDIATE_REGEX = /\b(immediate|now|asap|right away)\b/i;
const TIMELINE_3MONTHS_REGEX = /\b(3\s*months?|three\s*months?|within\s*3\s*months?)\b/i;
const TIMELINE_EXPLORING_REGEX = /\b(exploring|just exploring|researching|browsing)\b/i;
const CONFIRM_REGEX = /\b(yes|confirm|proceed|go ahead|ok)\b/i;
const EDIT_REGEX = /\b(no|edit|change|update)\b/i;
const NAME_REGEX = /^[a-z][a-z\s'.-]{1,60}$/i;

const CANONICAL_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;

const STATE_ALIAS_TO_CANONICAL: Readonly<Record<string, string>> = {
  "andhra pradesh": "Andhra Pradesh",
  "arunachal pradesh": "Arunachal Pradesh",
  assam: "Assam",
  bihar: "Bihar",
  chhattisgarh: "Chhattisgarh",
  goa: "Goa",
  gujarat: "Gujarat",
  haryana: "Haryana",
  "himachal pradesh": "Himachal Pradesh",
  jharkhand: "Jharkhand",
  karnataka: "Karnataka",
  kerala: "Kerala",
  "madhya pradesh": "Madhya Pradesh",
  maharashtra: "Maharashtra",
  manipur: "Manipur",
  meghalaya: "Meghalaya",
  mizoram: "Mizoram",
  nagaland: "Nagaland",
  odisha: "Odisha",
  orissa: "Odisha",
  punjab: "Punjab",
  rajasthan: "Rajasthan",
  sikkim: "Sikkim",
  "tamil nadu": "Tamil Nadu",
  telangana: "Telangana",
  tripura: "Tripura",
  "uttar pradesh": "Uttar Pradesh",
  up: "Uttar Pradesh",
  "uttarakhand": "Uttarakhand",
  "west bengal": "West Bengal",
  delhi: "Delhi",
  nct: "Delhi",
  chandigarh: "Chandigarh",
  puducherry: "Puducherry",
  pondicherry: "Puducherry",
  "jammu and kashmir": "Jammu and Kashmir",
  ladakh: "Ladakh",
};

function toTitleCase(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1).toLowerCase() : part))
    .join(" ");
}

function parseMonthlyBill(message: string): number | undefined {
  const normalized = message.trim().toLowerCase();
  if (!normalized) return undefined;

  const parseAndValidate = (rawCandidate: string): number | undefined => {
    let cleaned = rawCandidate.replace(CURRENCY_OR_WORD_REGEX, "").trim();
    const hasK = /\bk\b/i.test(cleaned);
    if (hasK) {
      cleaned = cleaned.replace(/\bk\b/i, "").trim();
    }

    const parsed = Number(cleaned) * (hasK ? 1000 : 1);
    if (!Number.isFinite(parsed) || parsed < BILL_MIN || parsed > BILL_MAX) {
      return undefined;
    }
    return parsed;
  };

  for (const match of normalized.matchAll(BILL_CANDIDATE_REGEX)) {
    const candidate = match[0]?.trim();
    if (!candidate) continue;
    const parsed = parseAndValidate(candidate);
    if (parsed !== undefined) return parsed;
  }

  return undefined;
}

function normalizeStateCandidate(candidate: string): string | undefined {
  const normalized = candidate.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return undefined;

  const direct = STATE_ALIAS_TO_CANONICAL[normalized];
  if (direct) return direct;

  for (const canonical of CANONICAL_STATES) {
    if (canonical.toLowerCase() === normalized) return canonical;
  }

  return undefined;
}

function parseState(message: string): string | undefined {
  const fromPhrase = message.match(/\b(?:in|from|state(?:\s+is)?)\s+([a-z][a-z\s]{1,40})\b/i)?.[1];
  const phraseMatch = fromPhrase ? normalizeStateCandidate(fromPhrase) : undefined;
  if (phraseMatch) return phraseMatch;

  const compact = message.trim();
  if (compact.split(/\s+/).length <= 3) {
    const compactMatch = normalizeStateCandidate(compact);
    if (compactMatch) return compactMatch;
  }

  const normalized = message.toLowerCase();
  for (const canonical of CANONICAL_STATES) {
    const pattern = new RegExp(`\\b${canonical.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (pattern.test(normalized)) return canonical;
  }

  return undefined;
}

function parseSegment(message: string): CustomerSegment | undefined {
  if (SEGMENT_COMMERCIAL_REGEX.test(message)) return "commercial";
  if (SEGMENT_RESIDENTIAL_REGEX.test(message)) return "residential";
  return undefined;
}

function parseOwnership(message: string): OwnershipStatus | undefined {
  if (OWNED_PROPERTY_REGEX.test(message)) return "owned";
  if (RENTED_PROPERTY_REGEX.test(message)) return "rented";
  return undefined;
}

function parseTimeline(message: string): InstallTimeline | undefined {
  if (TIMELINE_IMMEDIATE_REGEX.test(message)) return "immediate";
  if (TIMELINE_3MONTHS_REGEX.test(message)) return "3months";
  if (TIMELINE_EXPLORING_REGEX.test(message)) return "exploring";
  return undefined;
}

function parseConfirmation(message: string): ConfirmationIntent {
  if (CONFIRM_REGEX.test(message)) return "confirm";
  if (EDIT_REGEX.test(message)) return "edit";
  return "unknown";
}

export function normalizePhone(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return undefined;
}

function parseValidatedName(message: string): string | undefined {
  const extracted = extractLeadDetails(message).name?.trim();
  if (!extracted || !NAME_REGEX.test(extracted)) {
    return undefined;
  }
  return toTitleCase(extracted);
}

export function extractInputSignals(message: string): InputSignals {
  const extracted = extractLeadDetails(message);
  const normalizedPhone = extracted.phone ? normalizePhone(extracted.phone) : undefined;

  return {
    monthlyBill: parseMonthlyBill(message),
    state: parseState(message),
    segment: parseSegment(message),
    ownership: parseOwnership(message),
    timeline: parseTimeline(message),
    name: parseValidatedName(message),
    phone: normalizedPhone,
    subsidyIntent: SUBSIDY_INTENT_REGEX.test(message),
    confirmation: parseConfirmation(message),
  };
}

export function getStagePrompt(stage: ConversationStage): StagePrompt {
  switch (stage) {
    case ConversationStage.BILL_CAPTURE:
      return {
        text: "Share your monthly electricity bill (example: ₹3500) so I can start your solar estimate.",
        nextStep: "ask_for_bill",
      };
    case ConversationStage.STATE_CAPTURE:
      return {
        text: "Please share your state to check subsidy eligibility.",
        nextStep: "qualification",
      };
    case ConversationStage.SEGMENT_CAPTURE:
      return {
        text: "Is your requirement residential or commercial?",
        nextStep: "qualification",
      };
    case ConversationStage.OWNERSHIP_CAPTURE:
      return {
        text: "Is the property self-owned or rented?",
        nextStep: "qualification",
      };
    case ConversationStage.TIMELINE_CAPTURE:
      return {
        text: "What is your installation timeline: immediate, within 3 months, or exploring?",
        nextStep: "qualification",
      };
    case ConversationStage.RESULT_PRESENTATION:
      return {
        text: "Please share your full name and phone number for expert callback.",
        nextStep: "ask_for_contact",
      };
    case ConversationStage.CONTACT_NAME_CAPTURE:
      return {
        text: "Please share your full name.",
        nextStep: "ask_for_contact",
      };
    case ConversationStage.CONTACT_PHONE_CAPTURE:
      return {
        text: "Please share your phone number.",
        nextStep: "ask_for_contact",
      };
    case ConversationStage.CONTACT_CONFIRMATION:
      return {
        text: "Reply YES to confirm callback request, or EDIT to update your details.",
        nextStep: "ask_for_contact",
      };
    case ConversationStage.COMPLETED:
      return {
        text: "Your request is confirmed. Our solar expert will contact you shortly.",
      };
    default:
      return {
        text: "Share your monthly electricity bill to begin your solar qualification.",
        nextStep: "ask_for_bill",
      };
  }
}
