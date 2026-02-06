import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minute Maids | Professional Home Cleaning",
  description:
    "Licensed & insured home cleaning in Yamhill County and surrounding areas. Standard + deep cleans, add-ons, and move-in/out cleaning. Get an instant estimate.",
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
