export const siteConfig = {
  name: "Tour with MrUSB",
  shortName: "MrUSB",
  tagline: "Discover Benin. Feel Africa.",
  description:
    "Curated, immersive tours across Benin Republic and Africa — culture, history, food, nightlife, nature, and the hidden gems that don't make the guidebooks.",
  url: "https://tourwithmrusb.com",
  ogImage: "https://tourwithmrusb.com/og.jpg",
  locale: "en-US",
  links: {
    instagram: "https://instagram.com/tourwithmrusb",
    tiktok: "https://tiktok.com/@tourwithmrusb",
    youtube: "https://youtube.com/@tourwithmrusb",
    whatsapp: "https://wa.me/22900000000",
    email: "hello@tourwithmrusb.com",
  },
  contact: {
    email: "hello@tourwithmrusb.com",
    phone: "+229 00 00 00 00",
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
