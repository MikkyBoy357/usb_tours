import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/photos/mangrove-kayaking.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/70 to-ink-950/50" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-24 text-white lg:px-8 lg:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Ready when you are
        </p>
        <h2 className="max-w-3xl text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Tell us your dream trip. We'll build the rest.
        </h2>
        <p className="max-w-xl text-white/80">
          Every journey we run is custom-finished for the people on it. Drop us
          a note and we'll write back inside 24 hours with a draft itinerary.
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          Plan my journey
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-black/15 transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight className="size-3.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
