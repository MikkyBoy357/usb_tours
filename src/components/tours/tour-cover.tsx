import Image from "next/image";
import type { CSSProperties } from "react";
import type { CoverTone, Tour } from "@/lib/tours";
import { cn } from "@/lib/utils";

const tones: Record<
  CoverTone,
  { base: CSSProperties; texture: CSSProperties }
> = {
  // Sun-baked earth for the clay bath.
  clay: {
    base: {
      background:
        "radial-gradient(120% 85% at 75% 15%, var(--color-clay-500) 0%, var(--color-clay-700) 45%, var(--color-ink-950) 100%)",
    },
    texture: {
      backgroundImage:
        "radial-gradient(circle, rgb(255 255 255 / 0.10) 1px, transparent 1.5px)",
      backgroundSize: "14px 14px",
    },
  },
  // Ink-dark water under a green canopy.
  river: {
    base: {
      background:
        "radial-gradient(120% 90% at 25% 0%, oklch(0.45 0.08 165) 0%, oklch(0.24 0.04 190) 45%, var(--color-ink-950) 100%)",
    },
    texture: {
      backgroundImage:
        "repeating-linear-gradient(180deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 11px)",
    },
  },
  // Last light over the Atlantic.
  dusk: {
    base: {
      background:
        "radial-gradient(130% 75% at 50% 105%, var(--color-gold-500) 0%, var(--color-clay-700) 32%, var(--color-ink-950) 78%)",
    },
    texture: {
      backgroundImage:
        "linear-gradient(180deg, transparent 62%, rgb(255 255 255 / 0.18) 62%, rgb(255 255 255 / 0.18) calc(62% + 1px), transparent calc(62% + 1px))",
    },
  },
};

type Props = {
  tour: Tour;
  sizes: string;
  preload?: boolean;
  /** Applied to the photo, or to the stand-in backdrop. */
  className?: string;
  /** CSS object-position for the photo; overrides any position in `className`. */
  objectPosition?: string;
};

/**
 * A tour's cover, filling its positioned parent. Tours with no real photo yet
 * get a typographic backdrop named after the place, so a card never shows a
 * photo of somewhere other than where the tour goes.
 */
export function TourCover({
  tour,
  sizes,
  preload,
  className,
  objectPosition,
}: Props) {
  if (tour.cover) {
    return (
      <Image
        src={tour.cover.src}
        alt={tour.cover.alt}
        fill
        preload={preload}
        sizes={sizes}
        className={cn("object-cover", className)}
        style={objectPosition ? { objectPosition } : undefined}
      />
    );
  }

  const tone = tones[tour.coverTone ?? "dusk"];
  const place = tour.destination.split(",")[0];

  return (
    <div
      className={cn("@container absolute inset-0 overflow-hidden", className)}
      style={tone.base}
      aria-hidden
    >
      <div className="absolute inset-0" style={tone.texture} />
      <span className="absolute -left-[0.04em] top-[4%] select-none whitespace-nowrap font-display text-[24cqw] italic leading-none tracking-tight text-white/[0.09]">
        {place}
      </span>
    </div>
  );
}
