"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, AlertDescription, Button, Input, Textarea } from "@/components/ui";
import { Switch } from "@/components/ui/switch";
import ImageUploader from "@/components/admin/ImageUploader";
import { sanitizeBlogHtml } from "@/lib/blog-sanitize";

type UploadValue = {
  secureUrl: string;
  publicId: string;
} | null;

type BlogEditorProps = {
  blogId?: string;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: UploadValue;
  category: string;
  tags: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
};

const DEFAULT_FORM: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: null,
  category: "",
  tags: "",
  author: "",
  metaTitle: "",
  metaDescription: "",
  isPublished: false,
};

const BLOG_CATEGORIES = [
  "Solar Installation",
  "Inverter Systems",
  "Maintenance",
  "Cost Planning",
  "Commercial Solar",
  "EV Charging",
];

function slugifyValue(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type ValidationErrors = Partial<Record<keyof FormState, string>>;

function validateForm(form: FormState) {
  const errors: ValidationErrors = {};
  if (!form.title.trim()) errors.title = "Title is required.";
  if (!form.slug.trim()) errors.slug = "Slug is required.";
  if (!form.excerpt.trim()) errors.excerpt = "Excerpt is required.";
  if (!form.content.trim()) errors.content = "Content is required.";
  if (!form.featuredImage?.secureUrl) errors.featuredImage = "Featured image is required.";
  if (!form.category.trim()) errors.category = "Category is required.";
  if (form.metaTitle.trim().length > 60) errors.metaTitle = "Meta title should be 60 characters or fewer.";
  if (form.metaDescription.trim().length > 160) {
    errors.metaDescription = "Meta description should be 160 characters or fewer.";
  }
  return errors;
}

async function readJsonSafe(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { message: text || "Invalid response format." };
  }
}

