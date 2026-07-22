export type Destination = {
  slug: string;
  name: string;
  region: "South" | "Centre" | "North" | "Coast";
  blurb: string;
  longDescription: string;
  image: { src: string; alt: string };
  tags: string[];
};

const p = (name: string) => `/photos/${name}.jpg`;

export const destinations: Destination[] = [
  {
    slug: "ouidah",
    name: "Ouidah",
    region: "Coast",
    blurb: "The Temple of Pythons, the Slave Route, and the Door of No Return.",
    longDescription:
      "Ouidah is where Atlantic history and African spirituality meet. Once a major slave-trading port, today it is the spiritual heart of Vodun — home to the Temple of Pythons, the Sacred Forest of Kpassè, and the January voodoo festival — and a place of profound, layered remembrance.",
    image: {
      src: p("voodoo-festival-adepts"),
      alt: "Vodun adepts in white robes at the Ouidah festival",
    },
    tags: ["history", "spiritual"],
  },
  {
    slug: "ganvie",
    name: "Ganvié & Lake Nokoué",
    region: "South",
    blurb:
      "The largest lake village in Africa — plus mangrove kayaks, hydrobikes and jet skis.",
    longDescription:
      "Founded in the 16th century by the Tofinu people fleeing Dahomey slavers, Ganvié is a city of roughly 30,000 living entirely on the waters of Lake Nokoué. Today the same lake and the Aguégué mangroves are also home to a water park — kayaks, hydrobikes, a floating course, a natural pool and jet skis.",
    image: {
      src: p("lake-nokoue-aerial"),
      alt: "Aerial view of the channels of Lake Nokoué",
    },
    tags: ["village-life", "nature"],
  },
  {
    slug: "abomey",
    name: "Abomey",
    region: "Centre",
    blurb: "The royal capital of the Dahomey kingdom. UNESCO heritage.",
    longDescription:
      "Abomey was the political and spiritual capital of one of West Africa's most powerful precolonial kingdoms — the home of the Agojie women warriors. Its earthen royal palaces are listed on the UNESCO World Heritage register.",
    image: {
      src: p("amazon-statue-cotonou"),
      alt: "The Amazon of Dahomey monument to the women warriors",
    },
    tags: ["history", "unesco"],
  },
  {
    slug: "pendjari",
    name: "Pendjari",
    region: "North",
    blurb:
      "West Africa's last great wilderness. Lions, elephants, untouched savanna.",
    longDescription:
      "Pendjari National Park is one of the last strongholds of biodiversity in West Africa and the most reliable place on the continent to see the West African lion in the wild.",
    image: {
      src: p("benin-town-aerial"),
      alt: "A northern Benin town from the air on the road to Pendjari",
    },
    tags: ["safari", "wildlife"],
  },
  {
    slug: "cotonou",
    name: "Cotonou",
    region: "Coast",
    blurb:
      "The pulse of Benin — markets, monuments, music, and the Atlantic shore.",
    longDescription:
      "Cotonou is Benin's economic capital and its loudest, hungriest, most generous city. It is home to Dantokpa, one of the largest open-air markets in West Africa, and to the Amazon of Dahomey — Africa's tallest statue.",
    image: {
      src: p("marche-ganhi-cotonou"),
      alt: "A guest at the entrance to Marché Ganhi in Cotonou",
    },
    tags: ["food", "city", "nightlife"],
  },
  {
    slug: "tata-somba",
    name: "Atacora & Tata Somba",
    region: "North",
    blurb: "Fortified clay castles of the Betammaribe people.",
    longDescription:
      "In the Atacora mountains, the Betammaribe built clay-and-earth fortress-houses called Tata — small, defensible, and architecturally extraordinary. A UNESCO-listed cultural landscape at the far north of the country.",
    image: {
      src: p("northern-benin-roundabout"),
      alt: "A monument roundabout in a northern Benin town",
    },
    tags: ["culture", "unesco"],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
