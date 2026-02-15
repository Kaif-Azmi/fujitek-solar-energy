import Link from 'next/link';
import { Button } from '@/components/ui';

interface FinalCTAProps {
  heading?: string;
  supportingText?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ariaLabel?: string;
}

const FINAL_CTA_DEFAULTS = {
  heading: "Ready to Go Solar?",
  supportingText: "Talk to our experts and start your solar journey today.",
  ctaLabel: "Contact Solar Experts",
  ctaHref: "/contact",
  ariaLabel: "Solar consultation call to action",
};

export default function FinalCTA({
  heading = FINAL_CTA_DEFAULTS.heading,
  supportingText = FINAL_CTA_DEFAULTS.supportingText,
  ctaLabel = FINAL_CTA_DEFAULTS.ctaLabel,
  ctaHref = FINAL_CTA_DEFAULTS.ctaHref,
  ariaLabel = FINAL_CTA_DEFAULTS.ariaLabel,
}: FinalCTAProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-primary py-28 text-white"
      aria-label={ariaLabel}
    >

  {/* Accent glow */}
  <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold">{heading}</h2>

    <p className="mt-6 text-lg text-white/90">{supportingText}</p>

    <div className="mt-10">
      <Link href={ctaHref} aria-label={ctaLabel}>
        <Button
          size="lg"
          className="
            rounded-full
            bg-white px-8 py-3
            text-sm font-semibold
            text-primary
            shadow-xl
            transition-all duration-300
            hover:bg-accent
            hover:text-primary
            hover:shadow-2xl
          "
        >
          {ctaLabel}
        </Button>
      </Link>
    </div>
  </div>
</section>

  );
}
