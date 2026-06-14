'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import Image from 'next/image';
import { LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background subtle accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00ABBE]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B56]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl">

          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#00ABBE]/10 border border-[#00ABBE]/20 flex items-center justify-center mb-5">
              <div className="relative w-10 h-10">
                <Image
                  src="/img/logo_dark.png"
                  alt="PerbiCubs"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1.5">PerbiCubs Foundation · Admin Portal</p>
          </div>

          {/* Error message */}
          {state?.error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
              <AlertCircle size={15} className="text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{state.error}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="admin@perbicubs.org"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#00ABBE] focus:bg-white focus:ring-2 focus:ring-[#00ABBE]/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#00ABBE] focus:bg-white focus:ring-2 focus:ring-[#00ABBE]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#00ABBE] hover:bg-[#009aab] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2.5 mt-2 shadow-lg shadow-[#00ABBE]/20"
            >
              {pending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-slate-400 text-xs mt-8">
            Admin access only · Unauthorized entry is prohibited
          </p>
        </div>
      </div>
    </div>
  );
}
