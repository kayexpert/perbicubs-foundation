'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  CreditCard,
  Building2,
  Smartphone,
  Shield,
  CheckCircle2,
  ArrowLeft,
  Heart,
  Users,
  BookOpen,
  Star,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Currency = 'USD' | 'GHS';
type PayMethod = 'card' | 'bank' | 'mobile';

const USD_AMOUNTS = [20, 35, 50, 100, 200, 500];
const GHS_AMOUNTS = [200, 350, 500, 1000, 2000, 5000];
const GHS_RATE = 15.5; // approx — update when Stripe FX is live

const PAYMENT_METHODS: { id: PayMethod; label: string; sub: string; icon: typeof CreditCard }[] = [
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', sub: 'Direct bank payment', icon: Building2 },
  { id: 'mobile', label: 'Mobile Money', sub: 'MTN, Airtel, Vodafone Cash', icon: Smartphone },
];

function calcImpact(amount: number, currency: Currency) {
  const usd = currency === 'USD' ? amount : amount / GHS_RATE;
  const children = Math.floor(usd / 35);
  const books = Math.floor(usd * 20);
  return { children: Math.max(children, 0), books: Math.max(books, 0) };
}

function RevealSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DonatePage() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedAmt, setSelectedAmt] = useState(35);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmt, setCustomAmt] = useState('');
  const [payMethod, setPayMethod] = useState<PayMethod>('card');
  const [dedicate, setDedicate] = useState(false);
  const [dedicateName, setDedicateName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const amounts = currency === 'USD' ? USD_AMOUNTS : GHS_AMOUNTS;
  const symbol = currency === 'USD' ? '$' : '₵';
  const displayAmt = isCustom ? Number(customAmt) || 0 : selectedAmt;
  const impact = calcImpact(displayAmt, currency);

  // When switching currency, pick the nearest preset
  useEffect(() => {
    const t = setTimeout(() => {
      const newAmounts = currency === 'USD' ? USD_AMOUNTS : GHS_AMOUNTS;
      setSelectedAmt(newAmounts[1]); // default to ~$35 equivalent
      setIsCustom(false);
      setCustomAmt('');
    }, 0);
    return () => clearTimeout(t);
  }, [currency]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: displayAmt,
          currency,
          name,
          email,
          payMethod,
          isDedicated: dedicate,
          dedicateName,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to initialize checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout error. Please try again or check your Stripe API keys.');
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'How is my donation used?',
      a: '80% of every donation goes directly to program delivery — scholarships, platform access, and literacy materials. 12% funds operations and 8% supports outreach and awareness campaigns.',
    },
    {
      q: 'Is my donation tax-deductible?',
      a: 'PerbiCubs Foundation is a registered NGO. Tax deductibility depends on your country\'s laws. Please consult your local tax authority or contact us for a donation receipt.',
    },
    {
      q: 'Can I make a recurring donation?',
      a: 'Yes — recurring monthly donations will be available once Stripe integration is live. For now, reach out to info@perbicubsfoundation.org to set up a recurring gift.',
    },
    {
      q: 'What is Mobile Money?',
      a: 'Mobile Money (MTN MoMo, Airtel Money, Vodafone Cash) is a digital payment system widely used in West Africa. It lets you send money directly from your mobile phone — no bank account needed.',
    },
  ];

  return (
    <main>
      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[55vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/program_literacy.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/70 to-[#0a1628]/90" />
        
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 pt-28 pb-16 w-full flex flex-col items-center text-center">
          <Link
            href="/get-involved"
            className="absolute top-8 left-4 sm:left-6 lg:left-6 inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </Link>

          <RevealSection className="flex flex-col items-center max-w-2xl">
            <span className="section-tag mb-5 justify-center text-white" >
              Make a Donation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-5 leading-tight">
              You Can Change a Child&apos;s Story
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-xl mx-auto">
              For just <span className="text-[#00ABBE] font-bold">$35 a year</span>, a child gains full access to digital literacy tools, a curated reading library, and the future they deserve.
            </p>
          </RevealSection>

          {/* Trust badges */}
          <RevealSection delay={0.5} className="flex flex-wrap justify-center gap-4 mt-10">
            {[
              { icon: Shield, text: 'Secure & Encrypted' },
              { icon: CheckCircle2, text: 'UNESCO Recognized' },
              { icon: Star, text: 'Mastercard Foundation Partner' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-medium">
                <Icon size={14} className="text-[#00ABBE]" />
                {text}
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DONATION FORM + IMPACT PANEL
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">

          {submitted ? (
            /* ── Success State ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <div className="w-24 h-24 bg-[#00ABBE]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={42} className="text-[#00ABBE]" fill="#00ABBE" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Your donation is being processed. You&apos;ll receive a confirmation email shortly. Together, we&apos;re changing lives.
              </p>
              <Link href="/" className="btn-primary">
                Return Home
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">

              {/* ── Left: Donation Form ── */}
              <RevealSection>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden"
                >
                  {/* Form header */}
                  <div className="bg-[#00ABBE] px-8 py-6">
                    <h2 className="text-2xl font-bold text-white mb-1">Complete Your Donation</h2>
                    <p className="text-white/80 text-sm">All transactions are secure and encrypted.</p>
                  </div>

                  <div className="p-8 space-y-8">
                    {/* ── Currency Toggle ── */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        Currency
                      </label>
                      <div className="inline-flex bg-gray-100 p-1 rounded-full">
                        {(['USD', 'GHS'] as Currency[]).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCurrency(c)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                              currency === c
                                ? 'bg-[#00ABBE] text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {c === 'USD' ? '🇺🇸 USD ($)' : '🇬🇭 GHS (₵)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ── Amount Selector ── */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        Donation Amount
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                        {amounts.map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => { setSelectedAmt(amt); setIsCustom(false); }}
                            className={`py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-200 ${
                              !isCustom && selectedAmt === amt
                                ? 'bg-[#00ABBE] text-white border-[#00ABBE] shadow-lg'
                                : 'border-gray-200 text-gray-700 hover:border-[#00ABBE] hover:text-[#00ABBE] bg-white'
                            }`}
                          >
                            {symbol}{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>

                      {/* Custom amount */}
                      <div
                        className={`flex items-center gap-3 border-2 rounded-2xl px-4 py-3 transition-all ${
                          isCustom ? 'border-[#00ABBE] bg-[#00ABBE]/5' : 'border-gray-200 bg-gray-50'
                        }`}
                        onClick={() => setIsCustom(true)}
                      >
                        <span className="text-gray-400 font-bold text-lg">{symbol}</span>
                        <input
                          type="number"
                          placeholder="Enter custom amount"
                          value={isCustom ? customAmt : ''}
                          onChange={(e) => { setIsCustom(true); setCustomAmt(e.target.value); }}
                          className="flex-1 text-base font-bold text-gray-900 outline-none bg-transparent placeholder-gray-400"
                          min={1}
                        />
                        {isCustom && (
                          <span className="text-[#00ABBE] text-xs font-bold uppercase">Custom</span>
                        )}
                      </div>
                    </div>

                    {/* ── Payment Method ── */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        Payment Method
                      </label>
                      <div className="grid gap-3">
                        {PAYMENT_METHODS.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPayMethod(m.id)}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                              payMethod === m.id
                                ? 'border-[#00ABBE] bg-[#00ABBE]/5'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                payMethod === m.id ? 'bg-[#00ABBE]' : 'bg-gray-100'
                              }`}
                            >
                              <m.icon
                                size={18}
                                className={payMethod === m.id ? 'text-white' : 'text-gray-500'}
                              />
                            </div>
                            <div className="flex-1">
                              <div className={`font-bold text-sm ${payMethod === m.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                {m.label}
                              </div>
                              <div className="text-gray-400 text-xs">{m.sub}</div>
                            </div>
                            {m.id === 'mobile' && (
                              <span className="text-[10px] bg-[#FF6B56] text-white font-bold px-2 py-0.5 rounded-full uppercase">Ghana</span>
                            )}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                payMethod === m.id ? 'border-[#00ABBE]' : 'border-gray-300'
                              }`}
                            >
                              {payMethod === m.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00ABBE]" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {payMethod === 'mobile' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800"
                        >
                          <strong>Mobile Money</strong> payment will be handled via Stripe&apos;s Ghana payment gateway. You&apos;ll receive a prompt on your phone to confirm the transaction.
                        </motion.div>
                      )}
                    </div>

                    {/* ── Personal Details ── */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                        Your Details
                      </label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ABBE]/40 focus:border-[#00ABBE] bg-gray-50 text-gray-900 transition-all"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ABBE]/40 focus:border-[#00ABBE] bg-gray-50 text-gray-900 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Dedicate Donation ── */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setDedicate(!dedicate)}
                        className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            dedicate ? 'bg-[#00ABBE] border-[#00ABBE]' : 'border-gray-300'
                          }`}
                        >
                          {dedicate && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        Dedicate this donation in someone&apos;s name (optional)
                      </button>

                      <AnimatePresence>
                        {dedicate && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 overflow-hidden"
                          >
                            <input
                              type="text"
                              placeholder="Enter the name to dedicate this to"
                              value={dedicateName}
                              onChange={(e) => setDedicateName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ABBE]/40 focus:border-[#00ABBE] bg-gray-50 text-gray-900 transition-all"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Submit ── */}
                    <button
                      type="submit"
                      disabled={displayAmt < 1 || loading}
                      className="btn-primary w-full justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Heart size={18} />
                          Donate {symbol}{displayAmt > 0 ? displayAmt.toLocaleString() : '—'} {currency}
                        </>
                      )}
                    </button>

                    <p className="text-center text-gray-400 text-xs flex items-center justify-center gap-2">
                      <Shield size={12} /> Secured by Stripe. Your payment details are never stored.
                    </p>
                  </div>
                </form>
              </RevealSection>

              {/* ── Right: Impact Panel ── */}
              <div className="space-y-6">
                {/* Impact Calculator */}
                <RevealSection delay={0.1}>
                  <div className="bg-[#00ABBE] rounded-3xl p-8 text-white shadow-xl shadow-[#00ABBE]/20">
                    <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                      <Heart size={18} className="text-[#FF6B56]" fill="#FF6B56" />
                      Your Impact
                    </h3>
                    <p className="text-white/80 text-sm mb-6">See what your donation accomplishes</p>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${displayAmt}-${currency}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        {impact.children > 0 ? (
                          <div className="border border-white/20 rounded-2xl p-5 bg-white/10">
                            <div className="text-4xl font-black text-white mb-1">
                              {impact.children.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                              <Users size={14} />
                              {impact.children === 1 ? 'child receives' : 'children receive'} a full year of digital literacy access
                            </div>
                          </div>
                        ) : (
                          <div className="border border-white/10 rounded-2xl p-5 bg-white/5">
                            <div className="text-white/40 text-sm">Enter an amount to see your impact</div>
                          </div>
                        )}

                        {impact.books > 0 && (
                          <div className="border border-white/10 rounded-2xl p-5 bg-white/5">
                            <div className="text-4xl font-black text-[#FF6B56] mb-1">
                              {impact.books.toLocaleString()}+
                            </div>
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                              <BookOpen size={14} />
                              estimated books read by sponsored children
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Quick reference */}
                    <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                      {[
                        { amt: symbol === '$' ? '$35' : '₵543', label: '= 1 child, full year' },
                        { amt: symbol === '$' ? '$175' : '₵2,713', label: '= 5 children' },
                        { amt: symbol === '$' ? '$350' : '₵5,425', label: '= 10 children' },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-white font-bold">{row.amt}</span>
                          <span className="text-white/80">{row.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealSection>

                {/* Fund Allocation */}
                <RevealSection delay={0.15}>
                  <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                      <DollarSign size={18} className="text-[#00ABBE]" />
                      How We Use Funds
                    </h3>
                    {[
                      { label: 'Program Delivery', pct: 80, color: '#00ABBE' },
                      { label: 'Operations', pct: 12, color: '#0a1628' },
                      { label: 'Outreach & Awareness', pct: 8, color: '#FF6B56' },
                    ].map((item, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <span className="text-sm font-bold" style={{ color: item.color }}>{item.pct}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </RevealSection>

                {/* Trust signals */}
                <RevealSection delay={0.2}>
                  <div className="bg-white rounded-3xl p-6 shadow-xl shadow-black/5 border border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Recognized & Trusted By</p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { src: '/images/unesco%20logo.png', alt: 'UNESCO' },
                        { src: '/images/Master%20card%20foundation%20.png', alt: 'Mastercard Foundation' },
                        { src: '/images/world%20book%20capital%20logo.png', alt: 'World Book Capital' },
                        { src: '/images/mest%20logo.png', alt: 'MEST' },
                      ].map((logo, i) => (
                        <div key={i} className="relative h-10">
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            fill
                            sizes="150px"
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealSection>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-6">
          <RevealSection className="text-center mb-12">
            <span className="section-tag justify-center">Common Questions</span>
            <h2 className="text-3xl font-bold text-gray-900">Donation FAQs</h2>
          </RevealSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <RevealSection key={i} delay={i * 0.05}>
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                    id={`faq-${i}`}
                  >
                    {faq.q}
                    {faqOpen === i ? (
                      <ChevronUp size={18} className="text-[#00ABBE] flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={0.2} className="text-center mt-12">
            <p className="text-gray-500 mb-4">Have more questions?</p>
            <Link href="/get-involved" className="btn-primary">
              Contact Our Team
            </Link>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
