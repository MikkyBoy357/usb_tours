import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type AnchorProps = ComponentProps<"a">;
type ImgProps = ComponentProps<"img">;

function MdxLink({ href = "", children, className, ...rest }: AnchorProps) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "text-accent underline-offset-4 hover:underline",
          className,
        )}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "text-accent underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function MdxImage({ src = "", alt = "", ...rest }: ImgProps) {
  const isRemote = /^https?:\/\//.test(src as string);
  return (
    <figure className="my-10 overflow-hidden rounded-2xl">
      {isRemote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={src as string}
          alt={alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="h-auto w-full object-cover"
        />
      ) : (
        // biome-ignore lint/performance/noImgElement: fallback for local/inline MDX images where dimensions are unknown at compile time
        <img
          src={src as string}
          alt={alt}
          className="h-auto w-full"
          {...rest}
        />
      )}
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-12 border-l-2 border-accent pl-6 font-display text-2xl leading-snug text-foreground sm:text-3xl">
      {children}
    </blockquote>
  );
}

function YouTube({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title ?? "YouTube video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    </div>
  );
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  PullQuote,
  YouTube,
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="mt-16 scroll-mt-28 font-display text-3xl tracking-tight"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className="mt-10 scroll-mt-28 font-display text-2xl tracking-tight"
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p {...props} className="my-5 text-pretty leading-relaxed" />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className="my-5 list-disc space-y-2 pl-6" />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol {...props} className="my-5 list-decimal space-y-2 pl-6" />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr {...props} className="my-12 border-border" />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      {...props}
      className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em]"
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      {...props}
      className="my-8 overflow-x-auto rounded-2xl border border-border bg-ink-950 p-5 text-sm text-sand-100"
    />
  ),
};
