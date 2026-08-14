import { Container } from "@/components/site/container";

export type LegalSection = { heading: string; paragraphs: string[] };

// Shared shell for /privacy and /terms so both read as one document family.
export function LegalProse({
  updated,
  intro,
  sections,
}: {
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Last updated {updated}
          </p>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/80">
            {intro}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-2xl tracking-tight">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-4">
                  {s.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 48)}
                      className="text-pretty text-sm leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
