import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Lightning,
  Wrench,
  Handshake,
} from "./ui";
import { Button } from "@/components/ui/button";

interface Reason {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  reasons?: Reason[];
}

const DEFAULT_REASONS: Reason[] = [
  {
    title: "Advanced Inverter Technology",
    description:
      "High-efficiency solar inverters engineered for Indian grid conditions, voltage fluctuations, and long operational life.",
  },
  {
    title: "End-to-End Service Support",
    description:
      "From system design and installation to commissioning, monitoring, and maintenance — we handle it all.",
  },
  {
    title: "Proven Industry Experience",
    description:
      "Years of on-ground experience delivering reliable solar and inverter solutions for residential, commercial, and industrial clients.",
  },
  {
    title: "Trusted After-Sales Network",
    description:
      "Fast response times, genuine spare parts, and trained technicians to ensure uninterrupted system performance.",
  },
];

export default function WhyChooseUs({ reasons }: WhyChooseUsProps) {
  const items = reasons && reasons.length > 0 ? reasons : DEFAULT_REASONS;

  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* ================= BACKGROUND PATTERN (NEW) ================= */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* ================= LEFT — IMAGE ================= */}
          <div className="relative hidden lg:flex justify-center">
            {/* GREEN GLOW (NEW — SaaS STYLE) */}
            <div className="absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />

            <div className="relative">
              <Image
                src="/solar_engineer.jpg"
                alt="Fujitek solar engineer working on inverter installation"
                width={600}
                height={520}
                className="relative z-10 rounded-3xl object-cover"
                priority
              />

              {/* ================= EFFICIENCY CARD ================= */}
              <div className="absolute -top-6 -left-6 z-20">
                <Card
                  className="
    w-56
    rounded-2xl
    border border-border
    bg-background
    shadow-[0_20px_50px_rgba(0,0,0,0.15)]
  "
                >
                  {/* Accent strip */}
                  <div className="h-1 w-full rounded-t-2xl bg-primary" />

                  <CardContent className="p-5">
                    <p className="text-4xl font-extrabold leading-none text-primary">
                      98%
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      System efficiency maintained across real-world
                      installations
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* ================= SUPPORT CARD ================= */}
              <div className="absolute -bottom-6 -right-6 z-20">
                <Card
                  className="
    w-60
    rounded-2xl
    border border-border
    bg-background
    shadow-[0_20px_50px_rgba(0,0,0,0.15)]
  "
                >
                  {/* Accent strip */}
                  <div className="h-1 w-full rounded-t-2xl bg-accent" />

                  <CardContent className="p-5">
                    <p className="text-4xl font-extrabold leading-none text-primary">
                      24/7
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Continuous monitoring and expert technical support
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* ================= RIGHT — CONTENT ================= */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
              Why Choose Fujitek
            </p>

            <h2 className="mb-4 text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
              Reliable Solar & Inverter Solutions Built for Long-Term
              Performance
            </h2>

            <p className="mb-10 max-w-xl text-muted">
              At Fujitek Solar Energy, we combine advanced inverter technology,
              engineering expertise, and dependable service to deliver solar
              power systems you can trust — today and for years to come.
            </p>

            {/* MOBILE IMAGE */}
            <div className="relative mb-10 lg:hidden">
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-[100px]" />
              <Image
                src="/solar_engineer.jpg"
                alt="Fujitek solar engineer on-site"
                width={600}
                height={520}
                className="relative rounded-3xl object-cover"
              />
            </div>

            {/* ================= FEATURE CARDS ================= */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  {/* TECHNOLOGY */}
  <Card className="group relative flex flex-col rounded-2xl border border-border bg-background transition-all hover:border-primary/40 hover:shadow-xl md:row-span-2">
    <CardHeader className="flex flex-row items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
        <Lightning className="h-5 w-5" />
      </div>

      <CardTitle className="leading-snug">
        {items[0].title}
      </CardTitle>
    </CardHeader>

    <CardContent className="flex flex-1 flex-col gap-4 text-sm text-muted">
      <p>{items[0].description}</p>

      <ul className="space-y-2">
        <li>• High conversion efficiency with low energy loss</li>
        <li>• Adaptive grid handling for voltage fluctuations</li>
        <li>• Built-in protection for safe operation</li>
      </ul>

      {/* Feature Metrics */}
      <div className="mt-auto grid grid-cols-3 gap-3 rounded-xl bg-primary/5 p-4 text-center">
        <div>
          <p className="font-semibold text-foreground">High</p>
          <p className="text-xs text-muted">Efficiency</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Stable</p>
          <p className="text-xs text-muted">Grid Sync</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Secure</p>
          <p className="text-xs text-muted">Design</p>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* SERVICE */}
  <Card className="group relative flex flex-col rounded-2xl border border-border bg-background transition-all hover:border-primary/40 hover:shadow-xl">
    <CardHeader className="flex flex-row items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
        <Wrench className="h-5 w-5" />
      </div>

      <CardTitle>{items[1].title}</CardTitle>
    </CardHeader>

    <CardContent className="text-sm text-muted">
      {items[1].description}
    </CardContent>
  </Card>

  {/* SUPPORT */}
  <Card className="group relative flex flex-col rounded-2xl border border-border bg-background transition-all hover:border-primary/40 hover:shadow-xl">
    <CardHeader className="flex flex-row items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
        <Handshake className="h-5 w-5" />
      </div>

      <CardTitle>{items[3].title}</CardTitle>
    </CardHeader>

    <CardContent className="text-sm text-muted">
      {items[3].description}
    </CardContent>
  </Card>
</div>


            {/* CTA */}
            <div className="mt-12">
              <Button variant="explore">Explore</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
