"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { PublicIcon } from "@/components/ui/icons";
import { useTranslation } from "@/components/i18n-provider";
import { withLocalePath } from "@/lib/i18n";

const VIDEO_SRC = "/videos/Solar_Energy_Empowers_Indian_Homes.mp4";
const POSTER_SRC = "/images/solar_panels.webp";

export default function MarketingVideoSection() {
  const { locale, t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isVideoReady) return;
    const el = videoRef.current;
    if (!el) return;
    // Only start playback after user intent to avoid any initial download.
    el.play().catch(() => {
      // Ignore play failures (browser policies or user gesture requirements).
    });
  }, [isVideoReady]);

  const contactHref = withLocalePath(locale, "/contact");
  const servicesHref = withLocalePath(locale, "/services");

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-background to-background py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-[0.16]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] bottom-[-4rem] h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto max-w-[80rem] px-6">
        {/* Content Section - Text, Video, Cards */}
        <div className="space-y-6 text-center">
          <span className="mx-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            {t("home.video.badge")}
          </span>

          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
            <Highlighter
              action="underline"
              color="var(--accent)"
              strokeWidth={2}
              animationDuration={700}
              iterations={1}
            >
              {t("home.video.headlineHighlight")}
            </Highlighter>{" "}
            {t("home.video.headlineRest")}
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-7 text-secondary sm:text-lg">
            {t("home.video.description")}
          </p>

          <div className="pt-2">
            <div className="mx-auto max-w-4xl">
              <div className="group rounded-[1.75rem] bg-gradient-to-br from-[var(--accent)]/30 via-transparent to-primary/20 p-[1px] shadow-[0_20px_48px_rgba(15,23,42,0.16)]">
                <div className="rounded-[calc(1.75rem-1px)] bg-white/85 p-2 backdrop-blur">
                  <div className="relative aspect-video overflow-hidden rounded-[1.4rem] border border-border/60 bg-surface ring-1 ring-black/5">
                    {!isVideoReady ? (
                      <>
                        <Image
                          src={POSTER_SRC}
                          alt={t("home.video.posterAlt")}
                          fill
                          sizes="(min-width: 1024px) 56rem, 100vw"
                          quality={72}
                          loading="lazy"
                          decoding="async"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <button
                          type="button"
                          onClick={() => setIsVideoReady(true)}
                          className="absolute inset-0 flex items-center justify-center bg-black/15 text-white transition hover:bg-black/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          aria-label={t("home.video.playLabel")}
                        >
                          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/70 bg-white/20 text-lg font-semibold shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-105">
                            ▶
                          </span>
                        </button>
                      </>
                    ) : (
                      <video
                        ref={videoRef}
                        className="h-full w-full object-cover"
                        poster={POSTER_SRC}
                        preload="metadata"
                        playsInline
                        controls={hasStarted}
                        onPlay={() => setHasStarted(true)}
                        aria-label={t("home.video.videoLabel")}
                      >
                        <source src={VIDEO_SRC} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "savings", label: t("home.video.feature1") },
              { icon: "battery", label: t("home.video.feature2") },
              { icon: "sun", label: t("home.video.feature3") },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <PublicIcon name={item.icon as "savings" | "battery" | "sun"} className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="explore" size="lg">
              <Link href={contactHref}>{t("home.video.ctaPrimary")}</Link>
            </Button>
            <Link
              href={servicesHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-hover"
            >
              {t("home.video.ctaSecondary")}
              <span aria-hidden className="text-base">{">"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
