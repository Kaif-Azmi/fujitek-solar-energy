import "./globals.css";
import BannerHero from "../components/BannerHero";
import WhyChooseUs from "../components/WhyChooseUs";
import ProductsPreview from "../components/ProductsPreview";
import ServicesPreview from "../components/ServicesPreview";
import ProjectsPreview from "../components/ProjectsPreview";
import FinalCTA from "../components/FinalCTA";
import FaqSection from "../components/FaqSection";
import InfiniteServicesMarquee from "../components/InfiniteServicesMarquee";
import SolarBenefits from '@/components/SolarBenefits';
import type { Metadata } from "next";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { getDb } from "@/lib/mongodb";

type HomeBanner = {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
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
      imageUrl?: string;
      status?: string;
      isActive?: boolean;
    }>("banners")
    .find(
      { $or: [{ status: "Active" }, { isActive: true }] },
      { projection: { title: 1, subtitle: 1, ctaText: 1, imageUrl: 1, status: 1, isActive: 1 } },
    )
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  return docs.map((doc) => ({
    _id: String(doc._id),
    title: doc.title,
    subtitle: doc.subtitle,
    ctaText: doc.ctaText,
    imageUrl: doc.imageUrl,
    status: doc.status || (doc.isActive ? "Active" : "Inactive"),
  }));
}

export default async function Home() {
  const banners = await getHomeBanners();
  return (
    <div className="w-full">
      <BannerHero initialBanners={banners} />

      {/* WHY CHOOSE US */}
      <section className="bg-surface-elevated" aria-label="Why choose us">
        <WhyChooseUs />
      </section>

      {/* PRODUCTS */}
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

        {/* {Benefits of solar} */}
        <section className="bg-surface-elevated" aria-label="Solar Benefits">
          <SolarBenefits />
        </section>
      {/* SERVICES */}
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

      {/* PROJECTS */}
      <section className="py-section bg-surface-elevated" aria-label="Projects">
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

      {/*Infinite marquee*/}
      <section className="bg-surface" aria-label="Services strip">
        <InfiniteServicesMarquee />
      </section>

      {/* FAQ */}
      <section className="bg-surface-elevated" aria-label="FAQ">
        <FaqSection />
      </section>

      {/* FINAL CTA */}
      <FinalCTA
        heading="Ready to Go Solar?"
        supportingText="Talk to our experts and start your solar journey today."
        ctaLabel="Contact Us"
      />
    </div>
  );
}
