import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryPage from "@/components/GalleryPage";
import { createClient } from "@/utils/supabase/server";
import { defaultGalleryImages, type GalleryImage } from "@/components/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | PerbiCubs Foundation",
  description: "Explore photos from PerbiCubs Foundation programs—children discovering the joy of reading and learning across Ghana.",
};

export default async function Gallery() {
  const supabase = await createClient();
  const { data } = await supabase.from('gallery_images').select('*').order('ordering');

  const images: GalleryImage[] = data && data.length > 0 ? data : defaultGalleryImages;

  return (
    <>
      <Navbar />
      <GalleryPage images={images} />
      <Footer />
    </>
  );
}
