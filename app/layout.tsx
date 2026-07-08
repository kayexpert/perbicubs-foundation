import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Preloader from "@/components/Preloader";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata: Metadata = {
  title: {
    template: "%s | PerbiCubs Foundation",
    default: "PerbiCubs Foundation | Ending Learning Poverty Through Literacy",
  },
  description: "PerbiCubs Foundation is a non-profit organization dedicated to closing the literacy gap in Sub-Saharan Africa. We partner with schools, families, and communities to give every child access to reading, learning, and opportunity.",
  icons: {
    icon: "/img/fav_icon.png",
  },
  keywords: [
    "literacy", "education", "Africa", "children", "reading", "PerbiCubs", "foundation", "Sub-Saharan Africa",
    "Child literacy foundation", "Education NGO Africa", "Digital reading for children", "EdTech in Africa"
  ],
  openGraph: {
    title: "PerbiCubs Foundation | Ending Learning Poverty Through Literacy",
    description: "Every child deserves the ability to read, understand, and thrive. We are building a future where no child is left behind.",
    type: "website",
    siteName: "PerbiCubs Foundation",
  },
  twitter: {
    card: "summary_large_image",
    site: "@perbicubsfoundation",
    creator: "@perbicubsfoundation",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "name": "PerbiCubs Foundation",
              "url": "https://perbicubsfoundation.org",
              "logo": "https://perbicubsfoundation.org/icon.png",
              "sameAs": [
                "https://www.facebook.com/perbicubs",
                "https://www.instagram.com/perbicubs"
              ],
              "description": "PerbiCubs Foundation is a non-profit organization dedicated to closing the literacy gap in Sub-Saharan Africa.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Accra",
                "addressCountry": "GH"
              }
            })
          }}
        />
      </head>
      <body>
        <Preloader />
        {children}
        <BackToTopButton />

        {/* Google Analytics - Placeholder, replace G-XXXXXXXXXX with your actual Measurement ID */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
