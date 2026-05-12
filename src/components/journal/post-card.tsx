import Image from "next/image";
import Link from "next/link";

import type { JournalPreview } from "@/lib/journal";

type Props = {
  post: JournalPreview;
  variant?: "default" | "featured";
};

export function PostCard({ post, variant = "default" }: Props) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div
        className={`relative overflow-hidden rounded-3xl ${
          variant === "featured" ? "aspect-[16/10]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes={
            variant === "featured"
              ? "(min-width: 1024px) 60vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
        />
      </div>
      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {post.category} · {post.readingTime}
        </p>
        <h3
          className={`mt-3 font-display leading-snug transition-colors group-hover:text-accent ${
            variant === "featured" ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {post.author.name} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
