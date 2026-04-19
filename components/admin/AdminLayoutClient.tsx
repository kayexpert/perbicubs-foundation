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
    <div className="min-h-screen flex bg-[#f5f6fa]">

      {/* ── Desktop Sidebar (always visible lg+) ── */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0a1628] fixed inset-y-0 left-0 z-30 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* ── Mobile: Top Bar ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-[#0a1628] shadow-lg">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00ABBE]/20 flex items-center justify-center flex-shrink-0">
              <div className="relative w-5 h-5">
                <Image
                  src="/images/perbicubs%20logo.png"
                  alt="PerbiCubs"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">PerbiCubs</p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider leading-none">Admin Portal</p>
            </div>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="w-10 h-10 rounded-xl bg-white/8 hover:bg-white/15 flex items-center justify-center text-white transition-colors"
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
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.aside
              key="sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#0a1628] z-50 shadow-2xl flex flex-col"
            >
              {/* Close button in header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#00ABBE]/20 flex items-center justify-center flex-shrink-0">
                    <div className="relative w-6 h-6">
                      <Image
                        src="/images/perbicubs%20logo.png"
                        alt="PerbiCubs"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">PerbiCubs</p>
                    <p className="text-white/40 text-[10px] tracking-wide uppercase mt-0.5">Admin Portal</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
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
      <main className="flex-1 lg:ml-72 pt-14 lg:pt-0 min-h-screen">
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
      <div className="flex items-center gap-3.5 px-6 py-7 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-[#00ABBE]/20 flex items-center justify-center flex-shrink-0">
          <div className="relative w-7 h-7">
            <Image
              src="/images/perbicubs%20logo.png"
              alt="PerbiCubs"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">PerbiCubs</p>
          <p className="text-white/40 text-[11px] font-medium tracking-wide uppercase mt-0.5">
            Admin Portal
          </p>
        </div>
      </div>
      <AdminNav />
    </>
  );
}
