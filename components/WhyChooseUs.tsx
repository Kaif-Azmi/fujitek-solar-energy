import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import WhyChooseFlow from "@/components/WhyChooseFlow";

interface Reason {
  title: string;
  description: string;
}

type WhyChooseUsCopy = {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  description: string;
  kpiOneValue: string;
  kpiOneLabel: string;
  kpiTwoValue: string;
  kpiTwoLabel: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

interface WhyChooseUsProps {
  reasons?: Reason[];
  copy?: WhyChooseUsCopy;
}

function simplifyReason(title: string | undefined, description: string | undefined) {
  const normalizedTitle = (title ?? "").toLowerCase();

  if (normalizedTitle.includes("power electronics")) {
    return {
      title: "Power Electronics",
      description: "On-grid, off-grid, and hybrid inverter platforms.",
    };
  }

  if (normalizedTitle.includes("product portfolio")) {
    return {
      title: "Solar + EV Portfolio",
      description: "Panels, batteries, controllers, and EV chargers.",
    };
  }

  if (normalizedTitle.includes("bulk supply")) {
    return {
      title: "OEM + Bulk Supply",
      description: "Structured support for dealers and institutions.",
    };
  }

  if (normalizedTitle.includes("manufacturing")) {
    return {
      title: "Quality Standards",
      description: "Built with strict quality control and durability focus.",
    };
  }

  return {
    title: title ?? "",
    description: description ?? "",
  };
}

const DEFAULT_REASONS: Reason[] = [
  {
    title: "Advanced Power Electronics Engineering",
    description:
      "Our on-grid, off-grid, and hybrid solar inverters are engineered for high conversion efficiency, voltage stability, and long operational life under Indian grid conditions.",
  },
  {
    title: "Integrated Solar & EV Product Portfolio",
    description:
      "We manufacture solar panels, batteries, smart PWM charge controllers, and EV chargers - delivering a complete renewable energy hardware ecosystem.",
  },
  {
    title: "OEM & Bulk Supply Capability",
    description:
      "We support distributors, dealers, and institutional buyers with scalable production capacity and consistent product quality across categories.",
  },
  {
    title: "Quality-Driven Manufacturing Standards",
    description:
      "Every product is built with strict quality controls to ensure reliability, durability, and long-term performance in demanding environments.",
  },
];

const DEFAULT_COPY: WhyChooseUsCopy = {
  badge: "Why Choose Fujitek",
  titleLine1: "Engineered",
  titleHighlight: "Energy Solutions",
  titleLine2: "Built for Performance and Scale",
  description:
    "We design and manufacture high-performance solar inverters, panels, batteries, and EV charging equipment built for reliability, efficiency, and long-term durability.",
  kpiOneValue: "OEM",
  kpiOneLabel: "Bulk Supply & Dealer Support",
  kpiTwoValue: "High",
  kpiTwoLabel: "Conversion Efficiency Design",
  primaryCtaLabel: "Explore Products",
  primaryCtaHref: "/products",
  secondaryCtaLabel: "Get Bulk Pricing",
  secondaryCtaHref: "/contact",
};

export default function WhyChooseUs({
  reasons,
  copy = DEFAULT_COPY,
}: WhyChooseUsProps) {
  const items = reasons && reasons.length > 0 ? reasons : DEFAULT_REASONS;
  const simplifiedItems = items.map((item) => simplifyReason(item.title, item.description));
  const leftItems = [
    {
      title: simplifiedItems[0]?.title ?? "Power Electronics",
      description: simplifiedItems[0]?.description ?? "On-grid, off-grid, and hybrid inverter platforms.",
    },
    {
      title: simplifiedItems[1]?.title ?? "Solar + EV Portfolio",
      description: simplifiedItems[1]?.description ?? "Panels, batteries, controllers, and EV chargers.",
    },
  ];
  const rightItems = [
    {
      title: simplifiedItems[2]?.title ?? "OEM + Bulk Supply",
      description: simplifiedItems[2]?.description ?? "Structured support for dealers and institutions.",
    },
    {
      title: simplifiedItems[3]?.title ?? "Quality Standards",
      description: simplifiedItems[3]?.description ?? "Built with strict quality control and durability focus.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-section">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.2]" />
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-24 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-stretch">
          <div className="rounded-[2rem] border border-border/70 bg-white/96 p-7 shadow-soft backdrop-blur sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {copy.badge}
            </p>

            <h2 className="mt-5 text-[2.2rem] font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-[2.95rem]">
              <span className="block">{copy.titleLine1}</span>
              <span className="block">
                <Highlighter
                  action="underline"
                  color="var(--accent)"
                  strokeWidth={2}
                  animationDuration={700}
                  iterations={1}
                >
                  {copy.titleHighlight}
                </Highlighter>
              </span>
              <span className="mt-2 block text-foreground">{copy.titleLine2}</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-secondary sm:text-lg">
              {copy.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-deep">
                Solar inverters
              </span>
              <span className="rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-deep">
                EV charging
              </span>
              <span className="rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-deep">
                OEM supply
              </span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border/80 bg-gradient-to-br from-surface-elevated to-primary-soft/35 p-5 shadow-sm">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/80">
                  Supply Model
                </p>
                <div className="mt-4 flex items-end gap-2.5">
                  <span className="text-[2.35rem] font-extrabold leading-none tracking-tight text-primary sm:text-[2.5rem]">
                    {copy.kpiOneValue}
                  </span>
                  <span className="mb-1.5 h-2 w-2 rounded-full bg-accent" />
                </div>
                <p className="mt-2.5 max-w-[15rem] text-sm leading-6 text-secondary">
                  {copy.kpiOneLabel}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-border/80 bg-gradient-to-br from-surface-elevated to-primary-soft/35 p-5 shadow-sm">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/80">
                  Engineering Focus
                </p>
                <div className="mt-4 flex items-end gap-2.5">
                  <span className="text-[2.35rem] font-extrabold leading-none tracking-tight text-primary sm:text-[2.5rem]">
                    {copy.kpiTwoValue}
                  </span>
                  <span className="mb-1.5 h-2 w-2 rounded-full bg-accent" />
                </div>
                <p className="mt-2.5 max-w-[15rem] text-sm leading-6 text-secondary">
                  {copy.kpiTwoLabel}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="explore">
                <Link href={copy.primaryCtaHref} aria-label={copy.primaryCtaLabel}>
                  {copy.primaryCtaLabel}
                </Link>
              </Button>
              <Button asChild variant="exploreInverse">
                <Link href={copy.secondaryCtaHref} aria-label={copy.secondaryCtaLabel}>
                  {copy.secondaryCtaLabel}
                </Link>
              </Button>
            </div>
          </div>

          <div className="overflow-visible rounded-[2rem] bg-gradient-to-br from-primary-deep via-primary to-primary-hover p-4 shadow-strong sm:overflow-hidden sm:p-5">
            <div className="grid h-full gap-4 lg:grid-rows-[minmax(0,1.25fr)_minmax(0,0.95fr)]">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)]">
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/10">
                  <div className="absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                    Built for Indian conditions
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-primary-deep/80 via-primary-deep/25 to-transparent" />

                  <div className="relative h-[320px] sm:h-[420px]">
                    <Image
                      src="/images/solar_engineer.webp"
                      alt="Fujitek power electronics engineer working on solar inverter hardware"
                      fill
                      sizes="(max-width: 1024px) 100vw, 720px"
                      quality={72}
                      loading="lazy"
                      decoding="async"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="absolute inset-x-4 bottom-4 z-20 rounded-[1.4rem] border border-white/20 bg-primary-deep/88 p-4 text-white shadow-[0_18px_45px_rgba(8,23,43,0.38)] backdrop-blur-md">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      Product reliability
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-tight text-white">
                      Hardware platforms designed for stable output and long-term serviceability.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.5rem] border border-white/15 bg-primary-deep/55 p-5 text-white shadow-[0_18px_45px_rgba(8,23,43,0.22)]">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      Deployment profile
                    </p>
                    <p className="mt-3 text-2xl font-bold leading-tight text-black">
                      Residential, commercial, and institutional.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/75">
                      Built to support specification clarity and installation-readiness across use cases.
                    </p>
                  </div>

                  <div className="grid gap-3 rounded-[1.5rem] border border-white/15 bg-primary-deep/55 p-5 text-white shadow-[0_18px_45px_rgba(8,23,43,0.22)]">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                        Capability stack
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                        Inverters
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                        Batteries
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                        Charge controllers
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                        EV chargers
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <WhyChooseFlow
                leftLabel="Engineering and Product Scope"
                rightLabel="Execution and Quality Standards"
                leftItems={leftItems}
                rightItems={rightItems}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
