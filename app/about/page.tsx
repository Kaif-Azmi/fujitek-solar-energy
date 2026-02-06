'use client';

import Link from "next/link";
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
    { value: "500+", label: "Projects Completed" },
    { value: "10K+", label: "Happy Customers" },
    { value: "5MWh", label: "Energy Generated" },
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

      {/* ================= HERO ================= */}
      <header className="relative overflow-hidden bg-navy py-section">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-primary/40" />
        <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            About Fujitek Solar Energy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90">
            Driving India’s transition to sustainable and intelligent solar
            energy solutions.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-section">

        {/* ================= MISSION ================= */}
        <section className="mb-section grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <Card className="border-border bg-background shadow-sm">
            <CardContent className="p-8">
              <div className="mb-4 h-1 w-16 rounded-full bg-primary" />
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Our Mission
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

          <MissionLottie />
        </section>

        {/* ================= JOURNEY ================= */}
        <section className="mb-section relative">
          <h2 className="mb-20 text-center text-3xl font-bold text-foreground">
            Our Journey
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-navy/40 to-transparent md:block" />

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
        <section className="mb-section grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-navy border-navy-muted">
              <CardContent className="p-8 text-center">
                <p className="mb-2 text-4xl font-extrabold text-accent">
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-wide --text-primary">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* ================= VALUES ================= */}
        <section className="mb-section">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="transition hover:-translate-y-1 hover:shadow-lg">
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
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <Card className="overflow-hidden border-primary">
          <div className="relative flex min-h-[240px] flex-col items-center justify-center gap-5 p-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-primary to-black/40" />

            <h3 className="relative text-2xl font-extrabold text-white">
              Join the Solar Revolution
            </h3>

            <p className="relative max-w-md text-base text-white/90">
              Let’s build a cleaner, smarter, and more sustainable future together.
            </p>

            <Link href="/contact" className="relative">
              <Button variant="inverse" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
