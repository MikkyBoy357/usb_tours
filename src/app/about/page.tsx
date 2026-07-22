import { ArrowUpRight, Compass, Globe2, Heart, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tour with MrUSB is a Cotonou-based travel company building unforgettable, culturally rich tours across Benin Republic and Africa.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Heart,
    title: "Travel that respects.",
    body: "We work with communities, not around them. Local guides above market rate. Permissions, not assumptions. The places we visit feel seen, not consumed.",
  },
  {
    icon: Globe2,
    title: "Africa, told by Africans.",
    body: "Most travel narratives about Africa are written from outside. Ours aren't. The team that built this company grew up here.",
  },
  {
    icon: Compass,
    title: "Depth over distance.",
    body: "A great trip isn't the most places you ticked off. It's the moment in Ouidah you'll still be thinking about a decade from now.",
  },
  {
    icon: Users,
    title: "Small groups, real attention.",
    body: "Max 10 travelers per departure. Often fewer. You will know your guide's name. They will know yours.",
  },
];

const moments = [
  {
    name: "The Temple of Pythons",
    role: "Ouidah",
    image: "/photos/python-temple-joy.jpg",
    bio: "Meeting the royal pythons that have been protected in this temple for centuries — one of the most memorable stops on the Ouidah trail.",
  },
  {
    name: "The Aguégué mangroves",
    role: "Lake Nokoué",
    image: "/photos/water-bikes-friends.jpg",
    bio: "Kayaks, hydrobikes, a floating course and jet skis on the water — a full day of adventure in the mangroves.",
  },
  {
    name: "The voodoo festival",
    role: "Ouidah · 10 January",
    image: "/photos/voodoo-dancer-sand.jpg",
    bio: "The annual Vodun celebration in full colour — drummers, adepts in white, and dancers wrapped in bright wax-print cloth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Travel built by people who live here."
        description="A small, Cotonou-based team running tours we'd want to be on."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={{
          src: "/photos/tour-group-photo.jpg",
          alt: "The MrUSB travelling group together on a Benin departure",
        }}
        height="tall"
      />

      {/* The story */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Our story
              </p>
              <h2 className="mt-4 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
                We started this for a simple reason.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="space-y-5 text-pretty text-lg leading-relaxed text-foreground/85">
                <p>
                  When friends from abroad asked us "where should I go in
                  Africa?" we'd send long voice notes — a fishing village
                  reachable only by canoe, a Sunday market that runs from 4am to
                  noon, an eco-lodge inside Pendjari where you can hear lions at
                  night.
                </p>
                <p>
                  Then we'd watch them book some sanitized package and miss all
                  of it.
                </p>
                <p>
                  So in 2019 we started running trips ourselves. Small ones at
                  first — a weekend in Ouidah, a long weekend in Ganvié. Then
                  the Grand Tour. Then groups started flying in specifically for
                  us. That's how this company happened.
                </p>
                <p>
                  We're not a brochure. We are the small team that will pick you
                  up at the airport, eat with you on night one, and message you
                  six months later asking how that thing you mentioned over palm
                  wine eventually worked out.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-sand-50 py-24 lg:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we travel"
              title="Four principles."
              description="These shape every itinerary, every partnership, every decision."
            />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.06}
                className="flex flex-col gap-4 bg-background p-10"
              >
                <v.icon className="size-6 text-accent" strokeWidth={1.4} />
                <h3 className="font-display text-2xl leading-snug">
                  {v.title}
                </h3>
                <p className="text-pretty text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="On the ground"
              title="Moments from recent departures."
              description="A few frames from the trips we've run — the pythons, the water, and the festival that draws travellers from around the world."
            />
          </Reveal>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {moments.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      {p.role}
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {p.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink-950 py-24 text-sand-100 lg:py-32">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <h2 className="text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                The country, on its own terms.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-sand-200/80">
                Browse the tours, or tell us what you're after and we'll build
                something for you.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/tours"
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground"
                >
                  Browse tours
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm text-white/80 underline-offset-4 hover:underline"
                >
                  Or contact us →
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
