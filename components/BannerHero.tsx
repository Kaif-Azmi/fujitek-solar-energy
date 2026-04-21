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

type BannerHeroUiText = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  carouselLabel: string;
  previousSlide: string;
  nextSlide: string;
  goToSlide: string;
};

interface BannerHeroProps {
  initialBanners?: Banner[];
  uiText?: BannerHeroUiText;
}

const DEFAULT_UI_TEXT: BannerHeroUiText = {
  badge: 'Fujitek Solar Energy',
  titleLine1: 'Sustainable Energy',
  titleLine2: 'Solutions for Tomorrow',
  carouselLabel: 'Featured solar promotions',
  previousSlide: 'Previous slide',
  nextSlide: 'Next slide',
  goToSlide: 'Go to slide {index}',
};

const HERO_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YxZjVmOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2U2ZWZmNyIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

function buildSlideLabel(template: string, index: number) {
  return template.includes('{index}')
    ? template.replace('{index}', String(index))
    : `${template} ${index}`;
}

export default function BannerHero({
  initialBanners = [],
  uiText = DEFAULT_UI_TEXT,
}: BannerHeroProps) {
  const [banners] = useState<Banner[]>(initialBanners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const touchEndYRef = useRef<number | null>(null);

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
      aria-label={uiText.carouselLabel}
    >
      <div
        className="relative min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] w-full touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banner.imageUrl && (
          <>
            <div className="absolute inset-0 lg:hidden">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={getOptimizedCloudinaryUrl(banner.imageUrl, {
                    width: 1200,
                    quality: 60,
                    crop: 'fill',
                  })}
                  alt={banner.title}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 0px, 100vw"
                  decoding="async"
                  placeholder="blur"
                  blurDataURL={HERO_BLUR_DATA_URL}
                  className="object-cover object-[70%_center]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>
            </div>

            <div className="absolute inset-0 hidden items-center justify-center lg:flex lg:p-[10px]">
              <div className="relative inline-block overflow-hidden rounded-2xl">
                <Image
                  src={getOptimizedCloudinaryUrl(banner.imageUrl, {
                    width: 1400,
                    quality: 60,
                    crop: 'fit',
                  })}
                  alt={banner.title}
                  width={1920}
                  height={1080}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 85vw, 100vw"
                  decoding="async"
                  placeholder="blur"
                  blurDataURL={HERO_BLUR_DATA_URL}
                  className="h-[85vh] w-auto max-w-full object-contain"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
              </div>
            </div>
          </>
        )}

        <div className="relative z-10 mx-auto flex min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] max-w-7xl items-center px-6 lg:px-12">
          <div className="max-w-2xl text-white text-center sm:text-left">
            <span className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm ring-1 ring-white/25">
              {uiText.badge}
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight">
              <span className="block text-white">{uiText.titleLine1}</span>
              <span className="block font-bold text-accent">{uiText.titleLine2}</span>
            </h2>

            {banner.subtitle && (
              <p className="mt-6 text-lg leading-relaxed text-white">
                {banner.subtitle}
              </p>
            )}

            {banner.ctaText && (
              <div className="mt-8 sm:mt-12">
                <Link href={banner.ctaLink || '/contact'}>
                  <Button variant="explore" size="lg">
                    {banner.ctaText}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 hidden h-4 w-4 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/20 transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-accent sm:flex sm:h-11 sm:w-11 after:absolute after:-inset-1 after:content-['']"
              aria-label={uiText.previousSlide}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 hidden h-4 w-4 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md ring-1 ring-white/20 transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-accent sm:flex sm:h-11 sm:w-11 after:absolute after:-inset-1 after:content-['']"
              aria-label={uiText.nextSlide}
            >
              ›
            </button>
          </>
        )}
      </div>

      {banners.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3.5">
          {banners.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={buildSlideLabel(uiText.goToSlide, i + 1)}
              className={`relative flex min-h-[3.25rem] min-w-[3.25rem] touch-manipulation items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${
                i === currentIndex
                  ? 'border-white/35 bg-white/18 shadow-[0_14px_30px_rgba(8,23,43,0.24)]'
                  : 'border-white/18 bg-black/30 hover:border-white/28 hover:bg-black/40'
              }`}
            >
              <span
                aria-hidden
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'h-3 w-8 bg-white' : 'h-3 w-3 bg-white/82'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
