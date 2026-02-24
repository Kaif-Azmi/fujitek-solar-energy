import type { BlogUpsertInput } from "@/lib/blog";
import { normalizeTags, sanitizeBlogHtml, stripHtml } from "@/lib/blog-sanitize";

export type BlogValidationResult =
  | { ok: true; data: BlogUpsertInput }
  | { ok: false; errors: Record<string, string> };

const MAX_BLOG_CONTENT_CHARS = 120_000;

function isValidHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export function validateBlogPayload(payload: unknown): BlogValidationResult {
  const input = (payload && typeof payload === "object" ? payload : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const title = String(input.title || "").trim();
  const slug = String(input.slug || "").trim();
  const excerpt = String(input.excerpt || "").trim();
  const content = String(input.content || "");
  const featuredImage = String(input.featuredImage || "").trim();
  const category = String(input.category || "").trim();
  const author = String(input.author || "").trim();
  const metaTitle = String(input.metaTitle || "").trim();
  const metaDescription = String(input.metaDescription || "").trim();
  const isPublished = Boolean(input.isPublished);

  if (!title) errors.title = "Title is required.";
  if (title.length > 140) errors.title = "Title must be 140 characters or fewer.";

  if (slug && !/^[a-zA-Z0-9-_\s]+$/.test(slug)) {
    errors.slug = "Slug can contain only letters, numbers, spaces, dashes, and underscores.";
  }

  if (!excerpt) errors.excerpt = "Excerpt is required.";
  if (excerpt.length > 400) errors.excerpt = "Excerpt must be 400 characters or fewer.";

  if (!content.trim()) {
    errors.content = "Content is required.";
  } else if (content.length > MAX_BLOG_CONTENT_CHARS) {
    errors.content = "Content is too long. Keep it under 120,000 characters.";
  } else {
    const sanitized = sanitizeBlogHtml(content);
    const text = stripHtml(sanitized);
    if (!text) errors.content = "Content must include readable text.";
  }

  if (!featuredImage) {
    errors.featuredImage = "Featured image is required.";
  } else if (!isValidHttpUrl(featuredImage)) {
    errors.featuredImage = "Featured image must be a valid URL.";
  }

  if (!category) errors.category = "Category is required.";

  if (metaTitle.length > 60) errors.metaTitle = "Meta title must be 60 characters or fewer.";
  if (metaDescription.length > 160) errors.metaDescription = "Meta description must be 160 characters or fewer.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      title,
      slug: slug || undefined,
      excerpt,
      content,
      featuredImage,
      category,
      tags: normalizeTags(input.tags),
      author: author || undefined,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      isPublished,
    },
  };
}
