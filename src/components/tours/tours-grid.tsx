"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { TourCard } from "@/components/tours/tour-card";
import type { Tour } from "@/lib/tours";
import { cn } from "@/lib/utils";

const difficulties = ["All", "Easy", "Moderate", "Challenging"] as const;
const durations = ["Any", "1–3 days", "4–6 days", "7+ days"] as const;

type Difficulty = (typeof difficulties)[number];
type Duration = (typeof durations)[number];

function matchesDuration(days: number, d: Duration) {
  if (d === "Any") return true;
  if (d === "1–3 days") return days >= 1 && days <= 3;
  if (d === "4–6 days") return days >= 4 && days <= 6;
  return days >= 7;
}

export function ToursGrid({ tours }: { tours: Tour[] }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("All");
  const [duration, setDuration] = useState<Duration>("Any");
  const [tag, setTag] = useState<string>("All");

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const t of tours) for (const tag of t.tags) set.add(tag);
    return ["All", ...Array.from(set).sort()];
  }, [tours]);

  const filtered = useMemo(
    () =>
      tours.filter(
        (t) =>
          (difficulty === "All" || t.difficulty === difficulty) &&
          matchesDuration(t.durationDays, duration) &&
          (tag === "All" || t.tags.includes(tag)),
      ),
    [tours, difficulty, duration, tag],
  );

  return (
    <div>
      <div className="space-y-5">
        <FilterRow
          label="Difficulty"
          options={difficulties}
          value={difficulty}
          onChange={setDifficulty}
        />
        <FilterRow
          label="Duration"
          options={durations}
          value={duration}
          onChange={setDuration}
        />
        <FilterRow label="Theme" options={tags} value={tag} onChange={setTag} />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filtered.length}</strong>{" "}
          of {tours.length} tours
        </span>
        {(difficulty !== "All" || duration !== "Any" || tag !== "All") && (
          <button
            type="button"
            className="text-xs uppercase tracking-[0.18em] text-accent hover:underline"
            onClick={() => {
              setDifficulty("All");
              setDuration("Any");
              setTag("All");
            }}
          >
            Reset filters
          </button>
        )}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.div
              key={t.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <TourCard tour={t} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="font-display text-2xl">No tours match your filters.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try widening duration or theme — or reach out for a custom build.
          </p>
        </div>
      )}
    </div>
  );
}

type FilterRowProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
};

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: FilterRowProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs transition-all",
            value === o
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-foreground hover:border-foreground/50",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
