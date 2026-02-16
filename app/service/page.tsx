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
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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

  return (
    <div className="min-h-screen bg-surface">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-primary/10" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <ScrollReveal delay={0.02}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary sm:mb-4 sm:text-sm">
              Our Expertise
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="mb-5 text-3xl font-extrabold leading-tight text-foreground sm:mb-6 sm:text-4xl md:text-5xl">
              End-to-End Solar Services
              <span className="block text-primary">
                Built for Long-Term Trust
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <p className="mx-auto max-w-2xl text-base text-secondary sm:text-lg">
              From system design to lifetime support, Fujitek Solar Energy delivers
              performance you can rely on. Pair these services with our{" "}
              <Link href="/products" className="text-primary underline-offset-4 hover:underline">
                solar products and inverter solutions
              </Link>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section aria-label='services' className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-section sm:px-6">
          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {services.map((service, index) => (
              <ScrollReveal key={`${service.title}-${index}`} delay={index * 0.06} className="h-full">
                <Card
                  className="
                    group relative h-full bg-background
                    border border-border
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-2xl
                    hover:border-primary/40
                  "
                >
                  <CardContent className="flex flex-col gap-4 p-5 sm:gap-5 sm:p-8">

                    {/* ICON */}
                    <div
                      className="
                        relative flex h-12 w-12 items-center justify-center
                        rounded-xl bg-primary/10 text-primary
                        transition-all duration-300
                        sm:h-14 sm:w-14

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

                    <CardTitle className="text-base font-semibold text-foreground sm:text-lg">
                      {service.title}
                    </CardTitle>

                    <p className="text-sm leading-relaxed text-secondary sm:text-base">
                      {service.description}
                    </p>

                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <ScrollReveal delay={0.1}>
          <FinalCTA
            heading="Power Your Home or Business with Confidence"
            supportingText="From system design to lifetime support, our service team is ready to build a solar plan that fits your goals."
            ctaLabel="Get Free Consultation"
            ctaHref="/contact"
            ariaLabel="Services page call to action"
          />
        </ScrollReveal>
      </section>
    </div>
  )
}

