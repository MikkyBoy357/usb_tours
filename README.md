# Tour with MrUSB

Premium tourism website for **Tour with MrUSB** — guided experiences across Benin Republic and Africa.

Built with Next.js 16 (App Router, Turbopack), TypeScript, Tailwind v4, shadcn/ui, Framer Motion, MDX, and Biome.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # biome check
npm run format   # biome format --write
```

## Project shape

```
src/
  app/                 # routes (App Router)
    actions/           # server actions
    journal/[slug]/    # dynamic MDX article
    tours/[slug]/      # dynamic tour detail
    destinations/...
    sitemap.ts robots.ts rss.xml/route.ts
    not-found.tsx
  components/
    home/              # home-page sections
    site/              # layout shell (header, footer, page hero)
    tours/             # tour-specific UI (card, itinerary, gallery, map)
    journal/           # journal UI (post card, TOC, category filter)
    forms/             # inquiry form, newsletter
    mdx/               # MDX component overrides
    seo/               # JSON-LD helpers
    ui/                # shadcn primitives
  lib/                 # tours, destinations, testimonials, journal, faqs, utils
content/journal/       # MDX articles + frontmatter
public/images/         # locally hosted hero/cover photos
supabase/migrations/   # SQL for inquiries table
```

## Booking inquiries

The inquiry form persists to Supabase and notifies the team via Resend. Both are **optional in dev** — when env vars are absent, the action logs to the server console and still returns success to the user.

### Wire it up

1. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`
2. Run the migration in your Supabase project SQL editor (or via the CLI):
   ```sql
   -- See supabase/migrations/0001_inquiries.sql
   ```
   Public anonymous role can `INSERT`; only authenticated users can `SELECT`.
3. Verify in Supabase Dashboard → Table Editor → `inquiries` after submitting a test inquiry.

## Content

Journal articles live in `content/journal/*.mdx`. Frontmatter shape:

```yaml
---
title: "..."
excerpt: "..."
cover: "/images/<id>.jpg"
coverAlt: "..."
category: "Culture" | "Photography" | "Guide" | ...
tags: ["..."]
author: { name: "...", bio: "..." }
publishedAt: "YYYY-MM-DD"
featured: true   # optional
---
```

Custom MDX shortcodes available: `<PullQuote>`, `<YouTube id="..." />`.

## Imagery

All photos are stored locally in `public/images/` (Unsplash sources, license-permitted). To replace any image, drop a new JPG at the same path — no code changes. For production, swap these for your own photography on a CDN (Cloudinary, Bunny, ImageKit).

## SEO

- Per-route `Metadata` with OG + Twitter cards
- JSON-LD: `TravelAgency`, `WebSite`, per-tour `TouristTrip`, per-article `Article`, `FAQPage`, `AggregateRating` + `Review`
- `/sitemap.xml`, `/robots.txt`, `/rss.xml`
- Heading anchors via `rehype-slug` + `rehype-autolink-headings`
