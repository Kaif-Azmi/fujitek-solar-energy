import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="text-base font-semibold text-foreground">
              Fujitek Solar Energy
            </div>
            <p className="mt-2 text-sm text-secondary max-w-sm">
              Reliable and sustainable solar solutions built for long-term impact.
            </p>
          </div>

          {/* Navigation */}
          <nav>
            <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
              Quick Links
            </div>
            <ul className="space-y-2">
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
                    className="text-sm text-secondary hover:text-foreground transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
              Contact
            </div>
            <p className="text-sm text-secondary">
              info@fujiteksolar.com
            </p>
            <p className="text-sm text-secondary">
              +1 (123) 456-7890
            </p>
            <p className="mt-2 text-sm">
              <a
                href="https://wa.me/1234567890"
                className="text-primary hover:underline transition"
              >
                Chat on WhatsApp
              </a>
            </p>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted">
          © 2026 Fujitek Solar Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
