import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OurSolutionPage from "@/components/OurSolutionPage";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Solution | PerbiCubs Foundation",
  description: "Discover how PerbiCubs Foundation's integrated literacy model — Access, Engagement, Assessment, Accountability and Support — is transforming children's reading across Africa.",
};

export default async function OurSolution() {
  const supabase = await createClient();
  const { data: galleryImages } = await supabase.from('gallery_images').select('*').order('id');

  return (
    <>
      <Navbar />
      <OurSolutionPage
        galleryImages={galleryImages ?? undefined}
      />
      <Footer />
    </>
  );
}
