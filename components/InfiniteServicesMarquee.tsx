'use client';

import { Zap } from 'lucide-react';

const SERVICES = [
  'Solar rooftop systems',
  'Solar lights',
  'MSKVY',
  'EPC Projects',
];

export default function InfiniteServicesMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-12 bg-surface">
      {/* ================= STRIP 1 — DARK GREEN | LEFT ➜ RIGHT ================= */}
      <div className="relative -rotate-2 bg-primary">
        <div className="marquee-ltr flex w-max items-center gap-14 py-4">
          {[...SERVICES, ...SERVICES].map((item, i) => (
            <div
              key={`ltr-${i}`}
              className="
                flex items-center gap-3 whitespace-nowrap
                text-sm font-semibold text-white sm:text-base
              "
            >
              <Zap className="h-4 w-4 text-accent" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= STRIP 2 — DARK NAVY | RIGHT ➜ LEFT ================= */}
      <div className="relative mt-8 rotate-2 bg-navy">
        <div className="marquee-rtl flex w-max items-center gap-14 py-4">
          {[...SERVICES, ...SERVICES].map((item, i) => (
            <div
              key={`rtl-${i}`}
              className="
                flex items-center gap-3 whitespace-nowrap
                text-sm font-semibold text-white sm:text-base
              "
            >
              <Zap className="h-4 w-4 text-accent" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EDGE FADES ================= */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-28 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
