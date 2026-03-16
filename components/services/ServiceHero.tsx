import Link from "next/link";
import Button from "@/components/ui/button";
import type { CtaLink } from "@/components/services/types";
import { PublicIcon } from "@/components/ui/icons";

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
    <section className="relative overflow-hidden border-b border-border/60 bg-[linear-gradient(165deg,#eef4fb_0%,#e6eff8_40%,#f4f9ff_100%)]">
      <div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.13em] text-primary sm:text-[0.78rem]">
              Fujitek Solar Energy Pvt. Ltd.
            </p>
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl">
              {renderHeadingHighlight(title)}
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-secondary sm:text-lg">{intro}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-border/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.11em] text-primary-deep">
                Dealers
              </span>
              <span className="rounded-full border border-border/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.11em] text-primary-deep">
                OEM Partners
              </span>
              <span className="rounded-full border border-border/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.11em] text-primary-deep">
                Bulk Supply
              </span>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Button asChild variant="explore" size="lg" className="w-auto">
                <Link href={ctas[0].href}>{ctas[0].label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-auto bg-white/80">
                <Link href={ctas[1].href}>{ctas[1].label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-auto bg-white/90">
                <Link href={ctas[2].href}>{ctas[2].label}</Link>
              </Button>
            </div>
          </div>

          <aside className="rounded-2xl border border-primary/20 bg-white/85 p-5 shadow-soft backdrop-blur sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Why Businesses Choose Fujitek</p>
            <ul className="mt-4 space-y-3">
              {[
                "High-efficiency power electronics with tested reliability.",
                "Scalable supply for distributors, dealers, and institutions.",
                "Technical guidance for product selection and project fitment.",
                "Supportive post-order communication for smoother execution.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <PublicIcon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-sm font-medium leading-6 text-primary-deep">{item}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}



