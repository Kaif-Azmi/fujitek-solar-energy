import Link from "next/link";
import { PublicIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FinalCTAProps {
  heading?: string;
  supportingText?: string;
  ctaLabel?: string;
  ctaHref?: string;
  benefits?: string[];
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

const DEFAULT_BENEFITS = [
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
  benefits = DEFAULT_BENEFITS,
  ariaLabel = FINAL_CTA_DEFAULTS.ariaLabel,
  sectionClassName,
  panelClassName,
}: FinalCTAProps) {
  return (
    <section className={cn("px-6 py-section", sectionClassName)} aria-label={ariaLabel}>
      <div
        className={cn(
          "relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#0b2744_0%,#123d66_48%,#153f67_100%)] px-8 py-12 text-white shadow-[0_28px_80px_rgba(8,23,43,0.24)] md:px-12 md:py-14",
          panelClassName,
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/8 to-transparent" />
        <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-white/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-accent/18 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/88">
              Fujitek Solar Energy
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.08] text-white md:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-xl text-base text-white md:text-lg">{supportingText}</p>
            <div className="mt-8">
              <Button asChild variant="exploreInverse">
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm md:p-8">
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/18 bg-accent text-primary-deep shadow-[0_10px_24px_rgba(8,23,43,0.22)]">
                    <PublicIcon name="shield" className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium text-white md:text-base">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
