export type ExtractedLeadDetails = {
  name?: string;
  phone?: string;
  city?: string;
  monthlyBill?: number;
};

const PHONE_REGEX = /(?:\+?91[\s-]?)?([6-9]\d{9})\b/;
const NAME_REGEX = /\b(?:my name is|i am|i'm)\s+([a-z][a-z\s'.-]{1,60})\b/i;
const BILL_CONTEXT_REGEX = /\b(?:bill|monthly bill|electricity bill)[^\d]{0,20}(?:₹|rs\.?|inr)?\s*([1-9]\d{2,6}(?:,\d{2,3})*(?:\.\d+)?)\b/i;
const BILL_CURRENCY_REGEX = /(?:₹|rs\.?|inr)\s*([1-9]\d{2,6}(?:,\d{2,3})*(?:\.\d+)?)/i;
const CITY_REGEX = /\b(?:in|from|city)\s+([a-z][a-z\s.-]{1,40})\b/i;

function toTitleCase(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1).toLowerCase() : part))
    .join(" ");
}

function parseBill(raw: string): number | undefined {
  const numeric = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return undefined;
  }
  return numeric;
}

export function extractLeadDetails(message: string): ExtractedLeadDetails {
  const normalized = message.trim();
  const extracted: ExtractedLeadDetails = {};

  const phoneMatch = normalized.match(PHONE_REGEX);
  if (phoneMatch?.[1]) {
    extracted.phone = phoneMatch[1];
  }

  const nameMatch = normalized.match(NAME_REGEX);
  if (nameMatch?.[1]) {
    extracted.name = toTitleCase(nameMatch[1]);
  }

  const billMatch = normalized.match(BILL_CONTEXT_REGEX) ?? normalized.match(BILL_CURRENCY_REGEX);
  if (billMatch?.[1]) {
    extracted.monthlyBill = parseBill(billMatch[1]);
  }

  const cityMatch = normalized.match(CITY_REGEX);
  if (cityMatch?.[1]) {
    extracted.city = toTitleCase(cityMatch[1]);
  }

  return extracted;
}
