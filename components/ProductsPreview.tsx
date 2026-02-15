import { Card, CardContent, CardTitle } from './ui/card';
import Link from "next/link";

interface Product {
  name: string;
  description: string;
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

export default function ProductsPreview({
  products = [],
  ariaLabel = PRODUCTS_PREVIEW_DEFAULTS.ariaLabel,
  heading = PRODUCTS_PREVIEW_DEFAULTS.heading,
  description = PRODUCTS_PREVIEW_DEFAULTS.description,
  badgeLabel = PRODUCTS_PREVIEW_DEFAULTS.badgeLabel,
  ctaHref = PRODUCTS_PREVIEW_DEFAULTS.ctaHref,
  ctaLabel = PRODUCTS_PREVIEW_DEFAULTS.ctaLabel,
}: ProductsPreviewProps) {
  return (
    <section className="w-full" aria-label={ariaLabel}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {badgeLabel}
          </span>
          <h2 className="mt-4 text-3xl text-strong text-foreground">
            {heading}
          </h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article key={index}>
              <Card
                className="
                  group relative
                  flex h-full flex-col
                  border border-border
                  bg-background
                  transition-all duration-300

                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:border-primary/40
                "
              >
                {/* Accent top bar */}
                <div className="h-1 w-full bg-primary" />

                <CardContent className="flex flex-1 flex-col items-center text-center p-6">
                  {/* Product name */}
                  <CardTitle className="mb-3 text-lg font-semibold text-foreground">
                    {product.name}
                  </CardTitle>

                  {/* Description */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>

                  {/* Subtle affordance */}
                  <Link
                    href={ctaHref}
                    className="
                      text-sm font-medium text-primary
                      opacity-0 transition-opacity
                      group-hover:opacity-100
                    "
                  >
                    {ctaLabel} →
                  </Link>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

