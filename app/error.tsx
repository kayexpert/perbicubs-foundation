'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app] Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-6">
          <AlertTriangle size={32} />
        </div>
        <h1 className="font-display text-3xl font-bold text-[#0a1628] mb-3">
          Something went wrong
        </h1>
        <p className="text-[#647b8a] mb-8">
          We hit an unexpected error loading this page. Our team has been notified.
        </p>
        {error.digest && (
          <p className="text-xs text-[#647b8a]/60 mb-6 font-mono">
            Reference: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} /> Try again
          </button>
          <Link
            href="/"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <Home size={18} /> Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
