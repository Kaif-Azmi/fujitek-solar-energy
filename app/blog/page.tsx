import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { BLOG_PAGE_SIZE, getPublishedBlogPage, toAbsoluteUrl } from "@/lib/blog";
import { siteSeo } from "@/lib/seo";

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function parsePageParam(input: string | undefined) {
  const parsed = Number(input);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

function buildBlogPageUrl(page: number) {
  return page > 1 ? `/blog?page=${page}` : "/blog";
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const requestedPage = parsePageParam(params.page);
  const { currentPage, totalPages } = await getPublishedBlogPage({
    page: requestedPage,
    limit: BLOG_PAGE_SIZE,
  });

  const canonicalPath = buildBlogPageUrl(currentPage);
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const isOutOfRange = requestedPage > totalPages;
  const title =
    currentPage > 1
      ? `Solar Energy Blog & Insights - Page ${currentPage} | ${siteSeo.name}`
      : `Solar Energy Blog & Insights for Homes & Businesses | ${siteSeo.name}`;

  const description =
    "Explore expert guides on solar panel installation, inverter selection, cost planning, EV charging, and maintenance for residential and commercial projects.";

  const keywords = [
    "solar energy blog",
    "solar panel installation guide",
    "solar inverter guide",
    "solar maintenance tips",
    "solar cost planning",
    "residential solar solutions",
    "commercial solar solutions",
    "EV charger with solar",
    "Fujitek Solar Energy blog",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    robots: isOutOfRange
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: siteSeo.name,
      images: [
        {
          url: toAbsoluteUrl("/images/different_solar_energy_systems.webp"),
          alt: "Solar energy blog insights by Fujitek Solar Energy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [toAbsoluteUrl("/images/different_solar_energy_systems.webp")],
    },
  };
}

export const revalidate = 900;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const requestedPage = parsePageParam(params.page);
  const { items, currentPage, totalPages } = await getPublishedBlogPage({
    page: requestedPage,
    limit: BLOG_PAGE_SIZE,
  });

  if (requestedPage !== currentPage) {
    redirect(buildBlogPageUrl(currentPage));
  }

  const collectionPageUrl = toAbsoluteUrl(buildBlogPageUrl(currentPage));

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${collectionPageUrl}#webpage`,
    name: "Solar Energy Blog & Insights",
    description:
      "Expert solar articles on installation, inverter planning, maintenance, and project economics for homes and businesses.",
    url: collectionPageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: siteSeo.name,
      url: siteSeo.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((post, index) => ({
        "@type": "ListItem",
        position: (currentPage - 1) * BLOG_PAGE_SIZE + index + 1,
        url: toAbsoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
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
      ...(currentPage > 1
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: `Page ${currentPage}`,
              item: collectionPageUrl,
            },
          ]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-surface">
      <JsonLd data={blogCollectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HeroSection
        badge="BLOG"
        title="Solar Energy Blog"
        highlight="& Insights"
        description="Practical articles from Fujitek’s engineering team on planning, installing, and maintaining reliable solar systems."
      />

      <section className="mx-auto max-w-7xl px-6 py-section">
        {items.length === 0 ? (
          <div className="rounded-xl border border-border/70 bg-background p-10 text-center">
            <h2 className="text-xl font-semibold text-foreground">No published blog posts yet</h2>
            <p className="mt-3 text-sm text-secondary">Please check back soon for fresh solar insights.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
          {currentPage > 1 ? (
            <Button asChild variant="outline">
              <Link href={buildBlogPageUrl(currentPage - 1)} aria-label="Go to previous blog page">
                Previous
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Previous
            </Button>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
            page === currentPage ? (
              <Button key={page} variant="default" disabled>
                {page}
              </Button>
            ) : (
              <Button key={page} asChild variant="outline">
                <Link href={buildBlogPageUrl(page)} aria-label={`Go to blog page ${page}`}>
                  {page}
                </Link>
              </Button>
            ),
          )}

          {currentPage < totalPages ? (
            <Button asChild variant="outline">
              <Link href={buildBlogPageUrl(currentPage + 1)} aria-label="Go to next blog page">
                Next
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Next
            </Button>
          )}
        </nav>
      </section>
    </main>
  );
}
