import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Network, ShieldCheck } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import FinalCTA from "@/components/FinalCTA";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import Button from "@/components/ui/button";
import {
  CTASection,
  FAQAccordion,
  ServiceHero,
  ServiceSection,
  StickySectionNav,
  TrustMetricsStrip,
} from "@/components/services";
import type { ServiceSectionContent } from "@/app/service/content";
import {
  faqs,
  heroContent,
  sectionNavItems,
  serviceSections,
  trustMetrics,
} from "@/app/service/content";
import type { ExpandableDetails } from "@/components/services/types";
import { buildPageMetadata, pageSeo, siteSeo } from "@/lib/seo";

/* ================= SCHEMA ================= */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteSeo.name,
  url: `${siteSeo.url}/service`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteSeo.business.phone,
    contactType: "sales",
  },
};

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

export const metadata: Metadata = buildPageMetadata(pageSeo.services);

/* ================= HELPERS ================= */

function mapFeatures(section: ServiceSectionContent) {
  return section.features.map((feature) => ({
    ...feature,
    icon:
      feature.icon === "grid" ? (
        <Network className="h-4 w-4" aria-hidden />
      ) : feature.icon === "chart" ? (
        <BarChart3 className="h-4 w-4" aria-hidden />
      ) : (
        <ShieldCheck className="h-4 w-4" aria-hidden />
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

export default function ServicesPage() {
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
                    You can also explore our{" "}
                    <Link
                      href="/products"
                      className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                    >
                      complete product portfolio
                    </Link>{" "}
                    for technical specifications and model comparisons.
                  </p>
                ) : null
              }
              ctaSlot={
                <CTASection
                  title="Looking for Bulk Orders or Dealer Partnership?"
                  description="Contact our team for structured pricing, OEM supply capability, and technical product guidance."
                  primary={{ label: "Request Bulk Pricing", href: "/contact" }}
                  secondary={{ label: "Become a Dealer", href: "/contact" }}
                />
              }
            />
          ))}

          <section id="faqs" className="scroll-mt-32 border-t border-border/60 bg-background">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <div className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </section>

          <FinalCTA
            heading="Partner with Fujitek Solar Energy"
            supportingText="Reliable solar inverters, EV chargers, smart charge controllers, and power electronics built for performance and scale."
            ctaLabel="Contact Sales Team"
            ctaHref="/contact"
            ariaLabel="Final call to action"
            sectionClassName="px-6"
            panelClassName="max-w-6xl"
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
        <Button asChild variant="explore" className="w-auto">
          <Link href="/contact">Request Pricing</Link>
        </Button>
      </div>
    </main>
  );
}