"use client";

import { useMemo, useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";

type UploadResult = {
  secureUrl: string;
  publicId: string;
};

type Props = {
  folder: string;
  value?: UploadResult | null;
  onChange: (next: UploadResult | null) => void;
  onUploadingChange?: (uploading: boolean) => void;
};

export default function ImageUploader({ folder, value, onChange, onUploadingChange }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  async function readJsonSafe(response: Response) {
    const text = await response.text();
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return { message: text || "Non-JSON response." } as { message: string };
    }
  }

  async function uploadFile() {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);

    setLoading(true);
    onUploadingChange?.(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      if (response.ok) {
        const data = (await response.json()) as Partial<UploadResult> & { message?: string };
        if (!data.secureUrl || !data.publicId) {
          throw new Error("Upload failed: missing secureUrl/publicId.");
        }

        onChange({ secureUrl: data.secureUrl, publicId: data.publicId });
        setFile(null);
        return;
      }

      const data = (await readJsonSafe(response)) as { message?: string };
      throw new Error(data.message || `Upload failed (HTTP ${response.status}).`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setLoading(false);
      onUploadingChange?.(false);
    }
  }

  async function removeUploadedImage() {
    if (!value?.publicId) {
      onChange(null);
      return;
    }
    const response = await fetch("/api/admin/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId: value.publicId }),
    });
    if (!response.ok) {
      const data = (await readJsonSafe(response)) as { message?: string };
      alert(data.message || "Failed to delete image from Cloudinary.");
      return;
    }
    onChange(null);
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <ImagePlus className="h-4 w-4" />
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-slate-600"
        />

        {file && (
          <div className="mt-3 flex items-center justify-between rounded-md bg-white p-2">
            <p className="truncate text-xs text-slate-600">{file.name}</p>
            <button
              type="button"
              onClick={uploadFile}
              disabled={loading}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-hover"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
      </div>

      {(previewUrl || value?.secureUrl) && (
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl || value?.secureUrl}
            alt="Preview"
            className="h-40 w-full object-cover"
          />
          {!!value?.secureUrl && (
            <button
              type="button"
              onClick={removeUploadedImage}
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-slate-700 shadow hover:bg-white"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
