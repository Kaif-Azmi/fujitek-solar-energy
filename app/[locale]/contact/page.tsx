import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactPageClient from "@/app/contact/ContactPageClient";
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
    pathname: "/contact",
    title: t("meta.contact.title"),
    description: t("meta.contact.description"),
  });
}

export default async function LocalizedContactPage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ContactPageClient />;
}