import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

export const metadata = {
  title: 'Blog & News — PerbiCubs Foundation',
  description: 'Stories, research, and updates from the PerbiCubs Foundation on literacy in Sub-Saharan Africa.',
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <section className="relative pt-32 pb-20 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero1.png" alt="" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0a1628]/70" />
        </div>
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#00ABBE]/20 text-[#00ABBE] text-xs font-bold uppercase tracking-widest rounded-full mb-5">
            News &amp; Insights
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
            Stories of <span className="text-[#00ABBE]">Change</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Research, field reports, and impact stories from our work closing the literacy gap.
          </p>
        </div>
      </section>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6 py-16 lg:py-24">
        {/* Featured post */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B56] mb-4">Featured</p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative aspect-video lg:aspect-auto min-h-[280px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/30 to-transparent" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block bg-[#00ABBE] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                {featured.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0a1628] leading-snug mb-4 group-hover:text-[#00ABBE] transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                <span className="flex items-center gap-1.5"><Calendar size={14} />{featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{featured.readTime}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-[#FF6B56] font-bold text-sm group-hover:gap-3 transition-all duration-300">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>

        {/* Rest of posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 bg-[#FF6B56] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] leading-snug mb-3 group-hover:text-[#00ABBE] transition-colors flex-1">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[#FF6B56] font-bold text-sm mt-3 group-hover:gap-3 transition-all duration-300">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
