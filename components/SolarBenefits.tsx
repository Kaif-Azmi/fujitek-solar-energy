import {
  type LucideIcon,
  BatteryCharging,
  Landmark,
  Leaf,
  ShieldCheck,
  Sun,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Image from "next/image";
import { Highlighter } from "@/components/ui/highlighter";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const BENEFITS: Benefit[] = [
  {
    title: "Lower monthly bills",
    description: "Generate power on-site and reduce dependence on utility rates.",
    icon: Zap,
  },
  {
    title: "Subsidy support",
    description: "Leverage central and state incentives to lower setup cost.",
    icon: Landmark,
  },
  {
    title: "Long-term returns",
    description: "Reliable production and savings over 25+ years of operation.",
    icon: TrendingUp,
  },
  {
    title: "Energy resilience",
    description: "Pair with storage to maintain power during outages and peaks.",
    icon: BatteryCharging,
  },
  {
    title: "Cleaner footprint",
    description: "Cut emissions while supporting a sustainable energy mix.",
    icon: Leaf,
  },
  {
    title: "Low upkeep",
    description: "Durable systems with straightforward servicing and monitoring.",
    icon: ShieldCheck,
  },
];

export default function SolarBenefitsBento() {
  return (
    <section className="bg-surface py-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Why Go Solar
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            <Highlighter
              action="underline"
              color="var(--accent)"
              strokeWidth={2}
              animationDuration={700}
              iterations={1}
            >
              Benefits of Switching to Solar Energy
            </Highlighter>
          </h2>

          <p className="mt-3 text-base text-secondary md:text-lg">
            Practical gains across savings, reliability, and sustainability for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/10 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium md:p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/20 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
            <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />

            <div className="relative mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
                  <Sun className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Solar impact preview</p>
                  <p className="text-xs text-muted">Savings, reliability, and clean-energy value</p>
                </div>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                Overview
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-white/95 p-3 shadow-sm backdrop-blur-sm md:p-4">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-primary/5" />
              <Image
                src="/different_solar_energy_systems.webp"
                alt="Different solar energy systems"
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative h-auto max-h-[360px] w-full rounded-xl object-contain"
              />
              <p className="mt-3 text-center text-xs font-medium text-muted">
                On-grid, off-grid, and hybrid solar configurations
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5 transition-colors duration-300 group-hover:bg-primary/15">
                <p className="text-lg font-extrabold text-primary">4-6 yrs</p>
                <p className="text-xs text-secondary">Typical payback period</p>
              </div>
              <div className="rounded-xl border border-accent/35 bg-accent/20 px-4 py-2.5 transition-colors duration-300 group-hover:bg-accent/25">
                <p className="text-lg font-extrabold text-primary">25+ yrs</p>
                <p className="text-xs text-secondary">Long-term output life</p>
              </div>
            </div>
          </div>

          <div className="grid h-full grid-cols-1 gap-3 sm:auto-rows-fr sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              const isPrimary = index % 2 === 0;
              return (
                <article
                  key={benefit.title}
                  className={[
                    "group relative h-full min-h-[150px] overflow-hidden rounded-2xl border p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium",
                    isPrimary
                      ? "border-primary/30 bg-primary text-white hover:border-primary/60"
                      : "border-accent/40 bg-accent text-primary hover:border-accent",
                  ].join(" ")}
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                      className={[
                        "absolute -right-12 -top-12 h-28 w-28 rounded-full blur-2xl",
                        isPrimary ? "bg-accent/30" : "bg-primary/25",
                      ].join(" ")}
                    />
                  </div>

                  <div className="relative">
                    <div
                      className={[
                        "mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300",
                        isPrimary
                          ? "bg-white/15 text-accent group-hover:bg-white group-hover:text-primary"
                          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
                      ].join(" ")}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className={["text-base font-semibold", isPrimary ? "text-white" : "text-primary"].join(" ")}>
                      {benefit.title}
                    </h3>
                    <p className={["mt-2 text-sm leading-relaxed", isPrimary ? "text-white/85" : "text-primary/80"].join(" ")}>
                      {benefit.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

