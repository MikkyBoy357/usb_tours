import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { ToursGrid } from "@/components/tours/tours-grid";
import { tours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Hand-built itineraries across Benin Republic and Africa. From a weekend in Ouidah to the full 10-day grand tour.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tour packages"
        title="Journeys, hand-built."
        description="Curated by people who grew up here. Small groups. Local partners. Stays vetted in person."
        crumbs={[{ label: "Home", href: "/" }, { label: "Tours" }]}
        image={{
          src: "/photos/water-bikes-friends.jpg",
          alt: "MrUSB travellers racing water bikes across Lake Nokoué",
        }}
      />
      <section className="py-20 lg:py-28">
        <Container>
          <ToursGrid tours={tours} />
        </Container>
      </section>
    </>
  );
}
