'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Image as ImageIcon,
  BarChart3,
  Images,
  BookOpen,
  Users,
  ExternalLink,
} from 'lucide-react';
import LogoutButton from './LogoutButton';

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    desc: 'Overview & stats',
    exact: true,
  },
  {
    href: '/admin/hero',
    label: 'Hero Slides',
    icon: ImageIcon,
    desc: 'Homepage carousel',
  },
  {
    href: '/admin/impact',
    label: 'Impact Numbers',
    icon: BarChart3,
    desc: 'Statistics section',
  },
  {
    href: '/admin/gallery',
    label: 'Photo Gallery',
    icon: Images,
    desc: 'Gallery carousel',
  },
  {
    href: '/admin/blog',
    label: 'Blog Posts',
    icon: BookOpen,
    desc: 'News & articles',
  },
  {
    href: '/admin/team',
    label: 'Team Members',
    icon: Users,
    desc: 'About page team cards',
  },
];

interface AdminNavProps {
  /** Called when a nav item is clicked — used to close the mobile sidebar */
  onClose?: () => void;
}

export default function AdminNav({ onClose }: AdminNavProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex-1 px-4 py-5 flex flex-col gap-1 overflow-y-auto">
      {navItems.map(({ href, label, icon: Icon, desc, exact }) => {
        const active = isActive(href, exact);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
              active
                ? 'bg-[#00ABBE] text-white'
                : 'text-white/60 hover:bg-white/8 hover:text-white'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                active ? 'bg-white/20' : 'bg-white/8 group-hover:bg-white/12'
              }`}
            >
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight">{label}</p>
              <p
                className={`text-[11px] mt-0.5 leading-tight truncate ${
                  active ? 'text-white/70' : 'text-white/35'
                }`}
              >
                {desc}
              </p>
            </div>
          </Link>
        );
      })}

      {/* Spacer */}
      <div className="flex-1 min-h-8" />

      {/* Footer links */}
      <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-1">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/40 hover:bg-white/8 hover:text-white/70 transition-all text-sm"
        >
          <ExternalLink size={16} className="flex-shrink-0" />
          View Website
        </Link>
        <LogoutButton onClose={onClose} />
      </div>
    </nav>
  );
}
