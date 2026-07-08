'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  foundation: [
    { href: '/about', label: 'About Us' },
    { href: '/the-problem', label: 'The Problem' },
    { href: '/our-solution', label: 'Our Solution' },
    { href: '/programs', label: 'Programs' },
  ],
  getInvolved: [
    { href: '/donate', label: 'Sponsor a Child' },
    { href: '/get-involved', label: 'Become a Partner' },
    { href: '/get-involved', label: 'Corporate Partnerships' },
    { href: '/get-involved', label: 'Research Collaboration' },
  ],
  contact: [
    { href: 'mailto:info@perbicubsfoundation.org', label: 'info@perbicubsfoundation.org', icon: Mail },
    { href: 'tel:+233XXXXXXXXXX', label: '+233 55 279 9525', icon: Phone },
    { href: '#', label: 'Sub-Saharan Africa', icon: MapPin },
  ],
};

type ContactLink = { href: string; label: string; icon: typeof Mail };

// Real social URLs. Replace these with the foundation's verified accounts.
const socialLinks: { label: string; href: string; icon: string }[] = [
  // Update with the real Facebook page URL when available.
  { label: 'Facebook', href: '#', icon: 'f' },
  { label: 'X', href: '#', icon: '𝕏' },
  { label: 'Instagram', href: '#', icon: '📷' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #0a1628 0%, #112240 100%)' }}>
      {/* Main Footer */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-2 relative w-[280px] h-[70px]">
              <Image
                src="/img/logo_dark.png"
                alt="PerbiCubs Foundation"
                fill
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Every family flourishing through equitable access to literacy and learning opportunities.
            </p>
          </div>

          {/* Links */}
          {[
            { title: 'Foundation', links: footerLinks.foundation, hasIcons: false },
            { title: 'Get Involved', links: footerLinks.getInvolved, hasIcons: false },
            { title: 'Contact', links: footerLinks.contact as ContactLink[], hasIcons: true, hasSocial: true },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label} className="flex items-center gap-2 whitespace-nowrap">
                    {group.hasIcons ? (
                      <>
                        {(() => {
                          const Icon = (link as ContactLink).icon;
                          return <Icon size={14} className="text-[#00ABBE] flex-shrink-0" />;
                        })()}
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-[#00ABBE] transition-colors text-sm hover:translate-x-1 transition-transform duration-200"
                        >
                          {link.label}
                        </a>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-[#00ABBE] transition-colors text-sm hover:translate-x-1 inline-block transition-transform duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Social Icons in Contact Column */}
              {group.hasSocial && (
                <div className="flex items-center gap-3 mt-6">
                  {socialLinks.map((item) => {
                    const disabled = item.href === '#';
                    const className =
                      'w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-[#00ABBE] hover:text-white hover:scale-110 ' +
                      (disabled ? 'opacity-50 cursor-not-allowed' : '');
                    if (disabled) {
                      return (
                        <span
                          key={item.label}
                          aria-label={`${item.label} (link not configured)`}
                          className={className}
                        >
                          {item.icon}
                        </span>
                      );
                    }
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        aria-label={item.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {item.icon}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PerbiCubs Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
