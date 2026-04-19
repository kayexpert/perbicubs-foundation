import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata: Metadata = {
  title: "PerbiCubs Foundation | Ending Learning Poverty Through Literacy",
  description: "PerbiCubs Foundation is a non-profit organization dedicated to closing the literacy gap in Sub-Saharan Africa. We partner with schools, families, and communities to give every child access to reading, learning, and opportunity.",
  keywords: "literacy, education, Africa, children, reading, PerbiCubs, foundation, Sub-Saharan Africa",
  openGraph: {
    title: "PerbiCubs Foundation | Ending Learning Poverty Through Literacy",
    description: "Every child deserves the ability to read, understand, and thrive. We are building a future where no child is left behind.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Preloader />
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}
