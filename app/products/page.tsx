import Link from "next/link";
import { Button } from "@/components/ui";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import FinalCTA from "@/components/FinalCTA";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getOptimizedCloudinaryUrl } from "@/lib/image";
import { getProductListSchema } from "@/lib/structured-data";
import { defaultLocale, withLocalePath, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/i18n-server";

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
export const revalidate = 300;

async function getActiveProducts() {
  const db = await getDb();
  const docs = await db
    .collection<ProductDoc>("admin_products")
    .find({ status: "active" }, { projection: { name: 1, category: 1, price: 1, imageUrl: 1 } })
    .sort({ createdAt: -1 })
    .limit(120)
    .toArray();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    name: doc.name,
    category: doc.category,
    price: doc.price,
    imageUrl: getOptimizedCloudinaryUrl(doc.imageUrl, { width: 960, quality: 72, crop: "fit" }),
  }));
}

type ProductsPageProps = {
  locale?: Locale;
};

export default async function ProductsPage({ locale = defaultLocale }: ProductsPageProps = {}) {
  const products = await getActiveProducts();
  const t = await getTranslator(locale);
  const productListSchema =
    products.length > 0
      ? getProductListSchema(
          products.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.imageUrl,
          })),
        )
      : null;

  return (
    <div className="min-h-screen bg-surface">
      {productListSchema ? <JsonLd data={productListSchema} /> : null}
      <HeroSection
        badge={t("productsPage.hero.badge")}
        title={t("productsPage.hero.title")}
        highlight={t("productsPage.hero.highlight")}
        description={t("productsPage.hero.description")}
      />

      <section className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-35" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-section">
          {products.length === 0 ? (
            <ScrollReveal>
              <div className="rounded-2xl border border-dashed border-border bg-background p-10 text-center">
                <p className="text-lg font-semibold text-foreground">{t("productsPage.empty.title")}</p>
                <p className="mt-2 text-sm text-secondary">
                  {t("productsPage.empty.description")}
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ScrollReveal key={product.id}>
                  <ProductCard
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    locale={locale}
                    contactHref={withLocalePath(locale, "/contact")}
                    labels={{
                      categoryPanel: t("productsPage.card.categoryPanel"),
                      categoryInverter: t("productsPage.card.categoryInverter"),
                      categoryBattery: t("productsPage.card.categoryBattery"),
                      categoryEvCharger: t("productsPage.card.categoryEvCharger"),
                      installationReady: t("productsPage.card.installationReady"),
                      getQuote: t("productsPage.card.getQuote"),
                    }}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}

          <ScrollReveal delay={0.08}>
            <div className="mt-16 text-center">
              <p className="mb-4 text-secondary">
                {t("productsPage.assistance.prefix")}{" "}
                <Link
                  href={withLocalePath(locale, "/services")}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {t("productsPage.assistance.linkLabel")}
                </Link>{" "}
                {t("productsPage.assistance.suffix")}
              </p>

              <Link href={withLocalePath(locale, "/contact")}>
                <Button variant="default" size="lg">
                  {t("productsPage.assistance.buttonLabel")}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      <ScrollReveal delay={0.12}>
        <FinalCTA
          heading={t("productsPage.finalCta.heading")}
          supportingText={t("productsPage.finalCta.supportingText")}
          ctaLabel={t("productsPage.finalCta.ctaLabel")}
          ctaHref={withLocalePath(locale, "/contact")}
          ariaLabel={t("productsPage.finalCta.ariaLabel")}
          benefits={[
            t("productsPage.finalCta.benefit1"),
            t("productsPage.finalCta.benefit2"),
            t("productsPage.finalCta.benefit3"),
            t("productsPage.finalCta.benefit4"),
            t("productsPage.finalCta.benefit5"),
          ]}
        />
      </ScrollReveal>
      </section>
    </div>
  );
}
