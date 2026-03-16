import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/app/about/page";
import { buildLocalizedMetadata, isLocale } from "@/lib/i18n";
import { getTranslator } from "@/lib/i18n-server";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslator(locale);

  return buildLocalizedMetadata({
    locale,
    pathname: "/about",
    title: t("meta.about.title"),
    description: t("meta.about.description"),
  });
}

export default async function LocalizedAboutPage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <AboutPage />;
}