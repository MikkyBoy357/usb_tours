import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  /** Stretch to fill its container — used in the mobile menu. */
  full?: boolean;
  className?: string;
  children?: React.ReactNode;
};

// The site's primary call to action. It carries more weight than a standard
// Button: a warm gold gradient off the brand palette, a light sweep on hover,
// and a gold glow so it holds its own against the photographic hero it sits on.
export function PlanTripButton({
  full = false,
  className,
  children = "Plan my trip",
}: Props) {
  return (
    <Link
      href="/contact"
      className={cn(
        "group/cta relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
        "bg-gradient-to-br from-gold-400 via-gold-500 to-clay-500",
        "px-5 py-2.5 text-sm font-medium text-ink-950",
        // Inset highlight reads as a lit top edge; the glow lifts it off dark photography.
        "ring-1 ring-inset ring-white/30",
        "shadow-lg shadow-gold-600/25",
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-600/40",
        "active:translate-y-0 active:shadow-lg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        full && "w-full",
        className,
      )}
    >
      {/* Light sweep. Decorative, so it never intercepts the pointer. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12",
          "bg-gradient-to-r from-transparent via-white/45 to-transparent",
          "transition-transform duration-700 ease-out group-hover/cta:translate-x-[400%]",
          "motion-reduce:hidden",
        )}
      />
      <span className="relative">{children}</span>
      <ArrowRight
        className={cn(
          "relative size-4 transition-transform duration-300 ease-out",
          "group-hover/cta:translate-x-0.5",
          "motion-reduce:transition-none motion-reduce:group-hover/cta:translate-x-0",
        )}
      />
    </Link>
  );
}
