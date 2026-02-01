"use client";

import { Button } from "@/components/ui";

interface HeroProps {
  heading: string;
  subheading: string;
  ctaLabel: string;
}

export default function Hero({ heading, subheading, ctaLabel }: HeroProps) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          {heading}
        </h1>

        <p className="mb-8 text-xl text-muted">
          {subheading}
        </p>

        <Button
          variant="default"   // ✅ Accent (yellow)
          size="lg"
          className="mx-auto"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
