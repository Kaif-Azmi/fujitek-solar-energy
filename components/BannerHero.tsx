'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from "next/link";

interface Banner {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  imageUrl?: string;
  status: string;
}

interface BannerHeroProps {
  ariaLabel?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackCtaLabel?: string;
  fallbackCtaHref?: string;
}

const HERO_DEFAULTS = {
  ariaLabel: "Solar hero banner",
  fallbackTitle: "Sustainable Energy Solutions for Homes and Businesses",
  fallbackSubtitle:
    "Explore reliable solar panels, inverters, and expert services from Fujitek Solar Energy.",
  fallbackCtaLabel: "Explore solar products and services",
  fallbackCtaHref: "/products",
};

export default function BannerHero({
  ariaLabel = HERO_DEFAULTS.ariaLabel,
  fallbackTitle = HERO_DEFAULTS.fallbackTitle,
  fallbackSubtitle = HERO_DEFAULTS.fallbackSubtitle,
  fallbackCtaLabel = HERO_DEFAULTS.fallbackCtaLabel,
  fallbackCtaHref = HERO_DEFAULTS.fallbackCtaHref,
}: BannerHeroProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch('/api/banners');
        const data = await res.json();
        setBanners(
          Array.isArray(data)
            ? data.filter((b: Banner) => b.status === 'Active')
            : []
        );
      } catch {
        setBanners([]);
      }
    }
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1 || isHovered) return;

    const id = setInterval(
      () => setCurrentIndex((p) => (p + 1) % banners.length),
      5000
    );

    return () => clearInterval(id);
  }, [banners, isHovered]);

  /* ================= Skeleton ================= */
  if (!banners.length) {
    return (
      <section className="relative w-full overflow-hidden" aria-label={ariaLabel}>
        <div className="relative h-[20rem] sm:h-[26rem] lg:h-[34rem] bg-primary">
          <div className="absolute inset-0 bg-secondary/50" />
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                  {fallbackTitle}
                </h1>
                <p className="mt-6 text-lg text-white/90">{fallbackSubtitle}</p>
                <div className="mt-10">
                  <Link href={fallbackCtaHref}>
                    <Button variant="explore" size="lg">
                      {fallbackCtaLabel}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const banner = banners[currentIndex];

  return (
    <section className="relative w-full overflow-hidden" aria-label={ariaLabel}>
      <div
        className="relative h-[20rem] sm:h-[26rem] lg:h-[34rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background */}
        {banner.imageUrl ? (
          <Image
            src={banner.imageUrl}
            alt={`${banner.title} banner image`}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}

        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-secondary/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-2xl text-white">

              {/* Badge */}
              <span className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
                Fujitek Solar Energy
              </span>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Sustainable{" "}
                <span className="text-accent">
                  Energy Solutions
                </span>{" "}
                for Tomorrow
              </h1>

              {/* Subtitle */}
              {banner.subtitle && (
                <p className="mt-6 text-lg text-white/90">
                  {banner.subtitle}
                </p>
              )}

              {/* CTA */}
              {banner.ctaText && (
                <div className="mt-10">
                  <Link href="/contact">
                    <Button variant="explore" size="lg">
                      {banner.ctaText}
                    </Button>
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Arrows */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((p) => (p - 1 + banners.length) % banners.length)
              }
              className="
                absolute left-6 top-1/2 z-20 -translate-y-1/2
                flex h-12 w-12 items-center justify-center rounded-full
                bg-black/40 text-white backdrop-blur
                transition hover:bg-black/60
              "
              aria-label="Previous slide"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() =>
                setCurrentIndex((p) => (p + 1) % banners.length)
              }
              className="
                absolute right-6 top-1/2 z-20 -translate-y-1/2
                flex h-12 w-12 items-center justify-center rounded-full
                bg-black/40 text-white backdrop-blur
                transition hover:bg-black/60
              "
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {banners.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {banners.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
