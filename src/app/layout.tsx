import type { Metadata } from "next";
import "./globals.css";
import { resolveSiteUrl, site } from "@/lib/site";

const siteUrl = resolveSiteUrl();

const seoTitle = "House Cleaning in Newberg, OR | Minute Maids";
const seoDescription =
  "Owner-operated house cleaning in Newberg, Sherwood, McMinnville & Lafayette, OR. Deep cleans, recurring service, move-out cleans. Get a free estimate.";
const ogImagePath = "/images/Minute-Maid-logo-official.png";
const ogImageUrl = `${siteUrl}${ogImagePath}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: site.businessName,
  url: siteUrl,
  logo: `${siteUrl}/images/minute-maids-logo-transparent.png`,
  image: [ogImageUrl],
  telephone: site.phoneDisplay,
  areaServed: [
    {
      "@type": "Place",
      name: "Newberg, OR",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
    {
      "@type": "Place",
      name: "Sherwood, OR",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
    {
      "@type": "Place",
      name: "McMinnville, OR",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
    {
      "@type": "Place",
      name: "Lafayette, OR",
      address: {
        "@type": "PostalAddress",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
  ],
  serviceType: [
    "House cleaning",
    "Deep cleaning",
    "Move-out cleaning",
    "Recurring cleaning",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seoTitle,
  description: seoDescription,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: siteUrl,
    siteName: "Minute Maids",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [ogImageUrl],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <main id="content" className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
