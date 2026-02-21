import Link from "next/link";
import Button from "@/components/ui/button";
import type { CtaLink } from "@/components/services/types";

type ServiceHeroProps = {
  title: string;
  intro: string;
  ctas: [CtaLink, CtaLink, CtaLink];
};

function renderHeadingHighlight(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return text;
  }

  const highlightedCount = words.length > 2 ? 2 : 1;
  const normalText = words.slice(0, -highlightedCount).join(" ");
  const highlightedText = words.slice(-highlightedCount).join(" ");

  if (!normalText) {
    return <span className="highlight text-primary">{highlightedText}</span>;
  }

  return (
    <>
      {normalText}{" "}
      <span className="highlight text-primary">{highlightedText}</span>
    </>
  );
}

export default function ServiceHero({ title, intro, ctas }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary/5">
      <div className="absolute inset-0 bg-primary/10" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">Fujitek Solar Energy Pvt. Ltd.</p>
        <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl">
          {renderHeadingHighlight(title)}
        </h1>
        <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-secondary sm:mt-6 sm:text-lg">{intro}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          <Button asChild variant="explore" size="lg" className="w-auto">
            <Link href={ctas[0].href}>{ctas[0].label}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-auto">
            <Link href={ctas[1].href}>{ctas[1].label}</Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-auto">
            <Link href={ctas[2].href}>{ctas[2].label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}



