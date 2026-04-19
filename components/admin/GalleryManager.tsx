'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, Images, ImageOff } from 'lucide-react';
import Drawer from './Drawer';
import FormField, { inputCls, selectCls } from './FormField';
import ImageUploader from './ImageUploader';
import { upsertGalleryImage, deleteGalleryImage } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = ['Education', 'Community', 'Impact', 'Literacy', 'Events', 'Programs', 'Other'];

interface GalleryImage {
  id?: number;
  ordering: number;
  src: string;
  caption: string;
  category: string;
}

const BLANK: GalleryImage = {
  ordering: 1,
  src: '',
  caption: '',
  category: 'Education',
};

interface GalleryManagerProps {
  initialImages: GalleryImage[];
}

export default function GalleryManager({ initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<GalleryImage>(BLANK);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const set = (key: keyof GalleryImage, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const openCreate = () => {
    setForm({ ...BLANK, ordering: images.length + 1 });
    setIsNew(true);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (img: GalleryImage) => {
    setForm({ ...img });
    setIsNew(false);
    setError('');
    setDrawerOpen(true);
  };

  const handleSave = () => {
    if (!form.src.trim()) { setError('Please upload or enter an image.'); return; }
    if (!form.caption.trim()) { setError('Caption is required.'); return; }
    setError('');
    startTransition(async () => {
      const { error: err, record } = await upsertGalleryImage(form as unknown as Record<string, unknown>, isNew ? undefined : form.id);
      if (err) { setError(err); return; }
      if (record) {
        if (isNew) {
          setImages((prev) => [...prev, record as GalleryImage]);
        } else {
          setImages((prev) => prev.map((img) => (img.id === form.id ? (record as GalleryImage) : img)));
        }
      }
      setDrawerOpen(false);
      router.refresh();
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const { error: err } = await deleteGalleryImage(id);
      if (!err) {
        setImages((prev) => prev.filter((img) => img.id !== id));
        setDeleteId(null);
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:items-start sm:justify-between sm:gap-4">
        <div>
          <p className="text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-1">Homepage</p>
          <h1 className="text-2xl font-bold text-[#0a1628]">Photo Gallery</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-lg">
            These photos appear in the scrolling gallery carousel on your homepage. Add captions and
            categories to help visitors understand what they&apos;re looking at.
          </p>
        </div>
        <div className="flex justify-end sm:justify-start flex-shrink-0">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            <Plus size={16} /> Add Photo
          </button>
        </div>
      </div>

      {/* Empty state */}
      {images.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Images size={28} className="text-gray-300" />
          </div>
          <p className="font-semibold text-gray-500 mb-1">No photos yet</p>
          <p className="text-gray-400 text-sm mb-5">Add your first gallery photo to get started</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#00ABBE] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0097a6] transition-colors"
          >
            <Plus size={15} /> Upload First Photo
          </button>
        </div>
      )}

      {/* Photo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
          >
            {/* Image thumbnail */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="300px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageOff size={24} className="text-gray-300" />
                </div>
              )}
              {/* Category badge */}
              <span className="absolute top-2 left-2 text-[10px] font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {img.category}
              </span>
              {/* Order badge */}
              <span className="absolute top-2 right-2 text-[10px] text-white/60 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                #{img.ordering}
              </span>
            </div>

            {/* Card body */}
            <div className="p-3">
              <p className="text-gray-700 text-xs font-semibold leading-snug line-clamp-2 mb-2">
                {img.caption || 'No caption'}
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => openEdit(img)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] text-gray-400 hover:text-[#00ABBE] hover:bg-[#00ABBE]/5 transition-colors font-semibold"
                >
                  <Pencil size={11} /> Edit
                </button>
                <button
                  onClick={() => setDeleteId(img.id!)}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add new */}
        {images.length > 0 && (
          <button
            onClick={openCreate}
            className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#00ABBE]/60 hover:bg-[#00ABBE]/3 transition-all aspect-square flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#00ABBE]"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
              <Plus size={18} />
            </div>
            <span className="text-xs font-semibold">Add photo</span>
          </button>
        )}
      </div>

      {/* ── Create / Edit Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={isNew ? 'Add New Photo' : 'Edit Photo'}
        subtitle="Upload a photo or paste a URL, then add a caption visitors will see."
        footer={
          <div className="flex items-center justify-between gap-3">
            <div>
              {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {error}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-[#00ABBE] hover:bg-[#0097a6] text-white transition-colors disabled:opacity-60"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
                {isNew ? 'Add Photo' : 'Save Changes'}
              </button>
            </div>
          </div>
        }
      >
        <ImageUploader
          label="Photo"
          hint="Square photos look best in the gallery. Minimum 600×600px recommended."
          value={form.src}
          onChange={(url) => set('src', url)}
        />

        <FormField label="Caption" required hint="A short description of what's in the photo">
          <input
            className={inputCls}
            placeholder="Children Ready to Learn"
            value={form.caption}
            onChange={(e) => set('caption', e.target.value)}
          />
        </FormField>

        <FormField label="Category" hint="Helps visitors understand the topic of this photo">
          <div className="relative">
            <select
              className={selectCls + ' pr-10'}
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Display Order" hint="Photos are shown from lowest to highest order number">
          <input
            type="number"
            className={inputCls}
            min={1}
            value={form.ordering}
            onChange={(e) => set('ordering', Number(e.target.value))}
          />
        </FormField>
      </Drawer>

      {/* ── Delete Confirm ── */}
      <Drawer
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Remove this photo?"
        subtitle="This photo will be permanently removed from your gallery."
        footer={
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-60"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Remove Photo
            </button>
          </div>
        }
      >
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-red-700 flex items-start gap-3">
          <AlertCircle size={17} className="flex-shrink-0 mt-0.5 text-red-400" />
          <p>The photo will be removed from the gallery carousel immediately.</p>
        </div>
      </Drawer>
    </div>
  );
}
