import Link from "next/link";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardTitle,
  Button,
} from "@/components/ui";
import {
  Leaf,
  Star,
  Handshake,
  Rocket,
  TrendingUp,
} from "lucide-react";
import MissionLottie from "@/components/MissionLottie";
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
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-section">

        {/* ================= MISSION ================= */}
        <section className="mb-section grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <ScrollReveal>
            <Card className="border-border bg-background shadow-sm">
              <CardContent className="p-8">
                <div className="mb-4 h-1 w-16 rounded-full bg-primary" />
                <h2 className="mb-4 text-3xl text-strong text-foreground">
                  <Highlighter action="underline" color="var(--accent)" strokeWidth={2} animationDuration={700} iterations={1}>
                    Our Mission
                  </Highlighter>
                </h2>
                <p className="mb-4 leading-relaxed text-secondary">
                  At Fujitek Solar Energy, we are committed to making renewable
                  energy accessible and affordable for everyone.
                </p>
                <p className="leading-relaxed text-secondary">
                  We help businesses and homeowners transition to clean, reliable,
                  and future-ready solar power systems.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <MissionLottie />
          </ScrollReveal>
        </section>

        {/* ================= JOURNEY ================= */}
        <section className="mb-section relative">
          <h2 className="mb-20 text-center text-3xl text-strong text-foreground">
            <Highlighter action="underline" color="var(--accent)" strokeWidth={2} animationDuration={700} iterations={1}>
              Our Journey
            </Highlighter>
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-navy/30 md:block" />

            <div className="space-y-20">
              {JOURNEY.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.year}
                    className="relative grid grid-cols-1 gap-10 md:grid-cols-2"
                  >
                    <div
                      className={`${
                        isLeft
                          ? "md:pr-20 md:text-right"
                          : "md:pl-20 md:col-start-2"
                      }`}
                    >
                      <Card
                        className={`
                          inline-block max-w-md
                          ${isLeft ? "bg-background/90" : "bg-surface"}
                          border-border/60
                          transition-all duration-300
                          hover:-translate-y-1
                          hover:shadow-[0_12px_30px_rgba(2,6,23,0.12)]
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

                    <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 md:flex">
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
            <Card className="group relative h-full overflow-hidden border-primary/35 bg-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.32)]">
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
            <Card className="group relative h-full overflow-hidden border-primary/25 bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(14,116,144,0.14)]">
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
            <Card className="group relative h-full overflow-hidden border-accent/35 bg-accent/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(13,148,136,0.15)] md:col-span-2">
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

