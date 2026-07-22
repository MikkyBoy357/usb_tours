import type { Metadata } from "next";
import { CategoryFilter } from "@/components/journal/category-filter";
import { PostCard } from "@/components/journal/post-card";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { getAllCategories, getAllJournalPreviews } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes, travel guides, photography, and stories from across Benin Republic and Africa.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const posts = getAllJournalPreviews();
  const categories = getAllCategories();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Stories from the road."
        description="Written by the team and our travelers. Travel guides, photography, culture, and the long-form pieces we promised the algorithm would love."
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
        image={{
          src: "/photos/heritage-museum-facade.jpg",
          alt: "The colonial-era heritage museum façade in Ouidah",
        }}
      />

      {featured && (
        <section className="py-16 lg:py-24">
          <Container>
            <Reveal>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Featured
              </p>
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <PostCard post={featured} variant="featured" />
                </div>
                <div className="lg:col-span-5">
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-pretty text-muted-foreground">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="border-t border-border py-16 lg:py-24">
        <Container>
          <CategoryFilter posts={rest} categories={categories} />
        </Container>
      </section>
    </>
  );
}
