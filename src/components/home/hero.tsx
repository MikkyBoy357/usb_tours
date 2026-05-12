"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950 text-white"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/1547036967-23d11aacaee0.jpg"
          alt="Cinematic African savanna at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
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
