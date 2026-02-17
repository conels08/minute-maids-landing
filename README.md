# Minute Maids Website

Production landing site for Minute Maids.  
This project is designed to be stable, fast, mobile-friendly, and easy to maintain for business operations.

## Project Summary

- Business: Minute Maids
- Site type: Single-page marketing website
- Purpose: Generate quote requests and calls/texts from local homeowners
- Primary service area focus:
  - Newberg, OR
  - Sherwood, OR
  - McMinnville, OR
  - Lafayette, OR

## Production Status

- Framework: Next.js (App Router)
- Styling: Tailwind CSS + project utility classes
- Hosting: Netlify
- Form capture: Netlify Forms
- Build target: Static prerendered App Router pages

## Key Features

- Mobile-first one-page experience
- Sticky header + mobile CTA bar
- Estimator with service/add-on logic
- Gallery with image previews
- Reviews with expandable long text
- Review photo thumbnails + lightbox
- Contact/quote form integrated with Netlify Forms
- Social sharing metadata (Open Graph + Twitter)
- Structured data (JSON-LD) for local service SEO

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Playwright + axe-core (contrast audit script)

## Project Structure

- App entry:
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
- Section components:
  - `src/components/sections/*`
- Shared UI wrappers:
  - `src/components/ui/*`
- Business/site config:
  - `src/lib/site.ts`
  - `src/lib/pricing.ts`
  - `src/lib/reviews.ts`
- Public assets:
  - `public/images/*`
  - `public/docs/*`
  - `public/forms.html`

## Environment Variables

Set these in Netlify (and optionally local `.env.local`):

- `NEXT_PUBLIC_SITE_URL`
  - Public base URL for canonical links, sitemap, robots, and structured data
  - Example: `https://www.yourdomain.com`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

Run before deploying:

```bash
npm run lint
npm run build
npm run a11y:contrast
```

## Deployment

Netlify deploys from the connected branch.  
App Router static routes are generated at build time.

Critical deploy checks:

- Build succeeds (`npm run build`)
- Netlify form detector exists (`public/forms.html`)
- Form submissions appear in Netlify Forms dashboard
- `NEXT_PUBLIC_SITE_URL` is set

## Netlify Forms Notes

Current quote form flow:

- Detector form: `public/forms.html`
- Form name: `quote`
- App form posts using native HTML form submission

If submissions ever stop:

- Confirm `form-name="quote"` still exists in both detector + live form
- Confirm detector field names still match form fields
- Confirm Forms are enabled in Netlify site settings

## Content Update Guide

Typical business updates can be done safely by replacing assets/text where they already exist:

- Service/review data:
  - `src/lib/pricing.ts`
  - `src/lib/reviews.ts`
- Hero/section copy:
  - `src/components/sections/*`
- Images:
  - `public/images/*`
- PDFs:
  - `public/docs/*`

When replacing files, keep file names/paths consistent unless code references are updated.

## SEO Package (Current: Inexpensive)

This site includes an inexpensive SEO package designed to provide a strong baseline for local search and link sharing without heavy ongoing management.

### Included now

- Location-aware homepage metadata (title + description) focused on:
  - Newberg, OR (primary)
  - Sherwood, OR
  - McMinnville, OR
  - Lafayette, OR
- Canonical URL support using a single site URL source (`NEXT_PUBLIC_SITE_URL` with fallback).
- Open Graph + Twitter card metadata for cleaner social sharing previews.
- App Router `robots` route at `/robots.txt`.
- App Router `sitemap` route at `/sitemap.xml`.
- Structured data (`HouseCleaningService`) via JSON-LD, including:
  - service areas
  - service types
  - aggregate rating based on the three visible on-site reviews
  - review entries for the three displayed customer reviews

### Current limitations (can be improved in a future SEO package)

- Single-page sitemap (homepage only).
- No city-specific landing pages yet.
- No Google Business Profile integration workflow documented here.
- No backlink/citation campaign or ongoing rank tracking.
- No advanced schema expansion (FAQPage, BreadcrumbList, service pages by city, etc.).

### Production setup note

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment so canonical URLs, robots sitemap URL, and structured data all use the correct live domain.

## Handoff / Business Operations

For owner-facing operational steps (Netlify ownership transfer, forms, notifications, domain workflow), see:

- `HANDOFF.md`

## Maintenance Recommendations

- Keep dependencies updated quarterly.
- Re-run lint/build/a11y checks before every deploy.
- Keep review/social proof current in `src/lib/reviews.ts`.
- Add before/after media sparingly to preserve page speed.
- Back up critical docs and images in source control.

## License / Ownership

Project source and assets are intended for Minute Maids business use and ongoing maintenance.
