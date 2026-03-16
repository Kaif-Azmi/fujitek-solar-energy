"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  createTranslator,
  type Locale,
  type Messages,
  type TranslationKey,
  type TranslationValues,
  type Translator,
} from "@/lib/i18n";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: Translator;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const t = useMemo(() => createTranslator(messages), [messages]);

  const value = useMemo(
    () => ({
      locale,
      messages,
      t,
    }),
    [locale, messages, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): {
  locale: Locale;
  t: <K extends TranslationKey>(key: K, values?: TranslationValues) => string;
} {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslation must be used inside <I18nProvider>.");
  }

  return {
    locale: context.locale,
    t: context.t,
  };
}