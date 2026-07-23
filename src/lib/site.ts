// Canonical site URL. Prefers an explicit NEXT_PUBLIC_SITE_URL, then falls back
// to Vercel's stable production domain, then to the placeholder domain — so the
// site is correct on a *.vercel.app preview and on a real domain later, with no
// code change (just set NEXT_PUBLIC_SITE_URL once the real domain is live).
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://tourwithmrusb.com")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Tour with MrUSB",
  shortName: "MrUSB",
  tagline: "Discover Benin. Feel Africa.",
  description:
    "Curated, immersive tours across Benin Republic and Africa — culture, history, food, nightlife, nature, and the hidden gems that don't make the guidebooks.",
  url: siteUrl,
  ogImage: `${siteUrl}/og.jpg`,
  locale: "en-US",
  links: {
    instagram: "https://instagram.com/tour_with_mr_usb",
    tiktok: "https://tiktok.com/@tour_with_mrusb",
    facebook: "https://www.facebook.com/profile.php?id=61587675134678",
    whatsapp: "https://wa.me/2290146924370",
    email: "tourwithmrusb@gmail.com",
  },
  contact: {
    email: "tourwithmrusb@gmail.com",
    phone: "+229 01 46 92 43 70",
    address: "Cotonou, Benin Republic",
  },
  nav: [
    { label: "Tours", href: "/tours" },
    { label: "Destinations", href: "/destinations" },
    { label: "Journal", href: "/journal" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: {
    Explore: [
      { label: "Tour Packages", href: "/tours" },
      { label: "Destinations", href: "/destinations" },
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/journal" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    Legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
