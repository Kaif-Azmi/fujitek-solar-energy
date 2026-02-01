'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Banner {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  imageUrl?: string;
  status: string;
}

export default function BannerHero() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchBanners() {
      const res = await fetch('/api/banners');
      const data = await res.json();
      setBanners(
        Array.isArray(data)
          ? data.filter((b: Banner) => b.status === 'Active')
          : []
      );
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

  if (!banners.length) return null;

  const banner = banners[currentIndex];

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="relative h-[22rem] sm:h-[26rem] lg:h-[32rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background image */}
        {banner.imageUrl ? (
          <Image
            src={banner.imageUrl}
            alt={banner.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-surface" />
        )}

        {/* White overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-white/20" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-2xl">
              {/* Badge */}
              <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Fujitek Solar Energy
              </span>

              {/* Heading */}
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Sustainable{' '}
                <span className="text-primary">Energy Solutions</span>{' '}
                for Tomorrow
              </h1>

              {/* Subtitle */}
              {banner.subtitle && (
                <p className="mt-4 text-base text-secondary sm:text-lg">
                  {banner.subtitle}
                </p>
              )}

              {/* CTA */}
              {banner.ctaText && (
                <div className="mt-8">
                  <Button size="lg" className="gap-3">
                    {banner.ctaText}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy text-lg">
                      ↗
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex((p) => (p - 1 + banners.length) % banners.length)
              }
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2
                         flex h-12 w-12 items-center justify-center rounded-full
                         bg-white/90 text-xl text-navy transition hover:bg-white"
              aria-label="Previous slide"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrentIndex((p) => (p + 1) % banners.length)
              }
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2
                         flex h-12 w-12 items-center justify-center rounded-full
                         bg-white/90 text-xl text-navy transition hover:bg-white"
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {banners.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
