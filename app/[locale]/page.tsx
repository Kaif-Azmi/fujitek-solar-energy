import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/app/_pages/HomePage";
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
    pathname: "/",
    title: t("meta.home.title"),
    description: t("meta.home.description"),
  });
}

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}