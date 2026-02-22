import Image from "next/image";
import Link from "next/link";
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
import { Highlighter } from "@/components/ui/highlighter";

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
  const iconByIndex = [Lightning, Wrench, Handshake, Handshake];

  return (
    <section className="relative w-full overflow-hidden bg-background py-section">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          {/* LEFT: COPY + CTA */}
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Fujitek
            </p>

            <h2 className="text-[1.75rem] font-extrabold leading-[1.2] text-foreground sm:text-3xl md:text-4xl">
              <span className="block">Reliable</span>
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                Solar and Inverter Solutions
              </Highlighter>
              <span className="mt-1 block sm:mt-0">Backed by Real Support</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-secondary">
              We combine engineering expertise, high-efficiency components, and dependable
              service so your system stays stable, efficient, and future-ready.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 shadow-sm">
                <span className="text-2xl font-extrabold leading-none text-primary">98%</span>
                <span className="text-sm text-muted">Efficiency maintained in real installs</span>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 shadow-sm">
                <span className="text-2xl font-extrabold leading-none text-primary">24/7</span>
                <span className="text-sm text-muted">Monitoring and technical support</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="explore">
                <Link href="/service" aria-label="Explore our services">
                  Explore Services
                </Link>
              </Button>
              <Button asChild variant="exploreInverse">
                <Link href="/contact" aria-label="Contact Fujitek Solar">
                  Get Free Consultation
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT: IMAGE + FEATURE GRID */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-primary/5 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent" />
              <Image
                src="/solar_engineer.webp"
                alt="Fujitek solar engineer working on inverter installation"
                width={900}
                height={680}
                sizes="(max-width: 1024px) calc(100vw - 3rem), 560px"
                quality={72}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {items.slice(0, 4).map((reason, idx) => {
                const Icon = iconByIndex[idx] || Handshake;
                const isAccent = idx % 2 === 1;
                const spanClassByIndex = [
                  "lg:col-span-3",
                  "lg:col-span-3",
                  "lg:col-span-2",
                  "lg:col-span-4",
                ];

                return (
                  <Card
                    key={reason.title}
                    className={[
                      "group relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl",
                      isAccent
                        ? "border-accent/40 bg-accent/10 hover:border-accent/70 hover:shadow-accent/20"
                        : "border-primary/25 bg-primary/5 hover:border-primary/50 hover:shadow-primary/20",
                      spanClassByIndex[idx] || "lg:col-span-3",
                    ].join(" ")}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className={["absolute -left-16 -top-16 h-44 w-44 rounded-full blur-2xl", isAccent ? "bg-primary/15" : "bg-accent/20"].join(" ")} />
                      <div className={["absolute -right-20 -bottom-24 h-56 w-56 rounded-full blur-2xl", isAccent ? "bg-accent/15" : "bg-primary/15"].join(" ")} />
                    </div>

                    <CardHeader className="relative flex flex-row items-start gap-3 p-5 pb-3">
                      <div className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        isAccent
                          ? "bg-accent/20 text-primary group-hover:bg-accent group-hover:text-primary"
                          : "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white",
                      ].join(" ")}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                        {reason.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="relative px-5 pb-5 pt-0 text-sm leading-relaxed text-secondary">
                      <p>{reason.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
