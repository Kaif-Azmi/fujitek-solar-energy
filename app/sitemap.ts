import type { MetadataRoute } from "next";
import { siteSeo } from "@/lib/seo";
import { getPublishedBlogSitemapEntries } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogPosts = await getPublishedBlogSitemapEntries();

  return [
    {
      url: siteSeo.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteSeo.url}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteSeo.url}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteSeo.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteSeo.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteSeo.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...blogPosts.map((post) => ({
      url: `${siteSeo.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
