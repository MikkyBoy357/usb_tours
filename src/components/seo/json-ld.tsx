import { siteConfig } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: siteConfig.ogImage,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cotonou",
      addressCountry: "BJ",
    },
    areaServed: [
      { "@type": "Country", name: "Benin" },
      { "@type": "Place", name: "West Africa" },
    ],
    knowsAbout: [
      "Ouidah voodoo festival",
      "Temple of Pythons",
      "Ganvié stilt village",
      "Pendjari National Park",
      "Abomey royal palaces",
      "Vodun culture",
    ],
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.facebook,
    ],
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is required as raw text
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/journal?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is required as raw text
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
