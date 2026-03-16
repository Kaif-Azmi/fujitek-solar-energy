import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import SectionHeader from "@/components/ui/section-header";
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";

interface Product {
  name: string;
  description: string;
  imageSrc?: string;
}

interface ProductsPreviewProps {
  products?: Product[];
  ariaLabel?: string;
  heading?: string;
  description?: string;
  badgeLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

const PRODUCTS_PREVIEW_DEFAULTS = {
  ariaLabel: "Featured solar products",
  heading: "Solar Products for Reliable Energy Production",
  description:
    "Reliable solar and inverter solutions engineered for performance and long-term efficiency.",
  badgeLabel: "Products",
  ctaHref: "/products",
  ctaLabel: "Explore product catalog",
};

function iconForProductName(name: string): PublicIconName {
  const n = name.toLowerCase();
  if (n.includes("panel")) return "solar-panel";
  if (n.includes("inverter")) return "microchip";
  if (n.includes("batter")) return "battery";
  if (n.includes("ev") || n.includes("charger")) return "car";
  return "sun";
}

function imageForProductName(name: string) {
  const n = name.toLowerCase();
  if (n.includes("panel")) return "/images/solar_panels.webp";
  if (n.includes("inverter")) return "/images/inverters.webp";
  if (n.includes("batter")) return "/images/batteries.webp";
  return "/images/solar_panels.webp";
}

export default function ProductsPreview({
  products = [],
  ariaLabel = PRODUCTS_PREVIEW_DEFAULTS.ariaLabel,
  heading = PRODUCTS_PREVIEW_DEFAULTS.heading,
  description = PRODUCTS_PREVIEW_DEFAULTS.description,
  badgeLabel = PRODUCTS_PREVIEW_DEFAULTS.badgeLabel,
  ctaHref = PRODUCTS_PREVIEW_DEFAULTS.ctaHref,
  ctaLabel = PRODUCTS_PREVIEW_DEFAULTS.ctaLabel,
}: ProductsPreviewProps) {
  const items =
    products.length > 0
      ? products
      : [
          {
            name: "Solar Panels",
            description: "High-efficiency panels for residential and commercial use.",
            imageSrc: "/images/solar_panels.webp",
          },
          {
            name: "Inverters",
            description: "Reliable inverters designed for stable power conversion.",
            imageSrc: "/images/inverters.webp",
          },
          {
            name: "Batteries",
            description: "Advanced energy storage for uninterrupted power supply.",
            imageSrc: "/images/batteries.webp",
          },
        ];

  return (
    <section className="w-full py-section" aria-label={ariaLabel}>
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-12 flex flex-col items-center gap-6 text-center md:mb-14 md:flex-row md:items-end md:justify-between md:text-left">
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
          />

          <Button asChild variant="explore" size="lg" className="shrink-0">
            <Link href={ctaHref} aria-label={ctaLabel}>
              {ctaLabel}
            </Link>
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => {
            const iconName = iconForProductName(product.name);
            const imageSrc = product.imageSrc ?? imageForProductName(product.name);

            return (
              <article key={`${product.name}-${index}`}>
                <Card className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
                    <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-primary/15 blur-2xl" />
                  </div>

                  <Link
                    href={ctaHref}
                    aria-label={`${product.name}: ${ctaLabel}`}
                    className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  />

                  <CardContent className="relative flex h-full flex-col p-6">
                    <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-xl border border-border/60 bg-surface">
                      <Image
                        src={imageSrc}
                        alt={`${product.name} by Fujitek Solar Energy`}
                        fill
                        sizes="(max-width: 768px) 50vw, 224px"
                        quality={72}
                        loading="lazy"
                        decoding="async"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                          <PublicIcon name={iconName} className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                            Product
                          </p>
                          <CardTitle className="text-lg font-semibold text-foreground">
                            {product.name}
                          </CardTitle>
                        </div>
                      </div>

                      <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-secondary transition-colors duration-300 group-hover:border-primary/20 group-hover:text-primary">
                        <span className="text-sm font-semibold" aria-hidden>
                          {">"}
                        </span>
                      </div>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-secondary">
                      {product.description}
                    </p>

                    <p className="mt-5 text-sm font-semibold text-primary">{ctaLabel}</p>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
