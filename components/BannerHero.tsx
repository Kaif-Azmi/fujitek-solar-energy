'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getOptimizedCloudinaryUrl } from '@/lib/image';

interface Banner {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  status: string;
}

interface BannerHeroProps {
  initialBanners?: Banner[];
}

export default function BannerHero({
  initialBanners = [],
}: BannerHeroProps) {
  const [banners] = useState<Banner[]>(initialBanners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const touchEndYRef = useRef<number | null>(null);

  /* ================= Auto Slide ================= */
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [banners, isPaused]);

  if (!banners.length) return null;

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchEndXRef.current = touch.clientX;
    touchEndYRef.current = touch.clientY;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchEndXRef.current = touch.clientX;
    touchEndYRef.current = touch.clientY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartXRef.current === null ||
      touchStartYRef.current === null ||
      touchEndXRef.current === null ||
      touchEndYRef.current === null
    ) {
      return;
    }

    const deltaX = touchEndXRef.current - touchStartXRef.current;
    const deltaY = touchEndYRef.current - touchStartYRef.current;
    const minSwipeDistance = 45;

    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchEndXRef.current = null;
    touchEndYRef.current = null;
  };

  const banner = banners[currentIndex];

 return (
  <section
    className="relative w-full overflow-hidden"
    aria-roledescription="carousel"
    aria-label="Featured solar promotions"
  >
    <div
      className="relative min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] w-full touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ================= Framed Image ================= */}
      {banner.imageUrl && (
        <>
          {/* Mobile/Tablet: keep original crop logic */}
          <div className="absolute inset-0 lg:hidden">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={getOptimizedCloudinaryUrl(banner.imageUrl, {
                  width: 1800,
                  quality: 72,
                  crop: 'fill',
                })}
                alt={banner.title}
                fill
                priority
                sizes="(min-width: 1024px) 0px, 100vw"
                className="object-cover object-[70%_center]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          </div>

          {/* Desktop: no crop, image wrapper follows image size with rounded corners */}
          <div className="absolute inset-0 hidden items-center justify-center lg:flex lg:p-[10px]">
            <div className="relative inline-block overflow-hidden rounded-2xl">
              <Image
                src={getOptimizedCloudinaryUrl(banner.imageUrl, {
                  width: 1920,
                  quality: 72,
                  crop: 'fit',
                })}
                alt={banner.title}
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 1023px) 0px, 100vw"
                className="h-[85vh] w-auto max-w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
            </div>
          </div>
        </>
      )}

      {/* ================= Content ================= */}
      <div className="relative z-10 mx-auto flex min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] max-w-7xl items-center px-6 lg:px-12">
        <div className="max-w-2xl text-white text-center sm:text-left">

          {/* Badge */}
          <span className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm ring-1 ring-white/25">
            Fujitek Solar Energy
          </span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight">
            <span className="block text-white">
              Sustainable Energy
            </span>
            <span className="block font-bold text-accent">
              Solutions for Tomorrow
            </span>
          </h2>

          {/* Subtitle */}
          {banner.subtitle && (
            <p className="mt-6 text-lg leading-relaxed text-white">
              {banner.subtitle}
            </p>
          )}

          {/* CTA — Original Button System */}
          {banner.ctaText && (
            <div className="mt-8 sm:mt-12">
              <Link href={banner.ctaLink || "/contact"}>
                <Button variant="explore" size="lg">
                  {banner.ctaText}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ================= Navigation Arrows ================= */}
      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/20 transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-accent sm:flex sm:h-11 sm:w-11 after:absolute after:-inset-1 after:content-['']"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/20 transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-accent sm:flex sm:h-11 sm:w-11 after:absolute after:-inset-1 after:content-['']"
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}
    </div>

    {/* ================= Dots ================= */}
    {banners.length > 1 && (
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`relative h-2 rounded-full transition-all duration-300 after:absolute after:-inset-y-5 after:-inset-x-3 after:content-[''] ${
              i === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    )}
  </section>
);


}
