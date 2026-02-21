import Link from "next/link";
import { Check } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { cn } from "@/lib/utils";

interface FinalCTAProps {
  heading?: string;
  supportingText?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ariaLabel?: string;
  sectionClassName?: string;
  panelClassName?: string;
}

const FINAL_CTA_DEFAULTS = {
  heading: "Power Your Future with Fujitek Solar",
  supportingText:
    "Choose trusted solar systems built for long-term performance, savings, and dependable support.",
  ctaLabel: "Get Free Consultation",
  ctaHref: "/contact",
  ariaLabel: "Fujitek solar call to action",
};

const BENEFITS = [
  "High-Efficiency Solar Panels",
  "Long-Term Cost Savings",
  "Certified Installation Experts",
  "Advanced Inverter Technology",
  "Reliable After-Sales Support",
];

export default function FinalCTA({
  heading = FINAL_CTA_DEFAULTS.heading,
  supportingText = FINAL_CTA_DEFAULTS.supportingText,
  ctaLabel = FINAL_CTA_DEFAULTS.ctaLabel,
  ctaHref = FINAL_CTA_DEFAULTS.ctaHref,
  ariaLabel = FINAL_CTA_DEFAULTS.ariaLabel,
  sectionClassName,
  panelClassName,
}: FinalCTAProps) {
  return (
    <section className={cn("px-6 py-section", sectionClassName)} aria-label={ariaLabel}>
      <div
        className={cn(
          "mx-auto max-w-7xl rounded-2xl bg-primary px-8 py-12 text-white md:px-12 md:py-14",
          panelClassName,
        )}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                {heading}
              </Highlighter>
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">{supportingText}</p>
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-primary"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 md:p-8">
            <ul className="space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-white/95 md:text-base">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
