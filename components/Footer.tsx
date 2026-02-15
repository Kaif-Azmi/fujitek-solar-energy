import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#163f6d] text-white">

      {/* subtle accent glow (reduced) */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="text-lg text-strong tracking-tight">
              Fujitek Solar Energy
            </div>
            <p className="mt-3 text-sm text-white/75 max-w-sm leading-relaxed">
              Reliable and sustainable solar solutions built for
              long-term impact and energy independence.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/60">
              Quick Links
            </div>

            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/service", label: "Service" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-label={`Go to ${link.label} page`}
                    className="
                      text-sm text-white/75
                      transition-all duration-300
                      hover:text-accent
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/60">
              Contact
            </div>

            <p className="text-sm text-white/75">
              info@fujiteksolar.com
            </p>

            <p className="text-sm text-white/75">
              +1 (123) 456-7890
            </p>

            <p className="mt-4 text-sm">
              <a
                href="https://wa.me/1234567890"
                className="
                  inline-flex items-center gap-2
                  text-accent font-semibold
                  transition-all duration-300
                  hover:translate-x-1
                "
              >
                Chat on WhatsApp →
              </a>
            </p>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 text-center text-xs text-white/50">
          © 2026 Fujitek Solar Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

