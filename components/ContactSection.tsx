'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, User, Pencil, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setErrorMessage('Please agree to data collection before submitting.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setAgreed(false);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please check your connection.');
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">

        {/* Section tag */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 text-[#00ABBE] text-xs font-bold uppercase tracking-widest mb-10"
        >
          <span className="w-6 h-px bg-[#00ABBE]" />
          Contact Us
          <span className="w-6 h-px bg-[#00ABBE]" />
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-stretch">

          {/* ── Left: heading + contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1628] leading-tight mb-6">
              Have Questions?{' '}
              <span className="text-[#00ABBE]">Get in touch!</span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-10 max-w-sm">
              Contact our team to discuss placements, partnerships, or program details. We typically
              respond within 1–2 business days.
            </p>

            <div className="space-y-5 mt-auto">
              {[
                { icon: MapPin, text: 'No.11 3rd Avenue, Westlands Blvd, Accra' },
                { icon: Phone, text: '+233 55 279 9525' },
                { icon: Mail, text: 'info@perbicubsfoundation.org' },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00ABBE]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-[#00ABBE]" />
                  </div>
                  <span className="text-[#00ABBE] font-medium text-base">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: contact form — same height as left ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-col relative"
          >
            {/* 2×2 fixed fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9 mb-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <User size={17} className="text-[#00ABBE] flex-shrink-0" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name *"
                  className="flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <Mail size={17} className="text-[#00ABBE] flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address *"
                  className="flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <Phone size={17} className="text-[#00ABBE] flex-shrink-0" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <Info size={17} className="text-[#00ABBE] flex-shrink-0" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="flex-1 text-base text-gray-700 outline-none bg-transparent placeholder-gray-400"
                />
              </div>
            </div>

            {/* Textarea — grows to fill remaining height */}
            <div className="flex items-start gap-3 border-b border-gray-200 pb-3 flex-1 min-h-[60px]">
              <Pencil size={17} className="text-[#00ABBE] flex-shrink-0 mt-1" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="How can we help you? Feel free to get in touch! *"
                className="flex-1 h-full text-base text-gray-700 outline-none bg-transparent placeholder-gray-400 resize-none min-h-[120px]"
              />
            </div>

            {/* Messages */}
            {status === 'success' && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                Thank you! Your message has been sent successfully. We will get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {errorMessage}
              </div>
            )}

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded border-gray-300"
                />
                I agree that my data is collected and stored.
              </label>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#00ABBE] hover:bg-[#0097a6] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase transition-colors flex-shrink-0"
              >
                {status === 'loading' ? 'Sending...' : 'Get In Touch'}
              </button>
            </div>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
