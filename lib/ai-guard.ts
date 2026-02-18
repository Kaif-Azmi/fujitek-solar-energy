export type GuardAIRequestResult = {
  allowed: boolean;
  reason?: "prompt_injection_detected" | "non_solar_topic" | "invalid_input";
  cleanedInput?: string;
};

const MAX_INPUT_LENGTH = 1500;

const PROMPT_INJECTION_PATTERNS: ReadonlyArray<RegExp> = [
  /ignore previous instructions/i,
  /act as chatgpt/i,
  /system prompt/i,
  /developer mode/i,
  /jailbreak/i,
  /bypass/i,
  /override/i,
  /reveal instructions/i,
  /tell me your hidden prompt/i,
];

const SOLAR_KEYWORDS: ReadonlyArray<string> = [
  "solar",
  "electricity",
  "subsidy",
  "net metering",
  "rooftop",
  "panel",
  "inverter",
  "kw",
  "kwh",
  "bill",
  "power",
  "battery",
  "installation",
  "savings",
  "scheme",
  "mnre",
  "pm surya",
];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function validateUserInput(input: string): string {
  const trimmedInput = input.trim();
  if (trimmedInput.length === 0 || trimmedInput.length > MAX_INPUT_LENGTH) {
    throw new Error("invalid_input");
  }

  const withoutScriptTags = trimmedInput
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<script[^>]*\/>/gi, " ");

  const withoutHtmlTags = withoutScriptTags.replace(/<[^>]+>/g, " ");
  const normalizedSpaces = withoutHtmlTags.replace(/\s+/g, " ").trim();

  if (normalizedSpaces.length === 0 || normalizedSpaces.length > MAX_INPUT_LENGTH) {
    throw new Error("invalid_input");
  }

  return normalizedSpaces;
}

export function isPromptInjection(input: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

export function isSolarRelated(input: string): boolean {
  return SOLAR_KEYWORDS.some((keyword) => {
    const pattern = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
    return pattern.test(input);
  });
}

export function guardAIRequest(input: string): GuardAIRequestResult {
  try {
    const cleanedInput = validateUserInput(input);

    if (isPromptInjection(cleanedInput)) {
      return {
        allowed: false,
        reason: "prompt_injection_detected",
      };
    }

    if (!isSolarRelated(cleanedInput)) {
      return {
        allowed: false,
        reason: "non_solar_topic",
      };
    }

    return {
      allowed: true,
      cleanedInput,
    };
  } catch {
    return {
      allowed: false,
      reason: "invalid_input",
    };
  }
}
