import Link from 'next/link';
import {
  Card,
  CardContent,
  CardTitle,
  Button,
  Lightning,
  Wrench,
  Handshake,
} from '@/components/ui';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Service() {
  const services: Service[] = [
    {
      title: 'Solar Installation',
      description:
        'Professional installation of solar panels and inverter systems by certified technicians, ensuring safety and long-term performance.',
      icon: <Lightning />,
    },
    {
      title: 'Energy Consultation',
      description:
        'Expert guidance to help you choose the most efficient and cost-effective solar solution for your needs.',
      icon: <Handshake />,
    },
    {
      title: 'System Design',
      description:
        'Custom-designed solar systems optimized for your location, energy usage, and future expansion.',
      icon: <Wrench />,
    },
    {
      title: 'Maintenance & Cleaning',
      description:
        'Scheduled maintenance and cleaning to keep your solar system operating at peak efficiency.',
      icon: <Wrench />,
    },
    {
      title: 'Performance Monitoring',
      description:
        'Real-time system monitoring with detailed insights into energy production and savings.',
      icon: <Lightning />,
    },
    {
      title: '24/7 Technical Support',
      description:
        'Round-the-clock support with quick response times and trained service engineers.',
      icon: <Handshake />,
    },
  ];

  const highlights = [
    'Certified and experienced solar professionals',
    'High-quality components with proven reliability',
    'Transparent pricing with no hidden charges',
    'Strong warranty and dependable after-sales support',
  ];

  return (
    <div className="min-h-screen bg-surface">

      {/* ================= HERO / INTRO ================= */}
      <section className="bg-primary/5">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary mb-3">
            Our Expertise
          </p>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            End-to-End Solar Services You Can Trust
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Fujitek Solar Energy delivers reliable solar services — from planning
            and installation to long-term maintenance and support.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="
                  relative h-full bg-background
                  transition-all
                  hover:shadow-xl
                "
              >
                <CardContent className="p-7 flex flex-col gap-4">

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {service.icon}
                  </div>

                  <CardTitle className="text-lg">
                    {service.title}
                  </CardTitle>

                  <p className="text-secondary leading-relaxed">
                    {service.description}
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST BLOCK ================= */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Card className="bg-primary/5 border border-border">
            <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Why Choose Fujitek Solar Services?
                </h2>
                <p className="text-secondary mb-6">
                  We focus on technical excellence, safety, and long-term value —
                  not just installations.
                </p>

                <ul className="space-y-4">
                  {highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="
                          flex h-6 w-6 shrink-0 items-center justify-center
                          rounded-full bg-success text-secondary text-sm font-medium
                        "
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right CTA */}
              <div className="flex flex-col items-center text-center gap-4">
                <p className="text-secondary">
                  Speak with our experts and get a customised solar plan.
                </p>
                <Link href="/contact">
                  <Button size="lg">
                    Get a Free Consultation
                  </Button>
                </Link>
              </div>

            </CardContent>
          </Card>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-background">
  <div className="max-w-6xl mx-auto px-6 py-20 text-center">
    <h2 className="text-3xl font-bold text-foreground mb-4">
      Ready to Switch to Solar Energy?
    </h2>
    <p className="text-secondary mb-8">
      Contact our team today and take the first step toward clean,
      reliable, and cost-effective solar power.
    </p>
    <Link href="/contact">
      <Button size="lg">
        Contact Our Team
      </Button>
    </Link>
  </div>
</section>


    </div>
  );
}
