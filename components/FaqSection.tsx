import Link from "next/link";
import { Card, CardContent, Button, FaqAccordion, SectionHeader } from "./ui";
import { Highlighter } from "@/components/ui/highlighter";
import { PublicIcon } from "@/components/ui/icons";

interface FaqItem {
  question: string;
  answer: string;
}

type FaqSupportCopy = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  scheduleOne: string;
  scheduleTwo: string;
};

interface FaqSectionProps {
  items?: FaqItem[];
  badgeLabel?: string;
  heading?: string;
  description?: string;
  supportCopy?: FaqSupportCopy;
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

const DEFAULT_SUPPORT_COPY: FaqSupportCopy = {
  title: "Still need clarity?",
  description:
    "Connect with our team for inverter selection, EV charger details, bulk supply inquiries, and dealership opportunities.",
  ctaLabel: "Contact Sales",
  ctaHref: "/contact",
  scheduleOne: "Monday-Saturday",
  scheduleTwo: "Response within 24-48 hours",
};

export default function FaqSection({
  items = FAQS,
  badgeLabel = "FAQs",
  heading = "Frequently Asked Questions About Our Solar and EV Products",
  description = "Clear answers about our solar inverters, EV chargers, batteries, and renewable energy hardware.",
  supportCopy = DEFAULT_SUPPORT_COPY,
}: FaqSectionProps) {
  return (
    <section className="relative w-full bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-section">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-5">
          <div className="md:col-span-3">
            <SectionHeader
              badge={badgeLabel}
              title={
                <Highlighter
                  action="underline"
                  color="var(--accent)"
                  strokeWidth={2}
                  animationDuration={700}
                  iterations={1}
                >
                  {heading}
                </Highlighter>
              }
              description={description}
              className="mb-12"
              badgeClassName="text-sm font-medium normal-case tracking-normal"
              titleClassName="md:text-4xl text-strong"
            />

            <FaqAccordion
              items={items}
              className="max-w-3xl"
              singleOpen
              defaultOpenIndex={0}
            />
          </div>

          <div className="md:col-span-2 flex">
            <Card className="flex w-full items-center justify-center rounded-3xl border border-primary/30 bg-primary-deep shadow-lg">
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
                  <PublicIcon name="support" className="h-9 w-9" />
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-white">
                  {supportCopy.title}
                </h3>

                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/90">
                  {supportCopy.description}
                </p>

                <div className="mt-8">
                  <Button asChild variant="exploreInverse" size="lg">
                    <Link href={supportCopy.ctaHref}>{supportCopy.ctaLabel}</Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-white/90">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {supportCopy.scheduleOne}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {supportCopy.scheduleTwo}
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
