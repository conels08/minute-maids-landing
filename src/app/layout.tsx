import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Minute Maids | Professional Home Cleaning",
  description:
    "Licensed & insured home cleaning in Yamhill County and surrounding areas. Standard + deep cleans, add-ons, and move-in/out cleaning. Get an instant estimate.",
  openGraph: {
    title: "Minute Maids | Professional Home Cleaning",
    description:
      "Licensed & insured home cleaning in Yamhill County and surrounding areas. Standard + deep cleans, add-ons, and move-in/out cleaning. Get an instant estimate.",
    url: "https://example.com",
    siteName: "Minute Maids",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minute Maids | Professional Home Cleaning",
    description:
      "Licensed & insured home cleaning in Yamhill County and surrounding areas. Standard + deep cleans, add-ons, and move-in/out cleaning. Get an instant estimate.",
    images: ["/og.png"],
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
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <main id="content" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
