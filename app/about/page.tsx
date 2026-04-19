import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPage from "@/components/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | PerbiCubs Foundation",
  description: "Learn about PerbiCubs Foundation's mission, vision, and proven track record in transforming literacy in Sub-Saharan Africa.",
};

export default function About() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
