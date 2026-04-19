'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, BookOpen, ImageOff, Wand2 } from 'lucide-react';
import Drawer from './Drawer';
import FormField, { inputCls, textareaCls, selectCls } from './FormField';
import ImageUploader from './ImageUploader';
import { upsertBlogPost, deleteBlogPost } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const CATEGORIES = ['Research', 'Impact Stories', 'Programs', 'Education', 'Community', 'News', 'Events'];

interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  read_time: string;
  image: string;
  author: string;
  author_role: string;
}

const BLANK: BlogPost = {
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  category: 'Research',
  date: '',
  read_time: '',
  image: '',
  author: '',
  author_role: '',
};

function toSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function today() {
  return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

interface BlogManagerProps {
  initialPosts: BlogPost[];
}

export default function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<BlogPost>(BLANK);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const set = (key: keyof BlogPost, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const openCreate = () => {
    setForm({ ...BLANK, date: today() });
    setIsNew(true);
    setError('');
    setDrawerOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setForm({ ...post });
    setIsNew(false);
    setError('');
    setDrawerOpen(true);
  };

  const autoSlug = () => {
    if (form.title) set('slug', toSlug(form.title));
  };

  const handleSave = () => {
    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (!form.excerpt.trim()) { setError('Excerpt is required.'); return; }
    if (!form.slug.trim()) { setError('URL slug is required. Click the wand icon to auto-generate one.'); return; }
    setError('');
    startTransition(async () => {
      const { error: err, record } = await upsertBlogPost(form as unknown as Record<string, unknown>, isNew ? undefined : form.id);
      if (err) { setError(err); return; }
      if (record) {
        if (isNew) {
          setPosts((prev) => [record as BlogPost, ...prev]);
        } else {
          setPosts((prev) => prev.map((p) => (p.id === form.id ? (record as BlogPost) : p)));
        }
      }
      setDrawerOpen(false);
      router.refresh();
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const { error: err } = await deleteBlogPost(id);
      if (!err) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
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
          <p className="text-[#6366f1] text-xs font-bold uppercase tracking-widest mb-1">Content</p>
          <h1 className="text-2xl font-bold text-[#0a1628]">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-lg">
            These articles appear in the &quot;Stories of Change&quot; section on your homepage and on the
            /blog page. Write, edit, and publish your news and impact stories here.
          </p>
        </div>
        <div className="flex justify-end sm:justify-start flex-shrink-0">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#5558e3] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
          >
            <Plus size={16} /> New Article
          </button>
        </div>
      </div>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} className="text-gray-300" />
          </div>
          <p className="font-semibold text-gray-500 mb-1">No blog posts yet</p>
          <p className="text-gray-400 text-sm mb-5">Write your first article to share your impact</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#6366f1] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#5558e3] transition-colors"
          >
            <Plus size={15} /> Write First Article
          </button>
        </div>
      )}

      {/* Blog cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Cover image */}
            <div className="relative aspect-[16/6] bg-gray-100 overflow-hidden">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="600px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageOff size={24} className="text-gray-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-[#6366f1]/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-[#0a1628] text-sm leading-snug line-clamp-2 mb-1.5">
                {post.title || 'Untitled'}
              </h3>
              <p className="text-gray-400 text-xs leading-snug line-clamp-2 mb-3">
                {post.excerpt || 'No excerpt'}
              </p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-[#6366f1]/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-[#6366f1]">
                      {post.author?.charAt(0) ?? 'A'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-gray-600 truncate">{post.author || 'Unknown'}</p>
                    <p className="text-[10px] text-gray-400">{post.date || 'No date'}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEdit(post)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-gray-400 hover:text-[#6366f1] hover:bg-[#6366f1]/5 transition-colors font-semibold"
                  >
                    <Pencil size={11} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(post.id!)}
                    className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add new card */}
        {posts.length > 0 && (
          <button
            onClick={openCreate}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#6366f1]/60 hover:bg-[#6366f1]/3 transition-all min-h-[180px] flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#6366f1]"
          >
            <div className="w-11 h-11 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-sm font-semibold">Write new article</span>
          </button>
        )}
      </div>

      {/* ── Create / Edit Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={isNew ? 'Write New Article' : 'Edit Article'}
        subtitle={
          isNew
            ? 'Fill in the details below. Fields marked with * are required.'
            : 'Make your changes and click "Save" when ready.'
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
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-[#6366f1] hover:bg-[#5558e3] text-white transition-colors disabled:opacity-60"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
                {isNew ? 'Publish Article' : 'Save Changes'}
              </button>
            </div>
          </div>
        }
      >
        <ImageUploader
          label="Cover Photo"
          hint="The main photo for this article. Displayed at 16:6 aspect ratio."
          value={form.image}
          onChange={(url) => set('image', url)}
        />

        <FormField label="Article Title" required>
          <input
            className={inputCls}
            placeholder="The Silent Learning Crisis in Sub-Saharan Africa"
            value={form.title}
            onChange={(e) => {
              set('title', e.target.value);
              if (!form.slug || form.slug === toSlug(form.title)) {
                set('slug', toSlug(e.target.value));
              }
            }}
          />
        </FormField>

        <FormField
          label="URL Slug"
          hint="The web address for this article (auto-generated from the title). Only lowercase letters and hyphens."
          required
        >
          <div className="flex gap-2">
            <input
              className={inputCls + ' flex-1 font-mono text-xs'}
              placeholder="literacy-crisis-africa"
              value={form.slug}
              onChange={(e) => set('slug', toSlug(e.target.value))}
            />
            <button
              type="button"
              onClick={autoSlug}
              title="Auto-generate from title"
              className="px-3 rounded-xl border border-gray-200 text-gray-400 hover:text-[#6366f1] hover:border-[#6366f1] transition-colors"
            >
              <Wand2 size={15} />
            </button>
          </div>
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Category">
            <div className="relative">
              <select
                className={selectCls + ' pr-10'}
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </FormField>

          <FormField label="Date" hint="e.g. April 19, 2025">
            <input
              className={inputCls}
              placeholder={today()}
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Author Name">
            <input
              className={inputCls}
              placeholder="PerbiCubs Team"
              value={form.author}
              onChange={(e) => set('author', e.target.value)}
            />
          </FormField>

          <FormField label="Author Role" hint="e.g. Communications">
            <input
              className={inputCls}
              placeholder="Communications"
              value={form.author_role}
              onChange={(e) => set('author_role', e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Read Time" hint="Approximate reading time — e.g. 4 min read">
          <input
            className={inputCls}
            placeholder="4 min read"
            value={form.read_time}
            onChange={(e) => set('read_time', e.target.value)}
          />
        </FormField>

        <FormField
          label="Short Excerpt"
          required
          hint="2–3 sentences summarising the article. This appears in the homepage cards and blog listings."
        >
          <textarea
            className={textareaCls}
            rows={3}
            placeholder="A short summary of what this article is about…"
            value={form.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
          />
        </FormField>

        <FormField
          label="Full Article Body"
          hint="The complete article content. You can use **bold**, *italic*, and ## headings (Markdown formatting)."
          required
        >
          <textarea
            className={textareaCls}
            rows={10}
            placeholder="Write your full article here…"
            value={form.body}
            onChange={(e) => set('body', e.target.value)}
          />
        </FormField>
      </Drawer>

      {/* ── Delete Confirm ── */}
      <Drawer
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Delete this article?"
        subtitle="This will permanently remove the article from your website."
        footer={
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors">
              Keep it
            </button>
            <button
              onClick={() => deleteId !== null && handleDelete(deleteId)}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-60"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Delete Article
            </button>
          </div>
        }
      >
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-red-700 flex items-start gap-3">
          <AlertCircle size={17} className="flex-shrink-0 mt-0.5 text-red-400" />
          <p>This article will be permanently deleted and removed from your website.</p>
        </div>
      </Drawer>
    </div>
  );
}
