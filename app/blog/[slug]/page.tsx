import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import BlogContent from "@/components/blog/BlogContent";
import JsonLd from "@/components/seo/JsonLd";
import {
  formatBlogDate,
  getPublishedBlogBySlug,
  getPublishedBlogSlugs,
  getRelatedPublishedBlogs,
  toAbsoluteUrl,
} from "@/lib/blog";
import { siteSeo } from "@/lib/seo";

const HERO_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YxZjVmOSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2U2ZWZmNyIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    return {
      title: `Blog Not Found | ${siteSeo.name}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/blog/${post.slug}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const imageUrl = toAbsoluteUrl(post.featuredImage);
  const title = post.metaTitle || `${post.title} | ${siteSeo.name}`;
  const description = post.metaDescription || post.excerpt;
  const keywords = Array.from(new Set([...post.tags, post.category, "solar blog", "rooftop solar"]));

  return {
    title,
    description,
    keywords,
    authors: [{ name: post.author }],
    category: post.category,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: siteSeo.name,
      locale: "en_IN",
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
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const revalidate = 900;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = toAbsoluteUrl(`/blog/${post.slug}`);
  const imageUrl = toAbsoluteUrl(post.featuredImage);
  const relatedPosts = await getRelatedPublishedBlogs(post.category, post.slug, 3);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    keywords: post.tags.length > 0 ? post.tags.join(", ") : undefined,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteSeo.name,
      logo: {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/images/logos/fujitek-logo-tab.svg"),
      },
    },
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteSeo.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: toAbsoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-surface">
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="border-b border-border/70 bg-background">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <nav className="mb-6 text-sm text-secondary" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {post.category}
            </span>
            <time className="text-sm text-secondary" dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            <span className="text-sm text-secondary">• {post.readTime}</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{post.title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-secondary">{post.excerpt}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-border/60">
          <Image
            src={post.featuredImage}
            alt={`${post.title} featured image`}
            fill
            sizes="(max-width: 1024px) 100vw, 1100px"
            quality={72}
            priority
            fetchPriority="high"
            decoding="async"
            placeholder="blur"
            blurDataURL={HERO_BLUR_DATA_URL}
            className="object-cover"
          />
        </div>

        <BlogContent post={post} />
      </section>

      {relatedPosts.length > 0 ? (
        <section className="border-t border-border/70 bg-background">
          <div className="mx-auto max-w-7xl px-6 py-section">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Related Posts</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary">
              Continue reading practical solar insights from the Fujitek engineering team.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
