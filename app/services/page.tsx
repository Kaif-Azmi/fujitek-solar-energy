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

          <section id="process" className="scroll-mt-32 border-t border-border/60 bg-surface">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-primary">{executionModel.label}</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                {executionModel.title}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-secondary">
                {executionModel.description}
              </p>
              <ProcessTimeline steps={processSteps} />
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
