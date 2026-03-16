"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ExpandableContentProps = {
  summary: string;
  children: React.ReactNode;
  className?: string;
  expandLabel?: string;
  collapseLabel?: string;
};

function splitSummaryIntoParagraphs(text: string) {
  const normalized = text.trim();
  if (!normalized) {
    return [];
  }
  const sentences = normalized.split(/(?<=[.?!])\s+/).filter(Boolean);
  if (sentences.length <= 2) {
    return [normalized];
  }
  const chunkA: string[] = [];
  const chunkB: string[] = [];
  let count = 0;
  sentences.forEach((sentence) => {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (count < 75 || chunkB.length === 0) {
      chunkA.push(sentence);
      count += words;
    } else {
      chunkB.push(sentence);
    }
  });
  return [chunkA.join(" ").trim(), chunkB.join(" ").trim()].filter(Boolean);
}

export default function ExpandableContent({
  summary,
  children,
  className,
  expandLabel = "Read more",
  collapseLabel = "Show less",
}: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = useId();

  return (
    <div className={cn("mt-4", className)}>
      <div className="space-y-4">
        {splitSummaryIntoParagraphs(summary).map((paragraph) => (
          <p key={paragraph.slice(0, 52)} className="max-w-3xl text-base leading-8 text-secondary">
            {paragraph}
          </p>
        ))}
      </div>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out",
          isExpanded ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-90",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 text-base leading-8 text-secondary [&>p]:max-w-4xl">{children}</div>
        </div>
      </div>

      {!isExpanded ? <div className="-mt-10 h-10 bg-gradient-to-t from-background to-transparent" aria-hidden /> : null}

      <Button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onClick={() => setIsExpanded((prev) => !prev)}
        variant="secondary"
        className="mt-2 w-full gap-2 rounded-full sm:w-auto"
      >
        {isExpanded ? collapseLabel : expandLabel}
        <span
          aria-hidden
          className={cn("text-xs font-semibold transition-transform", isExpanded ? "rotate-180" : "")}
        >
          v
        </span>
      </Button>
    </div>
  );
}
