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

const u = (id: string) => `/images/${id}.jpg`;

export const tours: Tour[] = [
  {
    slug: "ouidah-voodoo-heritage",
    title: "Ouidah: The Voodoo & Heritage Trail",
    tagline: "Walk the Slave Route. Stand at the Door of No Return.",
    summary:
      "A profound 4-day journey through Ouidah's sacred groves, voodoo temples, and the historic slave route — ending at the Door of No Return on the Atlantic.",
    destination: "Ouidah",
    country: "Benin Republic",
    durationDays: 4,
    groupSize: { min: 2, max: 10 },
    difficulty: "Easy",
    priceUSD: 720,
    startsFrom: "Cotonou",
    cover: {
      src: u("1494791368093-85217fbbf8de"),
      alt: "Coastal palms and ocean spray at Ouidah",
      credit: "Unsplash",
    },
    gallery: [
      {
        src: u("1547471080-7cc2caa01a7e"),
        alt: "Sacred forest path",
        credit: "Unsplash",
      },
      {
        src: u("1523805009345-7448845a9e53"),
        alt: "Atlantic shoreline",
        credit: "Unsplash",
      },
      {
        src: u("1516026672322-bc52d61a55d5"),
        alt: "Heritage architecture",
        credit: "Unsplash",
      },
    ],
    highlights: [
      "Python Temple & sacred groves",
      "Slave Route to the Door of No Return",
      "Traditional voodoo ceremony (respectful, by invitation)",
      "Sunset over the Atlantic on a private stretch of beach",
    ],
    included: [
      "Private 4WD with driver",
      "Bilingual cultural guide",
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
          "Pickup from Cardinal Bernardin Gantin Airport, evening welcome dinner with the team.",
      },
      {
        day: 2,
        title: "Cotonou → Ouidah",
        description:
          "Drive to Ouidah, Python Temple, Sacred Forest of Kpassè, evening reflection.",
      },
      {
        day: 3,
        title: "The Slave Route",
        description:
          "Walk the 4km route from the auction tree to the Door of No Return; afternoon at the Museum of History.",
      },
      {
        day: 4,
        title: "Beach & Departure",
        description: "Atlantic sunrise, breakfast, return transfer.",
      },
    ],
    coordinates: { lat: 6.3617, lng: 2.0852 },
    tags: ["culture", "history", "spiritual"],
    featured: true,
  },
  {
    slug: "ganvie-stilt-village",
    title: "Ganvié: The Venice of Africa",
    tagline: "A floating village built on water, frozen in time.",
    summary:
      "A 2-day immersion into Ganvié — the largest lake village in Africa — by traditional pirogue, with a homestay night and dawn fishing.",
    destination: "Ganvié, Lake Nokoué",
    country: "Benin Republic",
    durationDays: 2,
    groupSize: { min: 2, max: 8 },
    difficulty: "Easy",
    priceUSD: 340,
    startsFrom: "Cotonou",
    cover: {
      src: u("1469474968028-56623f02e42e"),
      alt: "Stilt village reflected on calm lake at dawn",
      credit: "Unsplash",
    },
    gallery: [
      {
        src: u("1500530855697-b586d89ba3ee"),
        alt: "Pirogue on the lake",
        credit: "Unsplash",
      },
      {
        src: u("1488646953014-85cb44e25828"),
        alt: "Sunrise over water",
        credit: "Unsplash",
      },
    ],
    highlights: [
      "Traditional pirogue ride across Lake Nokoué",
      "Floating market & stilt mosque",
      "Homestay with a local family",
      "Dawn fishing with the village fleet",
    ],
    included: [
      "Boat transfers",
      "Local guide & translator",
      "1-night homestay",
      "All meals during the stay",
    ],
    notIncluded: ["Transfers from outside Cotonou", "Tips"],
    itinerary: [
      {
        day: 1,
        title: "Cotonou → Ganvié",
        description:
          "Morning pirogue to the village, market visit, homestay welcome, evening with local musicians.",
      },
      {
        day: 2,
        title: "Dawn Fishing & Return",
        description:
          "Sunrise with the fishing fleet, breakfast, return by water.",
      },
    ],
    coordinates: { lat: 6.4667, lng: 2.4167 },
    tags: ["nature", "village-life", "photography"],
    featured: true,
  },
  {
    slug: "pendjari-safari",
    title: "Pendjari: West Africa's Last Wild Heart",
    tagline: "Lions, elephants, and the savanna without the crowds.",
    summary:
      "5 days of authentic safari in Pendjari National Park — one of the last strongholds of the West African lion and the only place to truly see Africa as it once was.",
    destination: "Pendjari National Park",
    country: "Benin Republic",
    durationDays: 5,
    groupSize: { min: 2, max: 6 },
    difficulty: "Moderate",
    priceUSD: 1480,
    startsFrom: "Cotonou",
    cover: {
      src: u("1547036967-23d11aacaee0"),
      alt: "Savanna at golden hour with acacia silhouettes",
      credit: "Unsplash",
    },
    gallery: [
      {
        src: u("1535941339077-2dd1c7963098"),
        alt: "Elephant herd at waterhole",
        credit: "Unsplash",
      },
      {
        src: u("1456926631375-92c8ce872def"),
        alt: "Lone acacia tree",
        credit: "Unsplash",
      },
      {
        src: u("1493514789931-586cb221d7a7"),
        alt: "Lion at rest",
        credit: "Unsplash",
      },
    ],
    highlights: [
      "Game drives at dawn and dusk",
      "Birdwatching at the Pendjari River",
      "Stay at an eco-lodge inside the park",
      "Visit a Tata Somba fortified village on the way",
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
        description: "Flight or scenic drive north.",
      },
      {
        day: 2,
        title: "Tata Somba & Park Entry",
        description: "Visit fortified clay villages; afternoon game drive.",
      },
      {
        day: 3,
        title: "Full Day Safari",
        description: "Dawn and dusk drives, midday at the lodge.",
      },
      {
        day: 4,
        title: "River & Birds",
        description: "Pendjari River boat segment, birdwatching.",
      },
      {
        day: 5,
        title: "Return",
        description: "Final drive at dawn; return south.",
      },
    ],
    coordinates: { lat: 11.3833, lng: 1.4167 },
    tags: ["safari", "wildlife", "nature"],
    featured: true,
  },
  {
    slug: "cotonou-nightlife-food",
    title: "Cotonou After Dark",
    tagline: "Grilled fish, palm wine, and the rhythms of the coast.",
    summary:
      "A 3-night urban deep-dive into Cotonou's food and nightlife — street kitchens, secret bars, live afrobeat, and the markets that never quite sleep.",
    destination: "Cotonou",
    country: "Benin Republic",
    durationDays: 3,
    groupSize: { min: 2, max: 8 },
    difficulty: "Easy",
    priceUSD: 480,
    startsFrom: "Cotonou",
    cover: {
      src: u("1543007630-9710e4a00a20"),
      alt: "City lights and street market at night",
      credit: "Unsplash",
    },
    gallery: [
      {
        src: u("1517248135467-4c7edcad34c4"),
        alt: "Live music venue",
        credit: "Unsplash",
      },
      {
        src: u("1504674900247-0877df9cc836"),
        alt: "Grilled food on coals",
        credit: "Unsplash",
      },
    ],
    highlights: [
      "Dantokpa Market food walk",
      "Live afrobeat at a local club",
      "Grilled barracuda on the beach",
      "Sunset cruise on the lagoon",
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
          "Dantokpa Market by night, street kitchens, welcome drinks.",
      },
      {
        day: 2,
        title: "Beach & Lagoon",
        description:
          "Morning at Fidjrosse Beach, afternoon lagoon cruise, evening live music.",
      },
      {
        day: 3,
        title: "Markets & Departure",
        description: "Slow morning, art market, transfer.",
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
      "2 days inside the UNESCO-listed Royal Palaces of Abomey — the political and spiritual heart of the legendary Dahomey kingdom.",
    destination: "Abomey",
    country: "Benin Republic",
    durationDays: 2,
    groupSize: { min: 2, max: 10 },
    difficulty: "Easy",
    priceUSD: 290,
    startsFrom: "Cotonou",
    cover: {
      src: u("1517331156700-3c241d2b4d83"),
      alt: "Earthen palace walls and ceremonial entrance",
      credit: "Unsplash",
    },
    gallery: [
      {
        src: u("1538935732373-f7a495fea3f6"),
        alt: "Royal artifacts",
        credit: "Unsplash",
      },
    ],
    highlights: [
      "Royal Palaces (UNESCO)",
      "Historical Museum of Abomey",
      "Story of the Mino — the women warriors",
      "Bas-relief earthworks tour",
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
          "Drive north, palace tour, evening with a royal historian.",
      },
      {
        day: 2,
        title: "Museum & Return",
        description: "Museum, bas-reliefs, return south by afternoon.",
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
      "The signature MrUSB experience — Cotonou, Ouidah, Ganvié, Abomey, Tata Somba, and Pendjari, woven into a single unforgettable arc.",
    destination: "Benin Republic (South → North)",
    country: "Benin Republic",
    durationDays: 10,
    groupSize: { min: 2, max: 8 },
    difficulty: "Moderate",
    priceUSD: 2850,
    startsFrom: "Cotonou",
    cover: {
      src: u("1504609813442-a8924e83f76e"),
      alt: "Cinematic African landscape at golden hour",
      credit: "Unsplash",
    },
    gallery: [
      {
        src: u("1504609813442-a8924e83f76e"),
        alt: "Landscape",
        credit: "Unsplash",
      },
      { src: u("1547036967-23d11aacaee0"), alt: "Savanna", credit: "Unsplash" },
      {
        src: u("1469474968028-56623f02e42e"),
        alt: "Lake village",
        credit: "Unsplash",
      },
    ],
    highlights: [
      "Every signature destination in one arc",
      "All transport handled, all stays vetted",
      "Private MrUSB host throughout",
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
      { day: 2, title: "Ganvié", description: "Pirogue & homestay night." },
      {
        day: 3,
        title: "Ouidah",
        description: "Slave Route & Door of No Return.",
      },
      {
        day: 4,
        title: "Ouidah → Abomey",
        description: "Royal palaces & history.",
      },
      {
        day: 5,
        title: "Abomey → Natitingou",
        description: "Long scenic drive north.",
      },
      { day: 6, title: "Tata Somba", description: "Fortified villages." },
      {
        day: 7,
        title: "Pendjari",
        description: "Park entry, first game drive.",
      },
      { day: 8, title: "Pendjari", description: "Full safari day." },
      {
        day: 9,
        title: "Pendjari → South",
        description: "Return flight to Cotonou.",
      },
      { day: 10, title: "Departure", description: "Slow morning, transfer." },
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
