'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function SuccessContent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl w-full bg-white rounded-3xl p-10 md:p-14 text-center shadow-2xl shadow-black/5 border border-gray-100"
    >
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 bg-[#00ABBE]/10 rounded-full animate-ping" />
        <div className="relative w-full h-full bg-[#00ABBE] rounded-full flex items-center justify-center">
          <Heart size={42} className="text-white" fill="white" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
            <CheckCircle2 size={24} className="text-[#00ABBE]" fill="white" />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-4">
        Thank You!
      </h1>
      <p className="text-lg text-gray-500 mb-8 leading-relaxed">
        Your donation was received successfully. We&apos;ve sent a receipt to your email. 
        Because of your generosity, more children will have the opportunity to discover the joy of reading.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="btn-primary py-3 px-8 text-sm uppercase tracking-wider">
          Return Home
        </Link>
        <Link href="/programs" className="font-bold text-sm uppercase tracking-wider text-[#00ABBE] py-3 px-8 border-2 border-[#00ABBE] rounded-xl hover:bg-[#00ABBE]/5 transition-colors">
          See Our Programs
        </Link>
      </div>
    </motion.div>
  );
}

export default function DonationSuccessPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 bg-gray-50 flex items-center justify-center"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% -20%, #00ABBE15 0%, transparent 50%)'
      }}
    >
      <Suspense fallback={
        <div className="w-full h-64 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#00ABBE] animate-spin" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
