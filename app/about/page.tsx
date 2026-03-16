import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui";
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";
import HeroSection from "@/components/HeroSection";
import FinalCTA from "@/components/FinalCTA";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Highlighter } from "@/components/ui/highlighter";
import Button from "@/components/ui/button";
import { buildPageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.about);

const JOURNEY = [
  {
    year: "2015",
    title: "Foundation",
    icon: "solar-panel",
    description:
      "Fujitek Solar Energy was established with a focus on manufacturing reliable renewable energy power electronics for Indian conditions.",
    accentClass: "from-primary/[0.16] via-primary/[0.08] to-transparent",
  },
  {
    year: "2017",
    title: "Product Development",
    icon: "microchip",
    description:
      "Expanded our inverter portfolio to include on-grid, off-grid, and hybrid systems designed for voltage stability and operational durability.",
    accentClass: "from-accent/[0.24] via-accent/10 to-transparent",
  },
  {
    year: "2021",
    title: "EV Charging Expansion",
    icon: "car",
    description:
      "Introduced lithium e-rickshaw chargers and electric scooty chargers to support India's electric mobility growth.",
    accentClass: "from-navy/[0.16] via-primary/[0.08] to-transparent",
  },
  {
    year: "2023",
    title: "Dealer & OEM Network",
    icon: "network",
    description:
      "Strengthened pan-India dealer partnerships and bulk supply capability for distributors and institutional buyers.",
    accentClass: "from-primary/20 via-accent/10 to-transparent",
  },
] satisfies Array<{
  year: string;
  title: string;
  icon: PublicIconName;
  description: string;
  accentClass: string;
}>;

const PROFILE_HIGHLIGHTS = [
  {
    icon: "microchip",
    label: "Manufacturing-led",
    detail: "Purpose-built power electronics",
    iconClass: "bg-primary text-white",
  },
  {
    icon: "shield",
    label: "Reliability focused",
    detail: "Designed for Indian conditions",
    iconClass: "bg-accent/80 text-primary",
  },
  {
    icon: "battery",
    label: "Future ready",
    detail: "Solar and EV charging hardware",
    iconClass: "bg-primary/[0.12] text-primary",
  },
] satisfies Array<{
  icon: PublicIconName;
  label: string;
  detail: string;
  iconClass: string;
}>;

const OPERATIONAL_PILLARS = [
  "Application-focused product design for solar and EV hardware.",
  "Stable supply support for dealers, OEM partners, and institutions.",
  "Performance reliability tailored for Indian voltage and climate conditions.",
];

const EXECUTION_SIGNALS = [
  "Voltage stability",
  "Supply readiness",
  "Technical guidance",
];

const IMPACT_SIGNALS = [
  "Residential, commercial, and institutional deployments",
  "Dealer and distributor-focused execution support",
  "Hardware platforms built for long-term field performance",
];

const HERO_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YxZjVmOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2U2ZWZmNyIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

function SectionLead({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">{eyebrow}</p>
      <h2 className="mt-3 text-[30px] font-semibold leading-[1.08] text-foreground sm:text-[40px]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-secondary">{description}</p>
    </div>
  );
}

