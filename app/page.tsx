import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import { createClient } from '@/utils/supabase/server';
import {
  defaultHeroSlides,
  defaultStats,
  defaultGalleryImages,
  type HeroSlide,
  type ImpactStat,
  type GalleryImage,
  type BlogPost,
} from '@/components/HomePage';

export default async function Home() {
  const supabase = await createClient();

  // Fetch all dynamic content in parallel — fall back to defaults on error
  const [heroRes, statsRes, galleryRes, blogRes] = await Promise.all([
    supabase.from('hero_slides').select('*').order('ordering'),
    supabase.from('impact_stats').select('*').order('ordering'),
    supabase.from('gallery_images').select('*').order('ordering'),
    supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
  ]);

  const heroSlides: HeroSlide[] = heroRes.data && heroRes.data.length > 0
    ? heroRes.data
    : defaultHeroSlides;

  const stats: ImpactStat[] = statsRes.data && statsRes.data.length > 0
    ? statsRes.data
    : defaultStats;

  const galleryImages: GalleryImage[] = galleryRes.data && galleryRes.data.length > 0
    ? galleryRes.data
    : defaultGalleryImages;

  const blogPosts: BlogPost[] | undefined = blogRes.data && blogRes.data.length > 0
    ? blogRes.data
    : undefined; // BlogSection handles its own fallback

  return (
    <>
      <Navbar />
      <HomePage
        heroSlides={heroSlides}
        stats={stats}
        galleryImages={galleryImages}
        blogPosts={blogPosts}
      />
      <Footer />
    </>
  );
}
