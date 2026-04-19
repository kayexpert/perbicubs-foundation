import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TheProblemPage from "@/components/TheProblemPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Problem | PerbiCubs Foundation",
  description: "87% of 10-year-olds in Sub-Saharan Africa cannot read a simple story. Learn about the global learning crisis and why urgent action is needed.",
};

export default function TheProblem() {
  return (
    <>
      <Navbar />
      <TheProblemPage />
      <Footer />
    </>
  );
}
