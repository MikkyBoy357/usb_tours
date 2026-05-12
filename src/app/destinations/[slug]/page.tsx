import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TourCard } from "@/components/tours/tour-card";
import { destinations, getDestination } from "@/lib/destinations";
import { tours } from "@/lib/tours";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/destinations/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: d.name,
    description: d.blurb,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { title: d.name, description: d.blurb, images: [d.image.src] },
  };
}

export default async function DestinationPage(
  props: PageProps<"/destinations/[slug]">,
) {
  const { slug } = await props.params;
  const d = getDestination(slug);
  if (!d) notFound();

  const matchingTours = tours.filter(
    (t) =>
      t.destination.toLowerCase().includes(d.name.toLowerCase()) ||
      t.tags.some((tag) => d.tags.includes(tag)),
  );

  return (
    <>
      <PageHero
        eyebrow={d.region}
        title={d.name}
        description={d.blurb}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Destinations", href: "/destinations" },
          { label: d.name },
        ]}
        image={d.image}
        height="tall"
      />

      <section className="py-20 lg:py-28">
        <Container size="prose">
          <Reveal>
            <p className="text-pretty text-lg leading-relaxed text-foreground/85 sm:text-xl">
              {d.longDescription}
            </p>
          </Reveal>
        </Container>
      </section>

      {matchingTours.length > 0 && (
        <section className="bg-sand-50 py-20 lg:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Tours that visit"
                title={`Travel to ${d.name}.`}
              />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingTours.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
