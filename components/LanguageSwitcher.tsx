"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/select";
import { useTranslation } from "@/components/i18n-provider";
import { PublicIcon } from "@/components/ui/icons";
import {
  defaultLocale,
  getLocaleFromPathname,
  isLocale,
  localeCookieMaxAge,
  localeCookieName,
  locales,
  stripLocaleFromPathname,
  withLocalePath,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

const localeLabelKey = {
  en: "common.language.english",
  hi: "common.language.hindi",
} as const;

export default function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation();

  const currentLocale = getLocaleFromPathname(pathname) ?? defaultLocale;

  function setLocaleCookie(nextLocale: string) {
    const secure =
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? ";Secure"
        : "";

    document.cookie = `${localeCookieName}=${nextLocale};Path=/;Max-Age=${localeCookieMaxAge};SameSite=Lax${secure}`;
  }

  function handleLocaleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;

    if (!isLocale(nextLocale) || nextLocale === currentLocale) return;

    const pathnameWithoutLocale = stripLocaleFromPathname(pathname);
    const localizedPath = withLocalePath(nextLocale, pathnameWithoutLocale);
    const query = searchParams.toString();
    const href = query ? `${localizedPath}?${query}` : localizedPath;

    setLocaleCookie(nextLocale);

    startTransition(() => {
      router.replace(href, { scroll: false });
      router.refresh();
    });
  }

  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      <span className="sr-only">{t("common.language.label")}</span>
      <PublicIcon name="translator" className="h-4 w-4" />
      <Select
        aria-label={t("common.language.label")}
        value={currentLocale}
        onChange={handleLocaleChange}
        disabled={isPending}
        className="h-9 min-w-[132px] text-xs"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {t(localeLabelKey[locale])}
          </option>
        ))}
      </Select>
    </label>
  );
}
