import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about PerbiCubs Foundation's mission, vision, and proven youth literacy programs. We are an African children's charity dedicated to transforming literacy in Sub-Saharan Africa.",
};

export default async function About() {
  const supabase = await createClient();
  const [{ data: teamMembers }, { data: statsData }] = await Promise.all([
    supabase.from('team_members').select('*').order('ordering'),
    supabase.from('impact_stats').select('*').order('ordering')
  ]);

  return (
    <>
      <Navbar />
      <AboutPage teamMembers={teamMembers ?? undefined} stats={statsData ?? undefined} />
      <Footer />
    </>
  );
}
