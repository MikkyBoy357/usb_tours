import { ArrowUpRight, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDuration, formatUSD } from "@/lib/format";
import type { Tour } from "@/lib/tours";

type Props = {
  tour: Tour;
  priority?: boolean;
};

export function TourCard({ tour, priority }: Props) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border/60 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:ring-border"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={tour.cover.src}
          alt={tour.cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur">
            {tour.country}
          </span>
          <span className="font-mono text-xs">{tour.difficulty}</span>
        </div>
        <div className="absolute inset-x-5 bottom-5 text-white">
          <h3 className="font-display text-2xl leading-tight">{tour.title}</h3>
          <p className="mt-1 text-sm text-white/80 line-clamp-2">
            {tour.tagline}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {formatDuration(tour.durationDays)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" />
            {tour.groupSize.min}–{tour.groupSize.max}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-lg">
            {formatUSD(tour.priceUSD)}
          </span>
          <span
            className="inline-flex size-8 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-45"
            aria-hidden
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
