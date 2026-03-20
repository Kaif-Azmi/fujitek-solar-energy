import type { FaqItem } from "@/components/services/types";
import { FaqAccordion as SharedFaqAccordion } from "@/components/ui";

type FAQAccordionProps = {
  items: FaqItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <SharedFaqAccordion
      items={items}
      className="mt-8"
      singleOpen
      defaultOpenIndex={0}
    />
  );
}
