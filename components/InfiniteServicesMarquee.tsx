import { Zap } from 'lucide-react';

const SERVICES = [
  'Solar rooftop systems',
  'Solar lights',
  'MSKVY',
  'EPC Projects',
];

export default function InfiniteServicesMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-surface py-section">

      {/* ================= STRIP 1 — PRIMARY ================= */}
      <div className="relative -rotate-2 bg-primary shadow-md">
        <div className="marquee-ltr flex w-max items-center gap-20 py-5">
          {[...SERVICES, ...SERVICES].map((item, i) => (
            <div
              key={`ltr-${i}`}
              className="flex items-center gap-4 whitespace-nowrap text-lg text-strong text-white sm:text-xl"
            >
              <Zap className="h-6 w-6 text-accent" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= STRIP 2 — ACCENT ================= */}
      <div className="relative mt-12 rotate-2 bg-accent shadow-md">
        <div className="marquee-rtl flex w-max items-center gap-20 py-5">
          {[...SERVICES, ...SERVICES].map((item, i) => (
            <div
              key={`rtl-${i}`}
              className="flex items-center gap-4 whitespace-nowrap text-lg text-strong text-primary sm:text-xl"
            >
              <Zap className="h-6 w-6 text-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

