import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, Button } from "./ui";
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
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                FAQs
              </span>

              <h2 className="mt-5 text-3xl text-strong tracking-tight text-foreground md:text-4xl">
                <Highlighter
                  action="underline"
                  color="var(--accent)"
                  strokeWidth={2}
                  animationDuration={700}
                  iterations={1}
                >
                  Frequently Asked Questions About Solar and Inverter Services
                </Highlighter>
              </h2>

              <p className="mt-4 text-secondary">
                Clear answers to help you understand our solar and inverter
                solutions with confidence.
              </p>
            </div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              {FAQS.map((f, i) => (
                <Card
                  key={i}
                  className="
    relative overflow-hidden
    bg-background
    transition-all duration-300
    hover:-translate-y-2
  "
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {/* Soft glow */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      bg-primary/10
                      opacity-0 transition-opacity
                      group-hover:opacity-100
                    "
                  />

                  {/* Accent spine */}
                  <div
                    className="
                      absolute left-0 top-0 h-full w-[3px]
                      bg-primary
                      opacity-0 transition-opacity
                      group-hover:opacity-100
                    "
                  />

                  {/* Icon bubble */}
                  <div className="absolute right-4 top-4 z-10">
                    <div
                      className="
                        flex h-11 w-11 items-center justify-center
                        rounded-full
                        bg-primary/10 text-primary
                        ring-1 ring-primary/20
                        transition-all
                        group-hover:bg-primary
                        group-hover:text-white
                        group-hover:ring-primary/40
                      "
                    >
                      ?
                    </div>
                  </div>

                  <CardHeader className="p-6 pr-16">
                    <CardTitle className="text-lg leading-snug">
                      {f.question}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 pt-2 text-sm leading-relaxed text-muted">
                    {f.answer}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ================= RIGHT — SUPPORT ================= */}
          <div className="md:col-span-2">
            <Card
              variant="green"
              className="
              bg-primary
                relative flex min-h-[380px] flex-col
                justify-center overflow-hidden
              "
            >
              {/* Background tint */}
              <div className="absolute inset-0 bg-primary/10" />

              <CardContent className="relative z-10 flex flex-col items-center p-12 text-center">
                {/* Icon */}
                <div
                  className="
                    mb-7 flex h-16 w-16 items-center justify-center
                    rounded-full
                    bg-primary/25 text-primary
                    ring-1 ring-primary/30
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

                <h3 className="text-2xl font-semibold text-foreground">
                  Still need clarity?
                </h3>

                <p className="mt-4 max-w-sm text-sm text-secondary">
                  Our experts will help you choose the right solar and inverter
                  solution for your needs.
                </p>

                <div className="mt-10 w-full max-w-xs">
                  <Link href="/contact">
                    <Button size="lg" className="w-full">
                      Talk to an Expert
                    </Button>
                  </Link>
                </div>

                <p className="mt-5 text-xs text-muted">
                  Monday–Saturday · Response within 24–48 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

