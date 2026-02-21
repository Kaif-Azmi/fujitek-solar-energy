import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import FeatureGrid from "@/components/services/FeatureGrid";
import HighlightCard from "@/components/services/HighlightCard";
import ExpandableContent from "@/components/services/ExpandableContent";
import type { ExpandableDetails, FeatureItem, HighlightItem } from "@/components/services/types";

type ServiceSectionProps = {
  id: string;
  title: string;
  mainDescription: string;
  featureTitle: string;
  features: FeatureItem[];
  highlightTitle: string;
  highlightDescription?: string;
  highlightItems: HighlightItem[];
  detailParagraphs?: string[];
  expandableDetails?: ExpandableDetails;
  reverse?: boolean;
  background?: "white" | "muted" | "gradient";
  ctaSlot?: ReactNode;
  footerSlot?: ReactNode;
};

const backgroundMap: Record<NonNullable<ServiceSectionProps["background"]>, string> = {
  white: "bg-background",
  muted: "bg-surface",
  gradient: "bg-[linear-gradient(180deg,var(--bg-page)_0%,var(--bg-subtle)_100%)]",
};

function splitIntoReadableParagraphs(text: string) {
  const normalized = text.trim();
  if (!normalized) {
    return [];
  }
  const sentences = normalized.split(/(?<=[.?!])\s+/).filter(Boolean);
  if (sentences.length <= 2) {
    return [normalized];
  }

  const firstChunk: string[] = [];
  const secondChunk: string[] = [];
  let firstWords = 0;

  sentences.forEach((sentence) => {
    const wordCount = sentence.split(/\s+/).filter(Boolean).length;
    if (firstWords < 65 || secondChunk.length === 0) {
      firstChunk.push(sentence);
      firstWords += wordCount;
    } else {
      secondChunk.push(sentence);
    }
  });

  const chunks = [firstChunk.join(" ").trim(), secondChunk.join(" ").trim()].filter(Boolean);
  return chunks.length > 0 ? chunks : [normalized];
}

export default function ServiceSection({
  id,
  title,
  mainDescription,
  featureTitle,
  features,
  highlightTitle,
  highlightDescription,
  highlightItems,
  detailParagraphs = [],
  expandableDetails,
  reverse = false,
  background = "white",
  ctaSlot,
  footerSlot,
}: ServiceSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-32 border-t border-border/60", backgroundMap[background])}>
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
        <div className={cn("grid gap-6 sm:gap-10 lg:grid-cols-2 lg:items-start", reverse ? "lg:[&>*:first-child]:order-2" : "")}>
          <div className="rounded-2xl border border-border/70 bg-background p-5 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
            {expandableDetails ? (
              <ExpandableContent summary={expandableDetails.summary} className="mt-1">
                {expandableDetails.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </ExpandableContent>
            ) : (
              <div className="mt-5 space-y-4">
                {splitIntoReadableParagraphs(mainDescription).map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="max-w-3xl text-base leading-8 text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="lg:sticky lg:top-28">
            <HighlightCard title={highlightTitle} description={highlightDescription} items={highlightItems} />
          </div>
        </div>

        <FeatureGrid title={featureTitle} items={features} />

        {!expandableDetails
          ? detailParagraphs.map((paragraph, index) => (
              <article
                key={paragraph.slice(0, 50)}
                className={cn(
                  "mt-5 rounded-xl border border-border/70 px-5 py-5",
                  index % 2 === 0 ? "bg-background" : "bg-surface",
                )}
              >
                <p className="max-w-4xl text-base leading-8 text-secondary">{paragraph}</p>
              </article>
            ))
          : null}

        {footerSlot ? <div className="mt-6 max-w-4xl">{footerSlot}</div> : null}
        {ctaSlot ? <div className="mt-10">{ctaSlot}</div> : null}
      </div>
    </section>
  );
}

