import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesPage from "@/app/services/page";
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
    pathname: "/services",
    title: t("meta.services.title"),
    description: t("meta.services.description"),
  });
}

export default async function LocalizedServicesPage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ServicesPage locale={locale} />;
}