export default function About() {
  const stats = [
    {
      value: 500,
      suffix: "+",
      label: "Units & Systems Supplied",
      detail: "Delivered across residential, commercial, and institutional energy applications.",
    },
    {
      value: 10,
      suffix: "K+",
      label: "Customers & Dealers",
      detail: "Supported through structured supply and technical product guidance.",
    },
    {
      value: 5,
      suffix: "MWh",
      label: "Energy Enabled",
      detail: "Clean energy output supported through reliable hardware solutions.",
    },
  ];

  const values = [
    {
      icon: "battery",
      title: "Sustainability",
      description: "Engineering products that enable cleaner and smarter energy adoption.",
      iconClass: "bg-primary/[0.12] text-primary",
      surfaceClass: "from-primary/[0.14] via-primary/[0.04] to-transparent",
      glowClass: "bg-primary/10",
    },
    {
      icon: "microchip",
      title: "Engineering Quality",
      description: "Durable hardware built for Indian voltage and climate conditions.",
      iconClass: "bg-accent/20 text-primary",
      surfaceClass: "from-accent/30 via-accent/[0.08] to-transparent",
      glowClass: "bg-accent/[0.12]",
    },
    {
      icon: "handshake",
      title: "Trust & Transparency",
      description: "Clear specifications and dependable dealer partnerships.",
      iconClass: "bg-navy/[0.12] text-primary",
      surfaceClass: "from-navy/[0.16] via-primary/[0.06] to-transparent",
      glowClass: "bg-navy/[0.08]",
    },
    {
      icon: "sun",
      title: "Innovation",
      description: "Continuous improvement in power electronics and EV charging systems.",
      iconClass: "bg-primary/10 text-primary",
      surfaceClass: "from-primary/20 via-accent/[0.12] to-transparent",
      glowClass: "bg-primary/10",
    },
  ] satisfies Array<{
    icon: PublicIconName;
    title: string;
    description: string;
    iconClass: string;
    surfaceClass: string;
    glowClass: string;
  }>;

  return (
    <div className="min-h-screen bg-surface">
      <HeroSection
        badge="ABOUT US"
        title="About Fujitek Solar Energy"
        highlight="Powering India with Reliable Energy Hardware"
        description="Manufacturer of solar inverters, EV chargers, smart charge controllers, and renewable energy power electronics."
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/[0.08] via-transparent to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-[28rem] h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <InfiniteGrid className="z-0 opacity-25" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-section">
          <section className="mb-section overflow-hidden rounded-[36px] border border-border/70 bg-gradient-to-br from-background via-background to-surface shadow-medium">
            <div className="px-6 pt-8 lg:hidden">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.05] px-5 py-2 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Who we are
              </span>
            </div>

            <div className="grid grid-cols-1 gap-10 px-6 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-12 lg:px-8 lg:py-10">
              <ScrollReveal className="lg:self-start">
                <div className="mx-auto max-w-[560px] lg:mx-0">
                  <div className="relative">
                    <div className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-primary/[0.12] blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-8 right-10 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />

                    <div className="relative overflow-hidden rounded-[30px] border border-border/60 bg-background p-3 shadow-strong">
                      <div className="relative aspect-[0.98/1] overflow-hidden rounded-[24px]">
                        <Image
                          src="/images/solar_engineer.webp"
                          alt="Fujitek Solar engineering and manufacturing operations"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) calc(100vw - 3rem), 560px"
                          quality={72}
                          loading="lazy"
                          decoding="async"
                          placeholder="blur"
                          blurDataURL={HERO_BLUR_DATA_URL}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/35 via-transparent to-transparent" />
                      </div>
                    </div>

                    <div className="absolute left-4 top-4 rounded-2xl border border-background/80 bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                        Renewable Focus
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        Solar + EV power electronics
                      </p>
                    </div>

                  </div>

                  <div className="mt-4 rounded-[28px] border border-border/70 bg-gradient-to-br from-primary/[0.05] via-background to-surface p-5 shadow-sm">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-border/70 bg-gradient-to-br from-surface via-background to-primary/[0.05] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                          Built for India
                        </p>
                        <p className="mt-2 text-sm leading-6 text-secondary">
                          Stable electrical performance for real operating conditions.
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-primary/15 bg-gradient-to-br from-primary/[0.12] via-background to-surface p-4 shadow-[0_10px_24px_rgba(15,23,42,0.1)]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                          Supply Capability
                        </p>
                        <p className="mt-2 text-base font-semibold leading-6 text-foreground">
                          Dealers, OEMs, institutions
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button asChild variant="explore" className="w-full sm:w-auto">
                        <Link href="/products" aria-label="Go to products page">
                          Explore products
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 hidden gap-4 sm:grid-cols-3 lg:grid">
                    {PROFILE_HIGHLIGHTS.map(({ icon, label, detail, iconClass }) => (
                      <div
                        key={label}
                        className="rounded-[24px] border border-primary/25 bg-gradient-to-br from-primary-deep/15 via-primary/10 to-surface p-4 shadow-[0_12px_28px_rgba(11,26,47,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_36px_rgba(11,26,47,0.22)]"
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}>
                          <PublicIcon name={icon} className="h-6 w-6" />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-foreground">{label}</p>
                        <p className="mt-1 text-sm leading-6 text-secondary">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 hidden rounded-[28px] border border-border/70 bg-gradient-to-br from-surface via-background to-primary/[0.05] p-5 lg:block">
                    <p className="text-sm font-semibold text-foreground">
                      Operating profile
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-secondary">
                      <span className="rounded-full bg-primary px-3 py-1 font-medium text-white">
                        Manufacturing-led
                      </span>
                      <span className="rounded-full border border-border/70 bg-background px-3 py-1 text-foreground">
                        Stable electrical performance
                      </span>
                      <span className="rounded-full border border-border/70 bg-background px-3 py-1 text-foreground">
                        Professional supply support
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="max-w-2xl">
                  <span className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.05] px-5 py-2 text-sm font-medium text-primary lg:inline-flex">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    Who we are
                  </span>

                  <h2 className="mt-5 text-[32px] font-semibold leading-[1.1] text-foreground lg:text-[48px]">
                    Fujitek Solar Energy is an engineering-led{" "}
                    <span className="highlight text-primary">power electronics manufacturer</span>{" "}
                    shaping dependable solar and EV hardware.
                  </h2>

                  <p className="mt-5 text-[16px] leading-7 text-secondary">
                    We design and manufacture solar inverters, EV chargers, lithium vehicle chargers, and smart PWM charge controllers built for Indian operating conditions and long-term electrical stability.
                  </p>

                  <p className="mt-4 text-[16px] leading-7 text-secondary">
                    Our products are supplied to dealers, distributors, OEM partners, and institutional buyers with a focus on reliability, specification clarity, and scalable execution.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:hidden">
                    {PROFILE_HIGHLIGHTS.map(({ icon, label, detail, iconClass }) => (
                      <div
                        key={label}
                        className="rounded-[24px] border border-primary/25 bg-gradient-to-br from-primary-deep/15 via-primary/10 to-surface p-4 shadow-[0_12px_28px_rgba(11,26,47,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_36px_rgba(11,26,47,0.22)]"
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}>
                          <PublicIcon name={icon} className="h-6 w-6" />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-foreground">{label}</p>
                        <p className="mt-1 text-sm leading-6 text-secondary">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[28px] border border-border/70 bg-gradient-to-br from-surface via-background to-primary/[0.05] p-5 lg:hidden">
                    <p className="text-sm font-semibold text-foreground">
                      Operating profile
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-secondary">
                      <span className="rounded-full bg-primary px-3 py-1 font-medium text-white">
                        Manufacturing-led
                      </span>
                      <span className="rounded-full border border-border/70 bg-background px-3 py-1 text-foreground">
                        Stable electrical performance
                      </span>
                      <span className="rounded-full border border-border/70 bg-background px-3 py-1 text-foreground">
                        Professional supply support
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {OPERATIONAL_PILLARS.map((pillar) => (
                      <div
                        key={pillar}
                        className="rounded-2xl border border-accent/20 bg-gradient-to-br from-primary/[0.08] via-background to-accent/[0.06] px-4 py-4 shadow-[0_12px_26px_rgba(14,35,66,0.14)]"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
                          <p className="text-sm leading-6 text-secondary">{pillar}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </ScrollReveal>
            </div>
          </section>

          <section className="mb-section overflow-hidden rounded-[36px] border border-border/70 bg-background shadow-soft">
            <div className="px-6 py-8 lg:px-8 lg:py-10">
              <SectionLead
                eyebrow="Mission & Vision"
                title={
                  <>
                    Reliable engineering with a clearer path from product thinking to{" "}
                    <span className="highlight text-primary">long-term manufacturing trust</span>
                  </>
                }
                description="Fujitek Solar Energy builds solar and EV power electronics with practical engineering choices, repeatable quality, and supply execution that scales."
              />

              <div className="mt-10 grid gap-5 xl:grid-cols-[1fr_1fr_0.92fr]">
                <ScrollReveal>
                  <article className="relative h-full overflow-hidden rounded-[30px] border border-primary/50 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 p-7 shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary/80" />
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(15,23,42,0.12)]">
                          Our Mission
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                          <PublicIcon name="shield" className="h-6 w-6" />
                        </div>
                      </div>
                    <p className="mt-6 text-base leading-7 text-foreground">
                      Deliver high-performance power electronics that strengthen renewable energy and electric mobility infrastructure.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-secondary">
                      Product reliability, controlled specifications, and scalable execution define how we approach each category.
                    </p>
                  </article>
                </ScrollReveal>

                <ScrollReveal delay={0.08}>
                  <article className="relative h-full overflow-hidden rounded-[30px] border border-accent/50 bg-gradient-to-br from-accent/20 via-accent/15 to-accent/10 p-7 shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-accent/70" />
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(15,23,42,0.12)]">
                          Our Vision
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
                          <PublicIcon name="sun" className="h-6 w-6" />
                        </div>
                      </div>
                    <p className="mt-6 text-base leading-7 text-foreground">
                      Become a trusted national brand in solar and EV power electronics manufacturing through innovation, quality standards, and strong dealer partnerships.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-secondary">
                      Growth comes from consistency in field performance, better supply support, and long-term channel confidence.
                    </p>
                  </article>
                </ScrollReveal>

                <ScrollReveal delay={0.14}>
                  <div className="rounded-[30px] border border-border/70 bg-surface p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      How we build trust
                    </p>
                    <p className="mt-3 text-sm leading-7 text-secondary">
                      Structured product development, practical engineering decisions, and steady supply support define how Fujitek grows.
                    </p>

                    <div className="mt-6 space-y-3">
                      {EXECUTION_SIGNALS.map((signal) => (
                        <div
                          key={signal}
                          className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm font-medium text-foreground"
                        >
                          {signal}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          <section className="relative mb-section overflow-hidden rounded-[36px] border border-border/70 bg-gradient-to-br from-background via-surface to-background px-6 py-8 shadow-soft lg:px-8 lg:py-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />

            <div className="relative">
              <SectionLead
                eyebrow="Growth Timeline"
                title={
                  <>
                    A steady expansion from product foundation to{" "}
                    <Highlighter
                      action="underline"
                      color="var(--accent)"
                      strokeWidth={2}
                      animationDuration={700}
                      iterations={1}
                    >
                      national supply capability
                    </Highlighter>
                  </>
                }
                description="Key stages in building a dependable manufacturing-driven energy brand."
                align="center"
              />
            </div>

            <div className="relative mt-12">
              <div className="pointer-events-none absolute left-10 right-10 top-6 hidden h-px bg-gradient-to-r from-primary/20 via-primary/35 to-accent/30 xl:block" />

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {JOURNEY.map((item, index) => (
                  <ScrollReveal key={item.year} delay={index * 0.06}>
                    <Card className="group relative h-full overflow-hidden rounded-[28px] border border-border/70 bg-background/90 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
                      <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${item.accentClass}`} />
                      <CardContent className="relative p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="inline-flex rounded-full border border-primary/15 bg-background px-3 py-1 text-xs font-semibold text-primary">
                              {item.year}
                            </span>
                            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary/80">
                              Milestone 0{index + 1}
                            </p>
                          </div>
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
                            <PublicIcon name={item.icon} className="h-6 w-6" />
                          </span>
                        </div>

                        <h3 className="mt-10 text-xl font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-secondary">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-section overflow-hidden rounded-[36px] border border-border/70 bg-background shadow-soft">
            <div className="px-6 py-8 lg:px-8 lg:py-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SectionLead
                  eyebrow="Impact Snapshot"
                  title={
                    <>
                      Reliable hardware with{" "}
                      <Highlighter
                        action="underline"
                        color="var(--accent)"
                        strokeWidth={2}
                        animationDuration={700}
                        iterations={1}
                      >
                        measurable field impact
                      </Highlighter>
                    </>
                  }
                  description="Fujitek contributes to India's renewable energy ecosystem through durable hardware, organized supply support, and products built for practical deployment environments."
                />

                <div className="flex flex-wrap gap-3 text-sm">
                  {IMPACT_SIGNALS.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-primary/10 bg-surface px-3 py-1.5 font-medium text-foreground shadow-sm"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <ScrollReveal delay={0.06}>
                  <Card className="group relative h-full min-h-[220px] overflow-hidden rounded-[30px] border border-primary/20 bg-gradient-to-b from-primary/[0.05] to-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-primary" />
                    <CardContent className="relative flex h-full flex-col justify-between p-7 sm:p-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/95">
                          {stats[0].label}
                        </p>
                        <p className="mt-4 text-5xl font-extrabold leading-none text-foreground sm:text-6xl">
                          <NumberTicker value={stats[0].value} className="!text-foreground" />
                          <span>{stats[0].suffix}</span>
                        </p>
                      </div>
                      <p className="mt-6 text-base leading-8 text-secondary">
                        {stats[0].detail}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                <ScrollReveal delay={0.12}>
                  <Card className="group relative h-full min-h-[220px] overflow-hidden rounded-[30px] border border-primary/15 bg-gradient-to-b from-primary/[0.03] to-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-primary/65" />
                    <CardContent className="relative flex h-full flex-col justify-between p-7 sm:p-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/95">
                          {stats[1].label}
                        </p>
                        <p className="mt-4 text-5xl font-extrabold leading-none text-foreground">
                          <NumberTicker value={stats[1].value} className="!text-foreground" />
                          <span>{stats[1].suffix}</span>
                        </p>
                      </div>
                      <p className="mt-6 text-base leading-8 text-secondary">
                        {stats[1].detail}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                <ScrollReveal delay={0.18}>
                  <Card className="group relative h-full min-h-[220px] overflow-hidden rounded-[30px] border border-accent/40 bg-gradient-to-b from-accent/[0.08] to-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-accent" />
                    <CardContent className="relative flex h-full flex-col justify-between p-7 sm:p-8">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/95">
                          {stats[2].label}
                        </p>
                        <p className="mt-4 text-5xl font-extrabold leading-none text-foreground">
                          <NumberTicker value={stats[2].value} className="!text-foreground" />
                          <span className="ml-1">{stats[2].suffix}</span>
                        </p>
                      </div>
                      <p className="mt-6 text-base leading-8 text-secondary">
                        {stats[2].detail}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </section>

          <section className="mb-section overflow-hidden rounded-[36px] border border-border/70 bg-background px-6 py-8 shadow-soft lg:px-8 lg:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionLead
                eyebrow="What Guides Us"
                title={
                  <>
                    Values that keep our engineering and partnerships{" "}
                    <Highlighter
                      action="underline"
                      color="var(--brand)"
                      strokeWidth={2}
                      animationDuration={700}
                      iterations={1}
                    >
                      future-ready
                    </Highlighter>
                  </>
                }
                description="The principles guiding our manufacturing standards, product decisions, and long-term dealer relationships."
              />

              <div className="flex flex-wrap gap-3 text-sm text-secondary">
                <span className="rounded-full bg-primary px-3 py-1 font-medium text-white">
                  4 foundational values
                </span>
                <span className="rounded-full border border-border/70 bg-surface px-3 py-1">
                  Manufacturing discipline
                </span>
                <span className="rounded-full border border-border/70 bg-surface px-3 py-1">
                  Long-term partnerships
                </span>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {values.map(({ icon, title, description, iconClass, surfaceClass, glowClass }, index) => (
                <ScrollReveal key={title} delay={index * 0.06}>
                  <Card className="group relative h-full overflow-hidden rounded-[30px] border border-border/70 bg-surface shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-medium">
                    <div className={`pointer-events-none absolute -right-8 top-6 h-24 w-24 rounded-full blur-3xl ${glowClass}`} />
                    <CardContent className="relative flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-border/40 ${iconClass}`}>
                          <PublicIcon name={icon} className="h-7 w-7" />
                        </div>
                        <span className="text-xs font-semibold tracking-[0.18em] text-secondary/70">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-10 text-2xl font-semibold leading-tight text-foreground">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-secondary">{description}</p>

                      <div className="mt-auto pt-8">
                        <div className={`h-[3px] w-16 rounded-full bg-gradient-to-r ${surfaceClass}`} />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>

        <ScrollReveal delay={0.12}>
          <FinalCTA
            heading="Partner with Fujitek Solar Energy"
            supportingText="Reliable solar inverters, EV chargers, and renewable energy power electronics built for performance and scale."
            ctaLabel="Contact Sales"
            ctaHref="/contact"
            ariaLabel="About page call to action"
            panelClassName="bg-gradient-to-br from-primary via-primary-hover to-primary-deep"
          />
        </ScrollReveal>
      </section>
    </div>
  );
}