export default function BlogEditor({ blogId }: BlogEditorProps) {
  const isEditMode = Boolean(blogId);
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditMode || !blogId) return;
    let mounted = true;

    async function loadBlog() {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/blog/${blogId}`, { cache: "no-store" });
        const payload = await readJsonSafe(response);
        if (!response.ok) throw new Error(String(payload.message || "Failed to load blog post."));

        if (!mounted) return;
        setForm({
          title: String(payload.title || ""),
          slug: String(payload.slug || ""),
          excerpt: String(payload.excerpt || ""),
          content: String(payload.content || ""),
          featuredImage: payload.featuredImage
            ? { secureUrl: String(payload.featuredImage), publicId: "" }
            : null,
          category: String(payload.category || ""),
          tags: Array.isArray(payload.tags) ? payload.tags.join(", ") : "",
          author: String(payload.author || ""),
          metaTitle: String(payload.metaTitle || ""),
          metaDescription: String(payload.metaDescription || ""),
          isPublished: Boolean(payload.isPublished),
        });
        setSlugTouched(true);
      } catch (error) {
        if (!mounted) return;
        setMessage(error instanceof Error ? error.message : "Failed to load blog post.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadBlog();
    return () => {
      mounted = false;
    };
  }, [blogId, isEditMode]);

  const metaTitleCount = useMemo(() => form.metaTitle.trim().length, [form.metaTitle]);
  const metaDescriptionCount = useMemo(() => form.metaDescription.trim().length, [form.metaDescription]);
  const previewHtml = useMemo(() => sanitizeBlogHtml(form.content), [form.content]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onTitleChange(nextTitle: string) {
    setForm((prev) => ({
      ...prev,
      title: nextTitle,
      slug: slugTouched ? prev.slug : slugifyValue(nextTitle),
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      featuredImage: form.featuredImage?.secureUrl || "",
      category: form.category,
      tags: form.tags,
      author: form.author,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      isPublished: form.isPublished,
    };

    try {
      setSaving(true);
      const response = await fetch(isEditMode ? `/api/admin/blog/${blogId}` : "/api/admin/blog", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await readJsonSafe(response);
      if (!response.ok) {
        if (data.errors && typeof data.errors === "object") {
          setErrors(data.errors as ValidationErrors);
        }
        throw new Error(String(data.message || "Failed to save blog post."));
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Loading blog post...</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {isEditMode ? "Edit Blog Post" : "Create Blog Post"}
          </h1>
          <p className="text-sm text-slate-600">
            Manage SEO-ready blog content for the public blog pages.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/admin/blog">Back to Blog List</Link>
        </Button>
      </div>

      {message ? (
        <Alert variant="destructive">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="blog-title" className="text-sm font-medium text-slate-700">
              Title
            </label>
            <Input
              id="blog-title"
              value={form.title}
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder="Blog title"
            />
            {errors.title ? <p className="text-xs text-red-600">{errors.title}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="blog-slug" className="text-sm font-medium text-slate-700">
              Slug
            </label>
            <Input
              id="blog-slug"
              value={form.slug}
              onChange={(event) => {
                setSlugTouched(true);
                updateField("slug", slugifyValue(event.target.value));
              }}
              placeholder="seo-friendly-blog-slug"
            />
            {errors.slug ? <p className="text-xs text-red-600">{errors.slug}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="blog-excerpt" className="text-sm font-medium text-slate-700">
              Excerpt
            </label>
            <Textarea
              id="blog-excerpt"
              value={form.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
              placeholder="Short summary for blog listing and search previews."
              className="min-h-[110px]"
            />
            {errors.excerpt ? <p className="text-xs text-red-600">{errors.excerpt}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="blog-content" className="text-sm font-medium text-slate-700">
              Content (HTML)
            </label>
            <Textarea
              id="blog-content"
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
              placeholder="<h2>Section</h2><p>Write article HTML content here...</p>"
              className="min-h-[320px] font-mono text-sm leading-6"
            />
            <p className="text-xs text-slate-500">Use semantic tags like h1, h2, h3, p, hr, ul, ol, li, blockquote, pre, code.</p>
            {errors.content ? <p className="text-xs text-red-600">{errors.content}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Live Preview</label>
            <div className="rounded-lg border border-border bg-white p-5">
              {previewHtml.trim() ? (
                <div className="blog-rich-content" dangerouslySetInnerHTML={{ __html: previewHtml }} />
              ) : (
                <p className="text-sm text-slate-500">Start writing content to see preview.</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-category" className="text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="blog-category"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Select category</option>
              {BLOG_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category ? <p className="text-xs text-red-600">{errors.category}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-tags" className="text-sm font-medium text-slate-700">
              Tags (comma separated)
            </label>
            <Input
              id="blog-tags"
              value={form.tags}
              onChange={(event) => updateField("tags", event.target.value)}
              placeholder="solar, rooftop, inverter"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-author" className="text-sm font-medium text-slate-700">
              Author
            </label>
            <Input
              id="blog-author"
              value={form.author}
              onChange={(event) => updateField("author", event.target.value)}
              placeholder="Fujitek Solar Team"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-meta-title" className="text-sm font-medium text-slate-700">
              Meta Title
            </label>
            <Input
              id="blog-meta-title"
              value={form.metaTitle}
              onChange={(event) => updateField("metaTitle", event.target.value)}
              placeholder="SEO meta title"
            />
            <p className="text-xs text-slate-500">{metaTitleCount}/60</p>
            {errors.metaTitle ? <p className="text-xs text-red-600">{errors.metaTitle}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="blog-meta-description" className="text-sm font-medium text-slate-700">
              Meta Description
            </label>
            <Textarea
              id="blog-meta-description"
              value={form.metaDescription}
              onChange={(event) => updateField("metaDescription", event.target.value)}
              placeholder="SEO meta description"
              className="min-h-[100px]"
            />
            <p className="text-xs text-slate-500">{metaDescriptionCount}/160</p>
            {errors.metaDescription ? <p className="text-xs text-red-600">{errors.metaDescription}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Featured Image</label>
            <ImageUploader
              folder="fujitek/blog"
              value={form.featuredImage}
              onChange={(next) => updateField("featuredImage", next)}
              onUploadingChange={setUploading}
            />
            {errors.featuredImage ? <p className="text-xs text-red-600">{errors.featuredImage}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Publish Status</label>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-slate-50 px-3 py-2">
              <Switch checked={form.isPublished} onCheckedChange={(checked) => updateField("isPublished", checked)} />
              <span className="text-sm text-slate-700">
                {form.isPublished ? "Published" : "Draft (not visible publicly)"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving || uploading}>
            {saving ? "Saving..." : isEditMode ? "Save Changes" : "Save Blog Post"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/blog">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
