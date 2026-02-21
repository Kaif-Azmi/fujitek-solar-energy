type HeroSectionProps = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
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

export default function HeroSection({
  badge,
  title,
  highlight,
  description,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary/5">
      <div className="absolute inset-0 bg-primary/10" />

      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          {badge}
        </p>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
          {title}
          <span className="block">{renderHeadingHighlight(highlight)}</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-secondary">{description}</p>
      </div>
    </section>
  );
}

