import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramsPage from "@/components/ProgramsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs | PerbiCubs Foundation",
  description: "Explore PerbiCubs Foundation's literacy programs: Access to Literacy scholarships, Reading Culture campaigns, and Research & Technology initiatives.",
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
