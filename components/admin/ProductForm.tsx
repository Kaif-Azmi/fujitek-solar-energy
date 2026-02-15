"use client";

import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";

export const PRODUCT_CATEGORIES = [
  "Panel",
  "Inverter",
  "Battery",
  "EV Charger",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ProductStatus = "active" | "inactive";

export type ProductFormState = {
  name: string;
  category: ProductCategory | "";
  price: string;
  status: ProductStatus;
  upload: { secureUrl: string; publicId: string } | null;
};

type ProductFormErrors = Partial<Record<keyof ProductFormState, string>>;

type Props = {
  value: ProductFormState;
  errors: ProductFormErrors;
  loading?: boolean;
  uploading?: boolean;
  mode: "create" | "edit";
  onChange: (next: ProductFormState) => void;
  onSubmit: () => void;
  onCancelEdit?: () => void;
  onUploadingChange?: (uploading: boolean) => void;
};

export default function ProductForm({
  value,
  errors,
  loading = false,
  uploading = false,
  mode,
  onChange,
  onSubmit,
  onCancelEdit,
  onUploadingChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Category *</label>
          <select
            value={value.category}
            onChange={(event) =>
              onChange({ ...value, category: event.target.value as ProductCategory })
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Select category</option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status *</label>
          <select
            value={value.status}
            onChange={(event) =>
              onChange({ ...value, status: event.target.value as ProductStatus })
            }
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Product Name *</label>
          <input
            value={value.name}
            onChange={(event) => onChange({ ...value, name: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Fujitek Mono PERC Panel 540W"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Price (INR) *</label>
          <input
            type="number"
            min="0"
            step="1"
            value={value.price}
            onChange={(event) => onChange({ ...value, price: event.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="50000"
          />
          {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
        </div>
      </div>

      <div>
        <ImageUploader
          folder="fujitek/products"
          value={value.upload}
          onChange={(next) => onChange({ ...value, upload: next })}
          onUploadingChange={onUploadingChange}
        />
        {errors.upload && <p className="mt-1 text-xs text-red-600">{errors.upload}</p>}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onSubmit} disabled={loading || uploading}>
          {uploading
            ? "Uploading..."
            : loading
            ? mode === "create"
              ? "Adding..."
              : "Saving..."
            : mode === "create"
              ? "Add Product"
              : "Save Changes"}
        </Button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={loading || uploading}
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
