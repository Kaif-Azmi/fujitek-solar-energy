import Link from "next/link";
import { ArrowRight, Headphones, LineChart, Plug, ShieldCheck, Sun, Wrench } from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";

interface Service {
  title: string;
  shortDescription?: string;
  description?: string;
}

interface ServicesPreviewProps {
  services?: Service[];
  ariaLabel?: string;
  heading?: string;
  description?: string;
  badgeLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

const SERVICES_PREVIEW_DEFAULTS = {
  ariaLabel: "Solar services overview",
  heading: "Solar Services Built for Reliability",
  description:
    "End-to-end solar and inverter services designed to deliver consistent performance, safety, and long-term value.",
  badgeLabel: "Services",
  ctaHref: "/service",
  ctaLabel: "Explore solar services",
};

function ServiceIcon({ index }: { index: number }) {
  const icons = [Sun, Plug, Wrench, LineChart, ShieldCheck, Headphones] as const;
  const Icon = icons[index % icons.length];
  return <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden />;
}

export default function ServicesPreview({
  services = [],
  ariaLabel = SERVICES_PREVIEW_DEFAULTS.ariaLabel,
  heading = SERVICES_PREVIEW_DEFAULTS.heading,
  description = SERVICES_PREVIEW_DEFAULTS.description,
  badgeLabel = SERVICES_PREVIEW_DEFAULTS.badgeLabel,
  ctaHref = SERVICES_PREVIEW_DEFAULTS.ctaHref,
  ctaLabel = SERVICES_PREVIEW_DEFAULTS.ctaLabel,
}: ServicesPreviewProps) {
  return (
    <section className="relative w-full overflow-hidden py-section" aria-label={ariaLabel}>
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-25" />

      <div className="relative mx-auto max-w-6xl px-6">
        <header className="mb-12 flex flex-col items-center gap-6 text-center md:mb-14 md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              {badgeLabel}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                {heading}
              </Highlighter>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-secondary">{description}</p>
          </div>

          <Button asChild variant="explore" size="lg" className="shrink-0">
            <Link href={ctaHref} aria-label={ctaLabel}>
              {ctaLabel}
            </Link>
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={`${service.title}-${index}`}>
              <Card className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-accent/15 blur-2xl" />
                  <div className="absolute -right-20 -bottom-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
                </div>

                <Link
                  href={ctaHref}
                  aria-label={`${service.title}: ${ctaLabel}`}
                  className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />

                <CardContent className="relative flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                        <ServiceIcon index={index} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                          Service
                        </p>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {service.title}
                        </CardTitle>
                      </div>
                    </div>

                    <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-foreground/70 transition-colors duration-300 group-hover:border-primary/20 group-hover:text-primary">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </div>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-secondary">
                    {service.shortDescription || service.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-primary">{ctaLabel}</p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
