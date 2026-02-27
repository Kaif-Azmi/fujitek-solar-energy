import Link from "next/link";
import { Card, CardContent, Button, FaqAccordion, SectionHeader } from "./ui";
import { Highlighter } from "@/components/ui/highlighter";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What types of inverters does Fujitek manufacture?",
    answer:
      "We manufacture on-grid, off-grid, and hybrid solar inverters engineered for stable power conversion under Indian grid conditions.",
  },
  {
    question: "Do you provide installation services?",
    answer:
      "Fujitek Solar Energy focuses on manufacturing and product supply. Installation is handled by authorized dealers or third-party system integrators.",
  },
  {
    question: "What warranties do your products include?",
    answer:
      "All Fujitek products are backed by manufacturer warranties along with structured after-sales technical support.",
  },
  {
    question: "Do your inverters support remote monitoring?",
    answer:
      "Selected inverter models support real-time monitoring and system diagnostics depending on configuration.",
  },
  {
    question: "Do you supply products in bulk?",
    answer:
      "Yes. We supply solar inverters, EV chargers, batteries, and charge controllers to dealers, distributors, and institutional buyers across India.",
  },
  {
    question: "What EV charging products do you offer?",
    answer:
      "We manufacture lithium e-rickshaw chargers and electric scooty chargers designed for safe and efficient electric mobility charging.",
  },
];

export default function FaqSection() {
  return (
    <section className="relative w-full bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-section">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-5">
          {/* ================= LEFT — FAQ ================= */}
          <div className="md:col-span-3">
            <SectionHeader
              badge="FAQs"
              title={
                <Highlighter
                  action="underline"
                  color="var(--accent)"
                  strokeWidth={2}
                  animationDuration={700}
                  iterations={1}
                >
                  Frequently Asked Questions About Our Solar & EV Products
                </Highlighter>
              }
              description="Clear answers about our solar inverters, EV chargers, batteries, and renewable energy hardware."
              className="mb-12"
              badgeClassName="text-sm font-medium normal-case tracking-normal"
              titleClassName="md:text-4xl text-strong"
            />

            <FaqAccordion
              items={FAQS}
              className="max-w-3xl"
              singleOpen
              defaultOpenIndex={0}
            />
          </div>

          {/* ================= RIGHT — SUPPORT CARD ================= */}
          <div className="md:col-span-2 flex">
            <Card className="flex w-full items-center justify-center rounded-3xl border border-primary/20 bg-primary shadow-lg">
              <CardContent className="flex w-full flex-col items-center justify-center p-8 text-center sm:p-10">
                <div
                  className="
                    mb-6 flex h-16 w-16 items-center justify-center
                    rounded-full
                    border border-white/20
                    bg-white/10 text-white
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

                <h3 className="text-3xl font-bold tracking-tight text-white">
                  Still need clarity?
                </h3>

                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/85">
                  Connect with our team for inverter selection, EV charger details,
                  bulk supply inquiries, and dealership opportunities.
                </p>

                <div className="mt-8">
                  <Button asChild variant="exploreInverse" size="lg">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Monday–Saturday
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1">
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