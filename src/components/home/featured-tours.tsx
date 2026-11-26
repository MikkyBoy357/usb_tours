import { ArrowRight, ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { TourCover } from "@/components/tours/tour-cover";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { getFeaturedTours, type Tour } from "@/lib/tours";
import { cn } from "@/lib/utils";

/**
 * Where each card sits, by rank. Phones get a swipeable strip; tablets a
 * two-column grid; desktops a bento grid where the top pick takes a 2×2 block.
 * Wide slots go to #4 (a landscape photo) and, on desktop, #10, whose market
 * sign reads well as a strip; portrait shots stay in square-ish cells. Both
 * grids come out as full rectangles for ten cards.
 */
const placement = [
  "md:col-span-2 lg:row-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
];

export function FeaturedTours() {
  const tours = getFeaturedTours();

  return (
    <section
      id="tours"
      className="relative overflow-hidden bg-ink-950 py-24 text-white lg:py-32"
    >
      {/* A warm glow behind the heading, picking up the hero's gold. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />

      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              ◦ {tours.length} featured experiences
            </p>
            <h2 className="text-balance font-display text-4xl leading-[1] tracking-tight sm:text-5xl md:text-6xl">
              Pick one.{" "}
              <em className="italic text-accent">
                You&rsquo;ll want them all.
              </em>
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base text-white/70 sm:text-lg">
              One place, one thing, one unforgettable day. No complicated
              itineraries: choose what makes your heart race and we handle the
              rest.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/tours"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-white/50 hover:bg-white/5"
            >
              See all tours
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/*
          One reveal for the whole list: per-card reveals would keep the next
          card on the phone strip invisible until swiped to, hiding the peek
          that tells people there is more.
        */}
        <Reveal className="mt-14">
          <ol
            className={cn(
              "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4",
              // Bleed the strip to the screen edges on phones, keeping the first card aligned.
              "-mx-6 scroll-px-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "md:mx-0 md:grid md:snap-none md:auto-rows-[22rem] md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0",
              "lg:auto-rows-[22rem] lg:grid-cols-3 lg:gap-5",
            )}
          >
            {tours.map((tour, i) => (
              <li
                key={tour.slug}
                className={cn(
                  "w-[80vw] max-w-sm shrink-0 snap-start md:w-auto md:max-w-none",
                  placement[i],
                )}
              >
                <ExperienceCard tour={tour} large={i === 0} />
              </li>
            ))}
          </ol>
        </Reveal>

        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:hidden">
          Swipe for all {tours.length} →
        </p>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-2xl leading-tight sm:text-3xl">
              Can&rsquo;t choose?
            </p>
            <p className="mt-1 text-sm text-white/65">
              Tell us what you&rsquo;re into and we&rsquo;ll pick the perfect
              one for you.
            </p>
          </div>
          <a
            href={`${siteConfig.links.whatsapp}?text=${encodeURIComponent(
              "Hi MrUSB, help me pick an experience!",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            <MessageCircle className="size-4" />
            Ask us on WhatsApp
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Layered shadow for type over photos: a tight dark edge that reads as a soft
 * outline, plus a wide glow. A real text stroke would thin the serif glyphs.
 */
const POP =
  "[text-shadow:0_0_1px_rgb(0_0_0/0.9),0_1px_3px_rgb(0_0_0/0.75),0_6px_28px_rgb(0_0_0/0.55)]";

function ExperienceCard({ tour, large }: { tour: Tour; large: boolean }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group relative flex aspect-[4/5] h-full w-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink-900 p-5 ring-1 ring-white/10 transition-shadow duration-500 hover:ring-white/30 md:aspect-auto sm:p-6"
    >
      <TourCover
        tour={tour}
        objectPosition={large ? undefined : tour.coverFocus}
        sizes={
          large
            ? "(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 80vw"
            : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 80vw"
        }
        className={cn(
          // Faces sit in the upper third; the big card is wide enough to frame
          // the python on the shoulders too.
          large ? "object-[center_48%]" : "object-[center_30%]",
          "transition-transform duration-[1400ms] ease-out group-hover:scale-105",
        )}
      />
      {/* Light fade only: the text shadow carries legibility, so photos stay bright. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10" />

      {tour.vibe && (
        <span className="relative self-start rounded-full bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ring-1 ring-white/20 backdrop-blur-md">
          {tour.vibe}
        </span>
      )}

      <div className="relative flex items-end justify-between gap-4">
        <div className={cn("min-w-0", POP)}>
          <h3
            className={cn(
              "text-balance font-display leading-[1.05] tracking-tight",
              large ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl",
            )}
          >
            {tour.title}
          </h3>
          {large && (
            <p className="mt-2 hidden max-w-lg text-pretty text-base text-white/90 md:block">
              {tour.tagline}
            </p>
          )}
          <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-white/90">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{tour.destination.split(",")[0]}</span>
            <span aria-hidden className="text-white/50">
              ·
            </span>
            <span className="whitespace-nowrap">
              {formatPrice(tour.priceFCFA)}
            </span>
          </p>
        </div>
        <span
          aria-hidden
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-ink-950 shadow-lg transition-transform duration-300 group-hover:rotate-45"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
