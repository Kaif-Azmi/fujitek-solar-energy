import Link from "next/link";
import { ArrowRight, Headphones, LineChart, Plug, ShieldCheck, Sun, Wrench } from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import SectionHeader from "@/components/ui/section-header";

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
  ctaHref: "/services",
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
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mb-10 grid gap-5 lg:mb-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,360px)] lg:items-stretch">
          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-background via-surface-elevated to-primary/5 p-7 shadow-soft sm:p-8">
            <SectionHeader
              badge={badgeLabel}
              title={
                <Highlighter action="underline" color="var(--accent)" strokeWidth={2} animationDuration={700} iterations={1}>
                  {heading}
                </Highlighter>
              }
              description={description}
              className="max-w-3xl"
              titleClassName="lg:text-[2.6rem]"
              descriptionClassName="sm:text-lg"
            />

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex rounded-full border border-primary/25 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Residential
              </span>
              <span className="inline-flex rounded-full border border-primary/25 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Commercial
              </span>
              <span className="inline-flex rounded-full border border-primary/25 bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Ongoing Support
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-primary/20 bg-primary p-6 text-white shadow-medium sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">Service Desk</p>
            <h3 className="mt-3 text-2xl font-bold leading-tight">Plan your complete solar execution roadmap</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              From sizing to post-install support, get a practical deployment plan tailored to your site.
            </p>

            <div className="mt-6">
              <Button asChild variant="exploreInverse" size="lg" className="w-full justify-center sm:w-auto">
                <Link href={ctaHref} aria-label={ctaLabel}>
                  {ctaLabel}
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article key={`${service.title}-${index}`}>
              <Card className="group relative h-full overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_34px_rgba(29,92,156,0.14)]">
                <div className="pointer-events-none absolute inset-x-6 top-0 h-[3px] rounded-full bg-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <Link
                  href={ctaHref}
                  aria-label={`${service.title}: ${ctaLabel}`}
                  className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />

                <CardContent className="relative flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary/35 group-hover:bg-primary/15">
                        <ServiceIcon index={index} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                          Service
                        </p>
                        <CardTitle className="text-[1.65rem] font-semibold leading-tight text-foreground">
                          {service.title}
                        </CardTitle>
                      </div>
                    </div>

                    <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-surface text-secondary transition-all duration-300 group-hover:border-primary/35 group-hover:text-primary">
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    </div>
                  </div>

                  <p className="flex-1 text-[15px] leading-7 text-secondary">
                    {service.shortDescription || service.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <span>{ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
