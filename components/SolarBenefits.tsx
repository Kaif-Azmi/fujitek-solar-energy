"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Highlighter } from "@/components/ui/highlighter";
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";

type Benefit = {
  title: string;
  description: string;
  icon: PublicIconName;
};

type BenefitText = {
  title: string;
  description: string;
};

type SolarBenefitsCopy = {
  badge: string;
  heading: string;
  description: string;
  previewTitle: string;
  previewSubtitle: string;
  previewTag: string;
  previewCaption: string;
  paybackValue: string;
  paybackLabel: string;
  lifespanValue: string;
  lifespanLabel: string;
};

const DEFAULT_BENEFITS: Benefit[] = [
  {
    title: "Lower monthly bills",
    description: "Generate power on-site and reduce dependence on utility rates.",
    icon: "savings",
  },
  {
    title: "Subsidy support",
    description: "Leverage central and state incentives to lower setup cost.",
    icon: "support",
  },
  {
    title: "Long-term returns",
    description: "Reliable production and savings over 25+ years of operation.",
    icon: "solar-panel",
  },
  {
    title: "Energy resilience",
    description: "Pair with storage to maintain power during outages and peaks.",
    icon: "battery",
  },
  {
    title: "Cleaner footprint",
    description: "Cut emissions while supporting a sustainable energy mix.",
    icon: "sun",
  },
  {
    title: "Low upkeep",
    description: "Durable systems with straightforward servicing and monitoring.",
    icon: "shield",
  },
];

const DEFAULT_COPY: SolarBenefitsCopy = {
  badge: "Why Go Solar",
  heading: "Benefits of Switching to Solar Energy",
  description:
    "Practical gains across savings, reliability, and sustainability for homes and businesses.",
  previewTitle: "Solar impact preview",
  previewSubtitle: "Savings, reliability, and clean-energy value",
  previewTag: "Overview",
  previewCaption: "On-grid, off-grid, and hybrid solar configurations",
  paybackValue: "4-6 yrs",
  paybackLabel: "Typical payback period",
  lifespanValue: "25+ yrs",
  lifespanLabel: "Long-term output life",
};

interface SolarBenefitsProps {
  copy?: SolarBenefitsCopy;
  benefits?: BenefitText[];
}

