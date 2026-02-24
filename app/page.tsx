import "./globals.css";
import dynamic from "next/dynamic";
import BannerHero from "../components/BannerHero";
import WhyChooseUs from "../components/WhyChooseUs";
import SolarBenefits from "@/components/SolarBenefits";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Metadata } from "next";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { getDb } from "@/lib/mongodb";

const ProductsPreview = dynamic(() => import("../components/ProductsPreview"));
const ServicesPreview = dynamic(() => import("../components/ServicesPreview"));
const ProjectsPreview = dynamic(() => import("../components/ProjectsPreview"));
const InfiniteServicesMarquee = dynamic(() => import("../components/InfiniteServicesMarquee"));
const FaqSection = dynamic(() => import("../components/FaqSection"));
const FinalCTA = dynamic(() => import("../components/FinalCTA"));

type HomeBanner = {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  status: string;
};

export const metadata: Metadata = buildPageMetadata(pageSeo.home);
export const revalidate = 300;

async function getHomeBanners(): Promise<HomeBanner[]> {
  const db = await getDb();
  const docs = await db
    .collection<{
      _id: unknown;
      title: string;
      subtitle?: string;
      ctaText?: string;
      ctaLink?: string;
      imageUrl?: string;
      status?: string;
      isActive?: boolean;
    }>("banners")
    .find(
      { $or: [{ status: "Active" }, { isActive: true }] },
      { projection: { title: 1, subtitle: 1, ctaText: 1, ctaLink: 1, imageUrl: 1, status: 1, isActive: 1 } },
    )
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  return docs.map((doc) => ({
    _id: String(doc._id),
    title: doc.title,
    subtitle: doc.subtitle,
    ctaText: doc.ctaText,
    ctaLink: doc.ctaLink || "/contact",
    imageUrl: doc.imageUrl,
    status: doc.status || (doc.isActive ? "Active" : "Inactive"),
  }));
}

export default async function Home() {
  const banners = await getHomeBanners();
  return (
    <div className="w-full">
      <h1 className="sr-only">Solar &amp; Inverter Solutions for Homes and Businesses</h1>
      <ScrollReveal>
        <BannerHero initialBanners={banners} />
      </ScrollReveal>

      {/* WHY CHOOSE US */}
      <ScrollReveal>
        <section className="bg-surface-elevated" aria-label="Why choose us">
          <WhyChooseUs />
        </section>
      </ScrollReveal>

      {/* PRODUCTS */}
      <ScrollReveal delay={0.04}>
        <section className="bg-surface" aria-label="Products">
          <ProductsPreview
            products={[
              {
                name: "Solar Panels",
                description:
                  "High-efficiency panels for residential and commercial use.",
              },
              {
                name: "Inverters",
                description:
                  "Reliable inverters designed for stable power conversion.",
              },
              {
                name: "Batteries",
                description:
                  "Advanced energy storage for uninterrupted power supply.",
              },
            ]}
          />
        </section>
      </ScrollReveal>

        {/* {Benefits of solar} */}
      <ScrollReveal delay={0.06}>
        <section className="bg-surface-elevated" aria-label="Solar Benefits">
          <SolarBenefits />
        </section>
      </ScrollReveal>

      {/* SERVICES */}
      <ScrollReveal delay={0.08}>
        <section className="bg-surface" aria-label="Services">
          <ServicesPreview
            services={[
              {
                title: "Solar Installation",
                description:
                  "Professional installation with expert engineering support.",
              },
              {
                title: "Energy Consultation",
                description:
                  "System sizing and efficiency planning for maximum ROI.",
              },
              {
                title: "Custom System Design",
                description:
                  "Tailored solar and inverter solutions for every need.",
              },
              {
                title: "Maintenance & Support",
                description: "Ongoing maintenance and warranty-backed support.",
              },
              {
                title: "Performance Monitoring",
                description: "Real-time system monitoring and analytics.",
              },
              {
                title: "24/7 Technical Support",
                description: "Always-on support for troubleshooting and service.",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* PROJECTS */}
      <ScrollReveal delay={0.1}>
        <section className="bg-surface-elevated" aria-label="Projects">
          <ProjectsPreview
            projects={[
              {
                title: "Rooftop Solar – Delhi",
                description: "Residential rooftop solar installation.",
              },
              {
                title: "Commercial Solar – Noida",
                description: "Large-scale commercial solar project.",
              },
              {
                title: "Community Center – Gurgaon",
                description:
                  "Sustainable energy solution for public infrastructure.",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/*Infinite marquee*/}
      <ScrollReveal delay={0.12}>
        <section className="bg-surface" aria-label="Services strip">
          <InfiniteServicesMarquee />
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal delay={0.14}>
        <section className="bg-surface-elevated" aria-label="FAQ">
          <FaqSection />
        </section>
      </ScrollReveal>

      {/* FINAL CTA */}
      <ScrollReveal delay={0.16}>
        <FinalCTA
          heading="Ready to Go Solar?"
          supportingText="Talk to our experts and start your solar journey today."
          ctaLabel="Contact Us"
        />
      </ScrollReveal>
    </div>
  );
}
