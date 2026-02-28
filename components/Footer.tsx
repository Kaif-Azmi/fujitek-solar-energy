import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import { DottedMap } from "@/components/ui/dotted-map";
import { siteSeo } from "@/lib/seo";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const PHONE_NUMBER = siteSeo.business.phone;
const PHONE_NUMBER_DISPLAY = "+91 84470 97751";
const EMAIL = siteSeo.business.email;
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Fujitek Solar Energy, I am interested in your solar solutions. Please share details.",
);
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER.replace("+", "")}?text=${WHATSAPP_MESSAGE}`;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#163f6d] text-white">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-x-0 -bottom-10 h-[125%] opacity-35 md:inset-0 md:h-full md:opacity-50">
          <DottedMap className="h-full w-full text-accent" />
        </div>
      </div>
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <section aria-label="Company overview" className="space-y-4">
            <Link href="/" className="inline-flex" aria-label="Go to homepage">
              <Image
                src="/fujitek-solar-energy-logo-inverse.svg"
                alt="Fujitek Solar Energy logo"
                width={220}
                height={70}
                priority
                className="h-14 sm:h-16 md:h-20 w-auto"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-100">
              Reliable and sustainable solar solutions built for long-term
              impact and energy independence.
            </p>
          </section>

          <nav aria-label="Footer quick links">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative inline-flex text-sm text-slate-100 transition hover:text-accent after:absolute after:-inset-y-2 after:-inset-x-1 after:content-['']"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-label="Contact information">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Contact
            </h3>

            <div className="mt-4 space-y-3">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="relative flex w-full items-center gap-2 text-sm text-slate-100 transition hover:text-accent sm:w-fit after:absolute after:-inset-y-2 after:-inset-x-1 after:content-['']"
              >
                <Phone className="h-4 w-4" />
                <span>{PHONE_NUMBER_DISPLAY}</span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="relative flex w-full items-center gap-2 text-sm text-slate-100 transition hover:text-accent sm:w-fit after:absolute after:-inset-y-2 after:-inset-x-1 after:content-['']"
              >
                <Mail className="h-4 w-4" />
                <span className="break-all">{EMAIL}</span>
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex w-full items-center gap-2 text-sm text-slate-100 transition hover:text-accent sm:w-fit after:absolute after:-inset-y-2 after:-inset-x-1 after:content-['']"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7 0 39.1 10.2 77.3 29.6 111L0 480l118.7-31.1c32.7 17.8 69.5 27.2 107.3 27.2h.1c122.3 0 221.7-99.3 221.7-221.7 0-59.3-23.1-115-65-157.3zM223.9 438.7h-.1c-33.1 0-65.5-8.9-93.8-25.8l-6.7-4-70.4 18.5 18.8-68.6-4.4-7c-18.6-29.6-28.4-63.7-28.4-98.6 0-102 83-185 185-185 49.5 0 96.1 19.3 131.2 54.3 35.1 35.1 54.4 81.8 54.4 131.3 0 102-83 184.9-185 184.9zm101.4-138.2c-5.5-2.8-32.8-16.1-37.9-17.9-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 17.9-17.6 21.5-3.2 3.7-6.5 4.1-12 .9-32.6-16.3-54-29.1-75.6-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.1-4.5-10.8-9.1-9.4-12.5-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9s-19.4 18.9-19.4 46 19.8 53.3 22.5 57c2.8 3.7 38.9 59.4 94.3 83.2 35 15.1 48.7 16.4 66.2 13.8 10.7-1.6 32.8-13.4 37.4-26.3 4.6-12.9 4.6-24 3.2-26.3-1.3-2.3-5-3.7-10.5-6.5z" />
                </svg>
                <span>WhatsApp Chat</span>
              </a>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              {[
                {
                  href: siteSeo.social.facebook,
                  label: "Facebook",
                  ariaLabel: "Fujitek Solar on Facebook",
                  Icon: Facebook,
                },
                {
                  href: siteSeo.social.instagram,
                  label: "Instagram",
                  ariaLabel: "Fujitek Solar on Instagram",
                  Icon: Instagram,
                },
                {
                  href: siteSeo.social.x,
                  label: "X (Twitter)",
                  ariaLabel: "Fujitek Solar on X",
                  Icon: Twitter,
                },
              ].map(({ href, label, ariaLabel, Icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                    className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white transition hover:bg-white/10 after:absolute after:-inset-1 after:content-['']"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null,
              )}
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-xs text-slate-200">
          © 2026 Fujitek Solar Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
