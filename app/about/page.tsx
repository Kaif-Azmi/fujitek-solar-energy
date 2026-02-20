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
    title: "Foundational Roots",
    icon: Leaf,
    description:
      "We began with a vision to empower rural India through affordable and sustainable solar-powered agricultural solutions.",
  },
  {
    year: "2017",
    title: "Building Credibility",
    icon: Handshake,
    description:
      "Through consistent performance and service excellence, we earned trust across diverse regions and communities.",
  },
  {
    year: "2021",
    title: "Strategic Partnerships",
    icon: TrendingUp,
    description:
      "Collaborations with initiatives like MSKVY and PM Suryaghar Yojana helped accelerate solar adoption at scale.",
  },
  {
    year: "2023",
    title: "Technological Evolution",
    icon: Rocket,
    description:
      "Advanced monitoring systems, intelligent energy solutions, and optimized infrastructure defined this phase.",
  },
];

export default function About() {
  const stats = [
    {
      value: 500,
      suffix: "+",
      label: "Projects Completed",
      detail: "Across residential, commercial, and institutional sites.",
    },
    {
      value: 10,
      suffix: "K+",
      label: "Happy Customers",
      detail: "Supported by responsive service and long-term maintenance.",
    },
    {
      value: 5,
      suffix: "MWh",
      label: "Energy Generated",
      detail: "Clean energy output enabled through reliable solar systems.",
    },
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to environmental protection",
    },
    {
      icon: Star,
      title: "Quality",
      description: "Best materials and workmanship",
    },
    {
      icon: Handshake,
      title: "Integrity",
      description: "Transparent and honest dealings",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Latest technology and solutions",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <HeroSection
        badge="ABOUT US"
        title="About Fujitek Solar Energy"
        highlight="Driven by Clean Energy Innovation"
        description="Driving India’s transition to sustainable and intelligent solar energy solutions."
      />

      <section className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-3 py-section sm:px-4 md:px-5">

        {/* ================= EXECUTION ASSURANCE ================= */}
        <section className="mb-section rounded-[28px] border border-border/70 bg-background px-3 py-8 shadow-sm sm:px-4 md:px-5 lg:py-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <ScrollReveal className="lg:self-center">
              <div className="relative max-w-[560px] lg:my-auto">
                <div className="relative aspect-[1/1] overflow-hidden rounded-[18px]">
                  <Image
                    src="/solar_engineer.jpg"
                    alt="Fujitek engineering team reviewing rooftop solar execution plan"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>

                <Link
                  href="/service"
                  aria-label="Go to services page"
                  className="group absolute -bottom-5 -right-5 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-lg transition-all duration-500 ease-out hover:scale-[1.06] hover:shadow-xl lg:h-28 lg:w-28"
                >
                  <div className="absolute inset-0 rounded-full border border-white/35" />
                  <div className="relative z-10 h-[84%] w-[84%] animate-[spin_12s_linear_infinite] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      <defs>
                        <path
                          id="services-ring"
                          d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
                        />
                      </defs>
                      <text
                        className="fill-white/90 text-[8px] font-semibold tracking-[3px]"
                        dominantBaseline="middle"
                      >
                        <textPath href="#services-ring" startOffset="0%">
                          SERVICES • SERVICES • SERVICES •
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent shadow-inner transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-md lg:h-10 lg:w-10">
                      <span
                        className="ml-0.5 block h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-primary lg:border-y-[7px] lg:border-l-[11px]"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="pt-1 lg:pt-0">
                <span className="inline-flex rounded-full border border-primary/45 px-6 py-2 text-sm font-medium text-primary">
                  Who we are
                </span>

                <h2 className="mt-5 max-w-2xl text-[32px] font-semibold leading-[1.18] tracking-[-0.015em] text-foreground lg:text-[42px]">
                  Fujitek Solar Energy is a process-driven{" "}
                  <span className="text-primary">solar EPC partner</span> for
                  dependable long-term energy infrastructure.
                </h2>

                <p className="mt-5 max-w-2xl text-[16px] leading-7 text-secondary">
                  We manage the full project lifecycle under one accountable team:
                  technical assessment, system engineering, procurement,
                  installation, commissioning, and post-installation support. This
                  integrated model keeps delivery timelines clear and quality
                  standards consistent.
                </p>

                <p className="mt-4 max-w-2xl text-[16px] leading-7 text-secondary">
                  From homes and commercial buildings to industrial facilities, we
                  align every solution to site conditions, operating load, and
                  compliance needs. The result is reliable system performance and a
                  service relationship built for continuity.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ================= MISSION VISION ================= */}
        <section className="mb-section rounded-[28px] border border-border/70 bg-background px-3 py-8 shadow-sm sm:px-4 md:px-5 lg:py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1.9fr] lg:items-center">
            <ScrollReveal>
              <div className="max-w-[26rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Mission & Vision
                </p>
                <h2 className="mt-4 text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-foreground lg:text-[44px]">
                  We deliver pragmatic,{" "}
                  <span className="text-primary">forward-thinking solutions</span>{" "}
                  built for India&apos;s evolving energy needs.
                </h2>
                <p className="mt-5 max-w-[24rem] text-[16px] leading-7 text-secondary">
                  Fujitek Solar Energy provides process-led solar EPC services for
                  residential, commercial, and industrial projects across India.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid max-w-[920px] grid-cols-1 items-start gap-6 lg:self-start xl:grid-cols-2">
              <ScrollReveal delay={0.06}>
                <article className="relative mx-auto min-h-[280px] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-primary/40 bg-primary p-7 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8">
                  <div className="pointer-events-none absolute right-0 top-0 z-10 h-24 w-24 rounded-bl-[28px] bg-surface lg:h-28 lg:w-28" />

                  <div className="inline-flex rounded-full bg-white/18 px-5 py-2 text-base font-medium text-white backdrop-blur-sm">
                    Our Mission
                  </div>
                  <p className="relative z-10 mt-6 max-w-md pr-10 text-[16px] font-medium leading-7 text-white/95 lg:pr-12">
                    Deliver reliable solar EPC solutions that improve energy
                    efficiency, reduce operating costs, and ensure long-term system
                    performance.
                  </p>

                  <div className="absolute right-2 top-2 z-20 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/25 text-accent shadow-sm lg:h-24 lg:w-24">
                    <Target className="h-9 w-9 lg:h-10 lg:w-10" />
                  </div>
                </article>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <article className="relative mx-auto min-h-[280px] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-border/70 bg-background p-7 text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-8">
                  <div className="inline-flex rounded-full bg-primary/10 px-5 py-2 text-base font-medium text-primary">
                    Our Vision
                  </div>
                  <p className="mt-6 max-w-md text-[16px] font-medium leading-7 text-secondary">
                    Accelerate India&apos;s clean energy transition through dependable
                    solar infrastructure for homes, commercial properties, and
                    industrial facilities.
                  </p>

                  <div className="absolute -right-3 -top-3 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/25 text-accent shadow-sm lg:h-24 lg:w-24">
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

                return (
                  <div
                    key={item.year}
                    className="relative grid grid-cols-1 gap-8 pl-12 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6 md:pl-0"
                  >
                    <div
                      className={`${
                        isLeft
                          ? "md:col-start-1 md:text-right md:pr-6"
                          : "md:col-start-3 md:pl-6"
                      }`}
                    >
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
                    </div>

                    <div className="absolute left-0 top-6 flex md:hidden">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background ring-2 ring-primary/30 shadow-md">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:col-start-2 md:flex md:justify-center md:pt-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background ring-2 ring-primary/30 shadow-md">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                          <Icon className="h-5 w-5" />
                        </div>
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
                Solar Outcomes
              </Highlighter>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:auto-rows-[170px] md:grid-cols-4">
            <ScrollReveal delay={0.05} className="md:col-span-2 md:row-span-2">
            <Card className="group relative h-full overflow-hidden border-primary/35 bg-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/15 to-transparent" />
              <CardContent className="relative flex h-full flex-col justify-between p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    {stats[0].label}
                  </p>
                  <p className="mt-4 text-5xl font-extrabold leading-none text-accent sm:text-6xl">
                    <NumberTicker value={stats[0].value} className="text-accent dark:text-accent" />
                    <span>{stats[0].suffix}</span>
                  </p>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/85">
                  {stats[0].detail}
                </p>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="md:col-span-2">
            <Card className="group relative h-full overflow-hidden border-primary/25 bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/18 via-accent/8 to-transparent" />
              <CardContent className="relative p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {stats[1].label}
                </p>
                <p className="mt-3 text-4xl font-extrabold leading-none text-primary">
                  <NumberTicker value={stats[1].value} className="text-primary dark:text-primary" />
                  <span>{stats[1].suffix}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-primary/80">
                  {stats[1].detail}
                </p>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.18} className="md:col-span-2">
            <Card className="group relative h-full overflow-hidden border-accent/35 bg-accent/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/35 via-accent/15 to-transparent" />
              <CardContent className="relative p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {stats[2].label}
                </p>
                <p className="mt-3 text-4xl font-extrabold leading-none text-primary">
                  <NumberTicker value={stats[2].value} className="text-primary dark:text-primary" />
                  <span className="ml-1">{stats[2].suffix}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-primary/80">
                  {stats[2].detail}
                </p>
              </CardContent>
            </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="mb-section">
          <h2 className="mb-12 text-center text-3xl text-strong text-foreground">
            Our{" "}
            <Highlighter action="underline" color="var(--primary)" strokeWidth={2} animationDuration={700} iterations={1}>
              Core Values
            </Highlighter>
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }, index) => (
              <ScrollReveal key={title} delay={index * 0.06}>
                <Card className="transition hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`
                        mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full
                        ${title === "Sustainability" && "bg-primary/15"}
                        ${title === "Quality" && "bg-accent/20"}
                        ${title === "Integrity" && "bg-navy/15"}
                        ${title === "Innovation" && "bg-primary/10"}
                      `}
                    >
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="mb-2">{title}</CardTitle>
                    <p className="text-sm text-secondary">{description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>

        </div>
      <ScrollReveal delay={0.12}>
        <FinalCTA
          heading="Join the Solar Revolution"
          supportingText="Let’s build a cleaner, smarter, and more sustainable future together with reliable solar systems and expert support."
          ctaLabel="Get Started"
          ctaHref="/contact"
          ariaLabel="About page call to action"
        />
      </ScrollReveal>
      </section>

    </div>
  );
}

