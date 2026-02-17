export const site = {
  businessName: "Minute Maids",
  ownerName: "Lacee Richter",
  // Canonical production domain (non-www).
  url: "https://minutemaidsclean.com",

  // Phone
  phoneDisplay: "(971) 220-4371", // what users see
  phoneTel: "9712204371",         // digits only for tel:/sms:

  // Email
  email: "weloveminutemaids@outlook.com",

  // Service area
  serviceArea: "Yamhill County & surrounding areas",
};

export function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fallbackUrl = site.url?.trim();
  const previewUrl = process.env.URL?.trim();
  const isProduction = process.env.NODE_ENV === "production";
  const nonProdFallback = previewUrl || "http://localhost:3000";

  let selected =
    envUrl ||
    fallbackUrl ||
    (!isProduction ? nonProdFallback : "");

  selected = selected.replace(/\/$/, "");

  if (isProduction && (!selected || selected.includes("example.com"))) {
    console.warn(
      `[SEO] Invalid production site URL resolved (${selected || "empty"}). Falling back to canonical site.url (${fallbackUrl}).`
    );
    selected = fallbackUrl.replace(/\/$/, "");
  }

  if (!selected) {
    throw new Error(
      "Site URL is not configured. Set NEXT_PUBLIC_SITE_URL or site.url."
    );
  }

  return selected;
}
