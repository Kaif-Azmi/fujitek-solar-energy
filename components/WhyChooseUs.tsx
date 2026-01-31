import { Card, CardContent, CardHeader, CardTitle, Lightning, Wrench, Handshake } from "./ui"
import ExploreButton from "./ExploreButton"
import Image from "next/image"

interface Reason {
  title: string
  description: string
}

interface WhyChooseUsProps {
  reasons?: Reason[]
}

const DEFAULT_REASONS: Reason[] = [
  { title: "Advanced Inverter Technology", description: "High-performance inverters built for Indian grid conditions." },
  { title: "End-to-End Service Support", description: "Complete support from installation to maintenance." },
  { title: "Proven Industry Experience", description: "Years of expertise delivering dependable solar solutions." },
  { title: "Trusted After-Sales Network", description: "Fast service, genuine parts, and expert technicians." },
]

export default function WhyChooseUs({ reasons }: WhyChooseUsProps) {
  const items = reasons && reasons.length > 0 ? reasons : DEFAULT_REASONS

  return (
    <section className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT COLUMN (IMAGE ONLY ON DESKTOP) */}
          <div className="hidden lg:block relative">
            <Image
              src="/solar_engineer.jpg"
              alt="Solar Engineer"
              width={600}
              height={500}
              className="rounded-3xl object-cover"
              priority
            />

            {/* Desktop overlays */}
            <Card className="absolute -top-10 -left-10 w-56 shadow-xl rounded-2xl card--primary">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-accent">98%</p>
                <p className="text-sm text-muted">Efficiency Rate</p>
              </CardContent>
            </Card>

            <Card className="absolute -bottom-10 -right-10 w-60 shadow-xl rounded-2xl card--primary">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-accent">24/7</p>
                <p className="text-sm text-muted">Customer Support</p>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN (FULL MOBILE FLOW + DESKTOP CONTENT) */}
          <div>

            {/* 1️⃣ WHY + HEADING + PARA */}
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Why choose Fujitek
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
              Powering Reliable Solar Solutions for Homes & Businesses
            </h2>

            <p className="text-muted mb-10 max-w-xl">
              Fujitek Solar Energy delivers high-efficiency solar inverter solutions
              designed for long-term reliability and performance.
            </p>

            {/* 2️⃣ IMAGE (MOBILE ONLY, AFTER TEXT) */}
            <div className="lg:hidden mb-10">
              <Image
                src="/solar_engineer.jpg"
                alt="Solar Engineer"
                width={600}
                height={500}
                className="rounded-3xl object-cover"
              />
            </div>

            {/* 3️⃣ FEATURE CARDS (QUALITY → EXPERIENCE → SUPPORT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Quality */}
              <Card className="md:row-span-2 shadow-md rounded-2xl relative card--primary-border">
                <Lightning className="absolute top-4 right-4" />
                <CardHeader>
                  <CardTitle>{items[0].title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted">
                  {items[0].description}
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="shadow-md rounded-2xl relative card--primary-border">
                <Wrench className="absolute top-4 right-4" />
                <CardHeader>
                  <CardTitle>{items[1].title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted">
                  {items[1].description}
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="shadow-md rounded-2xl relative card--accent-border">
                <Handshake className="absolute top-4 right-4" />
                <CardHeader>
                  <CardTitle>{items[3].title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted">
                  {items[3].description}
                </CardContent>
              </Card>
            </div>

            {/* 4️⃣ BUTTON (ALWAYS LAST) */}
            <div className="mt-10">
              <ExploreButton />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
