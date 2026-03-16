import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPage from "@/app/blog/page";
import { buildLocalizedMetadata, isLocale } from "@/lib/i18n";
import { getTranslator } from "@/lib/i18n-server";

export const revalidate = 900;

type LocalizedBlogPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: LocalizedBlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslator(locale);

  return buildLocalizedMetadata({
    locale,
    pathname: "/blog",
    title: t("meta.blog.title"),
    description: t("meta.blog.description"),
  });
}

export default async function LocalizedBlogPage({ params, searchParams }: LocalizedBlogPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <BlogPage searchParams={searchParams} />;
}