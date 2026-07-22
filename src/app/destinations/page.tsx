import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Six regions, six worlds. Cotonou to Pendjari, Ouidah to Tata Somba — meet the places we travel to.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Where we go."
        description="From the Atlantic coast to the savannas of the north — meet every place we travel to."
        crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
        image={{
          src: "/photos/lake-nokoue-aerial.jpg",
          alt: "Aerial view of the channels and boats of Lake Nokoué",
        }}
      />
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <Reveal key={d.slug} delay={i * 0.05}>
                <Link href={`/destinations/${d.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                    <Image
                      src={d.image.src}
                      alt={d.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                        {d.region}
                      </p>
                      <div className="mt-2 flex items-end justify-between gap-4">
                        <h2 className="font-display text-2xl">{d.name}</h2>
                        <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:-rotate-45">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white/80 line-clamp-2">
                        {d.blurb}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
