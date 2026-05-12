import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { getFeaturedTours } from "@/lib/tours";

export default function NotFound() {
  const tours = getFeaturedTours().slice(0, 3);

  return (
    <>
      <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink-950 text-white">
        <Image
          src="/images/1494791368093-85217fbbf8de.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/70 to-ink-950" />
        <Container>
          <div className="relative z-10 max-w-3xl pt-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              404 · Off the map
            </p>
            <h1 className="mt-6 text-balance font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              You took the scenic route.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-white/85">
              The page you were looking for doesn't exist — or maybe it never
              did. Happens to the best of us. Here are a few places worth going
              instead.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground"
              >
                <ArrowLeft className="size-4" />
                Back to home
              </Link>
              <Link
                href="/tours"
                className="text-sm text-white/85 underline-offset-4 hover:underline"
              >
                Or browse the tours →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Some good places to start
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
              <Link
                key={t.slug}
                href={`/tours/${t.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl"
              >
                <Image
                  src={t.cover.src}
                  alt={t.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                  <h3 className="font-display text-xl leading-tight">
                    {t.title}
                  </h3>
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:-rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
