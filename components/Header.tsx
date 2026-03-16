"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/components/i18n-provider";
import { Phone } from "lucide-react";
import {
  defaultLocale,
  getLocaleFromPathname,
  stripLocaleFromPathname,
  withLocalePath,
} from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "home", href: "/", labelKey: "common.nav.home" },
  { id: "products", href: "/products", labelKey: "common.nav.products" },
  { id: "services", href: "/services", labelKey: "common.nav.services" },
  { id: "blog", href: "/blog", labelKey: "common.nav.blog" },
  { id: "about", href: "/about", labelKey: "common.nav.about" },
  { id: "contact", href: "/contact", labelKey: "common.nav.contact" },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const pathnameWithoutLocale = stripLocaleFromPathname(pathname);
  const currentLocale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const { t } = useTranslation();

  const PHONE_NUMBER = "+918447097751";
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hi Fujitek Solar Energy, I am interested in your solar solutions. Please share details.",
  );

  const localizeHref = (href: string) => withLocalePath(currentLocale, href);

  const mobileLinkBase =
    "block rounded-lg px-4 py-3 text-base font-semibold transition-colors duration-200 no-underline";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur relative">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">
        <Link href={localizeHref("/")} className="flex items-center no-underline">
          <Image
            src="/images/logos/fujitek-solar-energy-logo.svg"
            alt="Fujitek Solar Energy logo"
            width={220}
            height={70}
            loading="eager"
            decoding="async"
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
            className="h-14 sm:h-16 md:h-20 w-auto"
          />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
          aria-label="Primary"
        >
          <div className="relative flex items-center gap-1 rounded-full bg-surface px-1 py-1 shadow-sm border border-border">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathnameWithoutLocale === "/"
                  : pathnameWithoutLocale.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={localizeHref(item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative z-10 px-5 py-2 text-sm font-medium rounded-full
                    transition-colors duration-200 no-underline
                    after:absolute after:-inset-y-1.5 after:-inset-x-1 after:content-['']
                    ${
                      isActive
                        ? "text-white"
                        : "text-secondary hover:text-primary"
                    }
                  `}
                >
                  {t(item.labelKey)}

                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden md:inline-flex" />

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-primary transition hover:bg-hover hover:text-primary-hover no-underline sm:h-9 sm:w-9 after:absolute after:-inset-1.5 after:content-['']"
            aria-label={t("common.header.callAria")}
          >
            <Phone className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </a>

          <a
            href={`https://wa.me/918447097751?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-[#25D366] transition hover:bg-hover hover:text-[#1ebe57] no-underline sm:h-9 sm:w-9 after:absolute after:-inset-1.5 after:content-['']"
            aria-label={t("common.header.whatsappAria")}
          >
            <svg
              className="h-4.5 w-4.5 sm:h-5 sm:w-5"
              viewBox="0 0 448 512"
              fill="currentColor"
              aria-hidden
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7 0 39.1 10.2 77.3 29.6 111L0 480l118.7-31.1c32.7 17.8 69.5 27.2 107.3 27.2h.1c122.3 0 221.7-99.3 221.7-221.7 0-59.3-23.1-115-65-157.3zM223.9 438.7h-.1c-33.1 0-65.5-8.9-93.8-25.8l-6.7-4-70.4 18.5 18.8-68.6-4.4-7c-18.6-29.6-28.4-63.7-28.4-98.6 0-102 83-185 185-185 49.5 0 96.1 19.3 131.2 54.3 35.1 35.1 54.4 81.8 54.4 131.3 0 102-83 184.9-185 184.9zm101.4-138.2c-5.5-2.8-32.8-16.1-37.9-17.9-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 17.9-17.6 21.5-3.2 3.7-6.5 4.1-12 .9-32.6-16.3-54-29.1-75.6-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.1-4.5-10.8-9.1-9.4-12.5-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9s-19.4 18.9-19.4 46 19.8 53.3 22.5 57c2.8 3.7 38.9 59.4 94.3 83.2 35 15.1 48.7 16.4 66.2 13.8 10.7-1.6 32.8-13.4 37.4-26.3 4.6-12.9 4.6-24 3.2-26.3-1.3-2.3-5-3.7-10.5-6.5z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((p) => !p)}
            className={`relative flex h-8 w-8 items-center justify-center rounded-md border transition md:hidden sm:h-9 sm:w-9 after:absolute after:-inset-1.5 after:content-[''] ${
              isMenuOpen
                ? "border-primary bg-primary text-white hover:bg-primary-hover hover:text-white"
                : "border-border text-secondary hover:bg-hover hover:text-primary"
            }`}
            aria-label={t("common.header.toggleMenu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`absolute h-0.5 w-4 bg-current transition-transform ${
                isMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 bg-current transition-opacity ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-4 bg-current transition-transform ${
                isMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute left-0 top-full w-full md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <div className="mx-3 mb-3 mt-2.5 max-w-md rounded-xl border border-primary/25 bg-primary shadow-xl sm:mx-auto sm:mb-4 sm:mt-3">
          <div className="px-4 pt-4 pb-2">
            <LanguageSwitcher className="text-white [&_.text-secondary]:text-white" />
          </div>

          <nav className="flex flex-col gap-1 p-4 pt-1" aria-label={t("common.header.mobileAria")}>
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathnameWithoutLocale === "/"
                  : pathnameWithoutLocale.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={localizeHref(item.href)}
                  className={`${mobileLinkBase} ${
                    isActive
                      ? "bg-accent text-primary"
                      : "text-white hover:bg-white/10 hover:text-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
