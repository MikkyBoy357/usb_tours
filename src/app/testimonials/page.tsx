import { ArrowRight, Quote, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What travelers say after their tour with us — in their own words, unedited.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const hasReviews = testimonials.length > 0;
  const avg = hasReviews
    ? testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
    : 0;

  // Review and AggregateRating markup is only emitted when real reviews back
  // it. Publishing it against an empty or invented list is review spam.
  const jsonLd = hasReviews
    ? {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: siteConfig.name,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avg.toFixed(1),
          reviewCount: testimonials.length,
          bestRating: 5,
        },
        review: testimonials.map((t) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: 5,
          },
          author: { "@type": "Person", name: t.name },
          reviewBody: t.quote,
        })),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <PageHero
        eyebrow="Travelers"
        title={
          hasReviews
            ? `${avg.toFixed(1)} stars. ${testimonials.length} stories.`
            : "In their words."
        }
        description={
          hasReviews
            ? "Every review here is from a traveler who actually went. We don't edit them. We don't filter them."
            : "We publish reviews from travelers who actually went, in their own words — so this page stays empty until the first one comes in."
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
        image={{
          src: "/photos/happy-guests.jpg",
          alt: "Three happy MrUSB guests on a Benin departure",
        }}
      />

      <section className="py-20 lg:py-28">
        <Container>
          {!hasReviews && (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center sm:p-14">
                <Quote
                  className="mx-auto size-7 text-accent"
                  strokeWidth={1.4}
                />
                <h2 className="mt-6 font-display text-2xl leading-snug sm:text-3xl">
                  No reviews up yet.
                </h2>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                  We'd rather show you nothing than show you something we wrote
                  ourselves. Travel with us and we'll ask you afterwards — if
                  you're happy for it to go up, yours will be the first name on
                  this page.
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  In the meantime, the{" "}
                  <Link
                    href="/gallery"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    gallery
                  </Link>{" "}
                  is every photograph from our own departures — no stock images.
                </p>
                <Link
                  href="/tours"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Browse the tours
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <figure className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card p-8 sm:p-10">
                  <Quote className="size-6 text-accent" strokeWidth={1.4} />
                  <blockquote className="text-balance font-display text-2xl leading-snug sm:text-3xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-6">
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {t.origin} · {t.tour}
                      </p>
                    </div>
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: star list is fixed-size and never reorders
                        <Star key={idx} className="size-4 fill-current" />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
