import { Card, CardContent, CardTitle } from './ui/card';

interface Product {
  name: string;
  description: string;
}

interface ProductsPreviewProps {
  products?: Product[];
}

export default function ProductsPreview({ products = [] }: ProductsPreviewProps) {
  return (
    <section className="w-full" aria-label="Products">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Products
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground">
            Our Products
          </h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto">
            Reliable solar and inverter solutions engineered for performance and long-term efficiency.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Card
              key={index}
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
                <span
                  className="
                    text-sm font-medium text-primary
                    opacity-0 transition-opacity
                    group-hover:opacity-100
                  "
                >
                  View details →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
