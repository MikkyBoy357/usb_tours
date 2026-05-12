import { Check, Clock, MapPin, Mountain, Users, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Itinerary } from "@/components/tours/itinerary";
import { TourCard } from "@/components/tours/tour-card";
import { TourGallery } from "@/components/tours/tour-gallery";
import { TourMap } from "@/components/tours/tour-map";
import { formatDuration, formatUSD } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { getRelatedTours, getTour, tours } from "@/lib/tours";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  props: PageProps<"/tours/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const tour = getTour(slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: tour.title,
      description: tour.summary,
      images: [{ url: tour.cover.src, alt: tour.cover.alt }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.summary,
      images: [tour.cover.src],
    },
  };
}

export default async function TourDetailPage(
  props: PageProps<"/tours/[slug]">,
) {
  const { slug } = await props.params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const related = getRelatedTours(tour.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    image: [tour.cover.src, ...tour.gallery.map((g) => g.src)],
    provider: {
      "@type": "TravelAgency",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      price: tour.priceUSD,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    touristType: tour.tags,
    itinerary: tour.itinerary.map((d) => ({
      "@type": "ItemList",
      name: `Day ${d.day} — ${d.title}`,
      description: d.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={`${tour.country} · ${tour.destination}`}
        title={tour.title}
        description={tour.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: tour.title },
        ]}
        image={tour.cover}
        height="tall"
      />

      {/* Summary strip */}
      <section className="border-b border-border bg-background">
        <Container>
          <div className="grid grid-cols-2 gap-y-6 py-8 sm:grid-cols-4 lg:py-10">
            <Stat
              icon={Clock}
              label="Duration"
              value={formatDuration(tour.durationDays)}
            />
            <Stat
              icon={Users}
              label="Group size"
              value={`${tour.groupSize.min}–${tour.groupSize.max} travelers`}
            />
            <Stat icon={Mountain} label="Difficulty" value={tour.difficulty} />
            <Stat icon={MapPin} label="Starts from" value={tour.startsFrom} />
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  About this journey
                </p>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/85">
                  {tour.summary}
                </p>
              </Reveal>

              <Reveal className="mt-14">
                <SectionHeading eyebrow="Highlights" title="What you'll do." />
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="size-3" />
                      </span>
                      <span className="text-sm leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-16">
                <SectionHeading
                  eyebrow="Day by day"
                  title="The itinerary."
                  description="Indicative — every trip is fine-tuned to your group."
                />
                <div className="mt-10">
                  <Itinerary tour={tour} />
                </div>
              </Reveal>

              <Reveal className="mt-16">
                <SectionHeading
                  eyebrow="The fine print"
                  title="What's included."
                />
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <ul className="space-y-2.5">
                    {tour.included.map((i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2.5">
                    {tour.notIncluded.map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <X className="mt-0.5 size-4 shrink-0" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Sticky booking sidebar */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        From
                      </p>
                      <p className="font-display text-4xl tracking-tight">
                        {formatUSD(tour.priceUSD)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        per traveler · all-inclusive on-the-ground
                      </p>
                    </div>
                    <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {tour.difficulty}
                    </span>
                  </div>
                  <hr className="my-5 border-border" />
                  <ul className="space-y-2.5 text-sm">
                    <li className="flex items-center justify-between text-muted-foreground">
                      <span>Duration</span>
                      <span className="text-foreground">
                        {formatDuration(tour.durationDays)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-muted-foreground">
                      <span>Group size</span>
                      <span className="text-foreground">
                        {tour.groupSize.min}–{tour.groupSize.max}
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-muted-foreground">
                      <span>Starts from</span>
                      <span className="text-foreground">{tour.startsFrom}</span>
                    </li>
                  </ul>
                  <Link
                    href={`#inquiry`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01]"
                  >
                    Inquire about this tour
                  </Link>
                  <a
                    href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
                      `Hi MrUSB, I'm interested in "${tour.title}".`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    Or message us on WhatsApp →
                  </a>
                </div>

                <TourMap
                  lat={tour.coordinates.lat}
                  lng={tour.coordinates.lng}
                  label={`${tour.destination}, ${tour.country}`}
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-sand-50 py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The journey"
              title="In pictures."
              description="From the field — recent departures."
            />
          </Reveal>
          <div className="mt-12">
            <TourGallery images={[tour.cover, ...tour.gallery]} />
          </div>
        </Container>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Plan your trip"
                title="Tell us about your journey."
                description="A few sentences is all we need. We'll send a draft itinerary inside 24 hours."
              />
            </Reveal>
            <div className="lg:col-span-7">
              <InquiryForm defaultTourSlug={tour.slug} />
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-sand-50 py-20 lg:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="More like this"
                title="You might also love."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-muted">
        <Icon className="size-4" strokeWidth={1.5} />
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
