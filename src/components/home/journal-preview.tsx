import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { getJournalPreview } from "@/lib/journal";

export function JournalPreview() {
  const posts = getJournalPreview(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-sand-50 py-24 lg:py-32">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              eyebrow="The journal"
              title="Stories from the road."
              description="Field notes, photography, and travel guides — written by the team and our travelers."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/journal"
              className="group hidden items-center gap-2 text-sm font-medium sm:inline-flex"
            >
              All articles
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link href={`/journal/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                </div>
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {p.category} · {p.readingTime}
                  </p>
                  <h3 className="mt-3 font-display text-xl leading-snug transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
