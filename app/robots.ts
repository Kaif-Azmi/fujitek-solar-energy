import type { MetadataRoute } from "next";
import { siteSeo } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
    },
    sitemap: `${siteSeo.url}/sitemap.xml`,
    host: siteSeo.url,
  };
}
