import "server-only";
import enMessages from "@/messages/en.json";
import { createTranslator, type Locale, type Messages, type Translator } from "@/lib/i18n";

type HindiMessages = typeof import("@/messages/hi.json");

type HindiShapeCheck = HindiMessages extends Messages
  ? Messages extends HindiMessages
    ? true
    : never
  : never;

const hindiShapeCheck: HindiShapeCheck = true;
void hindiShapeCheck;

const messageLoaders: Record<Locale, () => Promise<Messages>> = {
  en: async () => (await import("@/messages/en.json")) as Messages,
  hi: async () => (await import("@/messages/hi.json")) as Messages,
};

const messageCache = new Map<Locale, Promise<Messages>>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function deepMergeWithFallback(fallback: unknown, candidate: unknown): unknown {
  if (typeof fallback === "string") {
    return typeof candidate === "string" ? candidate : fallback;
  }

  if (!isRecord(fallback)) {
    return candidate ?? fallback;
  }

  const output: Record<string, unknown> = {};
  const candidateRecord = isRecord(candidate) ? candidate : {};

  for (const key of Object.keys(fallback)) {
    output[key] = deepMergeWithFallback(fallback[key], candidateRecord[key]);
  }

  return output;
}

export async function getMessages(locale: Locale): Promise<Messages> {
  const cached = messageCache.get(locale);
  if (cached) return cached;

  const loadPromise = messageLoaders[locale]().then((catalog) => {
    return deepMergeWithFallback(enMessages, catalog) as Messages;
  });

  messageCache.set(locale, loadPromise);
  return loadPromise;
}

export async function getTranslator(locale: Locale): Promise<Translator> {
  const messages = await getMessages(locale);
  return createTranslator(messages);
}