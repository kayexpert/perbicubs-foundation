'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AdminNav from './AdminNav';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    const t = setTimeout(() => setSidebarOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Lock body scroll when sidebar open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // Render login page without the admin shell (must be after all hooks)
  if (pathname === '/admin/login') return <>{children}</>;


  return (
    <div className="min-h-screen flex bg-white">

      {/* ── Desktop Sidebar (always visible lg+) ── */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-30 shadow-sm">
        <SidebarContent />
      </aside>

      {/* ── Mobile: Top Bar ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <Link href="/admin" className="relative w-[120px] h-[30px]" onClick={() => setSidebarOpen(false)}>
            <Image 
              src="/img/logo_dark.png" 
              alt="PerbiCubs Foundation" 
              fill 
              className="object-contain"
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ── Mobile: Sidebar Overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              key="sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-xl flex flex-col border-r border-slate-200"
            >
              {/* Close button in header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                  <Link href="/admin" className="relative w-[120px] h-[30px]" onClick={() => setSidebarOpen(false)}>
                <Image 
                  src="/img/logo_dark.png" 
                  alt="PerbiCubs Foundation" 
                  fill 
                  className="object-contain"
                />
              </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav items — onClose closes the sidebar */}
              <AdminNav onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 lg:ml-72 pt-14 lg:pt-0 min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}

/** Shared sidebar content (logo + nav) for desktop — extracted to avoid duplication */
function SidebarContent() {
  return (
    <>
      <div className="flex items-center px-6 py-5 border-b border-slate-200 h-16">
        <Link href="/admin" className="relative w-[140px] h-[35px]">
          <Image 
            src="/img/logo_dark.png" 
            alt="PerbiCubs Foundation" 
            fill 
            className="object-contain"
          />
        </Link>
      </div>
      <AdminNav />
    </>
  );
}