export default function SolarBenefitsBento({
  copy = DEFAULT_COPY,
  benefits,
}: SolarBenefitsProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isVideoReady) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      // Ignore autoplay restrictions; user can tap again.
    });
  }, [isVideoReady]);

  const mergedBenefits = DEFAULT_BENEFITS.map((item, index) => ({
    ...item,
    title: benefits?.[index]?.title ?? item.title,
    description: benefits?.[index]?.description ?? item.description,
  }));

  const handleVideoToggle = async () => {
    const el = videoRef.current;
    if (!el) return;

    try {
      if (!isVideoReady) {
        setIsVideoReady(true);
        return;
      }
      if (el.paused) {
        await el.play();
        setIsPlaying(true);
      } else {
        el.pause();
        setIsPlaying(false);
      }
    } catch {
      // Ignore autoplay or play errors silently.
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background py-section">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.14]" />
      <div className="pointer-events-none absolute -left-20 top-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary-deep">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {copy.badge}
            </span>

            <h2 className="mt-5 text-[2.1rem] font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-[2.85rem]">
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                {copy.heading}
              </Highlighter>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-secondary sm:text-lg">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 lg:max-w-sm lg:justify-end">
            <span className="rounded-full border border-primary/15 bg-white/85 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-deep shadow-sm">
              Savings first
            </span>
            <span className="rounded-full border border-primary/15 bg-white/85 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-deep shadow-sm">
              Long-life systems
            </span>
            <span className="rounded-full border border-primary/15 bg-white/85 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary-deep shadow-sm">
              Backup ready
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[2rem] border border-border/70 bg-white/92 p-6 shadow-[0_26px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">
            <div className="grid min-h-[560px] gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.55fr)]">
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-3 rounded-[1.6rem] border border-border/70 bg-gradient-to-br from-surface-elevated to-primary-soft/30 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/15">
                      <PublicIcon name="sun" className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{copy.previewTitle}</p>
                      <p className="mt-1 text-sm leading-6 text-secondary">{copy.previewSubtitle}</p>
                    </div>
                  </div>

                  <span className="rounded-full border border-primary/15 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {copy.previewTag}
                  </span>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-[1.8rem] bg-white shadow-sm">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/[0.08] to-transparent" />

                  <div className="relative h-full p-5 sm:p-6">
                    <div className="relative h-full overflow-hidden rounded-[1.4rem] bg-surface p-0">
                      <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-[1.1rem] sm:min-h-[320px]">
                        {!isPlaying && (
                          <>
                            <div className="absolute inset-0 z-10 bg-primary/20" />
                            <div className="absolute inset-0 z-20 grid place-items-center text-center text-white">
                              <div className="space-y-2 px-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
                                  Solar System Types
                                </p>
                                <p className="text-lg font-semibold text-white">
                                  On-grid, off-grid, and hybrid
                                </p>
                                <p className="text-sm text-white/85">
                                  Tap to preview the differences in one quick clip.
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        <video
                          ref={videoRef}
                          className={[
                            "absolute inset-0 h-full w-full object-contain transition-opacity duration-300",
                            isPlaying ? "opacity-100" : "opacity-0",
                          ].join(" ")}
                          preload="none"
                          muted
                          playsInline
                          aria-label="On-grid, off-grid, and hybrid solar system types"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          onEnded={() => setIsPlaying(false)}
                          onClick={handleVideoToggle}
                        >
                          {isVideoReady && (
                            <source
                              src="/videos/solar_system_types_ongrid_offgrid_hybrid.mp4"
                              type="video/mp4"
                            />
                          )}
                          Your browser does not support the video tag.
                        </video>

                        {!isPlaying && (
                          <button
                            type="button"
                            onClick={handleVideoToggle}
                            className="absolute inset-0 z-30 flex items-center justify-center bg-black/5 text-white transition hover:bg-black/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                            aria-label="Play solar system types video"
                          >
                            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-white/15 text-white shadow-lg backdrop-blur">
                              ▶
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium text-primary-deep">
                        Off-grid
                      </span>
                      <span className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium text-primary-deep">
                        On-grid
                      </span>
                      <span className="rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium text-primary-deep">
                        Hybrid
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.6rem] border border-primary/20 bg-primary-deep p-5 text-white shadow-[0_20px_55px_rgba(8,23,43,0.22)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    Payback window
                  </p>
                  <p className="mt-3 text-[2rem] font-extrabold leading-none tracking-tight">
                    {copy.paybackValue}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/78">{copy.paybackLabel}</p>
                </div>

                <div className="rounded-[1.6rem] border border-accent/35 bg-accent p-5 text-primary-deep shadow-[0_18px_45px_rgba(99,176,92,0.18)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary-deep/70">
                    System lifespan
                  </p>
                  <p className="mt-3 text-[2rem] font-extrabold leading-none tracking-tight">
                    {copy.lifespanValue}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-primary-deep/80">{copy.lifespanLabel}</p>
                </div>

                <div className="rounded-[1.6rem] border border-border/70 bg-gradient-to-br from-surface-elevated to-primary-soft/35 p-5 shadow-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    Best fit
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-tight text-foreground">
                    Homes, commercial rooftops, and backup-ready systems.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-secondary">
                    Works across grid-tied and storage-supported use cases with practical long-term savings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mergedBenefits.map((benefit, index) => {
              const iconName = benefit.icon;
              const isPrimary = index === 0 || index === 2 || index === 4;

              return (
                <article
                  key={benefit.title}
                  className={[
                    "group relative overflow-hidden rounded-[1.75rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-medium",
                    isPrimary
                      ? "border-primary/25 bg-primary-deep text-white shadow-[0_20px_55px_rgba(8,23,43,0.18)]"
                      : "border-accent/40 bg-accent text-primary-deep shadow-[0_18px_45px_rgba(99,176,92,0.18)]",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                      className={[
                        "absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl",
                        isPrimary ? "bg-accent/20" : "bg-primary/15",
                      ].join(" ")}
                    />
                  </div>

                  <div className="relative">
                    <div
                      className={[
                        "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                        isPrimary ? "bg-white/12 text-accent" : "bg-white/55 text-primary",
                      ].join(" ")}
                    >
                      <PublicIcon name={iconName} className="h-6 w-6" />
                    </div>

                    <h3
                      className={[
                        "max-w-[12rem] text-[1.15rem] font-bold leading-[1.2] tracking-tight",
                        isPrimary ? "text-white" : "text-primary-deep",
                      ].join(" ")}
                    >
                      {benefit.title}
                    </h3>

                    <p
                      className={[
                        "mt-3 max-w-[16rem] text-sm leading-7",
                        isPrimary ? "text-white/82" : "text-primary-deep/82",
                      ].join(" ")}
                    >
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
