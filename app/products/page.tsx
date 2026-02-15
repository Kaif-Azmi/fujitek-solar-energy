import Link from 'next/link';
import { Button } from '@/components/ui';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from "next";
import { buildPageMetadata, pageSeo } from "@/lib/seo";

interface Product {
  title: string;
  description: string;
  price: string;
}

export const metadata: Metadata = buildPageMetadata(pageSeo.products);

export default function Products() {
  const products: Product[] = [
    { title: 'Solar Panels', description: 'High-efficiency photovoltaic panels for maximum energy generation', price: 'Starting from $500' },
    { title: 'Inverters', description: 'Advanced inverters for power conversion and system optimization', price: 'Starting from $2000' },
    { title: 'Battery Storage', description: 'Energy storage solutions for 24/7 power availability', price: 'Starting from $3000' },
    { title: 'Mounting Systems', description: 'Durable mounting hardware for safe installation', price: 'Starting from $300' },
    { title: 'Monitoring Systems', description: 'Real-time system monitoring and analytics', price: 'Starting from $800' },
    { title: 'Accessories', description: 'Cables, connectors, and other essential components', price: 'Starting from $100' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-section">
        <header className="text-center mb-16">
          <h1 className="text-4xl text-strong text-foreground mb-4">Our Products</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            We offer a complete range of solar energy products and components to meet all your renewable energy needs.
          </p>
        </header>

        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-secondary mb-4">
            Need help choosing components? Explore our{" "}
            <Link href="/service" className="text-primary underline-offset-4 hover:underline">
              solar installation and maintenance services
            </Link>{" "}
            or speak with our team.
          </p>
          <Link href="/contact">
            <Button variant="default" size="lg">Talk to a Solar Consultant</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

