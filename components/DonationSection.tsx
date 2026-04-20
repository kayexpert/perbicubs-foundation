'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DollarSign, ArrowRight } from 'lucide-react';

const amounts = [20, 35, 50, 100, 200];
const paymentMethods = ['Online Transfer', 'Offline Donation', 'Credit Card'];

export default function DonationSection() {
  const [selected, setSelected] = useState(35);
  const [isCustom, setIsCustom] = useState(false);
  const [custom, setCustom] = useState('');
  const [payMethod, setPayMethod] = useState('Online Transfer');



  return (
    <section className="relative pt-16 lg:pt-24">
      {/* Dark background — stops 80px before the section's actual bottom */}
      <div
        className="absolute inset-x-0 top-0 z-0 overflow-hidden"
        style={{ height: 'calc(100% - 80px)' }}
      >
        <div className="absolute inset-0 bg-[#0a1628]" />
        <div
          className="absolute inset-0"
          style={{ filter: 'grayscale(1)', opacity: 0.2 }}
        >
          <Image src="/img/impact.jpg" alt="" fill className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-[#0a1628]/65" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <p className="text-[#FF6B56] text-sm font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-5 h-[2px] bg-[#FF6B56]" />
            Start Sponsoring A Child
            <span className="inline-block w-5 h-[2px] bg-[#FF6B56]" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Help Us Reach{' '}
            <span className="text-[#FF6B56]">12,000 Children</span>{' '}in Year One
          </h2>
        </motion.div>

        {/* Two-column card — bottom 80px sticks out past dark bg */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden shadow-2xl shadow-black/30"
        >
          {/* Left col — image */}
          <div className="relative min-h-[260px] lg:min-h-0">
            <Image
              src="/img/donation.jpg"
              alt="Children receiving literacy support"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/40 via-transparent to-transparent" />
          </div>

          {/* Right col — form (white) */}
          <div className="bg-white p-7 sm:p-9">
            <h3 className="text-base font-medium text-gray-500 leading-relaxed mb-5">Your support can give a child access to reading, learning, and opportunity.</h3>

            {/* Dollar input */}
            <p className="text-sm font-semibold text-gray-600 mb-2">Your Donation:</p>
            <div className="flex items-center gap-3 border-2 border-gray-200 focus-within:border-[#00ABBE] rounded-full px-4 py-2.5 mb-4 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#0a1628] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <input
                type="number"
                value={isCustom ? custom : selected}
                onChange={(e) => { setIsCustom(true); setCustom(e.target.value); }}
                className="flex-1 text-lg font-bold text-[#0a1628] outline-none bg-transparent"
                min={1}
              />
            </div>

            {/* Amount pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelected(amt); setIsCustom(false); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                    !isCustom && selected === amt
                      ? 'bg-[#00ABBE] text-white border-[#00ABBE] shadow-md'
                      : 'border-gray-200 text-gray-600 hover:border-[#00ABBE] hover:text-[#00ABBE]'
                  }`}
                >
                  ${amt}
                </button>
              ))}
              <button
                onClick={() => setIsCustom(true)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                  isCustom ? 'bg-[#00ABBE] text-white border-[#00ABBE] shadow-md' : 'border-gray-200 text-gray-600 hover:border-[#00ABBE]'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Payment method */}
            <p className="text-sm font-semibold text-gray-600 mb-2">Select Payment Method</p>
            <div className="flex flex-wrap gap-4 mb-7">
              {paymentMethods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPayMethod(m)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span
                    className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      payMethod === m ? 'border-[#00ABBE]' : 'border-gray-300'
                    }`}
                  >
                    {payMethod === m && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00ABBE]" />
                    )}
                  </span>
                  <span className="text-sm text-gray-600">{m}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#00ABBE] hover:bg-[#0097a6] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300"
            >
              Donate Now <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
