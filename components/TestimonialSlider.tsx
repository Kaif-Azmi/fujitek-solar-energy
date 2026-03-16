 "use client";

import Image from "next/image";

import { Testimonial } from "@/lib/types/testimonial";
import { Highlighter } from "@/components/ui/highlighter";
import SectionHeader from "@/components/ui/section-header";
import { useTranslation } from "@/components/i18n-provider";

const AVATAR_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YyZjVmOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2U0ZWNmNiIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({
  testimonials,
}: TestimonialSliderProps) {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden py-section">
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mb-10">
          <SectionHeader
            badge={t("home.testimonials.badge")}
            title={
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                {t("home.testimonials.heading")}
              </Highlighter>
            }
            description={t("home.testimonials.description")}
            className="max-w-3xl"
          />
        </header>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--bg-page)] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--bg-page)] to-transparent sm:w-28" />

        <div className="testimonial-fade overflow-hidden">
          <div className="testimonial-marquee flex w-max py-6 hover:[animation-play-state:paused]">
            {testimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}-a`}
                  className="flex min-w-[240px] max-w-[340px] flex-1 flex-col rounded-3xl border border-[color:var(--border-subtle)] bg-white/85 shadow-[0_22px_55px_rgba(15,23,42,0.08)] transition-transform duration-200 ease-out hover:-translate-y-0.5 sm:min-w-[280px] lg:min-w-[320px] lg:max-w-[360px]"
                >
                  <div className="flex h-full flex-col gap-5 p-6">
                    <div className="flex items-center gap-3">
                      <span className="h-1 w-12 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)]" />
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                        {t("home.testimonials.cardLabel")}
                      </span>
                    </div>
                    <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                      <span className="mr-1 text-3xl leading-none text-[var(--brand)]">&ldquo;</span>
                      {testimonial.quote}
                      <span className="ml-1 text-3xl leading-none text-[var(--brand)]">&rdquo;</span>
                    </p>
                    <div className="mt-auto flex items-center gap-3 border-t border-[color:var(--border-subtle)] pt-4">
                      <span className="inline-flex rounded-full p-[2px] ring-2 ring-[color:var(--border-subtle)]">
                        <Image
                          className="h-11 w-11 rounded-full object-cover"
                          height={44}
                          width={44}
                          alt={testimonial.name}
                          src={testimonial.imgSrc}
                          loading="lazy"
                          decoding="async"
                          sizes="44px"
                          quality={72}
                          placeholder="blur"
                          blurDataURL={AVATAR_BLUR_DATA_URL}
                        />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {testimonials.map((testimonial, index) => (
                <div
                  aria-hidden="true"
                  key={`${testimonial.name}-${index}-b`}
                  className="flex min-w-[240px] max-w-[340px] flex-1 flex-col rounded-3xl border border-[color:var(--border-subtle)] bg-white/85 shadow-[0_22px_55px_rgba(15,23,42,0.08)] transition-transform duration-200 ease-out hover:-translate-y-0.5 sm:min-w-[280px] lg:min-w-[320px] lg:max-w-[360px]"
                >
                  <div className="flex h-full flex-col gap-5 p-6">
                    <div className="flex items-center gap-3">
                      <span className="h-1 w-12 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)]" />
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
                        {t("home.testimonials.cardLabel")}
                      </span>
                    </div>
                    <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                      <span className="mr-1 text-3xl leading-none text-[var(--brand)]">&ldquo;</span>
                      {testimonial.quote}
                      <span className="ml-1 text-3xl leading-none text-[var(--brand)]">&rdquo;</span>
                    </p>
                    <div className="mt-auto flex items-center gap-3 border-t border-[color:var(--border-subtle)] pt-4">
                      <span className="inline-flex rounded-full p-[2px] ring-2 ring-[color:var(--border-subtle)]">
                        <Image
                          className="h-11 w-11 rounded-full object-cover"
                          height={44}
                          width={44}
                          alt={testimonial.name}
                          src={testimonial.imgSrc}
                          loading="lazy"
                          decoding="async"
                          sizes="44px"
                          quality={72}
                          placeholder="blur"
                          blurDataURL={AVATAR_BLUR_DATA_URL}
                        />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
