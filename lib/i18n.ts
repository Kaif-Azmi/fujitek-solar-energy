import type { Metadata } from "next";
import type { NextRequest } from "next/server";
import type enMessages from "@/messages/en.json";

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "NEXT_LOCALE";
export const localeCookieMaxAge = 60 * 60 * 24 * 365;

export type Messages = typeof enMessages;

export type TranslationValues = Record<string, string | number>;

type JsonPrimitive = string | number | boolean | null;

type NestedMessageKeys<T> = T extends JsonPrimitive
  ? never
  : {
      [K in Extract<keyof T, string>]: T[K] extends string
        ? K
        : T[K] extends Record<string, unknown>
          ? `${K}.${NestedMessageKeys<T[K]>}`
          : never;
    }[Extract<keyof T, string>];

export type TranslationKey = NestedMessageKeys<Messages>;

export type Translator = <K extends TranslationKey>(
  key: K,
  values?: TranslationValues,
) => string;

const hrefLangByLocale: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
};

const openGraphLocaleByLocale: Record<Locale, string> = {
  en: "en_IN",
  hi: "hi_IN",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getSiteUrl(): string {
  const urlFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!urlFromEnv) return "https://www.fujiteksolar.com";
  return urlFromEnv.endsWith("/") ? urlFromEnv.slice(0, -1) : urlFromEnv;
}

function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

function getByPath(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (!isRecord(acc)) return undefined;
    return acc[segment];
  }, source);
}

function interpolate(template: string, values?: TranslationValues): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_, token: string) => {
    const value = values[token];
    return value === undefined ? `{${token}}` : String(value);
  });
}

export function createTranslator(messages: Messages): Translator {
  return (key, values) => {
    const value = getByPath(messages as Record<string, unknown>, key);

    if (typeof value !== "string") {
      if (process.env.NODE_ENV !== "production") {
        throw new Error(`Missing translation key: "${key}"`);
      }
      return key;
    }

    return interpolate(value, values);
  };
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function normalizeLocale(value: string | null | undefined): Locale | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase().split("-")[0];
  return isLocale(normalized) ? normalized : undefined;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = normalizePathname(pathname).split("/")[1];
  return segment && isLocale(segment) ? segment : null;
}

export function stripLocaleFromPathname(pathname: string): string {
  const normalized = normalizePathname(pathname);
  const locale = getLocaleFromPathname(normalized);
  if (!locale) return normalized;

  const withoutLocale = normalized.slice(locale.length + 1);
  if (!withoutLocale) return "/";
  return withoutLocale.startsWith("/") ? withoutLocale : `/${withoutLocale}`;
}

export function withLocalePath(locale: Locale, pathname: string): string {
  const normalized = normalizePathname(pathname);

  if (normalized === `/${locale}` || normalized.startsWith(`/${locale}/`)) {
    return normalized;
  }

  if (normalized === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
}

function detectLocaleFromAcceptLanguage(headerValue: string | null): Locale {
  if (!headerValue) return defaultLocale;

  const preferences = headerValue
    .split(",")
    .map((entry) => {
      const [rawTag, ...params] = entry.trim().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam ? Number(qualityParam.trim().slice(2)) : 1;

      return {
        tag: rawTag.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const preference of preferences) {
    const locale = normalizeLocale(preference.tag);
    if (locale) return locale;
  }

  return defaultLocale;
}

export function detectRequestLocale(request: NextRequest): Locale {
  const localeFromCookie = normalizeLocale(request.cookies.get(localeCookieName)?.value);
  if (localeFromCookie) return localeFromCookie;

  return detectLocaleFromAcceptLanguage(request.headers.get("accept-language"));
}

export function buildLocalizedMetadata(options: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const { locale, pathname, title, description, keywords } = options;
  const localizedPath = withLocalePath(locale, pathname);
  const ogImageUrl = absoluteUrl("/images/solar_panels.webp");

  const languages = Object.fromEntries(
    locales.map((entryLocale) => [
      hrefLangByLocale[entryLocale],
      absoluteUrl(withLocalePath(entryLocale, pathname)),
    ]),
  ) as Record<string, string>;

  languages["x-default"] = absoluteUrl(withLocalePath(defaultLocale, pathname));

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(localizedPath),
      languages,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath),
      type: "website",
      locale: openGraphLocaleByLocale[locale],
      alternateLocale: locales
        .filter((entryLocale) => entryLocale !== locale)
        .map((entryLocale) => openGraphLocaleByLocale[entryLocale]),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${getSiteUrl()}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
