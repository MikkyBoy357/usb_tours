export type Testimonial = {
  name: string;
  origin: string;
  tour: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    name: "Amara Johnson",
    origin: "New York, USA",
    tour: "Ouidah Heritage Trail",
    quote:
      "I came expecting a tour. I left with a piece of me reconnected. The team held space for something far deeper than sightseeing.",
    rating: 5,
  },
  {
    name: "Lucas Moreau",
    origin: "Paris, France",
    tour: "Pendjari Safari",
    quote:
      "I have done safaris across East Africa. Pendjari felt like a secret. No crowds, no jeep convoys — just the bush and us.",
    rating: 5,
  },
  {
    name: "Chiamaka Okeke",
    origin: "Lagos, Nigeria",
    tour: "Grand Tour of Benin",
    quote:
      "Best decision of the year. Mr USB and his team turned 10 days into a story I'll tell for the rest of my life.",
    rating: 5,
  },
  {
    name: "Hiro Tanaka",
    origin: "Tokyo, Japan",
    tour: "Ganvié Stilt Village",
    quote:
      "The homestay night in Ganvié was magic. Quiet, lantern-lit, and unlike anywhere I have ever slept.",
    rating: 5,
  },
  {
    name: "Sarah Müller",
    origin: "Berlin, Germany",
    tour: "Cotonou After Dark",
    quote:
      "The food walk alone was worth flying for. Plus the live music spot they took us to was unreal.",
    rating: 5,
  },
];
