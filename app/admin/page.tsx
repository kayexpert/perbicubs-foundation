import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import {
  Image as ImageIcon,
  BarChart3,
  Images,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const sections = [
  {
    href: '/admin/hero',
    label: 'Hero Slides',
    icon: ImageIcon,
    color: '#00ABBE',
    bg: 'bg-[#00ABBE]/8',
    desc: 'The big images at the very top of your homepage with the main message and buttons.',
    action: 'Edit Slides',
  },
  {
    href: '/admin/impact',
    label: 'Impact Numbers',
    icon: BarChart3,
    color: '#FF6B56',
    bg: 'bg-[#FF6B56]/8',
    desc: 'The statistics like "700,000+ Books Read" that demonstrate the Foundation\'s reach.',
    action: 'Edit Numbers',
  },
  {
    href: '/admin/gallery',
    label: 'Photo Gallery',
    icon: Images,
    color: '#00ABBE',
    bg: 'bg-[#00ABBE]/8',
    desc: 'The scrolling photo carousel showing pictures from your programs and events.',
    action: 'Manage Photos',
  },
  {
    href: '/admin/blog',
    label: 'Blog Posts',
    icon: BookOpen,
    color: '#6366f1',
    bg: 'bg-[#6366f1]/8',
    desc: 'News articles and stories that appear in the "Stories of Change" section.',
    action: 'Manage Articles',
  },
];

const tips = [
  'Changes you make here appear on the website immediately.',
  'You can upload images directly from your computer — no image links needed.',
  'All buttons let you pick a page from a dropdown — no typing required.',
  'Unsure? Each section has a description explaining exactly what it controls.',
];

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [heroCount, statsCount, galleryCount, blogCount] = await Promise.all([
    supabase.from('hero_slides').select('id', { count: 'exact', head: true }),
    supabase.from('impact_stats').select('id', { count: 'exact', head: true }),
    supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
  ]);

  const counts = [
    heroCount.count ?? 0,
    statsCount.count ?? 0,
    galleryCount.count ?? 0,
    blogCount.count ?? 0,
  ];

  const totalRecords = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* ── Welcome banner ── */}
      <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] rounded-3xl px-8 py-8 flex items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#00ABBE]" />
            <span className="text-[#00ABBE] text-xs font-bold uppercase tracking-widest">
              Welcome back
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
            PerbiCubs Admin Portal
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-md">
            From here you can update your website content — no technical skills needed.
            Pick a section below to get started.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
          <p className="text-white/30 text-xs uppercase tracking-wide">Total Records</p>
          <p className="text-5xl font-bold text-white">{totalRecords}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">Live &amp; connected</span>
          </div>
        </div>
      </div>

      {/* ── Quick stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sections.map(({ href, label, icon: Icon, color, bg }, i) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} style={{ color }} />
            </div>
            <p className="text-2xl font-bold text-[#0a1628]">{counts[i]}</p>
            <p className="text-gray-400 text-xs font-medium mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* ── Section cards ── */}
      <div>
        <h2 className="text-lg font-bold text-[#0a1628] mb-4">What would you like to update?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {sections.map(({ href, label, icon: Icon, color, bg, desc, action }, i) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`w-13 h-13 rounded-2xl ${bg} flex items-center justify-center p-3`}>
                  <Icon size={24} style={{ color }} />
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full mt-1 flex-shrink-0"
                  style={{ background: `${color}18`, color }}
                >
                  {counts[i]} {counts[i] === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0a1628] text-base mb-1.5">{label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
              <div
                className="flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all"
                style={{ color }}
              >
                {action} <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Tips ── */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="font-bold text-blue-900 text-sm mb-3 flex items-center gap-2">
          <span>💡</span> Quick tips for using this admin panel
        </h3>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-blue-700">
              <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
