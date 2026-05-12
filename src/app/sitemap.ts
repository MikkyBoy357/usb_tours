import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";
import { getAllPosts } from "@/lib/journal";
import { siteConfig } from "@/lib/site";
import { tours } from "@/lib/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/`,
      lastModified: now,
      priority: 1,
      changeFrequency: "weekly",
    },
    {
      url: `${siteConfig.url}/tours`,
      lastModified: now,
      priority: 0.9,
      changeFrequency: "weekly",
    },
    { url: `${siteConfig.url}/destinations`, lastModified: now, priority: 0.8 },
    { url: `${siteConfig.url}/gallery`, lastModified: now, priority: 0.6 },
    {
      url: `${siteConfig.url}/journal`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: "weekly",
    },
    { url: `${siteConfig.url}/about`, lastModified: now, priority: 0.5 },
    { url: `${siteConfig.url}/contact`, lastModified: now, priority: 0.6 },
    { url: `${siteConfig.url}/faq`, lastModified: now, priority: 0.4 },
    { url: `${siteConfig.url}/testimonials`, lastModified: now, priority: 0.4 },
  ];

  const tourPages = tours.map((t) => ({
    url: `${siteConfig.url}/tours/${t.slug}`,
    lastModified: now,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const destinationPages = destinations.map((d) => ({
    url: `${siteConfig.url}/destinations/${d.slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  const journalPages = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/journal/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    priority: 0.75,
    changeFrequency: "yearly" as const,
  }));

  return [...staticPages, ...tourPages, ...destinationPages, ...journalPages];
}
