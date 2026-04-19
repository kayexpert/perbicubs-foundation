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
  const [{ data: galleryImages }, { data: teamMembers }] = await Promise.all([
    supabase.from('gallery_images').select('*').order('id'),
    supabase.from('team_members').select('*').order('ordering'),
  ]);

  return (
    <>
      <Navbar />
      <OurSolutionPage
        galleryImages={galleryImages ?? undefined}
        teamMembers={teamMembers ?? undefined}
      />
      <Footer />
    </>
  );
}
