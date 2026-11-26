"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Lightbox } from "@/components/site/lightbox";
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

      <Lightbox
        images={filtered}
        index={open}
        onIndexChange={setOpen}
        onClose={() => setOpen(null)}
      />
    </div>
  );
}
