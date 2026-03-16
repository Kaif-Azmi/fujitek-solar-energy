import BannerHero from "@/components/BannerHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import SolarBenefits from "@/components/SolarBenefits";
import MarketingVideoSection from "@/components/MarketingVideoSection";
import ProductsPreview from "@/components/ProductsPreview";
import ServicesPreview from "@/components/ServicesPreview";
import ProjectsPreview from "@/components/ProjectsPreview";
import InfiniteServicesMarquee from "@/components/InfiniteServicesMarquee";
import FaqSection from "@/components/FaqSection";
import FinalCTA from "@/components/FinalCTA";
import TestimonialSlider from "@/components/TestimonialSlider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getDb } from "@/lib/mongodb";
import { withLocalePath, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/i18n-server";
import type { Testimonial } from "@/lib/types/testimonial";

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

export default async function HomePage({ locale }: { locale: Locale }) {
  const banners = await getHomeBanners();
  const t = await getTranslator(locale);

  const localizedBanners = banners.map((banner) => ({
    ...banner,
    ctaText: t("home.hero.ctaLabel"),
    ctaLink: withLocalePath(locale, banner.ctaLink || "/contact"),
  }));

  const products = [
    {
      name: t("home.products.item1Title"),
      description: t("home.products.item1Description"),
    },
    {
      name: t("home.products.item2Title"),
      description: t("home.products.item2Description"),
    },
    {
      name: t("home.products.item3Title"),
      description: t("home.products.item3Description"),
    },
    {
      name: t("home.products.item4Title"),
      description: t("home.products.item4Description"),
    },
  ];

  const services = [
    {
      title: t("home.services.item1Title"),
      description: t("home.services.item1Description"),
    },
    {
      title: t("home.services.item2Title"),
      description: t("home.services.item2Description"),
    },
    {
      title: t("home.services.item3Title"),
      description: t("home.services.item3Description"),
    },
    {
      title: t("home.services.item4Title"),
      description: t("home.services.item4Description"),
    },
    {
      title: t("home.services.item5Title"),
      description: t("home.services.item5Description"),
    },
    {
      title: t("home.services.item6Title"),
      description: t("home.services.item6Description"),
    },
  ];

  const projects = [
    {
      title: t("home.projects.item1Title"),
      description: t("home.projects.item1Description"),
      imageSrc: "/images/projects/project_residential.webp",
      imageAlt: "Residential rooftop solar installation",
    },
    {
      title: t("home.projects.item2Title"),
      description: t("home.projects.item2Description"),
      imageSrc: "/images/projects/project_commercial.webp",
      imageAlt: "Commercial rooftop solar installation",
    },
    {
      title: t("home.projects.item3Title"),
      description: t("home.projects.item3Description"),
      imageSrc: "/images/projects/project_ev_charger.webp",
      imageAlt: "EV charging infrastructure installation",
    },
  ];

  const faqItems = [
    { question: t("home.faq.item1Question"), answer: t("home.faq.item1Answer") },
    { question: t("home.faq.item2Question"), answer: t("home.faq.item2Answer") },
    { question: t("home.faq.item3Question"), answer: t("home.faq.item3Answer") },
    { question: t("home.faq.item4Question"), answer: t("home.faq.item4Answer") },
    { question: t("home.faq.item5Question"), answer: t("home.faq.item5Answer") },
    { question: t("home.faq.item6Question"), answer: t("home.faq.item6Answer") },
  ];

  const marqueeItems = [
    t("home.marquee.item1"),
    t("home.marquee.item2"),
    t("home.marquee.item3"),
    t("home.marquee.item4"),
    t("home.marquee.item5"),
    t("home.marquee.item6"),
    t("home.marquee.item7"),
    t("home.marquee.item8"),
    t("home.marquee.item9"),
  ];

  const finalCtaBenefits = [
    t("home.finalCta.benefit1"),
    t("home.finalCta.benefit2"),
    t("home.finalCta.benefit3"),
    t("home.finalCta.benefit4"),
    t("home.finalCta.benefit5"),
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Amit Kapoor",
      role: "Operations Manager",
      quote:
        "Fujitek delivered right on schedule — communication was clear, and the end result felt genuinely well thought out.",
      imgSrc: "/images/avatars/avatar_male_1.webp",
    },
    {
      name: "Priya Reddy",
      role: "Business Analyst",
      quote:
        "Quality and support stayed consistent throughout. It was easy for our team to move forward with confidence.",
      imgSrc: "/images/avatars/avatar_female_1.webp",
    },
    {
      name: "Vikram Singh",
      role: "Program Lead",
      quote:
        "From planning to rollout, the team stayed proactive, quick, and reliable.",
      imgSrc: "/images/avatars/avatar_male_2.webp",
    },
    {
      name: "Kaif",
      role: "Facilities Supervisor",
      quote:
        "काम बहुत सहज रहा और सहायता टीम हमेशा उपलब्ध रही।",
      imgSrc: "/images/avatars/avatar_male_3.webp",
    },
    {
      name: "Divyansh Pratap Singh",
      role: "Project Coordinator",
      quote:
        "गुणवत्ता और समयसीमा दोनों संतोषजनक रहीं, काम समय पर पूरा हुआ।",
      imgSrc: "/images/avatars/avatar_male_4.webp",
    },
    {
      name: "Suman Singh",
      role: "Partner Manager",
      quote:
        "उपलब्धता और मार्गदर्शन से हमें ग्राहक साइटों पर जल्दी सहायता देने में मदद मिली।",
      imgSrc: "/images/avatars/avatar_female_2.webp",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <h1 className="sr-only">{t("home.srOnly")}</h1>

      <ScrollReveal>
        <BannerHero
          initialBanners={localizedBanners}
          uiText={{
            badge: t("home.hero.badge"),
            titleLine1: t("home.hero.titleLine1"),
            titleLine2: t("home.hero.titleLine2"),
            carouselLabel: t("home.hero.carouselLabel"),
            previousSlide: t("home.hero.previousSlide"),
            nextSlide: t("home.hero.nextSlide"),
            goToSlide: t("home.hero.goToSlide"),
          }}
        />
      </ScrollReveal>

      <ScrollReveal>
        <WhyChooseUs
          reasons={[
            {
              title: t("home.whyChoose.reason1Title"),
              description: t("home.whyChoose.reason1Description"),
            },
            {
              title: t("home.whyChoose.reason2Title"),
              description: t("home.whyChoose.reason2Description"),
            },
            {
              title: t("home.whyChoose.reason3Title"),
              description: t("home.whyChoose.reason3Description"),
            },
            {
              title: t("home.whyChoose.reason4Title"),
              description: t("home.whyChoose.reason4Description"),
            },
          ]}
          copy={{
            badge: t("home.whyChoose.badge"),
            titleLine1: t("home.whyChoose.titleLine1"),
            titleHighlight: t("home.whyChoose.titleHighlight"),
            titleLine2: t("home.whyChoose.titleLine2"),
            description: t("home.whyChoose.description"),
            kpiOneValue: t("home.whyChoose.kpiOneValue"),
            kpiOneLabel: t("home.whyChoose.kpiOneLabel"),
            kpiTwoValue: t("home.whyChoose.kpiTwoValue"),
            kpiTwoLabel: t("home.whyChoose.kpiTwoLabel"),
            primaryCtaLabel: t("home.whyChoose.primaryCta"),
            primaryCtaHref: withLocalePath(locale, "/products"),
            secondaryCtaLabel: t("home.whyChoose.secondaryCta"),
            secondaryCtaHref: withLocalePath(locale, "/contact"),
          }}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.04}>
        <ProductsPreview
          ariaLabel={t("home.products.ariaLabel")}
          badgeLabel={t("home.products.badge")}
          heading={t("home.products.heading")}
          description={t("home.products.description")}
          ctaLabel={t("home.products.cta")}
          ctaHref={withLocalePath(locale, "/products")}
          products={products}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <SolarBenefits
          copy={{
            badge: t("home.solarBenefits.badge"),
            heading: t("home.solarBenefits.heading"),
            description: t("home.solarBenefits.description"),
            previewTitle: t("home.solarBenefits.previewTitle"),
            previewSubtitle: t("home.solarBenefits.previewSubtitle"),
            previewTag: t("home.solarBenefits.previewTag"),
            previewCaption: t("home.solarBenefits.previewCaption"),
            paybackValue: t("home.solarBenefits.paybackValue"),
            paybackLabel: t("home.solarBenefits.paybackLabel"),
            lifespanValue: t("home.solarBenefits.lifespanValue"),
            lifespanLabel: t("home.solarBenefits.lifespanLabel"),
          }}
          benefits={[
            { title: t("home.solarBenefits.item1Title"), description: t("home.solarBenefits.item1Description") },
            { title: t("home.solarBenefits.item2Title"), description: t("home.solarBenefits.item2Description") },
            { title: t("home.solarBenefits.item3Title"), description: t("home.solarBenefits.item3Description") },
            { title: t("home.solarBenefits.item4Title"), description: t("home.solarBenefits.item4Description") },
            { title: t("home.solarBenefits.item5Title"), description: t("home.solarBenefits.item5Description") },
            { title: t("home.solarBenefits.item6Title"), description: t("home.solarBenefits.item6Description") },
          ]}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <ServicesPreview
          ariaLabel={t("home.services.ariaLabel")}
          badgeLabel={t("home.services.badge")}
          heading={t("home.services.heading")}
          description={t("home.services.description")}
          ctaLabel={t("home.services.cta")}
          ctaHref={withLocalePath(locale, "/services")}
          panelCopy={{
            label: t("home.services.panelLabel"),
            title: t("home.services.panelTitle"),
            description: t("home.services.panelDescription"),
          }}
          tags={[t("home.services.tag1"), t("home.services.tag2"), t("home.services.tag3")]}
          cardLabel={t("home.services.cardLabel")}
          services={services}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <MarketingVideoSection />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <TestimonialSlider testimonials={testimonials} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <ProjectsPreview
          ariaLabel={t("home.projects.ariaLabel")}
          badgeLabel={t("home.projects.badge")}
          heading={t("home.projects.heading")}
          description={t("home.projects.description")}
          ctaLabel={t("home.projects.cta")}
          ctaHref={withLocalePath(locale, "/contact")}
          projects={projects}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <InfiniteServicesMarquee
          ariaLabel={t("home.marquee.ariaLabel")}
          srOnlyTitle={t("home.marquee.srOnlyTitle")}
          items={marqueeItems}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.14}>
        <FaqSection
          badgeLabel={t("home.faq.badge")}
          heading={t("home.faq.heading")}
          description={t("home.faq.description")}
          items={faqItems}
          supportCopy={{
            title: t("home.faq.supportTitle"),
            description: t("home.faq.supportDescription"),
            ctaLabel: t("home.faq.supportCta"),
            ctaHref: withLocalePath(locale, "/contact"),
            scheduleOne: t("home.faq.supportSchedule1"),
            scheduleTwo: t("home.faq.supportSchedule2"),
          }}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.16}>
        <FinalCTA
          heading={t("home.finalCta.heading")}
          supportingText={t("home.finalCta.supportingText")}
          ctaLabel={t("home.finalCta.ctaLabel")}
          ctaHref={withLocalePath(locale, "/contact")}
          ariaLabel={t("home.finalCta.ariaLabel")}
          benefits={finalCtaBenefits}
        />
      </ScrollReveal>
    </div>
  );
}
