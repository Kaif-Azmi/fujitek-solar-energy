import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import { slugify } from "@/lib/blog-sanitize";

export const BLOGS_COLLECTION = "blogs";
export const DEFAULT_BLOG_AUTHOR = "Fujitek Solar Team";

export interface Blog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogDocument = HydratedDocument<Blog>;
type BlogModelType = Model<Blog>;

const blogSchema = new Schema<Blog, BlogModelType>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    author: { type: String, default: DEFAULT_BLOG_AUTHOR, trim: true },
    metaTitle: { type: String, trim: true, maxlength: 60 },
    metaDescription: { type: String, trim: true, maxlength: 160 },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: BLOGS_COLLECTION,
  },
);

blogSchema.index({ isPublished: 1, publishedAt: -1 });
blogSchema.index({ category: 1, publishedAt: -1 });
blogSchema.index({ tags: 1 });

blogSchema.pre("validate", async function preValidateSlug() {
  if (!this.slug?.trim() && this.title?.trim()) {
    this.slug = slugify(this.title);
  } else {
    this.slug = slugify(this.slug);
  }

  if (!this.slug) {
    this.invalidate("slug", "Slug is required.");
    return;
  }

  const BlogModelCtor = this.constructor as BlogModelType;
  const baseSlug = this.slug;
  let candidate = baseSlug;
  let counter = 1;

  while (
    await BlogModelCtor.exists({
      slug: candidate,
      _id: { $ne: this._id },
    })
  ) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }

  this.slug = candidate;
});

blogSchema.pre("save", function preSavePublishedAt() {
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

const BlogModel =
  (mongoose.models.Blog as BlogModelType | undefined) || mongoose.model<Blog, BlogModelType>("Blog", blogSchema);

export default BlogModel;
