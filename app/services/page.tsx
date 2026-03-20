import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import FinalCTA from "@/components/FinalCTA";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import Button from "@/components/ui/button";
import { PublicIcon } from "@/components/ui/icons";
import {
  CTASection,
  FAQAccordion,
  ProcessTimeline,
  ServiceHero,
  ServiceSection,
  StickySectionNav,
  TrustMetricsStrip,
} from "@/components/services";
import type { ServiceSectionContent } from "@/app/services/content";
import { getServicesContent } from "@/app/services/content";
import type { ExpandableDetails } from "@/components/services/types";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata, pageSeo, siteSeo } from "@/lib/seo";

/* ================= SCHEMA ================= */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteSeo.name,
  url: `${siteSeo.url}/services`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteSeo.business.phone,
    contactType: "sales",
  },
};

export const metadata: Metadata = buildPageMetadata(pageSeo.services);

/* ================= HELPERS ================= */

function mapFeatures(section: ServiceSectionContent) {
  return section.features.map((feature) => ({
    ...feature,
    icon:
      feature.icon === "grid" ? (
        <PublicIcon name="network" className="h-4 w-4" />
      ) : feature.icon === "chart" ? (
        <PublicIcon name="savings" className="h-4 w-4" />
      ) : (
        <PublicIcon name="shield" className="h-4 w-4" />
      ),
  }));
}

function getExpandableDetails(section: ServiceSectionContent): ExpandableDetails | undefined {
  return {
    summary: section.mainDescription,
    paragraphs: section.detailParagraphs,
  };
}

/* ================= PAGE ================= */

type ServicesPageProps = {
  locale?: Locale;
};

export default function ServicesPage({ locale = defaultLocale }: ServicesPageProps = {}) {
  const {
    faqs,
    heroContent,
    processSteps,
    sectionNavItems,
    serviceSections,
    trustMetrics,
    executionModel,
    faqHeading,
    serviceOverview,
    inverterFooter,
    sectionCta,
    finalCta,
    mobileCtaLabel,
  } = getServicesContent(locale);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-surface pb-24 md:pb-0">
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />

      <ServiceHero
        title={heroContent.title}
        intro={heroContent.intro}
        ctas={heroContent.ctas}
      />

      <section className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-30" />

        <div className="relative z-10">
          <section className="border-b border-border/60 bg-background">
            <div className="mx-auto max-w-6xl px-6 py-8">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-primary">Service Overview</p>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-secondary sm:text-base">
                {serviceOverview.description}
              </p>
            </div>
          </section>

          <TrustMetricsStrip items={trustMetrics} />
          <StickySectionNav items={sectionNavItems} />

          {serviceSections.map((section, index) => (
            <ServiceSection
              key={section.id}
              id={section.id}
              title={section.title}
              mainDescription={section.mainDescription}
              featureTitle={section.featureTitle}
              features={mapFeatures(section)}
              highlightTitle={section.highlightTitle}
              highlightDescription={section.highlightDescription}
              highlightItems={section.highlightItems}
              detailParagraphs={section.detailParagraphs}
              expandableDetails={getExpandableDetails(section)}
              reverse={index % 2 === 1}
              background={index % 2 === 0 ? "white" : "muted"}
              footerSlot={
                section.id === "solar-inverters" ? (
                  <p className="text-base leading-8 text-secondary">
                    {inverterFooter.prefix}{" "}
                    <Link
                      href="/products"
                      className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                    >
                      {inverterFooter.linkLabel}
                    </Link>{" "}
                    {inverterFooter.suffix}
                  </p>
                ) : null
              }
              ctaSlot={
                <CTASection
                  title={sectionCta.title}
                  description={sectionCta.description}
                  primary={{ label: sectionCta.primaryLabel, href: "/contact" }}
                  secondary={{ label: sectionCta.secondaryLabel, href: "/contact" }}
                />
              }
            />
          ))}

          <section
            id="process"
            className="relative isolate scroll-mt-32 overflow-hidden border-t border-border/60 bg-[linear-gradient(180deg,#f6f9fd_0%,#eef4fb_100%)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-12 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-white/80 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary/[0.08] to-transparent" />

                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.78fr)] lg:items-start">
                  <div className="max-w-3xl">
                    <p className="inline-flex rounded-full border border-primary/15 bg-primary-soft/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary-deep">
                      {executionModel.label}
                    </p>
                    <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight text-foreground">
                      {executionModel.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-secondary sm:text-lg">
                      {executionModel.description}
                    </p>
                  </div>

                  <aside className="hidden rounded-[1.75rem] border border-primary/15 bg-gradient-to-br from-background via-surface-elevated to-primary/10 p-5 shadow-sm lg:block">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary-deep/70">
                          {executionModel.label}
                        </p>
                        <p className="mt-3 text-5xl font-extrabold leading-none text-primary-deep">
                          {String(processSteps.length).padStart(2, "0")}
                        </p>
                      </div>

                      <div className="grid h-14 w-14 place-items-center rounded-[1.25rem] border border-primary/15 bg-white/90 shadow-sm">
                        <PublicIcon name="network" className="h-7 w-7" />
                      </div>
                    </div>

                    <div className="mt-5 grid gap-2.5">
                      {processSteps.map((step, index) => (
                        <div
                          key={step.title}
                          className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white/85 px-3.5 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                        >
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary-soft text-xs font-bold text-primary-deep">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="text-sm font-semibold leading-6 text-foreground">{step.title}</p>
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>

                <ProcessTimeline steps={processSteps} />
              </div>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-32 border-t border-border/60 bg-background">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <div className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {faqHeading}
                </h2>
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </section>

          <FinalCTA
            heading={finalCta.heading}
            supportingText={finalCta.supportingText}
            ctaLabel={finalCta.ctaLabel}
            ctaHref="/contact"
            ariaLabel={finalCta.ariaLabel}
            sectionClassName="px-6"
            panelClassName="max-w-6xl"
            benefits={finalCta.benefits}
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
        <Button asChild variant="explore" className="w-auto">
          <Link href="/contact">{mobileCtaLabel}</Link>
        </Button>
      </div>
    </main>
  );
}
