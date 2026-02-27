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
      <h1 className="sr-only">
        Solar Inverter, EV Charger & Renewable Energy Equipment Manufacturer in India
      </h1>

      <ScrollReveal>
        <BannerHero initialBanners={banners} />
      </ScrollReveal>

      {/* WHY CHOOSE US */}
      <ScrollReveal>
        <section className="bg-surface-elevated" aria-label="Why choose Fujitek Solar">
          <WhyChooseUs />
        </section>
      </ScrollReveal>

      {/* PRODUCTS */}
      <ScrollReveal delay={0.04}>
        <section className="bg-surface" aria-label="Solar Products">
          <ProductsPreview
            products={[
              {
                name: "Solar Panels",
                description:
                  "High-efficiency solar panels engineered for long-term durability and consistent energy generation.",
              },
              {
                name: "On-Grid, Off-Grid & Hybrid Inverters",
                description:
                  "Advanced inverter technology designed for Indian grid conditions and voltage stability.",
              },
              {
                name: "Batteries & Charge Controllers",
                description:
                  "Reliable energy storage and smart PWM charge controllers for optimized system performance.",
              },
              {
                name: "EV Chargers",
                description:
                  "Lithium e-rickshaw chargers and electric scooty chargers built for safe and efficient mobility charging.",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* SOLAR BENEFITS */}
      <ScrollReveal delay={0.06}>
        <section className="bg-surface-elevated" aria-label="Benefits of Solar Equipment">
          <SolarBenefits />
        </section>
      </ScrollReveal>

      {/* SERVICES → Convert to PRODUCT SUPPORT POSITIONING */}
      <ScrollReveal delay={0.08}>
        <section className="bg-surface" aria-label="Product Support">
          <ServicesPreview
            services={[
              {
                title: "Bulk Supply & Dealership",
                description:
                  "Manufacturer-direct supply for distributors, dealers, and institutional buyers.",
              },
              {
                title: "OEM Solutions",
                description:
                  "Low-cost smart PWM charge controllers and custom power electronics for OEM partners.",
              },
              {
                title: "Technical Product Guidance",
                description:
                  "Capacity planning and inverter selection support based on electrical requirements.",
              },
              {
                title: "After-Sales Assistance",
                description:
                  "Warranty-backed product support with responsive technical communication.",
              },
              {
                title: "EV Charging Hardware",
                description:
                  "Reliable chargers for electric rickshaws and electric scooters.",
              },
              {
                title: "Pan-India Distribution",
                description:
                  "Scalable supply capability across India with structured dealer network.",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* PROJECTS → Convert to DEPLOYMENTS / APPLICATIONS */}
      <ScrollReveal delay={0.1}>
        <section className="bg-surface-elevated" aria-label="Applications">
          <ProjectsPreview
            projects={[
              {
                title: "Residential Energy Systems",
                description:
                  "Solar inverters and batteries powering homes across India.",
              },
              {
                title: "Commercial Power Backup",
                description:
                  "Hybrid inverter systems supporting commercial load stability.",
              },
              {
                title: "Electric Mobility Charging",
                description:
                  "EV chargers supplied for e-rickshaw and electric scooter markets.",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* INFINITE MARQUEE */}
      <ScrollReveal delay={0.12}>
        <section className="bg-surface" aria-label="Product categories strip">
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
          heading="Looking for Reliable Solar & EV Hardware?"
          supportingText="Connect with Fujitek Solar Energy for bulk supply, dealership opportunities, and product inquiries."
          ctaLabel="Contact Sales"
        />
      </ScrollReveal>
    </div>
  );
}
