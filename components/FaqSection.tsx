import Link from "next/link";
import { Card, CardContent, Button, FaqAccordion, SectionHeader } from "./ui";
import { Highlighter } from "@/components/ui/highlighter";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What types of inverters does Fujitek offer?",
    answer:
      "We provide string and hybrid inverters engineered for residential, commercial, and industrial solar installations, optimised for Indian grid conditions.",
  },
  {
    question: "Do you provide installation and commissioning?",
    answer:
      "Yes. Fujitek offers complete lifecycle support including site survey, installation, commissioning, and performance optimisation.",
  },
  {
    question: "What warranties do you offer?",
    answer:
      "All products include manufacturer warranties, supported by our dedicated after-sales and service network.",
  },
  {
    question: "Can I monitor system performance remotely?",
    answer:
      "Most Fujitek inverters support real-time remote monitoring, analytics, and system health insights.",
  },
  {
    question: "How fast is after-sales support?",
    answer:
      "We maintain a strong national service network with prioritised response for critical issues.",
  },
  {
    question: "Do you handle industrial-scale projects?",
    answer:
      "Yes. We design and execute scalable solar and inverter systems for large commercial and industrial facilities.",
  },
];

export default function FaqSection() {
  return (
    <section className="relative w-full bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-section">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-5">
          {/* ================= LEFT — FAQ ================= */}
          <div className="md:col-span-3">
            {/* Section Header */}
            <SectionHeader
              badge="FAQs"
              title={
                <Highlighter action="underline" color="var(--accent)" strokeWidth={2} animationDuration={700} iterations={1}>
                  Frequently Asked Questions About Solar and Inverter Services
                </Highlighter>
              }
              description="Clear answers to help you understand our solar and inverter solutions with confidence."
              className="mb-12"
              badgeClassName="text-sm font-medium normal-case tracking-normal"
              titleClassName="md:text-4xl text-strong"
            />

            <FaqAccordion items={FAQS} className="max-w-3xl" singleOpen defaultOpenIndex={0} />
          </div>

          {/* ================= RIGHT — SUPPORT ================= */}
          <div className="md:col-span-2">
            <Card className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 shadow-[0_22px_46px_rgba(29,92,156,0.14)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />

              <CardContent className="relative z-10 flex flex-col items-center p-8 text-center sm:p-10">
                {/* Icon */}
                <div
                  className="
                    mb-6 flex h-16 w-16 items-center justify-center
                    rounded-full
                    border border-primary/20
                    bg-background text-primary
                    shadow-sm
                  "
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4.2A8.01 8.01 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-foreground">
                  Still need clarity?
                </h3>

                <p className="mt-4 max-w-sm text-base leading-relaxed text-secondary">
                  Our experts will help you choose the right solar and inverter
                  solution for your needs.
                </p>

                <div className="mt-8 w-full max-w-sm">
                  <Button asChild variant="explore" size="lg" className="w-full justify-center">
                    <Link href="/contact">
                      Talk to an Expert
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Monday–Saturday
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Response within 24–48 hours
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

