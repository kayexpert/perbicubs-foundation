'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Mail, MapPin, Heart, Send } from 'lucide-react';

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
  resources: [
    { href: '/blog', label: 'Blog & News' },
    { href: '#', label: 'Impact Reports' },
    { href: '#', label: 'Press & Media' },
    { href: '#', label: 'FAQs' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSent(true); setEmail(''); }
  };

  return (
    <footer style={{ background: 'linear-gradient(135deg, #0a1628 0%, #112240 100%)' }}>
      {/* Newsletter Band */}
      <div className="border-t border-white/10" style={{ background: '#0d1f38' }}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-2xl mb-1">Subscribe To Our Newsletter</h3>
              <p className="text-gray-400 text-sm">Regular updates on our impact, programs and opportunities</p>
            </div>
            {sent ? (
              <p className="text-[#00ABBE] font-semibold text-sm">✓ Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                  className="flex-1 md:w-64 px-5 py-3 rounded-full bg-white text-gray-700 text-sm outline-none focus:ring-2 focus:ring-[#00ABBE]"
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-full bg-[#FF6B56] hover:bg-[#e5533e] flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <Send size={16} className="text-white" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#00ABBE] flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-white" style={{ fontFamily: 'Quicksand, sans-serif' }}>PerbiCubs</div>
                <div className="text-[#00ABBE] text-xs tracking-widest uppercase font-semibold">Foundation</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Dedicated to closing the literacy gap in Sub-Saharan Africa through scalable, measurable interventions that give every child the power to read.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@perbicubsfoundation.org" className="flex items-center gap-3 text-gray-400 hover:text-[#00ABBE] transition-colors text-sm">
                <Mail size={16} className="text-[#00ABBE] flex-shrink-0" />
                info@perbicubsfoundation.org
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-[#00ABBE] flex-shrink-0" />
                Sub-Saharan Africa
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {(['fb', 'tw', 'ig', 'yt']).map((platform, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Social media ${i + 1}`}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#00ABBE] hover:text-white transition-all duration-300 hover:scale-110 text-xs font-bold"
                >
                  {platform === 'fb' ? 'f' : platform === 'tw' ? 'X' : platform === 'ig' ? '📷' : '▶'}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Foundation', links: footerLinks.foundation },
            { title: 'Get Involved', links: footerLinks.getInvolved },
            { title: 'Resources', links: footerLinks.resources },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold mb-5 text-sm tracking-widest uppercase">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#00ABBE] transition-colors text-sm hover:translate-x-1 inline-block transition-transform duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partners Marquee */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-4">Recognized by</p>
          <div className="overflow-hidden">
            <div className="marquee-track flex gap-12 whitespace-nowrap items-center">
              {['UNESCO', 'Mastercard Foundation', 'EdTech Fellowship', 'World Book Capital', 'SDG 4 Alliance', 'UNESCO', 'Mastercard Foundation', 'EdTech Fellowship', 'World Book Capital', 'SDG 4 Alliance'].map((partner, i) => (
                <span key={i} className="text-gray-500 font-bold text-sm tracking-wider flex-shrink-0">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PerbiCubs Foundation. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with <Heart size={14} className="text-[#FF6B56]" fill="#FF6B56" /> for every child&apos;s future
          </p>
        </div>
      </div>
    </footer>
  );
}
