"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  /** The open image, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

/** How far (px) or how fast (px/s) a swipe must go to change photo. */
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

const slide = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
};

/**
 * Full-screen photo viewer. Arrow keys step through photos and Escape closes;
 * on touch screens, swipe left or right. Neighbouring photos load in the
 * background so the next one is ready when you reach it.
 */
export function Lightbox({ images, index, onIndexChange, onClose }: Props) {
  // Which way the last step went, so the photo slides in from that side.
  const [dir, setDir] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const open = index !== null && count > 0;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Escape") onClose();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step, onClose]);

  // Freeze the page behind the viewer and hand focus back when it closes.
  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      returnTo?.focus();
    };
  }, [open]);

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) step(1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) step(-1);
  };

  const current = open ? images[index] : null;
  const neighbours = open
    ? [images[(index + 1) % count], images[(index - 1 + count) % count]]
    : [];

  return (
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-5 sm:top-5"
          >
            <X className="size-5" />
          </button>

          <div className="relative h-[72vh] w-full max-w-5xl overflow-hidden sm:h-[80vh]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeOut" }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  loading="eager"
                  fetchPriority="high"
                  draggable={false}
                  className="pointer-events-none select-none object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Warm the cache for the photos either side. */}
          <div aria-hidden className="hidden">
            {neighbours.map((img) => (
              <Image
                key={img.src}
                src={img.src}
                alt=""
                width={1600}
                height={1600}
                sizes="100vw"
                loading="eager"
              />
            ))}
          </div>

          {count > 1 && (
            // Only the buttons take clicks, so the bar never blocks the photo.
            <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between sm:inset-x-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="size-6" />
              </button>
              <p
                className="font-mono text-xs tracking-[0.2em] text-white/70 sm:hidden"
                aria-live="polite"
              >
                {index + 1} / {count}
              </p>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          )}

          {count > 1 && (
            <p className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 font-mono text-xs tracking-[0.2em] text-white/70 sm:block">
              {index + 1} / {count}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
