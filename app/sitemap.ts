import type { MetadataRoute } from "next";
import { siteSeo } from "@/lib/seo";
import { getPublishedBlogSitemapEntries } from "@/lib/blog";
import { locales, withLocalePath } from "@/lib/i18n";

const STATIC_ROUTE_CONFIG: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "daily", priority: 0.9 },
  { path: "/services", changeFrequency: "weekly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogPosts = await getPublishedBlogSitemapEntries();

  const localizedStaticEntries = STATIC_ROUTE_CONFIG.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteSeo.url}${withLocalePath(locale, route.path)}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  const localizedBlogEntries = blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${siteSeo.url}${withLocalePath(locale, `/blog/${post.slug}`)}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  return [...localizedStaticEntries, ...localizedBlogEntries];
}