import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/lib/blogData';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — PerbiCubs Foundation`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const bodyParagraphs = post.body.split('\n\n');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[380px] bg-[#0a1628]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/40 to-transparent" />

        {/* Back link */}
        <div className="absolute top-24 left-0 right-0 max-w-[860px] mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>

        {/* Title area */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[860px] mx-auto px-4 sm:px-6 pb-10">
          <span className="inline-block bg-[#00ABBE] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 pb-8 mb-10 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-9 h-9 rounded-full bg-[#00ABBE] flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#0a1628] text-sm">{post.author}</p>
              <p className="text-xs text-gray-400">{post.authorRole}</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Calendar size={14} /> {post.date}
          </span>
          <span className="flex items-center gap-1.5 text-gray-400 text-sm">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        {/* Lead excerpt */}
        <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium">
          {post.excerpt}
        </p>

        {/* Body */}
        <div className="prose-custom space-y-6">
          {bodyParagraphs.map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return (
                <h3 key={i} className="text-2xl font-bold text-[#0a1628] mt-10 mb-3">
                  {para.replace(/\*\*/g, '')}
                </h3>
              );
            }
            if (para.startsWith('- ')) {
              const items = para.split('\n').filter((l) => l.startsWith('- '));
              return (
                <ul key={i} className="space-y-2 pl-5">
                  {items.map((item, j) => (
                    <li key={j} className="text-gray-600 leading-relaxed list-disc">
                      {item.replace('- ', '')}
                    </li>
                  ))}
                </ul>
              );
            }
            if (para.includes('*')) {
              return (
                <blockquote key={i} className="border-l-4 border-[#00ABBE] pl-6 py-2 my-8 bg-[#00ABBE]/5 rounded-r-xl">
                  <p className="text-gray-700 italic leading-relaxed">
                    {para.replace(/\*/g, '')}
                  </p>
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-gray-600 leading-relaxed">
                {para}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-3xl bg-[#0a1628] p-8 lg:p-10 text-center">
          <p className="text-[#00ABBE] text-sm font-bold uppercase tracking-widest mb-3">Take Action</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Help Us End the Literacy Crisis
          </h3>
          <p className="text-white/70 mb-7 max-w-md mx-auto">
            For just $35 a year you can give one child full access to digital literacy education.
          </p>
          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 bg-[#FF6B56] hover:bg-[#e5533e] text-white px-8 py-3.5 rounded-full font-bold transition-all duration-300"
          >
            Sponsor a Child <ArrowRight size={16} />
          </Link>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-14 grid sm:grid-cols-2 gap-5">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#00ABBE]/30 hover:shadow-md transition-all duration-300"
              >
                <ArrowLeft size={20} className="text-gray-400 group-hover:text-[#00ABBE] transition-colors flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-gray-400 mb-1">Previous</p>
                  <p className="text-sm font-bold text-[#0a1628] leading-snug group-hover:text-[#00ABBE] transition-colors line-clamp-2">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#00ABBE]/30 hover:shadow-md transition-all duration-300 sm:flex-row-reverse text-right"
              >
                <ArrowRight size={20} className="text-gray-400 group-hover:text-[#00ABBE] transition-colors flex-shrink-0" />
                <div className="sm:text-right">
                  <p className="text-xs text-gray-400 mb-1">Next</p>
                  <p className="text-sm font-bold text-[#0a1628] leading-snug group-hover:text-[#00ABBE] transition-colors line-clamp-2">
                    {next.title}
                  </p>
                </div>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
    </main>
  );
}
