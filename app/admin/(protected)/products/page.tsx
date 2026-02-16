"use client";

import { useEffect, useMemo, useState } from "react";
import { ImageIcon, PackageOpen, Pencil, Search } from "lucide-react";
import Image from "next/image";
import AdminCard from "@/components/admin/AdminCard";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import ProductForm, {
  PRODUCT_CATEGORIES,
  type ProductCategory,
  type ProductFormState,
  type ProductStatus,
} from "@/components/admin/ProductForm";
import StatusToggle from "@/components/admin/StatusToggle";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type ProductItem = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  publicId: string;
  status: ProductStatus;
  createdAt: string;
};

type FormErrors = Partial<Record<keyof ProductFormState, string>>;
type FilterStatus = "all" | ProductStatus;
type FilterCategory = "all" | ProductCategory;
type JsonPayload = { message?: string; [key: string]: unknown };

const EMPTY_FORM: ProductFormState = {
  name: "",
  category: "",
  price: "",
  status: "active",
  upload: null,
};

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function readJsonSafe(response: Response): Promise<JsonPayload> {
    const text = await response.text();
    try {
      return JSON.parse(text) as JsonPayload;
    } catch {
      return { message: text || "Non-JSON response." };
    }
  }

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/products", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load products");
        const data = (await readJsonSafe(response)) as unknown as ProductItem[];
        if (mounted) setProducts(data);
      } catch {
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        !search.trim() || item.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [products, search, statusFilter, categoryFilter]);

  function validateForm(value: ProductFormState) {
    const nextErrors: FormErrors = {};

    if (!value.category) nextErrors.category = "Category is required.";
    if (!value.name.trim()) nextErrors.name = "Product name is required.";

    const parsedPrice = Number(value.price);
    if (value.price === "" || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      nextErrors.price = "Price must be a valid number.";
    }

    if (!value.status) nextErrors.status = "Status is required.";
    if (!value.upload?.secureUrl || !value.upload.publicId) {
      nextErrors.upload = "Product image is required.";
    }

    return nextErrors;
  }

  async function createProduct() {
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          price: Number(form.price),
          imageUrl: form.upload?.secureUrl,
          publicId: form.upload?.publicId,
          status: form.status,
        }),
      });
      const payload = await readJsonSafe(response);
      if (!response.ok) throw new Error(payload.message || "Failed to add product.");

      setProducts((prev) => [payload as ProductItem, ...prev]);
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add product.");
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit() {
    if (!editingId) return;

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const response = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          name: form.name.trim(),
          category: form.category,
          price: Number(form.price),
          imageUrl: form.upload?.secureUrl,
          publicId: form.upload?.publicId,
          status: form.status,
        }),
      });
      const payload = await readJsonSafe(response);
      if (!response.ok) throw new Error(payload.message || "Failed to update product.");

      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: form.name.trim(),
                category: form.category as ProductCategory,
                price: Number(form.price),
                imageUrl: form.upload?.secureUrl || item.imageUrl,
                publicId: form.upload?.publicId || item.publicId,
                status: form.status,
              }
            : item
        )
      );

      setEditingId(null);
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to update product.");
    } finally {
      setSaving(false);
    }
  }

  function beginEdit(item: ProductItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      price: String(item.price),
      status: item.status,
      upload: { secureUrl: item.imageUrl, publicId: item.publicId },
    });
    setErrors({});
  }

  async function updateStatus(item: ProductItem, nextStatus: ProductStatus) {
    const previous = products;
    setProducts((prev) =>
      prev.map((entry) =>
        entry.id === item.id ? { ...entry, status: nextStatus } : entry
      )
    );
    try {
      const response = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status: nextStatus }),
      });
      if (!response.ok) throw new Error("Failed");
    } catch {
      setProducts(previous);
      alert("Failed to update status.");
    }
  }

  async function deleteProduct() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      const payload = await readJsonSafe(response);
      if (!response.ok) throw new Error(payload.message || "Failed to delete product.");

      setProducts((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      if (editingId === deleteTarget.id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }
      setDeleteTarget(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Product Management</h1>
          <p className="text-sm text-slate-600">
            Add, edit, activate, and manage products with Cloudinary-backed images.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.04}>
        <AdminCard>
          <ProductForm
            value={form}
            errors={errors}
            loading={saving}
            uploading={uploading}
            mode={editingId ? "edit" : "create"}
            onChange={setForm}
            onSubmit={editingId ? saveEdit : createProduct}
            onUploadingChange={setUploading}
            onCancelEdit={
              editingId
                ? () => {
                    setEditingId(null);
                    setForm(EMPTY_FORM);
                    setErrors({});
                  }
                : undefined
            }
          />
        </AdminCard>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <AdminCard>
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product name..."
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value as FilterCategory)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as FilterStatus)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading products...</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <PackageOpen className="h-10 w-10 text-slate-400" />
            <p className="mt-3 text-sm font-medium text-slate-700">No products found</p>
            <p className="text-xs text-slate-500">
              Try adjusting filters or add a new product.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-44 bg-slate-100">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={640}
                      height={320}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {item.category}
                      </p>
                      <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-600">₹ {item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        item.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {item.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <StatusToggle
                      value={item.status}
                      onChange={(next) => updateStatus(item, next)}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => beginEdit(item)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </AdminCard>
      </ScrollReveal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteProduct}
      />
    </div>
  );
}
