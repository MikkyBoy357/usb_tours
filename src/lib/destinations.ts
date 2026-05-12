export type Destination = {
  slug: string;
  name: string;
  region: "South" | "Centre" | "North" | "Coast";
  blurb: string;
  longDescription: string;
  image: { src: string; alt: string };
  tags: string[];
};

const u = (id: string) => `/images/${id}.jpg`;

export const destinations: Destination[] = [
  {
    slug: "ouidah",
    name: "Ouidah",
    region: "Coast",
    blurb: "Sacred groves, the Slave Route, and the Door of No Return.",
    longDescription:
      "Ouidah is where Atlantic history and African spirituality meet. Once a major slave-trading port, today it is the spiritual heart of voodoo and a place of profound, layered remembrance.",
    image: { src: u("1494791368093-85217fbbf8de"), alt: "Ouidah coastline" },
    tags: ["history", "spiritual"],
  },
  {
    slug: "ganvie",
    name: "Ganvié",
    region: "South",
    blurb:
      "The largest lake village in Africa — built on stilts to escape capture.",
    longDescription:
      "Founded in the 16th century by the Tofinu people fleeing Dahomey slavers, Ganvié is a city of roughly 30,000 living entirely on the waters of Lake Nokoué.",
    image: {
      src: u("1469474968028-56623f02e42e"),
      alt: "Stilt village on the lake",
    },
    tags: ["village-life", "nature"],
  },
  {
    slug: "abomey",
    name: "Abomey",
    region: "Centre",
    blurb: "The royal capital of the Dahomey kingdom. UNESCO heritage.",
    longDescription:
      "Abomey was the political and spiritual capital of one of West Africa's most powerful precolonial kingdoms. Its earthen royal palaces are listed on the UNESCO World Heritage register.",
    image: {
      src: u("1517331156700-3c241d2b4d83"),
      alt: "Royal palace at Abomey",
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
    image: { src: u("1547036967-23d11aacaee0"), alt: "Pendjari savanna" },
    tags: ["safari", "wildlife"],
  },
  {
    slug: "cotonou",
    name: "Cotonou",
    region: "Coast",
    blurb: "The pulse of Benin — markets, music, and the long Atlantic shore.",
    longDescription:
      "Cotonou is Benin's economic capital and its loudest, hungriest, most generous city. Dantokpa Market is one of the largest open-air markets in West Africa.",
    image: { src: u("1543007630-9710e4a00a20"), alt: "Cotonou street life" },
    tags: ["food", "city", "nightlife"],
  },
  {
    slug: "tata-somba",
    name: "Tata Somba Country",
    region: "North",
    blurb: "Fortified clay castles of the Betammaribe people.",
    longDescription:
      "In the Atacora mountains, the Betammaribe built clay-and-earth fortress-houses called Tata — small, defensible, and architecturally extraordinary. UNESCO-listed cultural landscape.",
    image: {
      src: u("1516026672322-bc52d61a55d5"),
      alt: "Tata Somba architecture",
    },
    tags: ["culture", "unesco"],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
