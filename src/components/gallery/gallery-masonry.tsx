"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  alt: string;
  tag?: string;
  credit?: string;
};

type Props = { items: GalleryItem[] };

export function GalleryMasonry({ items }: Props) {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(null);

  const tags = useMemo(() => {
    const s = new Set<string>();
    for (const i of items) if (i.tag) s.add(i.tag);
    return ["All", ...Array.from(s).sort()];
  }, [items]);

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.tag === filter)),
    [items, filter],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs transition-all",
              filter === t
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground/50",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.button
              layout
              type="button"
              key={img.src}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
              className="group relative block w-full overflow-hidden rounded-2xl"
              aria-label={`Open image ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {img.tag && (
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur">
                  {img.tag}
                </span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((p) =>
                  p === null
                    ? null
                    : (p - 1 + filtered.length) % filtered.length,
                );
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((p) => (p === null ? null : (p + 1) % filtered.length));
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="size-6" />
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[open].src}
                alt={filtered[open].alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
