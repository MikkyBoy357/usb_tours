import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { destinations } from "@/lib/destinations";

export function ExploreBenin() {
  return (
    <section id="explore" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Explore Benin"
            title="A country the size of a feeling."
            description="From the Atlantic coast to the savannas of the north — six regions, six worlds."
          />
        </Reveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {destinations.slice(0, 5).map((d, i) => {
            const size =
              i === 0
                ? "lg:col-span-7 lg:row-span-2"
                : i === 1
                  ? "lg:col-span-5"
                  : i === 2
                    ? "lg:col-span-4"
                    : i === 3
                      ? "lg:col-span-4"
                      : "lg:col-span-4";
            const aspect = i === 0 ? "aspect-[5/6]" : "aspect-[4/3]";
            return (
              <Reveal key={d.slug} delay={i * 0.06} className={size}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className={`group relative block overflow-hidden rounded-3xl ${aspect} h-full`}
                >
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                          {d.region}
                        </p>
                        <h3 className="mt-2 font-display text-2xl sm:text-3xl">
                          {d.name}
                        </h3>
                        <p className="mt-1 max-w-md text-sm text-white/85 line-clamp-2">
                          {d.blurb}
                        </p>
                      </div>
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:-rotate-45">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
