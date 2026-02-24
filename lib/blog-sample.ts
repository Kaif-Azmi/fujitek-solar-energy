import type { BlogUpsertInput } from "@/lib/blog";

export const SAMPLE_BLOG_POSTS: BlogUpsertInput[] = [
  {
    title: "How to Plan a Residential Rooftop Solar System",
    excerpt:
      "A practical checklist for homeowners evaluating rooftop solar capacity, component quality, and installation scope.",
    content:
      "<h2>Start with your energy profile</h2><p>Review monthly consumption and daytime load behavior before sizing the system.</p><h2>Validate site readiness</h2><p>Roof structure, shading, and cable routes influence both performance and project cost.</p><h3>Compare proposals on scope, not only price</h3><p>Ensure quotations include protection devices, commissioning checks, and after-sales support clarity.</p>",
    featuredImage: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    category: "Solar Installation",
    tags: ["residential solar", "rooftop solar", "solar planning"],
    author: "Fujitek Solar Team",
    metaTitle: "Residential Rooftop Solar Planning Guide",
    metaDescription: "Checklist-based guide for planning a reliable residential rooftop solar installation.",
    isPublished: false,
  },
];

