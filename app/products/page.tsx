import Link from "next/link";
import { Button } from "@/components/ui";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import FinalCTA from "@/components/FinalCTA";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import type { Metadata } from "next";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type ProductCategory = "Panel" | "Inverter" | "Battery" | "EV Charger";

type ProductDoc = {
  _id: ObjectId;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  publicId: string;
  status: "active" | "inactive";
  createdAt: Date;
};

export const metadata: Metadata = buildPageMetadata(pageSeo.products);

async function getActiveProducts() {
  const db = await getDb();
  const docs = await db
    .collection<ProductDoc>("admin_products")
    .find({ status: "active" })
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    category: doc.category,
    price: doc.price,
    imageUrl: doc.imageUrl,
  }));
}

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <div className="min-h-screen bg-surface">
      <HeroSection
        badge="OUR PRODUCTS"
        title="Complete Solar Product Lineup"
        highlight="Engineered for Lasting Performance"
        description="Explore active Fujitek solar products designed for reliable, efficient, and future-ready energy systems."
      />

      <section className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-35" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-section">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-background p-10 text-center">
              <p className="text-lg font-semibold text-foreground">No active products available</p>
              <p className="mt-2 text-sm text-secondary">
                Please check back soon for updated product listings.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="mb-4 text-secondary">
              Need help choosing components? Explore our{" "}
              <Link
                href="/service"
                className="text-primary underline-offset-4 hover:underline"
              >
                solar installation and maintenance services
              </Link>{" "}
              or speak with our team.
            </p>

            <Link href="/contact">
              <Button variant="default" size="lg">
                Talk to a Solar Consultant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Ready to Go Solar?"
        supportingText="Get expert guidance on the right panels, inverters, batteries, and EV charging solutions for your needs."
        ctaLabel="Contact Us"
        ctaHref="/contact"
        ariaLabel="Products page call to action"
      />
    </div>
  );
}
