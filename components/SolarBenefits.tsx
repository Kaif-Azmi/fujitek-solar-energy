'use client';

import {
  IndianRupee,
  Landmark,
  TrendingUp,
  BatteryCharging,
  Leaf,
  Sun,
  ShieldCheck,
} from 'lucide-react';

export default function SolarBenefitsBento() {
  return (
    <section className="bg-surface py-section">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Why Go Solar
          </span>

          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-foreground">
            Benefits of Switching to Solar Energy
          </h2>

          <p className="mt-4 text-lg text-secondary">
            Solar energy is a long-term investment backed by savings, government
            initiatives, and a sustainable future for India.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* A — Big left (desktop only) */}
          <div className="md:row-span-2 rounded-3xl bg-primary p-10 text-foreground">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <IndianRupee className="h-6 w-6 text-navy" />
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Lower Electricity Bills
            </h3>

            <p className="mt-4 text-base leading-relaxed text-foreground/90">
              Generate your own electricity and significantly reduce monthly
              power costs. Excess energy can offset future bills through
              net-metering.
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-accent">
                4–6 Years
              </span>
              <span className="text-sm text-foreground/80">
                Average payback period
              </span>
            </div>
          </div>

          {/* B */}
          <div className="rounded-3xl bg-navy p-8 text-surface">
            <Landmark className="h-6 w-6 text-accent" />
            <h4 className="mt-4 text-xl font-semibold">
              Government Subsidies
            </h4>
            <p className="mt-2 text-sm text-surface/90">
              Central & state subsidies reduce upfront costs significantly.
            </p>
          </div>

          {/* B */}
          <div className="rounded-3xl bg-navy p-8 text-surface">
            <TrendingUp className="h-6 w-6 text-accent" />
            <h4 className="mt-4 text-xl font-semibold">
              Long-Term Investment
            </h4>
            <p className="mt-2 text-sm text-surface/90">
              Predictable savings for 25+ years with minimal maintenance.
            </p>
          </div>

          {/* C */}
          <div className="rounded-3xl bg-accent p-8 text-foreground">
            <BatteryCharging className="h-6 w-6 text-navy" />
            <h4 className="mt-4 text-xl font-semibold">
              Energy Independence
            </h4>
            <p className="mt-2 text-sm text-secondary">
              Protection from rising electricity tariffs.
            </p>
          </div>

          {/* D */}
          <div className="rounded-3xl bg-primary p-8 text-foreground">
            <Leaf className="h-6 w-6 text-accent" />
            <h4 className="mt-4 text-xl font-semibold">
              Clean & Renewable
            </h4>
            <p className="mt-2 text-sm text-foreground/90">
              Lower carbon footprint and cleaner environment.
            </p>
          </div>

          {/* E — Wide only on desktop */}
          <div className="md:col-span-2 rounded-3xl bg-accent p-10 text-foreground">
            <Sun className="h-6 w-6 text-navy" />
            <h3 className="mt-4 text-2xl font-bold">
              Future-Ready Solution
            </h3>
            <p className="mt-2 text-base text-secondary">
              Aligned with India’s long-term clean energy roadmap.
            </p>
          </div>

          {/* F */}
          <div className="rounded-3xl bg-navy p-8 text-surface">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <h4 className="mt-4 text-xl font-semibold">
              Low Maintenance
            </h4>
            <p className="mt-2 text-sm text-surface/90">
              Reliable systems with long warranties and minimal upkeep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
