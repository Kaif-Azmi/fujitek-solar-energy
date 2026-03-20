"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type FaqAccordionItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqAccordionItem[];
  className?: string;
  itemClassName?: string;
  defaultOpenIndex?: number;
  singleOpen?: boolean;
};

export default function FaqAccordion({
  items,
  className,
  itemClassName,
  defaultOpenIndex = 0,
  singleOpen = true,
}: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    items.length > 0 && defaultOpenIndex >= 0 ? [defaultOpenIndex] : [],
  );

  const toggleItem = (index: number) => {
    setOpenIndexes((current) => {
      const isOpen = current.includes(index);
      if (singleOpen) {
        return isOpen ? [] : [index];
      }
      return isOpen ? current.filter((i) => i !== index) : [...current, index];
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <article
            key={item.question}
            className={cn(
              "rounded-xl border border-border bg-background p-5 shadow-soft transition-colors",
              isOpen ? "border-primary" : "",
              itemClassName,
            )}
          >
            <button
              id={triggerId}
              type="button"
              className="flex w-full items-start justify-between gap-4 text-left"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="text-base font-semibold leading-7 text-foreground">
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-secondary transition-colors",
                  isOpen ? "border-primary bg-primary text-white" : "",
                )}
                aria-hidden
              >
                <span className="text-sm font-semibold">{isOpen ? "-" : "+"}</span>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
                isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-60",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-7 text-secondary">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
