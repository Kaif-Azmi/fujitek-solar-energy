"use client";

import { Button } from "@/components/ui";

interface HeroProps {
  heading: string;
  subheading: string;
  ctaLabel: string;
}

export default function Hero({ heading, subheading, ctaLabel }: HeroProps) {
  return (
    <section className="relative w-full bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-section text-center">

        {/* Headline */}
        <h1 className="
          mx-auto mb-6 max-w-4xl
          text-4xl font-extrabold tracking-tight
          text-foreground
          md:text-5xl
        ">
          {heading}
        </h1>

        {/* Subheading */}
        <p className="
          mx-auto mb-10 max-w-3xl
          text-lg leading-relaxed
          text-muted
          md:text-xl
        ">
          {subheading}
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            variant="default"     // uses --brand / accent
            size="lg"
            className="px-8"
          >
            {ctaLabel}
          </Button>
        </div>

      </div>
    </section>
  );
}
