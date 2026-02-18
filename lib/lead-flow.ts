export type LeadStage = "initial" | "qualification" | "calculation" | "capture" | "completed";

const BILL_AMOUNT_REGEX = /\b(?:bill|monthly|electricity|power)[^\d]{0,20}(\d{3,7})\b|\b\d{3,7}\s*(?:rs|inr|rupees?)\b/i;
const CALCULATION_DONE_REGEX = /\b(?:calculation|estimate|projection|quote)\s*(?:done|ready|completed)\b|\b(?:i\s*got|received)\s*(?:the\s*)?(?:estimate|calculation|quote)\b/i;
const PHONE_REGEX = /(?:\+?\d{1,3}[-\s]?)?(?:\d[-\s]?){10,12}\b/;

export function getNextLeadStage(currentStage: LeadStage, userInput: string): LeadStage {
  const normalizedInput = userInput.trim();

  if (PHONE_REGEX.test(normalizedInput)) {
    return "completed";
  }

  if (currentStage === "capture" || currentStage === "completed") {
    return currentStage;
  }

  if (currentStage === "calculation" && CALCULATION_DONE_REGEX.test(normalizedInput)) {
    return "capture";
  }

  if (BILL_AMOUNT_REGEX.test(normalizedInput)) {
    return "calculation";
  }

  if (currentStage === "initial") {
    return "qualification";
  }

  return currentStage;
}
