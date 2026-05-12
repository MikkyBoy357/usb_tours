import { Reveal } from "@/components/site/reveal";
import type { Tour } from "@/lib/tours";

export function Itinerary({ tour }: { tour: Tour }) {
  return (
    <ol className="relative space-y-10 border-l border-border pl-8 sm:pl-10">
      {tour.itinerary.map((day, i) => (
        <Reveal key={day.day} delay={i * 0.04}>
          <li className="relative">
            <span className="absolute -left-[2.45rem] flex size-9 items-center justify-center rounded-full bg-foreground font-mono text-[11px] text-background sm:-left-[2.95rem] sm:size-10 sm:text-xs">
              D{day.day}
            </span>
            <h3 className="font-display text-2xl leading-tight">{day.title}</h3>
            <p className="mt-2 text-pretty text-muted-foreground">
              {day.description}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
