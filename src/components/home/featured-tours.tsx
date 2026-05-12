import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TourCard } from "@/components/tours/tour-card";
import { getFeaturedTours } from "@/lib/tours";

export function FeaturedTours() {
  const tours = getFeaturedTours();
  return (
    <section id="tours" className="bg-sand-50 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Signature journeys"
              title="Featured tours."
              description="Hand-built itineraries we run again and again because travelers keep coming back changed."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/tours"
              className="group inline-flex items-center gap-2 text-sm font-medium"
            >
              See all tours
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.08}>
              <TourCard tour={t} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
