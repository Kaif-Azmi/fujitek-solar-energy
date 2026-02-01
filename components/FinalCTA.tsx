'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';

interface FinalCTAProps {
  heading: string;
  supportingText: string;
  ctaLabel: string;
}

export default function FinalCTA({
  heading,
  supportingText,
  ctaLabel,
}: FinalCTAProps) {
  return (
    <section className="w-full bg-surface py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {heading}
        </h2>

        <p className="text-lg text-secondary mb-8">
          {supportingText}
        </p>

        <Link href="/contact">
          <Button variant="default" size="lg">
            {ctaLabel}
          </Button>
        </Link>
      </div>

    </section>
  );
}
