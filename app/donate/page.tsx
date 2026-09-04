import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonatePage from "@/components/DonatePage";
import { createClient } from '@/utils/supabase/server';
import type { BlogPost } from '@/components/HomePage';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor a Child in Africa",
  description: "Your donation gives an African student a full year of digital literacy access. Support our grant-making charity and make your literacy charity donations today.",
};

export default async function Donate() {
  const supabase = await createClient();
  const { data: blogRes } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  const blogPosts: BlogPost[] | undefined = blogRes && blogRes.length > 0 ? blogRes : undefined;

  return (
    <>
      <Navbar />
      <DonatePage blogPosts={blogPosts} />
      <Footer />
    </>
  );
}
