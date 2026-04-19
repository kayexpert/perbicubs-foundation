'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, GripVertical, AlertCircle, ImageOff, MousePointerClick } from 'lucide-react';
import Drawer from './Drawer';
import FormField, { inputCls, textareaCls } from './FormField';
import ImageUploader from './ImageUploader';
import PageLinkSelect from './PageLinkSelect';
import { upsertHeroSlide, deleteHeroSlide } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';

interface Slide {
  id?: number;
  ordering: number;
  image: string;
  tag: string;
  headline: string;
  sub: string;
  cta1_label: string;
  cta1_href: string;
  cta2_label: string;
  cta2_href: string;
}

const BLANK: Slide = {
  ordering: 1,
  image: '',
  tag: '',
  headline: '',
  sub: '',
  cta1_label: '',
  cta1_href: '/',
  cta2_label: '',
  cta2_href: '/',
};

interface HeroManagerProps {
  initialSlides: Slide[];
}

export default function HeroManager({ initialSlides }: HeroManagerProps) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<Slide>(BLANK);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const set = (key: keyof Slide, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const openCreate = () => {
    setForm({ ...BLANK, ordering: slides.length + 1 });
    setIsNew(true);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (slide: Slide) => {
    setForm({ ...slide });
    setIsNew(false);
    setError('');
    setDrawerOpen(true);
  };

  const handleSave = () => {
    if (!form.headline.trim()) { setError('Headline is required.'); return; }
    setError('');
    startTransition(async () => {
      const { error: err, record } = await upsertHeroSlide(form as unknown as Record<string, unknown>, isNew ? undefined : form.id);
      if (err) { setError(err); return; }
      if (record) {
        if (isNew) {
          setSlides((prev) => [...prev, record as Slide]);
        } else {
          setSlides((prev) => prev.map((s) => (s.id === form.id ? (record as Slide) : s)));
        }
      }
      setDrawerOpen(false);
      router.refresh();
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const { error: err } = await deleteHeroSlide(id);
      if (!err) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
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
          <h1 className="text-2xl font-bold text-[#0a1628]">Hero Slides</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-lg">
            These are the large banner slides at the very top of your homepage. Each slide has a
            background photo, a main headline, and two call-to-action buttons.
          </p>
        </div>
        <div className="flex justify-end sm:justify-start flex-shrink-0">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md shadow-[#00ABBE]/25"
          >
            <Plus size={16} /> Add Slide
          </button>
        </div>
      </div>

      {/* How it looks hint */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 flex items-start gap-3 text-sm text-amber-800">
        <MousePointerClick size={17} className="flex-shrink-0 mt-0.5 text-amber-500" />
        <p>
          <strong>Tip:</strong> The slides rotate automatically on the website. You can control the order
          by setting the <em>Display Order</em> number — lower numbers appear first.
        </p>
      </div>

      {/* Empty state */}
      {slides.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageOff size={28} className="text-gray-300" />
          </div>
          <p className="font-semibold text-gray-500 mb-1">No slides yet</p>
          <p className="text-gray-400 text-sm mb-5">Add your first hero slide to get started</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#00ABBE] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#0097a6] transition-colors"
          >
            <Plus size={15} /> Add First Slide
          </button>
        </div>
      )}

      {/* Slide cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
          >
            {/* Image preview */}
            <div className="relative aspect-[16/7] bg-gray-100 overflow-hidden">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageOff size={28} className="text-gray-300" />
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/30 to-transparent" />
              {/* Tag */}
              <span className="absolute top-3 left-3 text-[10px] font-bold text-[#00ABBE] bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {slide.tag || 'No tag set'}
              </span>
              {/* Order badge */}
              <span className="absolute top-3 right-3 text-[10px] font-bold text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                <GripVertical size={10} /> #{slide.ordering}
              </span>
              {/* Headline */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                <p className="text-white font-bold text-sm leading-snug line-clamp-2">
                  {slide.headline || <span className="italic text-white/40">No headline</span>}
                </p>
              </div>
            </div>

            {/* Card body */}
            <div className="p-4">
              <p className="text-gray-400 text-xs leading-snug line-clamp-2 mb-3">
                {slide.sub || 'No description set'}
              </p>
              {/* CTAs */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {slide.cta1_label && (
                  <span className="text-[10px] font-semibold bg-[#00ABBE]/10 text-[#00ABBE] px-2.5 py-1 rounded-full">
                    {slide.cta1_label}
                  </span>
                )}
                {slide.cta2_label && (
                  <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                    {slide.cta2_label}
                  </span>
                )}
              </div>
              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(slide)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-500 hover:border-[#00ABBE] hover:text-[#00ABBE] transition-colors text-xs font-semibold"
                >
                  <Pencil size={13} /> Edit Slide
                </button>
                <button
                  onClick={() => setDeleteId(slide.id!)}
                  className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete slide"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add new card */}
        {slides.length > 0 && (
          <button
            onClick={openCreate}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#00ABBE]/60 hover:bg-[#00ABBE]/3 transition-all min-h-[200px] flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#00ABBE] group"
          >
            <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-sm font-semibold">Add another slide</span>
          </button>
        )}
      </div>

      {/* ── Create / Edit Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={isNew ? 'Add New Hero Slide' : 'Edit Hero Slide'}
        subtitle={
          isNew
            ? 'Fill in the details below to create a new carousel slide for your homepage.'
            : 'Update any of the fields below. Click "Save Changes" when you\'re done.'
        }
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
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-[#00ABBE] hover:bg-[#0097a6] text-white transition-colors disabled:opacity-60 shadow-md shadow-[#00ABBE]/20"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
                {isNew ? 'Create Slide' : 'Save Changes'}
              </button>
            </div>
          </div>
        }
      >
        <ImageUploader
          label="Background Photo"
          hint="This is the large background image for this slide. Best size: 1920×1080px or wider."
          value={form.image}
          onChange={(url) => set('image', url)}
        />

        <FormField label="Tag Line" hint="A short label that appears above the headline (e.g. 'Ending Learning Poverty')">
          <input
            className={inputCls}
            placeholder="Ending Learning Poverty"
            value={form.tag}
            onChange={(e) => set('tag', e.target.value)}
          />
        </FormField>

        <FormField label="Main Headline" required hint="The big bold text visitors first read on this slide">
          <input
            className={inputCls}
            placeholder="Every Child Deserves to Read"
            value={form.headline}
            onChange={(e) => set('headline', e.target.value)}
          />
        </FormField>

        <FormField label="Subheading" hint="A supporting sentence or two below the headline">
          <textarea
            className={textareaCls}
            rows={3}
            placeholder="We are building a future where no child is left behind…"
            value={form.sub}
            onChange={(e) => set('sub', e.target.value)}
          />
        </FormField>

        <div className="border-t border-gray-100 pt-5">
          <p className="text-sm font-bold text-[#0a1628] mb-4">
            Button 1 <span className="text-gray-400 font-normal text-xs">(Primary — coloured button)</span>
          </p>
          <div className="space-y-4">
            <FormField label="Button Text" hint="What the button says — keep it short">
              <input
                className={inputCls}
                placeholder="Become a Founding Partner"
                value={form.cta1_label}
                onChange={(e) => set('cta1_label', e.target.value)}
              />
            </FormField>
            <PageLinkSelect
              label="Button Links To"
              value={form.cta1_href}
              onChange={(href) => set('cta1_href', href)}
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <p className="text-sm font-bold text-[#0a1628] mb-4">
            Button 2 <span className="text-gray-400 font-normal text-xs">(Secondary — outline button)</span>
          </p>
          <div className="space-y-4">
            <FormField label="Button Text">
              <input
                className={inputCls}
                placeholder="Sponsor a Child"
                value={form.cta2_label}
                onChange={(e) => set('cta2_label', e.target.value)}
              />
            </FormField>
            <PageLinkSelect
              label="Button Links To"
              value={form.cta2_href}
              onChange={(href) => set('cta2_href', href)}
            />
          </div>
        </div>

        <FormField
          label="Display Order"
          hint="Slides appear in order from lowest to highest number. Slide 1 shows first."
        >
          <input
            type="number"
            className={inputCls}
            min={1}
            value={form.ordering}
            onChange={(e) => set('ordering', Number(e.target.value))}
          />
        </FormField>
      </Drawer>

      {/* ── Delete Confirmation Drawer ── */}
      <Drawer
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Delete this slide?"
        subtitle="This will permanently remove the slide from your homepage carousel."
        footer={
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              No, keep it
            </button>
            <button
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-60"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Yes, delete
            </button>
          </div>
        }
      >
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-red-700 flex items-start gap-3">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
          <p>
            Once deleted, this slide cannot be recovered. Your other slides will not be affected.
          </p>
        </div>
      </Drawer>
    </div>
  );
}
