import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PostCard } from "@/components/journal/post-card";
import { Toc } from "@/components/journal/toc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  extractToc,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from "@/lib/journal";
import { mdxOptions } from "@/lib/mdx-options";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default async function JournalPostPage(
  props: PageProps<"/journal/[slug]">,
) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = extractToc(post.body);
  const related = getRelatedPosts(slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.cover],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/journal/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article hero */}
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-20 text-white lg:pt-40 lg:pb-28">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/80 to-ink-950" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs text-white/70 hover:text-accent"
          >
            <ArrowLeft className="size-3" />
            Back to Journal
          </Link>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {post.category}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-pretty text-lg text-white/85">
            {post.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readingTime}
            </span>
            <span>by {post.author.name}</span>
          </div>
        </div>
      </section>

      {/* Body + TOC */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <Toc items={toc} />
              </div>
            </aside>
            <article className="prose-spacing lg:col-span-7 lg:col-start-4">
              <div className="text-pretty text-[1.05rem] leading-relaxed text-foreground/90">
                <MDXRemote
                  source={post.body}
                  components={mdxComponents}
                  options={{ mdxOptions }}
                />
              </div>

              <hr className="my-16 border-border" />

              <footer>
                <div className="flex flex-col items-start gap-4 rounded-3xl bg-card p-6 ring-1 ring-border sm:flex-row sm:items-center sm:p-8">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-lg text-accent">
                    {post.author.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="font-display text-lg leading-tight">
                      {post.author.name}
                    </p>
                    {post.author.bio && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-2">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </footer>
            </article>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-sand-50 py-20 lg:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Keep reading"
                title="More from the journal."
              />
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
