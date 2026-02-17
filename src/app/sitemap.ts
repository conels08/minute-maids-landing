import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site";

const siteUrl = resolveSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
