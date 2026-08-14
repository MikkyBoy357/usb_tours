import type { Metadata } from "next";
import { GalleryMasonry } from "@/components/gallery/gallery-masonry";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { buildGalleryItems } from "@/lib/gallery-items";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "From the field — photography from our tours across Benin Republic and Africa.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const items = buildGalleryItems();
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
