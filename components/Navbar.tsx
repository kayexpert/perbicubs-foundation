'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface SubLink {
  href: string;
  label: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: SubLink[];
}

const navItems: NavItem[] = [
  {
    label: 'About',
    children: [
      { href: '/about', label: 'Who We Are' },
      { href: '/the-problem', label: 'The Problem' },
      { href: '/our-solution', label: 'Our Solution' },
    ],
  },
  { href: '/programs', label: 'Programs' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/corporate-partnerships', label: 'Corporate Partnerships' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const isTransparent = !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsOpen(false);
      setAboutDropdownOpen(false);
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 150);
  };

  const isAboutActive =
    pathname === '/about' ||
    pathname === '/the-problem' ||
    pathname === '/our-solution';

  return (
    <>
      <header
        className="fixed top-4 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-6"
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
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div className="relative w-[210px] sm:w-[230px] h-[58px] transition-transform duration-300 group-hover:scale-105">
              <Image
                src={isTransparent ? '/img/logo_dark.png' : '/img/logo_light.png'}
                alt="PerbiCubs Foundation"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              // Dropdown Item (About)
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setAboutDropdownOpen((prev) => !prev)}
                      className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isAboutActive
                          ? isTransparent
                            ? 'text-white'
                            : 'text-[#00ABBE]'
                          : isTransparent
                          ? 'text-white/80 hover:text-white'
                          : 'text-gray-600 hover:text-[#00ABBE]'
                      }`}
                      aria-expanded={aboutDropdownOpen}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          aboutDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                        aboutDropdownOpen
                          ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="w-52 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 py-2.5 px-2 flex flex-col gap-1">
                        {item.children.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                                isSubActive
                                  ? 'bg-[#00ABBE]/10 text-[#00ABBE]'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#00ABBE]'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              // Standard Link Item
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? isTransparent
                        ? 'text-white'
                        : 'text-[#00ABBE]'
                      : isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-gray-600 hover:text-[#00ABBE]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <Link
              href="/donate"
              className="bg-[#00ABBE] hover:bg-[#008fa0] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              Sponsor a Child <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'
            }`}
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
              <Link href="/" className="relative w-[160px] h-[40px]" onClick={() => setIsOpen(false)}>
                <Image
                  src="/img/logo_dark.png"
                  alt="PerbiCubs Foundation"
                  fill
                  className="object-contain object-left"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  if (item.children) {
                    return (
                      <li key={item.label} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setMobileAboutOpen((prev) => !prev)}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                            isAboutActive
                              ? 'bg-[#00ABBE]/10 text-[#00ABBE]'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-[#00ABBE]'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                              mobileAboutOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {mobileAboutOpen && (
                          <ul className="pl-4 pr-1 py-1 space-y-1">
                            {item.children.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    className={`flex items-center px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                                      isSubActive
                                        ? 'text-[#00ABBE] font-bold bg-[#00ABBE]/5'
                                        : 'text-gray-600 hover:text-[#00ABBE] hover:bg-gray-50'
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href!}
                        className={`flex items-center px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                          isActive
                            ? 'bg-[#00ABBE]/10 text-[#00ABBE]'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#00ABBE]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <div className="p-6 border-t border-gray-100 space-y-3">
              <Link href="/donate" className="btn-accent w-full justify-center">
                Sponsor a Child
              </Link>
              <Link
                href="/corporate-partnerships"
                className="btn-outline w-full justify-center text-[#00ABBE] border-[#00ABBE]"
              >
                Corporate Partnerships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
