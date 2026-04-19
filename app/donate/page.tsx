import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonatePage from "@/components/DonatePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | PerbiCubs Foundation — Give a Child the Gift of Reading",
  description: "Your donation of just $35 gives a child in Sub-Saharan Africa a full year of digital literacy access. Support PerbiCubs Foundation and help end learning poverty.",
};

export default function Donate() {
  return (
    <>
      <Navbar />
      <DonatePage />
      <Footer />
    </>
  );
}
