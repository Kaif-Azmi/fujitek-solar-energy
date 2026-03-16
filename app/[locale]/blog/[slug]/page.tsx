import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/app/blog/[slug]/page";
import { getPublishedBlogBySlug, getPublishedBlogSlugs, toAbsoluteUrl } from "@/lib/blog";
import { siteSeo } from "@/lib/seo";
import { buildLocalizedMetadata, isLocale, locales } from "@/lib/i18n";

export const revalidate = 900;

type LocalizedBlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: LocalizedBlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) return {};

  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    return {
      ...buildLocalizedMetadata({
        locale,
        pathname: `/blog/${slug}`,
        title: `Blog Not Found | ${siteSeo.name}`,
        description: siteSeo.description,
      }),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.metaTitle || `${post.title} | ${siteSeo.name}`;
  const description = post.metaDescription || post.excerpt;
  const imageUrl = toAbsoluteUrl(post.featuredImage);
  const base = buildLocalizedMetadata({
    locale,
    pathname: `/blog/${post.slug}`,
    title,
    description,
    keywords: Array.from(new Set([...post.tags, post.category, "solar blog", "rooftop solar"])),
  });

  return {
    ...base,
    authors: [{ name: post.author }],
    category: post.category,
    openGraph: {
      ...base.openGraph,
      type: "article",
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: imageUrl,
          alt: `${post.title} featured image`,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      images: [imageUrl],
    },
  };
}

export default async function LocalizedBlogPostPage({ params }: LocalizedBlogPostPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <BlogPostPage params={Promise.resolve({ slug })} />;
}