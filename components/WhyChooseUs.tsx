import Image from "next/image";
import Link from "next/link";
import { Lightning, Wrench, Handshake } from "./ui";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";

interface Reason {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  reasons?: Reason[];
}

const DEFAULT_REASONS: Reason[] = [
  {
    title: "Advanced Power Electronics Engineering",
    description:
      "Our on-grid, off-grid, and hybrid solar inverters are engineered for high conversion efficiency, voltage stability, and long operational life under Indian grid conditions.",
  },
  {
    title: "Integrated Solar & EV Product Portfolio",
    description:
      "We manufacture solar panels, batteries, smart PWM charge controllers, and EV chargers — delivering a complete renewable energy hardware ecosystem.",
  },
  {
    title: "OEM & Bulk Supply Capability",
    description:
      "We support distributors, dealers, and institutional buyers with scalable production capacity and consistent product quality across categories.",
  },
  {
    title: "Quality-Driven Manufacturing Standards",
    description:
      "Every product is built with strict quality controls to ensure reliability, durability, and long-term performance in demanding environments.",
  },
];

export default function WhyChooseUs({ reasons }: WhyChooseUsProps) {
  const items = reasons && reasons.length > 0 ? reasons : DEFAULT_REASONS;
  const featuredItems = items.slice(0, 2);
  const iconByIndex = [Lightning, Wrench, Handshake, Handshake];
  const desktopCardStyles = [
    "border-accent/35 bg-accent/80 text-foreground shadow-[0_10px_22px_rgba(17,24,39,0.12)]",
    "border-primary/25 bg-primary/90 text-white shadow-[0_12px_26px_rgba(10,31,56,0.2)]",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-section">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          {/* LEFT: COPY + CTA */}
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Fujitek
            </p>

            <h2 className="text-[1.75rem] font-extrabold leading-[1.2] text-foreground sm:text-3xl md:text-4xl">
              <span className="block">Engineered</span>
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                Energy Solutions
              </Highlighter>
              <span className="mt-1 block sm:mt-0">
                Built for Performance and Scale
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-secondary">
              We design and manufacture high-performance solar inverters,
              panels, batteries, and EV charging equipment built for
              reliability, efficiency, and long-term durability.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 shadow-sm">
                <span className="text-2xl font-extrabold leading-none text-primary">
                  OEM
                </span>
                <span className="text-sm text-muted">
                  Bulk Supply & Dealer Support
                </span>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 shadow-sm">
                <span className="text-2xl font-extrabold leading-none text-primary">
                  High
                </span>
                <span className="text-sm text-muted">
                  Conversion Efficiency Design
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="explore">
                <Link href="/products" aria-label="Explore Fujitek products">
                  Explore Products
                </Link>
              </Button>
              <Button asChild variant="exploreInverse">
                <Link href="/contact" aria-label="Contact Fujitek Solar">
                  Get Bulk Pricing
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT: IMAGE + FLOATING FEATURE CARDS */}
          <div>
            <div className="relative md:py-20">
              <div className="relative h-[460px] w-full overflow-hidden rounded-3xl border border-border/70 bg-primary/5 shadow-sm">
                <Image
                  src="/solar_engineer.webp"
                  alt="Fujitek power electronics engineer working on solar inverter hardware"
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  quality={72}
                  className="object-cover object-center"
                />
              </div>

              {/* Desktop overlays: 50% inside image, 50% outside image boundary */}
              {featuredItems[0] && (
                <article
                  className={`absolute left-0 top-0 z-20 hidden w-[min(18rem,calc(100%-2.5rem))] -translate-x-[18%] -translate-y-[24%] rounded-2xl border p-4 md:block ${desktopCardStyles[0]}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-left text-xl font-semibold leading-tight text-foreground">
                        {featuredItems[0].title}
                      </h3>
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/50 text-primary">
                        {(() => {
                          const Icon = iconByIndex[0] || Handshake;
                          return <Icon className="h-4 w-4" />;
                        })()}
                      </div>
                    </div>
                    <p className="mt-1.5 text-left text-[0.825rem] leading-relaxed text-secondary/85">
                      {featuredItems[0].description}
                    </p>
                  </div>
                </article>
              )}

              {featuredItems[1] && (
                <article
                  className={`absolute bottom-0 right-0 z-20 hidden w-[min(18rem,calc(100%-2.5rem))] translate-x-[18%] translate-y-[22%] rounded-2xl border p-4 md:block ${desktopCardStyles[1]}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-left text-xl font-semibold leading-tight text-white">
                        {featuredItems[1].title}
                      </h3>
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                        {(() => {
                          const Icon = iconByIndex[1] || Handshake;
                          return <Icon className="h-4 w-4" />;
                        })()}
                      </div>
                    </div>
                    <p className="mt-1.5 text-left text-[0.825rem] leading-relaxed text-white/78">
                      {featuredItems[1].description}
                    </p>
                  </div>
                </article>
              )}
            </div>

            {/* Mobile: no overlap, stacked below image */}
            <div className="mt-5 space-y-4 md:hidden">
              {featuredItems.map((item, index) => {
                const Icon = iconByIndex[index] || Handshake;

                return (
                  <article
                    key={`${item.title}-${index}`}
                    className={`rounded-2xl border p-4 shadow-[0_8px_20px_rgba(15,23,42,0.1)] ${
                      index === 0
                        ? "border-accent/35 bg-accent/80"
                        : "border-primary/25 bg-primary/90"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className={`text-left text-[1.1rem] font-semibold leading-tight ${
                            index === 0 ? "text-foreground" : "text-white"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            index === 0
                              ? "bg-white/50 text-primary"
                              : "bg-accent/20 text-accent"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <p
                        className={`mt-1.5 text-left text-[0.825rem] leading-relaxed ${
                          index === 0 ? "text-secondary/85" : "text-white/78"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
