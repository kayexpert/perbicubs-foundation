import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetInvolvedPage from "@/components/GetInvolvedPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved | PerbiCubs Foundation",
  description: "Join PerbiCubs Foundation in transforming literacy. Sponsor a child for $35/year, become a founding partner, or collaborate to scale literacy in Sub-Saharan Africa.",
};

export default function GetInvolved() {
  return (
    <>
      <Navbar />
      <GetInvolvedPage />
      <Footer />
    </>
  );
}
