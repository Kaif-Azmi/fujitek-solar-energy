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
    <section className="relative w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          {/* LEFT: COPY + CTA */}
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Fujitek
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
              Reliable{" "}
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                Solar and Inverter Solutions
              </Highlighter>
              , Backed by Real Support
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
                src="/solar_engineer.jpg"
                alt="Fujitek solar engineer working on inverter installation"
                width={900}
                height={680}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {items.slice(0, 4).map((reason, idx) => {
                const Icon = iconByIndex[idx] || Handshake;
                const isPrimary = idx === 0;

                return (
                  <Card
                    key={reason.title}
                    className={[
                      "group relative overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10",
                      isPrimary ? "md:row-span-2" : "",
                    ].join(" ")}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-accent/15 blur-2xl" />
                      <div className="absolute -right-20 -bottom-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
                    </div>

                    <CardHeader className="relative flex flex-row items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-base font-semibold leading-snug text-foreground">
                        {reason.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="relative space-y-4 text-sm leading-relaxed text-secondary">
                      <p>{reason.description}</p>

                      {isPrimary && (
                        <>
                          <ul className="space-y-2 text-sm text-secondary">
                            <li>• High conversion efficiency with low energy loss</li>
                            <li>• Adaptive grid handling for voltage fluctuations</li>
                            <li>• Built-in protection for safe operation</li>
                          </ul>

                          <div className="grid grid-cols-3 gap-3 rounded-xl bg-primary/5 p-4 text-center">
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
                        </>
                      )}
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
