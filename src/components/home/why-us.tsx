import { Compass, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const pillars = [
  {
    icon: Compass,
    title: "Insider routes, not tourist loops",
    body: "Every itinerary is built by people who grew up here. The places you'll go don't make the guidebooks.",
  },
  {
    icon: HeartHandshake,
    title: "Real local relationships",
    body: "We pay local guides above market rate and partner with family-owned lodges. Your money stays in the communities you visit.",
  },
  {
    icon: ShieldCheck,
    title: "Safety without the security theater",
    body: "Vetted drivers, GPS-tracked vehicles, 24/7 on-call ops. You feel free because somebody else is watching the details.",
  },
  {
    icon: Sparkles,
    title: "Small groups. Always.",
    body: "Maximum 10 travelers per departure. Often fewer. We won't put you on a coach.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why travel with us"
            title="A different way to see Africa."
            description="We build trips for travelers who care more about meeting a place than checking it off a list."
          />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              className="flex flex-col gap-4 bg-background p-8"
            >
              <p.icon className="size-6 text-accent" strokeWidth={1.4} />
              <h3 className="font-display text-xl leading-snug">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
