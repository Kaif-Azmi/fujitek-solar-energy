"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderAuth from "./HeaderAuth";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", href: "/", label: "Home" },
  { id: "products", href: "/products", label: "Products" },
  { id: "service", href: "/service", label: "Service" },
  { id: "about", href: "/about", label: "About" },
  { id: "contact", href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const mobileLink =
    "block rounded-lg px-4 py-3 text-base font-medium text-foreground transition no-underline hover:bg-hover hover:text-primary";

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border relative">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline">
          <Image
            src="/fujitek-solar-energy-logo.svg"
            alt="Fujitek Solar Energy logo"
            width={160}
            height={40}
            priority
            className="h-14 w-auto"
          />
        </Link>

        {/* ===== Desktop Navbar ===== */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex" aria-label="Primary">
          <div className="relative flex items-center gap-1 rounded-full bg-surface px-1 py-1 shadow-sm border border-border">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative z-10 px-5 py-2 text-sm font-medium rounded-full
                    transition-colors duration-200 no-underline
                    ${
                      isActive
                        ? "text-white"
                        : "text-secondary hover:text-primary"
                    }
                  `}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <HeaderAuth />

          {/* WhatsApp */}
          <a
            href="https://wa.me/918887852321"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-secondary transition hover:bg-hover hover:text-primary no-underline"
            aria-label="Chat on WhatsApp"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.94.55 3.82 1.6 5.45L2 22l4.78-1.57a9.77 9.77 0 005.26 1.5h.01c5.46 0 9.9-4.44 9.9-9.9C21.95 6.44 17.5 2 12.04 2z" />
            </svg>
          </a>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((p) => !p)}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-secondary transition hover:bg-hover hover:text-primary md:hidden"
            aria-label="Toggle menu"
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

      {/* ===== Mobile Menu (Absolute Dropdown) ===== */}
      <div
        id="mobile-navigation"
        className={`absolute left-0 top-full w-full md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2"
        }`}
      >
        <div className="mx-4 mt-3 mb-4 max-w-md rounded-xl border border-border bg-background shadow-lg sm:mx-auto">
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-border" />
            <HeaderAuth />
          </nav>
        </div>
      </div>
    </header>
  );
}
