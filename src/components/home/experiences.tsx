import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const experiences = [
  {
    n: "01",
    title: "Sleep in a stilt village.",
    body: "Lantern light, the soft slap of water against pillars, and a sky absolutely riddled with stars.",
  },
  {
    n: "02",
    title: "Walk the Slave Route in silence.",
    body: "Four kilometers from the auction tree to the Door of No Return. Some places ask for nothing but presence.",
  },
  {
    n: "03",
    title: "Track lions at first light.",
    body: "Pendjari is one of the few places left where West African lions still walk freely.",
  },
  {
    n: "04",
    title: "Eat with a family in Cotonou.",
    body: "Grilled barracuda, palm wine, the cousin's mixtape — the meal you'll text us about a year later.",
  },
  {
    n: "05",
    title: "Stand inside a royal palace.",
    body: "Abomey was the capital of a kingdom that defied the French Empire. The walls remember.",
  },
];

export function Experiences() {
  return (
    <section className="bg-ink-950 py-24 text-sand-100 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What you'll do"
            title={"Moments, not photo ops."}
            description="The kind of travel where the camera ends up in your bag."
            className="text-sand-100 [&_p]:text-sand-200/70"
          />
        </Reveal>

        <ol className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {experiences.map((e, i) => (
            <Reveal key={e.n} delay={i * 0.05}>
              <li className="group grid grid-cols-12 items-baseline gap-6 py-8 transition-colors hover:bg-white/[0.02]">
                <span className="col-span-2 font-mono text-xs text-accent sm:col-span-1">
                  {e.n}
                </span>
                <h3 className="col-span-10 font-display text-2xl leading-tight sm:col-span-5 sm:text-3xl">
                  {e.title}
                </h3>
                <p className="col-span-12 max-w-prose text-pretty text-sand-200/75 sm:col-span-6 sm:text-lg">
                  {e.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
