import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | PerbiCubs Foundation",
  description: "Learn about PerbiCubs Foundation's mission, vision, and proven track record in transforming literacy in Sub-Saharan Africa.",
};

export default async function About() {
  const supabase = await createClient();
  const { data: teamMembers } = await supabase
    .from('team_members')
    .select('*')
    .order('ordering');

  return (
    <>
      <Navbar />
      <AboutPage teamMembers={teamMembers ?? undefined} />
      <Footer />
    </>
  );
}
