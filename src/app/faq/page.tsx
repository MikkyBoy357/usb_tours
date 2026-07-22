import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Visas, safety, packing, money, custom trips — the questions travelers ask us most often.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const allItems = faqs.flatMap((g) => g.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD required
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Questions, answered."
        description="The honest version. If anything here is unclear or missing, write to us — we'll add it."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        image={{
          src: "/photos/aguegue-signpost.jpg",
          alt: "The Baie de Aguégué signpost in the mangroves of Lake Nokoué",
        }}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Sections
                </p>
                <ul className="space-y-2.5 text-sm">
                  {faqs.map((g) => (
                    <li key={g.group}>
                      <a
                        href={`#${g.group.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-foreground/70 hover:text-foreground"
                      >
                        {g.group}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="space-y-16 lg:col-span-9">
              {faqs.map((g, i) => (
                <Reveal
                  key={g.group}
                  id={g.group.toLowerCase().replace(/\s+/g, "-")}
                  delay={i * 0.05}
                  className="scroll-mt-28"
                >
                  <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {g.group}
                  </p>
                  <Accordion type="single" collapsible className="space-y-3">
                    {g.items.map((item, idx) => (
                      <AccordionItem
                        key={item.q}
                        value={`${g.group}-${idx}`}
                        className="overflow-hidden rounded-2xl border border-border bg-card px-6"
                      >
                        <AccordionTrigger className="text-left font-display text-lg leading-snug hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-pretty text-base leading-relaxed text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Reveal>
              ))}

              <Reveal>
                <div className="mt-10 rounded-3xl border border-dashed border-border p-8 text-center">
                  <p className="font-display text-2xl">Still have questions?</p>
                  <p className="mt-2 text-muted-foreground">
                    Send us a note — we read every single one.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground"
                  >
                    Contact us
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
