"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="In their words"
            title="What travelers say."
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl bg-card p-10 text-center ring-1 ring-border/60 sm:p-14"
            >
              <Quote
                className="mx-auto mb-6 size-7 text-accent"
                strokeWidth={1.4}
              />
              <blockquote className="text-balance font-display text-2xl leading-snug sm:text-3xl">
                “{t.quote}”
              </blockquote>
              <div className="mt-8 flex flex-col items-center gap-1">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: star list is fixed-size and never reorders
                    <Star key={idx} className="size-3.5 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-2 font-medium">{t.name}</figcaption>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.origin} · {t.tour}
                </p>
              </div>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() =>
                setI((p) => (p - 1 + testimonials.length) % testimonials.length)
              }
              className="inline-flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: testimonials list is static and never reorders at runtime
                  key={idx}
                  type="button"
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-foreground" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setI((p) => (p + 1) % testimonials.length)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
