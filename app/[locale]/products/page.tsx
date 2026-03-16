import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductsPage from "@/app/products/page";
import { buildLocalizedMetadata, isLocale } from "@/lib/i18n";
import { getTranslator } from "@/lib/i18n-server";

export const revalidate = 300;

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslator(locale);

  return buildLocalizedMetadata({
    locale,
    pathname: "/products",
    title: t("meta.products.title"),
    description: t("meta.products.description"),
  });
}

export default async function LocalizedProductsPage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ProductsPage locale={locale} />;
}
