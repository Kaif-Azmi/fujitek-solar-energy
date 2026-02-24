"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BlogItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type BlogListResponse = {
  items: BlogItem[];
  total: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

function formatBlogDate(dateInput: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateInput));
}

async function readJsonSafe(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { message: text || "Invalid response format." };
  }
}

export default function BlogListManager() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBlogs() {
      try {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams({
          page: String(page),
          limit: "10",
        });

        if (searchTerm.trim()) {
          query.set("q", searchTerm.trim());
        }

        const response = await fetch(`/api/admin/blog?${query.toString()}`, { cache: "no-store" });
        const payload = (await readJsonSafe(response)) as Partial<BlogListResponse> & { message?: string };

        if (!response.ok) throw new Error(payload.message || "Failed to load blog posts.");
        if (!mounted) return;

        setItems(Array.isArray(payload.items) ? payload.items : []);
        setTotalPages(Number(payload.totalPages || 1));
        setTotal(Number(payload.total || 0));
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError instanceof Error ? loadError.message : "Failed to load blog posts.");
        setItems([]);
        setTotalPages(1);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadBlogs();
    return () => {
      mounted = false;
    };
  }, [page, searchTerm]);

  const hasRows = useMemo(() => items.length > 0, [items]);

  async function deleteBlog(id: string) {
    const confirmed = window.confirm("Delete this blog post?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      const payload = await readJsonSafe(response);
      if (!response.ok) throw new Error(String(payload.message || "Failed to delete blog post."));

      setItems((prev) => prev.filter((item) => item.id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (deleteError) {
      alert(deleteError instanceof Error ? deleteError.message : "Failed to delete blog post.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Blog Management</h1>
          <p className="text-sm text-slate-600">Create, edit, publish, and manage SEO-ready blog posts.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">Create Blog Post</Link>
        </Button>
      </div>

      <form
        className="flex flex-wrap items-center gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setPage(1);
          setSearchTerm(searchInput);
        }}
      >
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by title..."
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                  Loading blog posts...
                </TableCell>
              </TableRow>
            ) : !hasRows ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-slate-500">
                  No blog posts found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">/{item.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span
                      className={[
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                        item.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600",
                      ].join(" ")}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.publishedAt ? formatBlogDate(item.publishedAt) : formatBlogDate(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button asChild variant="outline">
                        <Link href={`/admin/blog/${item.id}`}>Edit</Link>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={deletingId === item.id}
                        onClick={() => deleteBlog(item.id)}
                      >
                        {deletingId === item.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">Total posts: {total}</p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1 || loading}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-700">
            Page {page} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
