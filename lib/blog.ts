import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import BlogModel, { DEFAULT_BLOG_AUTHOR, type Blog } from "@/models/Blog";
import { siteSeo } from "@/lib/seo";
import {
  calculateReadTime,
  injectHeadingIds,
  normalizeTags,
  sanitizeBlogHtml,
  slugify,
  stripHtml,
} from "@/lib/blog-sanitize";

export const BLOG_PAGE_SIZE = 6;
export const ADMIN_BLOG_PAGE_SIZE = 10;

type BlogQueryOptions = {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
};

type AdminBlogQueryOptions = {
  page?: number;
  limit?: number;
  search?: string;
};

export type BlogListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readTime: string;
  metaTitle?: string;
  metaDescription?: string;
};

export type BlogDetailItem = BlogListItem & {
  contentHtml: string;
  toc: Array<{ id: string; text: string; level: 1 | 2 | 3 }>;
};

export type AdminBlogListItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminBlogDetailItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogUpsertInput = {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags?: string[] | string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
};

type BlogLean = Blog & {
  _id: Types.ObjectId;
};

let blogIndexPromise: Promise<void> | null = null;

function parsePositiveNumber(value: number | undefined, fallbackValue: number, maxValue: number) {
  if (!Number.isFinite(value)) return fallbackValue;
  return Math.min(Math.max(Math.floor(value as number), 1), maxValue);
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toIsoDate(value?: Date | null) {
  return value ? value.toISOString() : null;
}

function toBlogListItem(post: BlogLean): BlogListItem {
  return {
    id: post._id.toString(),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags ?? [],
    featuredImage: post.featuredImage,
    publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    author: post.author || DEFAULT_BLOG_AUTHOR,
    readTime: calculateReadTime(post.content),
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
  };
}

async function ensureBlogModelReady() {
  await connectDB();

  if (!blogIndexPromise) {
    blogIndexPromise = BlogModel.createIndexes().then(() => undefined);
  }

  await blogIndexPromise;
}

function getPublishedFilter(options: BlogQueryOptions = {}) {
  const filter: Record<string, unknown> = {
    isPublished: true,
    publishedAt: { $ne: null, $lte: new Date() },
  };

  if (options.category) {
    filter.category = options.category;
  }

  if (options.tag) {
    filter.tags = { $in: [options.tag.trim().toLowerCase()] };
  }

  if (options.search?.trim()) {
    filter.title = { $regex: escapeRegex(options.search.trim()), $options: "i" };
  }

  return filter;
}

export async function getPublishedBlogPage(options: BlogQueryOptions = {}) {
  await ensureBlogModelReady();

  const requestedPage = parsePositiveNumber(options.page, 1, 10000);
  const limit = parsePositiveNumber(options.limit, BLOG_PAGE_SIZE, 24);
  const filter = getPublishedFilter(options);
  const total = await BlogModel.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(requestedPage, totalPages);
  const skip = (currentPage - 1) * limit;

  const items = await BlogModel.find(filter)
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean<BlogLean[]>();

  return {
    items: items.map(toBlogListItem),
    total,
    currentPage,
    totalPages,
    limit,
  };
}

export async function getPublishedBlogBySlug(slug: string): Promise<BlogDetailItem | null> {
  await ensureBlogModelReady();

  const post = await BlogModel.findOne({
    slug,
    isPublished: true,
    publishedAt: { $ne: null, $lte: new Date() },
  }).lean<BlogLean | null>();

  if (!post) return null;

  const sanitized = sanitizeBlogHtml(post.content);
  const { html, toc } = injectHeadingIds(sanitized);
  return {
    ...toBlogListItem(post),
    contentHtml: html,
    toc,
  };
}

export async function getRelatedPublishedBlogs(category: string, excludeSlug: string, limit = 3) {
  await ensureBlogModelReady();
  const safeLimit = parsePositiveNumber(limit, 3, 6);
  const publishedFilter = { isPublished: true, publishedAt: { $ne: null, $lte: new Date() } };

  const sameCategory = await BlogModel.find({
    ...publishedFilter,
    category,
    slug: { $ne: excludeSlug },
  })
    .sort({ publishedAt: -1 })
    .limit(safeLimit)
    .lean<BlogLean[]>();

  if (sameCategory.length >= safeLimit) {
    return sameCategory.map(toBlogListItem);
  }

  const fallback = await BlogModel.find({
    ...publishedFilter,
    category: { $ne: category },
    slug: { $ne: excludeSlug },
  })
    .sort({ publishedAt: -1 })
    .limit(safeLimit - sameCategory.length)
    .lean<BlogLean[]>();

  return [...sameCategory, ...fallback].map(toBlogListItem);
}

export async function getPublishedBlogSlugs() {
  await ensureBlogModelReady();
  const items = await BlogModel.find({
    isPublished: true,
    publishedAt: { $ne: null, $lte: new Date() },
  })
    .sort({ publishedAt: -1 })
    .select({ slug: 1 })
    .lean<Array<{ slug: string }>>();

  return items.map((item) => item.slug);
}

export async function getPublishedBlogSitemapEntries() {
  await ensureBlogModelReady();
  const items = await BlogModel.find({
    isPublished: true,
    publishedAt: { $ne: null, $lte: new Date() },
  })
    .sort({ publishedAt: -1 })
    .select({ slug: 1, updatedAt: 1 })
    .lean<Array<{ slug: string; updatedAt: Date }>>();

  return items.map((item) => ({
    slug: item.slug,
    updatedAt: item.updatedAt.toISOString(),
  }));
}

export async function getAdminBlogPage(options: AdminBlogQueryOptions = {}) {
  await ensureBlogModelReady();

  const page = parsePositiveNumber(options.page, 1, 10000);
  const limit = parsePositiveNumber(options.limit, ADMIN_BLOG_PAGE_SIZE, 50);
  const skip = (page - 1) * limit;
  const filter: Record<string, unknown> = {};

  if (options.search?.trim()) {
    filter.title = { $regex: escapeRegex(options.search.trim()), $options: "i" };
  }

  const [items, total] = await Promise.all([
    BlogModel.find(filter)
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select({
        title: 1,
        slug: 1,
        category: 1,
        isPublished: 1,
        publishedAt: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .lean<BlogLean[]>(),
    BlogModel.countDocuments(filter),
  ]);

  return {
    items: items.map((item): AdminBlogListItem => ({
      id: item._id.toString(),
      title: item.title,
      slug: item.slug,
      category: item.category,
      isPublished: item.isPublished,
      publishedAt: toIsoDate(item.publishedAt),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })),
    total,
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    limit,
  };
}

export async function getAdminBlogById(id: string): Promise<AdminBlogDetailItem | null> {
  await ensureBlogModelReady();
  if (!Types.ObjectId.isValid(id)) return null;

  const item = await BlogModel.findById(id).lean<BlogLean | null>();
  if (!item) return null;

  return {
    id: item._id.toString(),
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    featuredImage: item.featuredImage,
    category: item.category,
    tags: item.tags ?? [],
    author: item.author || DEFAULT_BLOG_AUTHOR,
    metaTitle: item.metaTitle || "",
    metaDescription: item.metaDescription || "",
    isPublished: item.isPublished,
    publishedAt: toIsoDate(item.publishedAt),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

async function resolveUniqueSlug(baseInput: string, currentId?: string) {
  const baseSlug = slugify(baseInput || "blog-post");
  if (!baseSlug) {
    throw new Error("Invalid slug.");
  }

  let counter = 1;
  let candidate = baseSlug;

  while (
    await BlogModel.exists({
      slug: candidate,
      ...(currentId && Types.ObjectId.isValid(currentId)
        ? { _id: { $ne: new Types.ObjectId(currentId) } }
        : {}),
    })
  ) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return candidate;
}

export async function createAdminBlog(input: BlogUpsertInput) {
  await ensureBlogModelReady();

  const cleanContent = sanitizeBlogHtml(input.content);
  const cleanExcerpt = stripHtml(input.excerpt);
  const slugCandidate = input.slug?.trim() || input.title;

  const doc = await BlogModel.create({
    title: input.title.trim(),
    slug: await resolveUniqueSlug(slugCandidate),
    excerpt: cleanExcerpt,
    content: cleanContent,
    featuredImage: input.featuredImage.trim(),
    category: input.category.trim(),
    tags: normalizeTags(input.tags),
    author: input.author?.trim() || DEFAULT_BLOG_AUTHOR,
    metaTitle: input.metaTitle?.trim() || undefined,
    metaDescription: input.metaDescription?.trim() || undefined,
    isPublished: Boolean(input.isPublished),
  });

  const created = await getAdminBlogById(doc._id.toString());
  if (!created) throw new Error("Failed to create blog.");
  return created;
}

export async function updateAdminBlog(id: string, input: BlogUpsertInput) {
  await ensureBlogModelReady();
  if (!Types.ObjectId.isValid(id)) return null;

  const doc = await BlogModel.findById(id);
  if (!doc) return null;

  doc.title = input.title.trim();
  doc.slug = await resolveUniqueSlug(input.slug?.trim() || input.title, id);
  doc.excerpt = stripHtml(input.excerpt);
  doc.content = sanitizeBlogHtml(input.content);
  doc.featuredImage = input.featuredImage.trim();
  doc.category = input.category.trim();
  doc.tags = normalizeTags(input.tags);
  doc.author = input.author?.trim() || DEFAULT_BLOG_AUTHOR;
  doc.metaTitle = input.metaTitle?.trim() || undefined;
  doc.metaDescription = input.metaDescription?.trim() || undefined;
  doc.isPublished = Boolean(input.isPublished);

  await doc.save();
  return getAdminBlogById(id);
}

export async function deleteAdminBlog(id: string) {
  await ensureBlogModelReady();
  if (!Types.ObjectId.isValid(id)) return false;
  const result = await BlogModel.deleteOne({ _id: new Types.ObjectId(id) });
  return result.deletedCount > 0;
}

export function formatBlogDate(dateInput: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateInput));
}

export function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteSeo.url}${path.startsWith("/") ? path : `/${path}`}`;
}
