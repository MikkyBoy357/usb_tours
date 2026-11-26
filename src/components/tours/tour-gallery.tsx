"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox, type LightboxImage } from "@/components/site/lightbox";

export function TourGallery({ images }: { images: LightboxImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <button
            type="button"
            key={img.src}
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={open}
        onIndexChange={setOpen}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
