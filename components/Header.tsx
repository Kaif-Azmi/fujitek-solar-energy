"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderAuth from "./HeaderAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLink =
    "text-sm font-medium text-secondary hover:text-foreground transition-colors";

  const mobileLink =
    "block rounded-lg px-4 py-3 text-base font-medium text-foreground transition hover:bg-hover";

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-lg font-semibold tracking-tight text-foreground">
          Fujitek Solar Energy
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="/" className={navLink}>Home</Link>
          <Link href="/products" className={navLink}>Products</Link>
          <Link href="/service" className={navLink}>Service</Link>
          <Link href="/about" className={navLink}>About</Link>
          <Link href="/contact" className={navLink}>Contact</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <HeaderAuth />

          {/* WhatsApp */}
          <a
            href="https://wa.me/918887852321"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition hover:bg-hover hover:text-foreground"
            aria-label="Chat on WhatsApp"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.94.55 3.82 1.6 5.45L2 22l4.78-1.57a9.77 9.77 0 005.26 1.5h.01c5.46 0 9.9-4.44 9.9-9.9C21.95 6.44 17.5 2 12.04 2z" />
            </svg>
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition hover:bg-hover hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`absolute h-0.5 w-4 bg-current transition-transform ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-4 bg-current transition-opacity ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-4 bg-current transition-transform ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="
            mx-4 mb-4
            max-w-md
            sm:mx-auto
            rounded-xl
            border border-border
            bg-background
            shadow-lg
          "
        >
          <nav className="flex flex-col gap-1 p-4">
            <Link href="/" className={mobileLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/products" className={mobileLink} onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link href="/service" className={mobileLink} onClick={() => setIsMenuOpen(false)}>Service</Link>
            <Link href="/about" className={mobileLink} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/contact" className={mobileLink} onClick={() => setIsMenuOpen(false)}>Contact</Link>

            <div className="my-2 h-px bg-border" />
            <HeaderAuth />
          </nav>
        </div>
      </div>
    </header>
  );
}
