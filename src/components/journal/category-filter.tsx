"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { JournalPreview } from "@/lib/journal";
import { cn } from "@/lib/utils";
import { PostCard } from "./post-card";

export function CategoryFilter({
  posts,
  categories,
}: {
  posts: JournalPreview[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");

  const options = useMemo(() => ["All", ...categories], [categories]);
  const filtered = useMemo(
    () =>
      active === "All" ? posts : posts.filter((p) => p.category === active),
    [posts, active],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        {options.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs transition-all",
              active === c
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:border-foreground/50",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <PostCard post={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
