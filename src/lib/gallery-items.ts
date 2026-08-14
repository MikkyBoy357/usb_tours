import { photoSets } from "@/lib/photo-sets";
import { tours } from "@/lib/tours";

export type GalleryItem = { src: string; alt: string; tag?: string };

// Package flyers live in a tour's gallery but are marketing artwork, not field
// photography, so they never belong in the gallery or the photo count.
const isPhotography = (src: string) => !src.startsWith("/tour_packages/");

/**
 * Every photograph the site holds: each tour's cover and gallery, tagged by the
 * tour's first tag, plus the standalone event sets. Deduped by src.
 *
 * Shared by the gallery page and the homepage stats so the count shown can
 * never drift from what the gallery actually renders.
 */
export function buildGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];

  for (const t of tours) {
    const tag = t.tags[0]
      ? t.tags[0].charAt(0).toUpperCase() + t.tags[0].slice(1)
      : undefined;
    if (isPhotography(t.cover.src)) {
      items.push({ src: t.cover.src, alt: t.cover.alt, tag });
    }
    for (const g of t.gallery) {
      if (!isPhotography(g.src)) continue;
      items.push({ src: g.src, alt: g.alt, tag });
    }
  }

  for (const set of photoSets) {
    for (const photo of set.photos) {
      items.push({ src: photo.src, alt: photo.alt, tag: set.tag });
    }
  }

  return Array.from(new Map(items.map((i) => [i.src, i])).values());
}
