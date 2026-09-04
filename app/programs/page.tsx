import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramsPage from "@/components/ProgramsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Reading & Literacy Programs",
  description: "Explore PerbiCubs Foundation's grant-making charity initiatives: Scholarships for underprivileged children, Reading Culture campaigns, and Digital Reading platforms.",
};

export default function Programs() {
  return (
    <>
      <Navbar />
      <ProgramsPage />
      <Footer />
    </>
  );
}
