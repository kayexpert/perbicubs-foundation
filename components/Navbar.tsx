'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen, ArrowRight } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/the-problem', label: 'The Problem' },
  { href: '/our-solution', label: 'Our Solution' },
  { href: '/programs', label: 'Programs' },
  { href: '/get-involved', label: 'Get Involved' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isTransparent = !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);


  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-6`}
      >
        <nav
          className={`max-w-[1360px] mx-auto transition-all duration-500 flex items-center justify-between ${
            scrolled ? 'py-3 px-6' : 'py-4 px-8'
          } ${
            isTransparent
              ? 'bg-transparent border-transparent shadow-none'
              : 'bg-white rounded-full shadow-lg shadow-black/5 border border-gray-100'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300 ${isTransparent ? 'bg-white/20 border border-white/30' : 'bg-gray-900'}`}>
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-[1.1rem] leading-none tracking-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: 'Quicksand, sans-serif' }}
              >
                PerbiCubs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  pathname === link.href
                    ? isTransparent ? 'text-white' : 'text-[#00ABBE]'
                    : isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-[#00ABBE]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/donate"
              className="bg-[#56B543] hover:bg-[#489938] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md flex items-center gap-2"
              style={{ background: '#00ABBE' }}
            >
              Sponsor a Child <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <BookOpen size={16} className="text-white" />
                </div>
                <span className="font-bold text-gray-900">PerbiCubs Foundation</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                        pathname === link.href
                          ? 'bg-[#00ABBE]/10 text-[#00ABBE]'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#00ABBE]'
                      }`}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <div className="p-6 border-t border-gray-100 space-y-3">
              <Link href="/donate" className="btn-accent w-full justify-center">
                Sponsor a Child
              </Link>
              <Link href="/get-involved" className="btn-primary w-full justify-center" style={{ background: 'transparent', border: '2px solid #00ABBE', color: '#00ABBE' }}>
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
