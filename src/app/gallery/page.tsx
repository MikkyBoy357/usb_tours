import type { Metadata } from "next";
import {
  type GalleryItem,
  GalleryMasonry,
} from "@/components/gallery/gallery-masonry";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { photoSets } from "@/lib/photo-sets";
import { tours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "From the field — photography from our tours across Benin Republic and Africa.",
  alternates: { canonical: "/gallery" },
};

// Build a gallery from each tour's cover + gallery, tagging by the tour's first
// tag, then fold in the standalone event sets. Package flyers live in a tour's
// gallery but are artwork, not field photography, so they're left out here.
const isPhotography = (src: string) => !src.startsWith("/tour_packages/");

function buildItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const t of tours) {
    const tag = t.tags[0]
      ? t.tags[0].charAt(0).toUpperCase() + t.tags[0].slice(1)
      : undefined;
    items.push({ src: t.cover.src, alt: t.cover.alt, tag });
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
  // Dedupe by src
  return Array.from(new Map(items.map((i) => [i.src, i])).values());
}

export default function GalleryPage() {
  const items = buildItems();
  return (
    <>
      <PageHero
        eyebrow="The gallery"
        title="From the field."
        description="Photography from recent departures. Click any frame to expand."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        image={{
          src: "/photos/voodoo-festival-drummers.jpg",
          alt: "Drummers in wax-print cloth at the Ouidah voodoo festival",
        }}
      />
      <section className="py-20 lg:py-28">
        <Container>
          <GalleryMasonry items={items} />
        </Container>
      </section>
    </>
  );
}
