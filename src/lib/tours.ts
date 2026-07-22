export type DifficultyLevel = "Easy" | "Moderate" | "Challenging";

export type Tour = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  destination: string;
  country: string;
  durationDays: number;
  groupSize: { min: number; max: number };
  difficulty: DifficultyLevel;
  priceUSD: number;
  startsFrom: string;
  cover: { src: string; alt: string; credit: string };
  gallery: { src: string; alt: string; credit: string }[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: { day: number; title: string; description: string }[];
  videoUrl?: string;
  coordinates: { lat: number; lng: number };
  tags: string[];
  featured?: boolean;
};

// Real photography from Tour with MrUSB departures across Benin Republic.
const p = (name: string) => `/photos/${name}.jpg`;
const CREDIT = "Tour with MrUSB";

export const tours: Tour[] = [
  {
    slug: "ouidah-voodoo-heritage",
    title: "Ouidah: The Voodoo & Heritage Trail",
    tagline:
      "Walk the Slave Route. Meet the pythons. Stand at the Door of No Return.",
    summary:
      "A profound day-and-night journey through Ouidah's living Vodun culture — the Temple of Pythons, the Sacred Forest of Kpassè, the 4km Slave Route, and the Door of No Return on the Atlantic, timed where possible to the January voodoo festival.",
    destination: "Ouidah",
    country: "Benin Republic",
    durationDays: 4,
    groupSize: { min: 2, max: 12 },
    difficulty: "Easy",
    priceUSD: 720,
    startsFrom: "Cotonou",
    cover: {
      src: p("voodoo-festival-drummers"),
      alt: "Drummers and dancers in traditional cloth at the Ouidah Vodun festival",
      credit: CREDIT,
    },
    gallery: [
      {
        src: p("python-temple-joy"),
        alt: "A MrUSB traveller laughing with a royal python at Ouidah's Temple of Pythons",
        credit: CREDIT,
      },
      {
        src: p("voodoo-festival-adepts"),
        alt: "Vodun adepts in white robes beneath a ceremonial umbrella",
        credit: CREDIT,
      },
      {
        src: p("python-temple-portrait"),
        alt: "Portrait of a guest with a python draped across his shoulders",
        credit: CREDIT,
      },
      {
        src: p("voodoo-dancer-sand"),
        alt: "A dancer wrapped in bright wax-print cloth performing at the festival",
        credit: CREDIT,
      },
      {
        src: p("ouidah-basilica-group"),
        alt: "The MrUSB group gathered outside Ouidah's basilica on a Trip to Ouidah departure",
        credit: CREDIT,
      },
      {
        src: p("heritage-museum-facade"),
        alt: "The colonial-era heritage museum façade in Ouidah",
        credit: CREDIT,
      },
    ],
    highlights: [
      "Temple of Pythons — hold a royal python, if you dare",
      "The Sacred Forest of Kpassè and its Vodun sculptures",
      "The 4km Slave Route to the Door of No Return on the Atlantic",
      "The Ouidah Vodun festival (10 January) when dates align",
    ],
    included: [
      "Private, air-conditioned transport with driver",
      "Bilingual cultural guide (English / French)",
      "3 nights boutique stay",
      "All breakfasts, 2 dinners",
      "All site entries & ceremony fees",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Cotonou",
        description:
          "Pickup from Cardinal Bernardin Gantin Airport, welcome dinner with the MrUSB team and an evening briefing.",
      },
      {
        day: 2,
        title: "Cotonou → Ouidah",
        description:
          "Drive to Ouidah, the Temple of Pythons and the Sacred Forest of Kpassè, with time to meet the priests who tend them.",
      },
      {
        day: 3,
        title: "The Slave Route",
        description:
          "Walk the route from the auction square past the Tree of Forgetfulness to the Door of No Return; afternoon at the Museum of History.",
      },
      {
        day: 4,
        title: "Beach & Departure",
        description:
          "Atlantic sunrise, a slow breakfast, and the return transfer.",
      },
    ],
    coordinates: { lat: 6.3617, lng: 2.0852 },
    tags: ["culture", "history", "spiritual"],
    featured: true,
  },
  {
    slug: "ganvie-stilt-village",
    title: "Ganvié & the Lake: Life on the Water",
    tagline:
      "The Venice of Africa by pirogue — then the mangroves by kayak, hydrobike and jet ski.",
    summary:
      "A two-day immersion in life on Lake Nokoué — a pirogue crossing to the stilt city of Ganvié, then a full day at the Aguégué mangrove water park with kayaks, hydrobikes, a floating course, a natural swimming pool and jet skis.",
    destination: "Ganvié & Aguégué, Lake Nokoué",
    country: "Benin Republic",
    durationDays: 2,
    groupSize: { min: 2, max: 10 },
    difficulty: "Easy",
    priceUSD: 340,
    startsFrom: "Cotonou",
    cover: {
      src: p("lake-nokoue-aerial"),
      alt: "Aerial view of the boat landing and channels of Lake Nokoué",
      credit: CREDIT,
    },
    gallery: [
      {
        src: p("mangrove-kayaking"),
        alt: "Travellers kayaking through the mangroves on Lake Nokoué",
        credit: CREDIT,
      },
      {
        src: p("hydrobike-mangroves"),
        alt: "A guest pedalling a hydrobike across the water beside the mangroves",
        credit: CREDIT,
      },
      {
        src: p("jet-ski-lake"),
        alt: "A guest riding a jet ski on the open lake",
        credit: CREDIT,
      },
      {
        src: p("floating-water-park"),
        alt: "The inflatable floating water park at the Aguégué mangrove base",
        credit: CREDIT,
      },
      {
        src: p("water-bikes-friends"),
        alt: "Friends racing brightly coloured water bikes on the lake",
        credit: CREDIT,
      },
      {
        src: p("aguegue-signpost"),
        alt: "The Baie de Aguégué signpost pointing to the natural pool, adrénaline and hydrobikes",
        credit: CREDIT,
      },
    ],
    highlights: [
      "Traditional pirogue across Lake Nokoué to Ganvié",
      "The floating market and stilt architecture of the Venice of Africa",
      "Kayaks, hydrobikes and a floating obstacle course in the mangroves",
      "A natural swimming pool and jet skis at the Aguégué base",
    ],
    included: [
      "Boat and pirogue transfers",
      "Local guide & translator",
      "Water-park entry and all activities listed",
      "Life jackets and safety briefing",
      "Lunch on the water",
    ],
    notIncluded: ["Transfers from outside Cotonou", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Cotonou → Ganvié",
        description:
          "Morning pirogue to the stilt village, floating market visit, and an afternoon learning how a city lives entirely on water.",
      },
      {
        day: 2,
        title: "The Aguégué Mangroves",
        description:
          "A full day of kayaks, hydrobikes, the floating course, the natural pool and jet skis, before the return across the lake.",
      },
    ],
    coordinates: { lat: 6.4667, lng: 2.4167 },
    tags: ["nature", "village-life", "adventure"],
    featured: true,
  },
  {
    slug: "pendjari-safari",
    title: "The Road North: Pendjari & the Atacora",
    tagline:
      "West Africa's last wild heart — savanna, elephants, and the road that gets you there.",
    summary:
      "Five days north through the Atacora to Pendjari National Park — one of the last strongholds of the West African lion — with the long, beautiful overland journey that most travellers never make.",
    destination: "Pendjari National Park",
    country: "Benin Republic",
    durationDays: 5,
    groupSize: { min: 2, max: 6 },
    difficulty: "Moderate",
    priceUSD: 1480,
    startsFrom: "Cotonou",
    cover: {
      src: p("northern-benin-roundabout"),
      alt: "Aerial view of a monument roundabout in a northern Benin town on the road to Pendjari",
      credit: CREDIT,
    },
    gallery: [
      {
        src: p("benin-town-aerial"),
        alt: "A northern Benin town from the air on the overland route north",
        credit: CREDIT,
      },
      {
        src: p("tour-bus-arrival"),
        alt: "The MrUSB group arriving by coach on a northern departure",
        credit: CREDIT,
      },
      {
        src: p("tour-group-photo"),
        alt: "The full MrUSB travelling group on a multi-day departure",
        credit: CREDIT,
      },
    ],
    highlights: [
      "Game drives at dawn and dusk in Pendjari National Park",
      "The scenic overland journey through the Atacora highlands",
      "Birdwatching along the Pendjari River",
      "A stay at an eco-lodge on the edge of the park",
    ],
    included: [
      "All in-park transfers in open 4WD",
      "Park fees & ranger",
      "4 nights eco-lodge",
      "Full board",
    ],
    notIncluded: [
      "Domestic flight to Natitingou (arranged separately)",
      "Drinks",
    ],
    itinerary: [
      {
        day: 1,
        title: "Cotonou → Natitingou",
        description:
          "Flight or scenic overland drive north through the Atacora.",
      },
      {
        day: 2,
        title: "Atacora & Park Entry",
        description: "Explore the highland country; afternoon game drive.",
      },
      {
        day: 3,
        title: "Full Day Safari",
        description: "Dawn and dusk drives, midday rest at the lodge.",
      },
      {
        day: 4,
        title: "River & Birds",
        description: "Pendjari River segment and birdwatching.",
      },
      {
        day: 5,
        title: "Return",
        description: "A final drive at dawn, then the journey south.",
      },
    ],
    coordinates: { lat: 11.3833, lng: 1.4167 },
    tags: ["safari", "wildlife", "nature"],
  },
  {
    slug: "cotonou-nightlife-food",
    title: "Cotonou After Dark",
    tagline: "Markets, monuments, grilled fish and the rhythms of the coast.",
    summary:
      "A three-night urban deep-dive into Cotonou — the Amazon of Dahomey monument, the endless aisles of Dantokpa and Ganhi markets, street kitchens, live afrobeat, and the lagoon after sunset.",
    destination: "Cotonou",
    country: "Benin Republic",
    durationDays: 3,
    groupSize: { min: 2, max: 8 },
    difficulty: "Easy",
    priceUSD: 480,
    startsFrom: "Cotonou",
    cover: {
      src: p("tall-ship-night"),
      alt: "A tall ship lit up on the water off Cotonou at night",
      credit: CREDIT,
    },
    gallery: [
      {
        src: p("marche-ganhi-cotonou"),
        alt: "A guest posing at the entrance to Marché Ganhi in Cotonou",
        credit: CREDIT,
      },
      {
        src: p("amazon-statue-cotonou"),
        alt: "The Amazon of Dahomey monument rising over Cotonou",
        credit: CREDIT,
      },
      {
        src: p("cococodji-market"),
        alt: "The busy Cococodji market of Cotonou",
        credit: CREDIT,
      },
    ],
    highlights: [
      "The Amazon of Dahomey — Africa's tallest statue",
      "Dantokpa & Ganhi markets, on foot and by night",
      "Live afrobeat at a local club",
      "Grilled fish and a sunset cruise on the lagoon",
    ],
    included: [
      "3 nights boutique hotel",
      "All food walks & cover charges",
      "Local host",
    ],
    notIncluded: ["Alcohol beyond the welcome round"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Food Walk",
        description:
          "Dantokpa Market by night, street kitchens and welcome drinks.",
      },
      {
        day: 2,
        title: "Monuments & Lagoon",
        description:
          "The Amazon monument and Ganhi market by day, a lagoon cruise, then live music.",
      },
      {
        day: 3,
        title: "Markets & Departure",
        description: "A slow morning, the art market, and the transfer.",
      },
    ],
    coordinates: { lat: 6.3654, lng: 2.4183 },
    tags: ["food", "nightlife", "city"],
  },
  {
    slug: "abomey-kingdom",
    title: "Abomey: Kingdom of the Dahomey",
    tagline:
      "Royal palaces, warrior queens, and a kingdom that defied empires.",
    summary:
      "Two days inside the story of Dahomey — the UNESCO-listed Royal Palaces of Abomey, the legend of the Agojie women warriors, and the bronze monuments that keep their memory alive.",
    destination: "Abomey",
    country: "Benin Republic",
    durationDays: 2,
    groupSize: { min: 2, max: 10 },
    difficulty: "Easy",
    priceUSD: 290,
    startsFrom: "Cotonou",
    cover: {
      src: p("amazon-statue-cotonou"),
      alt: "The Amazon of Dahomey statue — a monument to the Agojie women warriors",
      credit: CREDIT,
    },
    gallery: [
      {
        src: p("behanzin-statue"),
        alt: "The equestrian statue of a Dahomey king",
        credit: CREDIT,
      },
      {
        src: p("amazon-statue-guests"),
        alt: "MrUSB travellers posing at the foot of the Amazon monument",
        credit: CREDIT,
      },
      {
        src: p("museum-art-portrait"),
        alt: "A guest beside a painted mural inside a Beninese museum",
        credit: CREDIT,
      },
    ],
    highlights: [
      "The Royal Palaces of Abomey (UNESCO World Heritage)",
      "The Historical Museum and its royal bas-reliefs",
      "The story of the Agojie — the women warriors of Dahomey",
      "Bronze monuments to the kings and queens of the kingdom",
    ],
    included: [
      "Private transport",
      "Cultural guide",
      "1-night stay",
      "Breakfast & dinner",
    ],
    notIncluded: ["Lunches"],
    itinerary: [
      {
        day: 1,
        title: "Cotonou → Abomey",
        description:
          "Drive north, tour the royal palaces, and spend the evening with a royal historian.",
      },
      {
        day: 2,
        title: "Museum & Return",
        description:
          "The museum and bas-reliefs, then the return south by afternoon.",
      },
    ],
    coordinates: { lat: 7.1856, lng: 1.9914 },
    tags: ["history", "culture", "unesco"],
  },
  {
    slug: "grand-tour-benin",
    title: "The Grand Tour of Benin",
    tagline: "10 days. South to north. Everything that matters.",
    summary:
      "The signature MrUSB experience — Cotonou, Ouidah, Ganvié, Abomey, the Atacora and Pendjari, woven into a single unforgettable arc from the Atlantic coast to the wild north.",
    destination: "Benin Republic (South → North)",
    country: "Benin Republic",
    durationDays: 10,
    groupSize: { min: 2, max: 8 },
    difficulty: "Moderate",
    priceUSD: 2850,
    startsFrom: "Cotonou",
    cover: {
      src: p("tour-group-photo"),
      alt: "The MrUSB travelling group together on a Grand Tour departure",
      credit: CREDIT,
    },
    gallery: [
      {
        src: p("amazon-statue-cotonou"),
        alt: "The Amazon of Dahomey monument in Cotonou",
        credit: CREDIT,
      },
      {
        src: p("voodoo-festival-adepts"),
        alt: "Vodun adepts in white at the Ouidah festival",
        credit: CREDIT,
      },
      {
        src: p("mangrove-kayaking"),
        alt: "Kayaking through the mangroves of Lake Nokoué",
        credit: CREDIT,
      },
      {
        src: p("northern-benin-roundabout"),
        alt: "A northern Benin town from the air on the road to Pendjari",
        credit: CREDIT,
      },
    ],
    highlights: [
      "Every signature destination in one arc",
      "All transport handled, all stays vetted",
      "A private MrUSB host throughout",
      "Small group, real depth",
    ],
    included: [
      "All transfers including internal flight",
      "9 nights mixed boutique + eco-lodge",
      "Full board outside cities",
      "All entries, ceremonies, fees",
    ],
    notIncluded: ["International flights", "Visa", "Insurance"],
    itinerary: [
      {
        day: 1,
        title: "Cotonou",
        description: "Arrival, welcome dinner, briefing.",
      },
      {
        day: 2,
        title: "Ganvié & the Lake",
        description: "Pirogue, stilt village and the mangroves.",
      },
      {
        day: 3,
        title: "Ouidah",
        description: "Temple of Pythons, Slave Route & the Door of No Return.",
      },
      {
        day: 4,
        title: "Ouidah → Abomey",
        description: "Royal palaces & the story of Dahomey.",
      },
      {
        day: 5,
        title: "Abomey → Natitingou",
        description: "The long scenic drive north through the Atacora.",
      },
      {
        day: 6,
        title: "Atacora",
        description: "Highland country and its villages.",
      },
      {
        day: 7,
        title: "Pendjari",
        description: "Park entry and the first game drive.",
      },
      { day: 8, title: "Pendjari", description: "A full safari day." },
      {
        day: 9,
        title: "Pendjari → South",
        description: "Return flight to Cotonou.",
      },
      {
        day: 10,
        title: "Departure",
        description: "A slow morning and the transfer.",
      },
    ],
    coordinates: { lat: 9.3077, lng: 2.3158 },
    tags: ["signature", "comprehensive", "premium"],
    featured: true,
  },
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((t) => t.featured);
}

export function getRelatedTours(slug: string, n = 3): Tour[] {
  const current = getTour(slug);
  if (!current) return tours.slice(0, n);
  const overlap = (t: Tour) =>
    t.slug !== slug && t.tags.some((tag) => current.tags.includes(tag));
  const related = tours.filter(overlap);
  const others = tours.filter((t) => t.slug !== slug && !related.includes(t));
  return [...related, ...others].slice(0, n);
}
