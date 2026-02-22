import Link from "next/link";
import type { Metadata } from "next";
import { BarChart3, Network, ShieldCheck } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import FinalCTA from "@/components/FinalCTA";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import Button from "@/components/ui/button";
import {
  CTASection,
  FAQAccordion,
  ProcessTimeline,
  ServiceHero,
  ServiceSection,
  StickySectionNav,
  TrustMetricsStrip,
} from "@/components/services";
import type { ServiceSectionContent } from "@/app/service/content";
import {
  faqs,
  heroContent,
  processSteps,
  sectionNavItems,
  serviceAreasText,
  serviceSections,
  trustMetrics,
  whyChooseContent,
} from "@/app/service/content";
import type { ExpandableDetails } from "@/components/services/types";
import { buildPageMetadata, pageSeo, siteSeo } from "@/lib/seo";

const localBusinessId = `${siteSeo.url}/service#localbusiness`;
const serviceId = `${siteSeo.url}/service#solar-installation-services`;

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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": localBusinessId,
  name: "Fujitek Solar Energy Pvt. Ltd.",
  url: `${siteSeo.url}/service`,
  telephone: siteSeo.business.phone,
  email: siteSeo.business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteSeo.business.address,
    addressLocality: siteSeo.business.city,
    addressRegion: siteSeo.business.state,
    postalCode: siteSeo.business.postalCode,
    addressCountry: siteSeo.business.country,
  },
  areaServed: [
    { "@type": "City", name: "Lucknow" },
    { "@type": "City", name: "Noida" },
    { "@type": "City", name: "Kanpur" },
    { "@type": "City", name: "Prayagraj" },
    { "@type": "State", name: "Uttar Pradesh" },
  ],
  serviceType: [
    "Solar Panel Installation",
    "Solar Inverter Installation",
    "EV Charger Installation",
    "Solar Maintenance and Performance Monitoring",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": serviceId,
  name: "Solar, Inverter, and EV Installation Services Across Uttar Pradesh",
  provider: {
    "@id": localBusinessId,
  },
  areaServed: ["Lucknow", "Noida", "Kanpur", "Prayagraj", "Uttar Pradesh"],
  description:
    "Residential and commercial solar panel installation, inverter installation, EV charger installation, and annual maintenance services across Uttar Pradesh.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fujitek Solar Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "On-grid and Off-grid Solar Installation" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Hybrid and On-grid Inverter Installation" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Home and Commercial EV Charger Installation" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Solar AMC and Performance Monitoring" },
      },
    ],
  },
};

const sectionBackgrounds: Array<"white" | "muted" | "gradient"> = ["white", "muted", "gradient", "white"];

const ctaBySection: Record<string, { title: string; description: string; primaryLabel: string; secondaryLabel: string }> = {
  "solar-panel-installation": {
    title: "Planning a New Solar Plant?",
    description:
      "Get a site-specific design recommendation with realistic generation, cost factors, and subsidy-ready documentation guidance.",
    primaryLabel: "Get Solar Quote",
    secondaryLabel: "Talk to Our Experts",
  },
  "solar-maintenance-monitoring": {
    title: "Want Better Long-Term System Performance?",
    description:
      "Get a maintenance-first review with cleaning cadence, performance trend checks, and preventive actions tailored to your site conditions.",
    primaryLabel: "Book Free Consultation",
    secondaryLabel: "Talk to Our Experts",
  },
};

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
  const shouldExpand = section.id === "solar-inverter-installation" || section.id === "solar-maintenance-monitoring";
  if (!shouldExpand) {
    return undefined;
  }

  return {
    summary: section.mainDescription,
    paragraphs: section.detailParagraphs,
  };
}

export const metadata: Metadata = buildPageMetadata(pageSeo.services);

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-surface pb-24 md:pb-0">
      <JsonLd data={faqSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={serviceSchema} />

      <ServiceHero title={heroContent.title} intro={heroContent.intro} ctas={heroContent.ctas} />
      <section className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-30" />
        <div className="relative z-10">
          <TrustMetricsStrip items={trustMetrics} />
          <StickySectionNav items={sectionNavItems} />

          {serviceSections.map((section, index) => {
            const cta = ctaBySection[section.id];
            const expandableDetails = getExpandableDetails(section);
            return (
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
                expandableDetails={expandableDetails}
                reverse={index % 2 === 1}
                background={sectionBackgrounds[index]}
                footerSlot={
                  section.id === "solar-panel-installation" ? (
                    <p className="text-base leading-8 text-secondary">
                      You can also review relevant{" "}
                      <Link href="/products" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                        solar products and inverter options
                      </Link>{" "}
                      before finalizing system architecture.
                    </p>
                  ) : null
                }
                ctaSlot={
                  cta ? (
                    <CTASection
                      title={cta.title}
                      description={cta.description}
                      primary={{ label: cta.primaryLabel, href: "/contact" }}
                      secondary={{ label: cta.secondaryLabel, href: "/contact" }}
                    />
                  ) : undefined
                }
              />
            );
          })}

          <section id="our-installation-process" className="scroll-mt-32 border-t border-border/60 bg-surface">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <div className="rounded-2xl border border-border/70 bg-accent p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our <span className="highlight text-primary">Installation</span> Process</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-secondary">
                  Every deployment follows a documented engineering workflow so project quality remains consistent from survey to
                  commissioning and after-sales support.
                </p>
                <ProcessTimeline steps={processSteps} />
              </div>
            </div>
          </section>

          <section className="border-t border-border/60 bg-background">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <div className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why Choose <span className="highlight text-primary">Fujitek Solar</span> Energy</h2>
                <div className="mt-5 space-y-4">
                  {whyChooseContent.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="max-w-4xl text-base leading-8 text-secondary">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-10">
                  <CTASection
                    title="Need a Project Estimate with Clear Technical Scope?"
                    description="Speak with our engineering team for realistic capacity planning, timeline estimates, and implementation guidance."
                    primary={{ label: "Book Free Consultation", href: "/contact" }}
                    secondary={{ label: "Talk to Our Experts", href: "/contact" }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="service-areas" className="scroll-mt-32 border-t border-border/60 bg-surface">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <div className="rounded-2xl border border-border/70 bg-accent p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Service Areas in <span className="highlight text-primary">Uttar Pradesh</span></h2>
                <p className="mt-4 max-w-4xl text-base leading-8 text-secondary">{serviceAreasText}</p>
              </div>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-32 border-t border-border/60 bg-background">
            <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
              <div className="rounded-2xl border border-border/70 bg-surface p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Frequently Asked Questions</h2>
                <FAQAccordion items={faqs} />
              </div>
            </div>
          </section>

          <FinalCTA
            heading="Build a Reliable Solar Future with Fujitek"
            supportingText="Get engineering-led guidance for solar panels, inverters, EV charging, and lifecycle maintenance across Uttar Pradesh."
            ctaLabel="Book Free Consultation"
            ctaHref="/contact"
            ariaLabel="Services page final call to action"
            sectionClassName="px-6"
            panelClassName="max-w-6xl"
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
        <Button asChild variant="explore" className="w-auto">
          <Link href="/contact">Book Free Consultation</Link>
        </Button>
      </div>
    </main>
  );
}











