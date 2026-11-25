"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The lead backdrop is art-directed: a landscape shot for desktop and a
 * portrait shot for phones held upright. A <picture> lets the browser fetch
 * only the one that matches, so it can be prioritised without loading both.
 */
const PORTRAIT_PHONE = "(max-width: 767px) and (orientation: portrait)";
const leadAlt =
  "Two smiling travellers holding Tour with MrUSB tote bags in front of large metal sculptures";
const leadCommon = { alt: leadAlt, fill: true, sizes: "100vw" } as const;
const {
  props: { srcSet: leadPortraitSrcSet },
} = getImageProps({ ...leadCommon, src: "/photos/hero-guests-portrait.jpg" });
const {
  props: { srcSet: leadLandscapeSrcSet, ...leadImgProps },
} = getImageProps({
  ...leadCommon,
  src: "/photos/hero-guests-landscape.jpg",
  fetchPriority: "high",
  loading: "eager",
});

/**
 * Backdrops cycled behind the lead slide. They are decorative, so they carry
 * no alt text.
 */
const slides = [
  {
    src: "/photos/water-bikes-friends.jpg",
    alt: "Two friends riding a water bike along the green mangroves of Lake Nokoué",
    // Biased left of centre so the narrow phone crop keeps both riders in frame.
    position: "object-[42%_40%]",
  },
  {
    src: "/photos/voodoo-festival-adepts.jpg",
    alt: "Vodun adepts in white robes beneath a ceremonial umbrella at the Ouidah voodoo festival",
    position: "object-[center_30%]",
  },
  {
    src: "/photos/lake-nokoue-aerial.jpg",
    alt: "Aerial view of the green channels, reed banks and boat landing of Lake Nokoué",
    position: "object-[center_45%]",
  },
  {
    src: "/photos/amazon-statue-cotonou.jpg",
    alt: "The Amazon statue standing over Cotonou",
    position: "object-[center_10%]",
  },
  {
    src: "/photos/northern-benin-roundabout.jpg",
    alt: "The tusked monument on the roundabout at the gateway to northern Benin",
    position: "object-[center_45%]",
  },
];

/** The lead slide plus the rotating backdrops. */
const SLIDE_COUNT = slides.length + 1;
const SLIDE_MS = 6500;
/** Grace period before the other backdrops mount, so they don't race the LCP image. */
const FIRST_PAINT_MS = 1200;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [restMounted, setRestMounted] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => setRestMounted(true), FIRST_PAINT_MS);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!restMounted) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % SLIDE_COUNT),
      SLIDE_MS,
    );
    return () => clearInterval(timer);
  }, [restMounted]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950 text-white"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <picture>
          <source media={PORTRAIT_PHONE} srcSet={leadPortraitSrcSet} />
          <img
            {...leadImgProps}
            srcSet={leadLandscapeSrcSet}
            alt={leadAlt}
            className={cn(
              // Faces sit in the upper middle of both shots; keep them clear of the headline.
              "object-cover object-[center_28%] transition-opacity duration-[1400ms] ease-in-out portrait:max-md:object-[45%_18%]",
              index === 0 ? "opacity-100" : "opacity-0",
            )}
          />
        </picture>
        {restMounted &&
          slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              className={cn(
                "object-cover transition-opacity duration-[1400ms] ease-in-out",
                slide.position,
                i + 1 === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col justify-end pb-16 sm:pb-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent"
          >
            ◦ Curated journeys across Benin & Africa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[18ch] text-balance font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            The Africa
            <br />
            you came{" "}
            <em className="font-display italic text-accent">looking</em> for.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <Link
              href="/tours"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              Explore tours
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-black/15 transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/85 underline-offset-4 hover:underline"
            >
              Or plan a private journey →
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ArrowDown className="size-3 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
