import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: { src: string; alt: string };
  crumbs?: Crumb[];
  align?: "left" | "center";
  height?: "short" | "tall";
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs,
  align = "left",
  height = "short",
}: Props) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink-950 text-white",
        height === "short" ? "min-h-[60vh] py-32" : "min-h-[80vh] py-40",
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/85" />
      <div
        className={cn(
          "relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-6 pt-24 lg:px-8",
          align === "center" && "items-center text-center",
        )}
      >
        {crumbs && (
          <nav aria-label="Breadcrumb">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70",
                align === "center" && "justify-center",
              )}
            >
              {crumbs.map((c, i) => (
                <li
                  key={`${c.label}-${i}`}
                  className="flex items-center gap-1.5"
                >
                  {c.href ? (
                    <Link href={c.href} className="hover:text-accent">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-accent">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <ChevronRight className="size-3 opacity-50" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-balance font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-pretty text-base text-white/85 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
