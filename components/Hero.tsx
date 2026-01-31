interface HeroProps {
  heading: string;
  subheading: string;
  ctaLabel: string;
}

export default function Hero({ heading, subheading, ctaLabel }: HeroProps) {
  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">{heading}</h1>
        <p className="text-xl text-muted mb-8">{subheading}</p>
        <button className="bg-primary-hover text-white px-6 py-3 rounded-md hover:bg-primary transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">{ctaLabel}</button>
      </div>
    </section>
  );
}
