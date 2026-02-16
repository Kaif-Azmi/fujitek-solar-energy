import Link from 'next/link'
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardTitle,
  Button,
  Lightning,
  Wrench,
  Handshake,
} from '@/components/ui'
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import FinalCTA from "@/components/FinalCTA";
import { buildPageMetadata, pageSeo } from "@/lib/seo";

interface Service {
  title: string
  description: string
  icon: React.ReactNode
}

export const metadata: Metadata = buildPageMetadata(pageSeo.services);

export default function ServicesPage() {
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
  ]

  const highlights = [
    'Certified and experienced solar professionals',
    'High-quality components with proven reliability',
    'Transparent pricing with no hidden charges',
    'Strong warranty and dependable after-sales support',
  ]

  return (
    <div className="min-h-screen bg-surface">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-primary/10" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Our Expertise
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight">
            End-to-End Solar Services
            <span className="block text-primary">
              Built for Long-Term Trust
            </span>
          </h1>

          <p className="text-lg text-secondary max-w-2xl mx-auto">
            From system design to lifetime support, Fujitek Solar Energy delivers
            performance you can rely on. Pair these services with our{" "}
            <Link href="/products" className="text-primary underline-offset-4 hover:underline">
              solar products and inverter solutions
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section aria-label='services' className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-30" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card
                key={index}
                className="
                  group relative h-full bg-background
                  border border-border
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-2xl
                  hover:border-primary/40
                "
              >
                <CardContent className="p-8 flex flex-col gap-5">

                  {/* ICON */}
                  <div
                    className="
                      relative flex h-14 w-14 items-center justify-center
                      rounded-xl bg-primary/10 text-primary
                      transition-all duration-300

                      group-hover:bg-primary
                      group-hover:text-white
                      group-hover:scale-110
                    "
                  >
                    {/* subtle glow ring */}
                    <span
                      className="
                        absolute inset-0 rounded-xl
                        bg-primary/20 opacity-0 blur-md
                        transition-opacity duration-300
                        group-hover:opacity-100
                      "
                    />

                    {/* actual icon */}
                    <span className="relative">
                      {service.icon}
                    </span>
                  </div>

                  <CardTitle className="text-lg font-semibold text-foreground">
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
        <FinalCTA
        heading="Power Your Home or Business with Confidence"
        supportingText="From system design to lifetime support, our service team is ready to build a solar plan that fits your goals."
        ctaLabel="Get Free Consultation"
        ctaHref="/contact"
        ariaLabel="Services page call to action"
      />
      </section>


      {/* ================= TRUST ================= */}
      {/* <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Card className="bg-primary/5 border border-border shadow-sm">
            <CardContent className="p-12 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

              <div>
                <h2 className="text-2xl text-strong text-foreground mb-4">
                  Why Choose Fujitek Solar Services?
                </h2>

                <p className="text-secondary mb-8">
                  We focus on technical excellence, safety, and long-term value —
                  not just installations.
                </p>

                <ul className="space-y-5">
                  {highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="
                          flex h-7 w-7 shrink-0 items-center justify-center
                          rounded-full bg-success-bg text-success
                          text-sm font-bold
                        "
                      >
                        ✓
                      </span>
                      <span className="text-secondary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center text-center gap-5">
                <p className="text-secondary max-w-sm">
                  Speak with our experts and get a customised solar plan built
                  around your energy needs.
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
      </section> */}


    </div>
  )
}

