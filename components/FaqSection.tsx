import Link from "next/link";
import { Card, CardContent, Button, FaqAccordion } from "./ui";
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

            <FaqAccordion items={FAQS} className="max-w-3xl" singleOpen defaultOpenIndex={0} />
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

