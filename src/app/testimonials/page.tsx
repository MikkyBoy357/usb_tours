import { Quote, Star } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { siteConfig } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What travelers say after their tour with us. Every review is from a verified guest.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const avg =
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  const jsonLd = {
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
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Travelers"
        title={`${avg.toFixed(1)} stars. ${testimonials.length} stories.`}
        description="Every review is from a verified traveler. We don't edit them. We don't filter them."
        crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
        image={{
          src: "/images/1469474968028-56623f02e42e.jpg",
          alt: "Lake village at dawn",
        }}
      />

      <section className="py-20 lg:py-28">
        <Container>
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
