import "./globals.css";
import BannerHero from '../components/BannerHero';
import WhyChooseUs from '../components/WhyChooseUs';
import ProductsPreview from '../components/ProductsPreview';
import ServicesPreview from '../components/ServicesPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import FinalCTA from '../components/FinalCTA';
import FaqSection from '../components/FaqSection';

export default function Home() {
  return (
    <div className="w-full">
      <BannerHero />

      {/* WHY CHOOSE US */}
      <section className=" bg-background" aria-label="Why choose us">
        <WhyChooseUs />
      </section>

      {/* PRODUCTS */}
      <section className="py-section bg-surface" aria-label="Products">
        <ProductsPreview
          products={[
            { name: 'Solar Panels', description: 'High-efficiency panels for residential and commercial use.' },
            { name: 'Inverters', description: 'Reliable inverters designed for stable power conversion.' },
            { name: 'Batteries', description: 'Advanced energy storage for uninterrupted power supply.' },
          ]}
        />
      </section>

      {/* SERVICES */}
      <section className="py-section bg-background" aria-label="Services">
        <ServicesPreview
          services={[
            { title: 'Solar Installation', description: 'Professional installation with expert engineering support.' },
            { title: 'Energy Consultation', description: 'System sizing and efficiency planning for maximum ROI.' },
            { title: 'Custom System Design', description: 'Tailored solar and inverter solutions for every need.' },
            { title: 'Maintenance & Support', description: 'Ongoing maintenance and warranty-backed support.' },
            { title: 'Performance Monitoring', description: 'Real-time system monitoring and analytics.' },
            { title: '24/7 Technical Support', description: 'Always-on support for troubleshooting and service.' },
          ]}
        />
      </section>

      {/* PROJECTS */}
      <section className="py-section bg-surface" aria-label="Projects">
        <ProjectsPreview
          projects={[
            { title: 'Rooftop Solar – Delhi', description: 'Residential rooftop solar installation.' },
            { title: 'Commercial Solar – Noida', description: 'Large-scale commercial solar project.' },
            { title: 'Community Center – Gurgaon', description: 'Sustainable energy solution for public infrastructure.' },
          ]}
        />
      </section>

      {/* FAQ */}
      <section className="bg-background" aria-label="FAQ">
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
