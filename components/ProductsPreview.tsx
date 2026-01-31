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
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="flex flex-col items-center justify-center h-full text-center">
              <CardContent className="pt-6 flex flex-col items-center justify-center flex-1 w-full">
                <CardTitle className="mb-3 text-lg">{product.name}</CardTitle>
                <p className="text-sm text-muted leading-relaxed flex-1">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
