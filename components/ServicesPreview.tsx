import { Card, CardContent, CardTitle } from './ui/card'
import {
  Sun,
  Wrench,
  LineChart,
  Headphones,
  Plug,
  ShieldCheck,
} from 'lucide-react'

interface Service {
  title: string
  shortDescription?: string
  description?: string
}

interface ServicesPreviewProps {
  services?: Service[]
}

/* ================= ICON PICKER ================= */
const ServiceIcon = ({ index }: { index: number }) => {
  const icons = [
    Sun,          // Solar / Energy
    Plug,         // Installation / Electrical
    Wrench,       // Maintenance
    LineChart,    // Monitoring / Performance
    ShieldCheck,  // Reliability / Warranty
    Headphones,  // Support
  ]

  const Icon = icons[index % icons.length]

  return <Icon className="h-6 w-6" strokeWidth={1.8} />
}

export default function ServicesPreview({ services = [] }: ServicesPreviewProps) {
  return (
    <section className="w-full py-24 bg-surface" aria-label="Services">
      <div className="mx-auto max-w-6xl px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Services
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-foreground">
            Solar Services Built for Reliability
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-secondary leading-relaxed">
            End-to-end solar and inverter services designed to deliver consistent
            performance, safety, and long-term value.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="
                group relative
                flex h-full flex-col
                rounded-xl
                border border-border
                bg-background
                transition-all duration-300 ease-out

                hover:-translate-y-1.5
                hover:shadow-2xl
                hover:border-primary/40
              "
            >
              {/* ================= ICON ================= */}
              <div className="flex justify-center pt-8">
                <div
                  className="
                    flex h-14 w-14 items-center justify-center
                    rounded-xl
                    bg-primary/10 text-primary
                    transition-all duration-300

                    group-hover:bg-primary
                    group-hover:text-white
                    group-hover:scale-110
                  "
                >
                  <ServiceIcon index={index} />
                </div>
              </div>

              {/* ================= CONTENT ================= */}
              <CardContent className="flex flex-1 flex-col items-center text-center px-7 pt-6 pb-8">
                <CardTitle className="mb-3 text-lg font-semibold text-foreground">
                  {service.title}
                </CardTitle>

                <p className="mb-8 flex-1 text-sm leading-relaxed text-secondary">
                  {service.shortDescription || service.description}
                </p>

                {/* ================= HOVER CTA ================= */}
                <span
                  className="
                    text-sm font-medium text-primary
                    opacity-0 translate-y-1
                    transition-all duration-300

                    group-hover:opacity-100
                    group-hover:translate-y-0
                  "
                >
                  Learn more →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}
