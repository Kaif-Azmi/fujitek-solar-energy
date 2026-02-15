"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface Banner {
  _id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  imageUrl?: string;
  status?: string;
  createdAt?: string;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Banner>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [addForm, setAddForm] = useState<{
    title: string;
    subtitle?: string;
    ctaText?: string;
    status: string;
    file?: File | null;
    imageUrl?: string;
  }>({ title: '', subtitle: '', ctaText: '', status: 'Inactive', file: null, imageUrl: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/banners');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setBanners(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load banners', err);
        setError('Failed to load banners');
        setBanners([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl text-strong">Banners</h1>
        <p className="text-slate-500 mt-1">Manage homepage promotional banners.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Banner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            <input
              value={addForm.title}
              onChange={(e) => setAddForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              placeholder="Title"
            />
            <input
              value={addForm.subtitle}
              onChange={(e) => setAddForm((f) => ({ ...f, subtitle: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              placeholder="Subtitle"
            />
            <input
              value={addForm.ctaText}
              onChange={(e) => setAddForm((f) => ({ ...f, ctaText: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              placeholder="CTA Text"
            />
            <input
              value={addForm.imageUrl}
              onChange={(e) => setAddForm((f) => ({ ...f, imageUrl: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
              placeholder="Image URL (optional - will be used if provided)"
            />
            <div>
              <label className="block text-sm mb-1">Upload Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAddForm((f) => ({ ...f, file: e.target.files?.[0] ?? null }))}
                className="w-full"
              />
            </div>
            <select
              value={addForm.status}
              onChange={(e) => setAddForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="flex gap-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  if (!addForm.title) { alert('Title is required'); return; }
                  setUploading(true);
                  let imageUrl = addForm.imageUrl ?? '';
                  try {
                    if (addForm.file) {
                      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
                      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
                      if (!cloudName || !uploadPreset) {
                        throw new Error('Cloudinary config missing');
                      }
                      const fd = new FormData();
                      fd.append('file', addForm.file as File);
                      fd.append('upload_preset', uploadPreset);
                      const resp = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                        method: 'POST',
                        body: fd,
                      });
                      if (!resp.ok) throw new Error('Cloudinary upload failed');
                      const data = await resp.json();
                      imageUrl = data.secure_url || data.url || '';
                    }

                    const payload = {
                      title: addForm.title,
                      subtitle: addForm.subtitle,
                      ctaText: addForm.ctaText,
                      status: addForm.status,
                      imageUrl: imageUrl,
                    };

                    const res = await fetch('/api/banners', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    });
                    if (!res.ok) throw new Error('Failed to create banner');
                    const json = await res.json();
                    setBanners((prev) => [{ _id: json.id, ...payload, createdAt: new Date().toISOString() }, ...prev]);
                    setAddForm({ title: '', subtitle: '', ctaText: '', status: 'Inactive', file: null, imageUrl: '' });
                  } catch (err) {
                    console.error('Add banner failed', err);
                    alert('Failed to add banner: ' + ((err as Error).message || ''));
                  } finally {
                    setUploading(false);
                  }
                }}
              >
                {uploading ? 'Adding...' : 'Add Banner'}
              </button>
              <button
                className="bg-slate-100 px-4 py-2 rounded"
                onClick={() => setAddForm({ title: '', subtitle: '', ctaText: '', status: 'Inactive', file: null, imageUrl: '' })}
              >
                Reset
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Banners</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-slate-600">Loading banners...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && banners.length === 0 && (
            <p className="text-slate-600">No banners found. You can add banners via the API.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {banners.map((b) => (
              <div key={b._id ?? b.title} className="border rounded overflow-hidden bg-white">
                <div className="w-full h-44 bg-white flex items-center justify-center overflow-hidden relative">
                  {b.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-slate-500">No image</div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          className="bg-white bg-opacity-80 px-2 py-1 rounded text-sm hover:bg-opacity-100 border"
                      onClick={() => {
                        setEditingId(b._id ?? null);
                        setForm({
                          title: b.title,
                          subtitle: b.subtitle,
                          ctaText: b.ctaText,
                          status: b.status,
                          imageUrl: b.imageUrl,
                        });
                      }}
                    >
                      Edit
                    </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                      onClick={async () => {
                        if (!b._id) return;
                        if (!confirm('Delete this banner?')) return;
                        setActionLoading(b._id);
                        try {
                          const res = await fetch('/api/banners', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: b._id }),
                          });
                          if (!res.ok) throw new Error('Delete failed');
                          setBanners((prev) => prev.filter((x) => x._id !== b._id));
                        } catch (err) {
                          console.error('Delete failed', err);
                          alert('Failed to delete banner');
                        } finally {
                          setActionLoading(null);
                        }
                      }}
                    >
                      {actionLoading === b._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {editingId === b._id ? (
                    <div className="space-y-3">
                      <input
                        value={form.title ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Title"
                      />
                      <input
                        value={form.subtitle ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Subtitle"
                      />
                      <input
                        value={form.ctaText ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="CTA Text"
                      />
                      <input
                        value={form.imageUrl ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Image URL (full Cloudinary URL)"
                      />
                      <select
                        value={form.status ?? 'Inactive'}
                        onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                        className="w-full border px-3 py-2 rounded"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>

                      <div className="flex gap-2">
                        <button
                          className="bg-blue-600 text-white px-3 py-2 rounded"
                          onClick={async () => {
                            if (!b._id) return;
                            setActionLoading(b._id);
                            try {
                              const res = await fetch('/api/banners', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: b._id, ...form }),
                              });
                              if (!res.ok) throw new Error('Update failed');
                              setBanners((prev) => prev.map((x) => (x._id === b._id ? { ...x, ...form } as Banner : x)));
                              setEditingId(null);
                            } catch (err) {
                              console.error('Update failed', err);
                              alert('Failed to update banner');
                            } finally {
                              setActionLoading(null);
                            }
                          }}
                        >
                          {actionLoading === b._id ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          className="bg-slate-100 px-3 py-2 rounded"
                          onClick={() => {
                            setEditingId(null);
                            setForm({});
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg">{b.title}</h3>
                      {b.subtitle && <p className="text-sm text-slate-600 mt-1">{b.subtitle}</p>}
                      <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                        <span>Status: {b.status ?? 'Unknown'}</span>
                        <span>{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

