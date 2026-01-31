import BannerHero from '../components/BannerHero';
import WhyChooseUs from '../components/WhyChooseUs';
import ProductsPreview from '../components/ProductsPreview';
import ServicesPreview from '../components/ServicesPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import FinalCTA from '../components/FinalCTA';
import FaqSection from '../components/FaqSection';

export default function Home() {
  return (
    <div className="w-full bg-background">
      <BannerHero />

      <section className="py-section bg-background" aria-label="Why choose us">
        <WhyChooseUs reasons={[
          { title: 'Quality', description: 'Industry-leading solar products with certified efficiency and durability standards.' },
          { title: 'Experience', description: '15+ years of expertise in solar energy solutions and installations.' },
          { title: 'Support', description: '24/7 customer support and comprehensive warranty coverage for peace of mind.' },
          { title: 'Innovation', description: 'Cutting-edge technology and sustainable solutions for tomorrow\'s energy needs.' }
        ]} />
      </section>

      <section className="py-section bg-surface" aria-label="Products">
        <ProductsPreview
          products={[
            { name: 'Solar Panels', description: 'High-efficiency solar panels for residential and commercial use.' },
            { name: 'Inverters', description: 'Reliable inverters to convert solar energy efficiently.' },
            { name: 'Batteries', description: 'Energy storage solutions for uninterrupted power.' }
          ]}
        />
      </section>

      <section className="py-section bg-background" aria-label="Services">
        <ServicesPreview
          services={[
            { title: 'Solar Installation', description: 'Professional installation of solar panels for residential and commercial properties with expert guidance.' },
            { title: 'Energy Consultation', description: 'Comprehensive energy efficiency consultations to maximize your solar system performance.' },
            { title: 'System Design', description: 'Custom system design and optimization tailored to your specific energy needs and budget.' },
            { title: 'Maintenance Support', description: 'Ongoing maintenance and warranty support services to keep your system running efficiently.' },
            { title: 'Performance Monitoring', description: 'Real-time monitoring and analytics to track your solar energy production and savings.' },
            { title: '24/7 Support', description: 'Dedicated customer support team available around the clock for assistance and troubleshooting.' }
          ]}
        />
      </section>

      <section className="py-section bg-surface" aria-label="Projects">
        <ProjectsPreview
          projects={[
            { title: 'Rooftop Solar – Delhi', description: 'Complete solar setup for a family home.' },
            { title: 'Commercial Installation – Noida', description: 'Large-scale solar installation for a business.' },
            { title: 'Community Center – Gurgaon', description: 'Sustainable energy solution for public spaces.' }
          ]}
        />
      </section>

      <FaqSection />

      <FinalCTA
        heading="Ready to Go Solar?"
        supportingText="Contact us today to start your solar journey."
        ctaLabel="Contact Us"
      />
    </div>
  );
}
