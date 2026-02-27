import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui";
import {
  Leaf,
  Star,
  Handshake,
  Rocket,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FinalCTA from "@/components/FinalCTA";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Highlighter } from "@/components/ui/highlighter";
import { buildPageMetadata, pageSeo } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.about);

/* ================= JOURNEY DATA ================= */
const JOURNEY = [
  {
    year: "2015",
    title: "Foundation",
    icon: Leaf,
    description:
      "Fujitek Solar Energy was established with a focus on manufacturing reliable renewable energy power electronics for Indian conditions.",
  },
  {
    year: "2017",
    title: "Product Development",
    icon: Handshake,
    description:
      "Expanded our inverter portfolio to include on-grid, off-grid, and hybrid systems designed for voltage stability and operational durability.",
  },
  {
    year: "2021",
    title: "EV Charging Expansion",
    icon: TrendingUp,
    description:
      "Introduced lithium e-rickshaw chargers and electric scooty chargers to support India's electric mobility growth.",
  },
  {
    year: "2023",
    title: "Dealer & OEM Network",
    icon: Rocket,
    description:
      "Strengthened pan-India dealer partnerships and bulk supply capability for distributors and institutional buyers.",
  },
];

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
      icon: Leaf,
      title: "Sustainability",
      description: "Engineering products that enable cleaner and smarter energy adoption.",
      iconClass: "bg-primary/12 text-primary",
      surfaceClass: "from-primary/10 via-transparent to-transparent",
    },
    {
      icon: Star,
      title: "Engineering Quality",
      description: "Durable hardware built for Indian voltage and climate conditions.",
      iconClass: "bg-accent/18 text-primary",
      surfaceClass: "from-accent/25 via-transparent to-transparent",
    },
    {
      icon: Handshake,
      title: "Trust & Transparency",
      description: "Clear specifications and dependable dealer partnerships.",
      iconClass: "bg-navy/12 text-primary",
      surfaceClass: "from-navy/10 via-transparent to-transparent",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Continuous improvement in power electronics and EV charging systems.",
      iconClass: "bg-primary/10 text-primary",
      surfaceClass: "from-primary/20 via-transparent to-transparent",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <HeroSection
        badge="ABOUT US"
        title="About Fujitek Solar Energy"
        highlight="Powering India with Reliable Energy Hardware"
        description="Manufacturer of solar inverters, EV chargers, smart charge controllers, and renewable energy power electronics."
      />

      <section className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-section">

        {/* ================= COMPANY PROFILE ================= */}
        <section className="mb-section rounded-[28px] border border-border/70 bg-background px-6 py-8 shadow-sm lg:py-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <ScrollReveal className="lg:self-center">
              <div className="relative max-w-[560px] lg:my-auto">
                <div className="relative aspect-[1/1] overflow-hidden rounded-[18px]">
                  <Image
                    src="/solar_engineer.webp"
                    alt="Fujitek Solar engineering and manufacturing operations"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) calc(100vw - 3rem), 560px"
                    quality={72}
                  />
                </div>

                <Link
                  href="/products"
                  aria-label="Go to products page"
                  className="group absolute -bottom-5 -right-5 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-lg transition-all duration-500 ease-out hover:scale-[1.06] hover:shadow-xl lg:h-28 lg:w-28"
                >
                  <div className="absolute inset-0 rounded-full border border-white/35" />
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-inner">
                    <span
                      className="ml-0.5 block h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-primary"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div>
                <span className="inline-flex rounded-full border border-primary/45 px-6 py-2 text-sm font-medium text-primary">
                  Who we are
                </span>

                <h2 className="mt-5 max-w-2xl text-[32px] font-semibold leading-[1.18] text-foreground lg:text-[42px]">
                  Fujitek Solar Energy is an engineering-led{" "}
                  <span className="highlight text-primary">power electronics manufacturer</span>{" "}
                  focused on renewable energy and EV charging hardware.
                </h2>

                <p className="mt-5 max-w-2xl text-[16px] leading-7 text-secondary">
                  We design and manufacture solar inverters, EV chargers, lithium vehicle chargers, and smart PWM charge controllers built for Indian operating conditions and long-term electrical stability.
                </p>

                <p className="mt-4 max-w-2xl text-[16px] leading-7 text-secondary">
                  Our products are supplied to dealers, distributors, OEM partners, and institutional buyers with a focus on performance reliability and scalable supply capability.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ================= MISSION VISION ================= */}
        <section className="mb-section rounded-[28px] border border-border/70 bg-background px-6 py-8 shadow-sm lg:py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1.9fr] lg:items-center">
            <ScrollReveal>
              <div className="max-w-[26rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Mission & Vision
                </p>
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.16] text-foreground lg:text-[44px]">
                  Reliable engineering,{" "}
                  <span className="highlight text-primary">scalable manufacturing</span>{" "}
                  for India’s growing energy demand.
                </h2>
                <p className="mt-5 max-w-[24rem] text-[16px] leading-7 text-secondary">
                  Fujitek Solar Energy manufactures dependable solar and EV power electronics solutions for long-term performance.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid max-w-[920px] grid-cols-1 gap-6 xl:grid-cols-2">
              <ScrollReveal delay={0.06}>
                <article className="relative mx-auto min-h-[280px] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-primary/40 bg-primary p-7 text-white shadow-md">
                  <div className="inline-flex rounded-full bg-white/18 px-5 py-2 text-base font-medium text-white">
                    Our Mission
                  </div>
                  <p className="mt-6 text-[16px] leading-7 text-white/95">
                    Deliver high-performance power electronics that strengthen renewable energy and electric mobility infrastructure.
                  </p>
                  <div className="absolute right-2 top-2 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/25 text-accent">
                    <Target className="h-9 w-9" />
                  </div>
                </article>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <article className="relative mx-auto min-h-[280px] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-border/70 bg-background p-7 shadow-sm">
                  <div className="inline-flex rounded-full bg-primary/10 px-5 py-2 text-base font-medium text-primary">
                    Our Vision
                  </div>
                  <p className="mt-6 text-[16px] leading-7 text-secondary">
                    Become a trusted national brand in solar and EV power electronics manufacturing through innovation, quality standards, and strong dealer partnerships.
                  </p>
                  <div className="absolute -right-3 -top-3 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/25 text-accent">
                    <Lightbulb className="h-9 w-9" />
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>
                {/* ================= JOURNEY ================= */}
        <section className="mb-section relative">
          <h2 className="mb-14 text-center text-3xl text-strong text-foreground">
            <Highlighter action="underline" color="var(--accent)" strokeWidth={2} animationDuration={700} iterations={1}>
              Our Journey
            </Highlighter>
          </h2>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-px bg-navy/30 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {JOURNEY.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;

                const journeyCard = (
                  <Card
                    className={`
                      w-full
                      ${isLeft ? "bg-background/90" : "bg-surface"}
                      border-border/60
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:shadow-lg
                    `}
                  >
                    <CardContent className="p-7">
                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {item.year}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-secondary">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                );

                return (
                  <div key={item.year} className="relative pl-12 md:pl-0">
                    <div className="absolute left-0 top-6 flex md:hidden">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background ring-2 ring-primary/30 shadow-md">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6">
                      <div className={isLeft ? "md:pr-6 md:text-right" : "hidden md:block"}>
                        {isLeft ? journeyCard : null}
                      </div>

                      <div className="hidden md:flex md:justify-center md:pt-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background ring-2 ring-primary/30 shadow-md">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className={isLeft ? "hidden md:block" : "md:pl-6"}>
                        {isLeft ? null : journeyCard}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="mb-section">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Impact Snapshot
            </p>
            <h2 className="mt-3 text-3xl text-strong text-foreground">
              Real-World{" "}
              <Highlighter action="underline" color="var(--accent)" strokeWidth={2} animationDuration={700} iterations={1}>
                Energy Impact
              </Highlighter>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-secondary">
              Measurable contribution to India’s renewable energy ecosystem through reliable hardware solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <ScrollReveal delay={0.05} className="lg:col-span-6 lg:row-span-2">
              <Card className="group relative h-full min-h-[280px] overflow-hidden border-primary/35 bg-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/35 via-primary/15 to-accent/10" />
                <CardContent className="relative flex h-full flex-col justify-between p-7 sm:p-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                      {stats[0].label}
                    </p>
                    <p className="mt-4 text-5xl font-extrabold leading-none text-accent sm:text-6xl">
                      <NumberTicker value={stats[0].value} />
                      <span>{stats[0].suffix}</span>
                    </p>
                    <p className="mt-3 max-w-sm text-sm text-white/80">
                      Trusted hardware supply across diverse renewable energy applications.
                    </p>
                  </div>
                  <div className="border-t border-white/15 pt-4">
                    <p className="max-w-sm text-sm leading-relaxed text-white/90">
                      {stats[0].detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="lg:col-span-6">
              <Card className="group relative h-full min-h-[132px] overflow-hidden border-primary/25 bg-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <CardContent className="relative p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {stats[1].label}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold leading-none text-primary">
                    <NumberTicker value={stats[1].value} />
                    <span>{stats[1].suffix}</span>
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-primary/80">
                    {stats[1].detail}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.18} className="lg:col-span-6">
              <Card className="group relative h-full min-h-[132px] overflow-hidden border-accent/35 bg-accent/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <CardContent className="relative p-6 sm:p-7 ">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {stats[2].label}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold leading-none text-primary">
                    <NumberTicker value={stats[2].value} />
                    <span className="ml-1">{stats[2].suffix}</span>
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-primary/80">
                    {stats[2].detail}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="mb-section">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl text-strong text-foreground sm:text-4xl">
              Our{" "}
              <Highlighter action="underline" color="var(--primary)" strokeWidth={2} animationDuration={700} iterations={1}>
                Core Values
              </Highlighter>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-secondary">
              The principles guiding our engineering, manufacturing standards, and long-term partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description, iconClass, surfaceClass }, index) => (
              <ScrollReveal key={title} delay={index * 0.06}>
                <Card className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-background shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-medium">
                  <div className={`pointer-events-none absolute inset-x-6 top-0 h-[3px] rounded-full bg-gradient-to-r ${surfaceClass}`} />
                  <CardContent className="relative p-6 text-center">
                    <div className={`mb-5 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border/40 ${iconClass}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="mb-2.5 text-3xl font-semibold leading-tight text-foreground">
                      {title}
                    </CardTitle>
                    <p className="text-sm leading-6 text-secondary">{description}</p>
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
          />
        </ScrollReveal>

      </section>
    </div>
  );
}