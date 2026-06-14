import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="font-display text-[8rem] sm:text-[10rem] font-bold leading-none bg-gradient-to-br from-[#00ABBE] to-[#FF6B56] bg-clip-text text-transparent">
          404
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0a1628] mb-4 -mt-2">
          Page not found
        </h1>
        <p className="text-[#647b8a] text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <Home size={18} /> Back home
          </Link>
          <Link
            href="/blog"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <Search size={18} /> Browse stories
          </Link>
        </div>
      </div>
    </div>
  );
}
