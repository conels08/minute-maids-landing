import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  site.url ??
  process.env.URL ??
  "https://example.com"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
