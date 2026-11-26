import type { Tour, TourPhoto } from "@/lib/tours";

/**
 * Single-day experiences: one place, one thing, three steps. These lead the
 * homepage, so every headline says exactly what you do and where.
 *
 * `featuredRank` orders them by how likely each is to turn a browser into a
 * booking: the dare and the bucket-list sight first (instantly shareable, no
 * equivalent elsewhere), then the high-energy and social days, then heritage,
 * wellness and the city.
 *
 * Price and group size are left out where the owner hasn't confirmed them. An
 * experience with no real photo would use a typographic cover (`coverTone`)
 * rather than a photo of somewhere else; every photo here was matched to its
 * place by GPS or a sign in the frame.
 */

const p = (name: string) => `/photos/${name}.jpg`;
const CREDIT = "Tour with MrUSB";
const photo = (name: string, alt: string): TourPhoto => ({
  src: p(name),
  alt,
  credit: CREDIT,
});
const GUIDE = "A MrUSB guide with you from start to finish";

export const experiences: Tour[] = [
  {
    slug: "python-temple-ouidah",
    title: "Wear a live python at Ouidah's Temple of Pythons",
    tagline:
      "Would you dare? The snakes are sacred, surprisingly calm, and the photo will blow up your group chat.",
    summary:
      "In Ouidah the royal python is sacred to the Vodun faith, and its temple sits across the square from the Basilica. Step inside, hear why no one here would ever harm a python, then let a keeper lay one across your shoulders.",
    destination: "Ouidah",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Easy",
    startsFrom: "Ouidah",
    cover: photo(
      "python-temple-joy",
      "A traveller laughing with a royal python draped around his neck at Ouidah's Temple of Pythons",
    ),
    gallery: [
      photo(
        "python-temple-woman-sunglasses",
        "A guest in sunglasses wearing a royal python at the Temple of Pythons",
      ),
      photo(
        "python-temple-portrait",
        "A guest with a royal python across his shoulders in Ouidah",
      ),
      photo(
        "python-temple-woman-smile",
        "A guest smiling as she holds a royal python",
      ),
      photo(
        "python-temple-young-man",
        "A young traveller holding a python up beside his face",
      ),
      photo(
        "python-temple-cap-laugh",
        "A guest in a black cap laughing as a python wraps around his neck",
      ),
      photo(
        "python-temple-woman-braids",
        "A guest with braids holding a royal python across her shoulders",
      ),
      photo(
        "python-temple-white-shirt",
        "A traveller in a white shirt grinning down at the python on his shoulders",
      ),
      photo(
        "python-temple-braids",
        "A guest smiling as a python coils up beside her face",
      ),
      photo(
        "python-temple-guest",
        "A guest holding the royal python draped around his neck",
      ),
      photo(
        "python-temple-woman-shades",
        "A guest in sunglasses calmly wearing a python at the temple",
      ),
      photo(
        "python-temple-plaid",
        "A traveller in a plaid shirt smiling with a python around his neck",
      ),
      photo(
        "python-temple-shades-look",
        "A guest in sunglasses eyeing the python on his shoulders",
      ),
      photo(
        "python-temple-cap-smile",
        "A guest in a cap smiling with a python hanging around his neck",
      ),
      photo(
        "python-temple-woman",
        "A guest in a headwrap looking down at the python in her hands",
      ),
      photo(
        "python-temple-glance",
        "A guest glancing sideways at the python across his shoulders",
      ),
    ],
    highlights: [],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Enter the temple",
        detail:
          "Walk into Ouidah's Temple of Pythons, facing the Basilica across the square.",
      },
      {
        title: "Hear the story",
        detail:
          "Why the python is sacred here, and why nobody in Ouidah would ever harm one.",
      },
      {
        title: "Wear the python",
        detail:
          "A keeper lays one across your shoulders. Breathe, smile, get the photo.",
      },
    ],
    vibe: "Dare",
    coordinates: { lat: 6.3633, lng: 2.0857 },
    tags: ["culture", "experience"],
    featuredRank: 1,
  },
  {
    slug: "ganvie-town-on-water",
    title: "Visit Ganvié, the town built on stilts in the middle of a lake",
    tagline:
      "No roads, no cars. Homes, a market and schools, all standing on stilts in Lake Nokoué.",
    summary:
      "Ganvié, the Venice of Africa, is a whole town living on Lake Nokoué. You cross by pirogue, weave between the stilt houses and the floating market, and see a way of life where the street is water.",
    destination: "Ganvié, Lake Nokoué",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Easy",
    startsFrom: "Abomey-Calavi",
    cover: photo(
      "ganvie-pirogue-stilt-houses",
      "A traveller relaxing in a pirogue as it glides past the stilt houses of Ganvié",
    ),
    gallery: [
      photo(
        "ganvie-pirogue-portrait",
        "A traveller blowing a kiss from the bow of a pirogue among Ganvié's stilt homes",
      ),
      photo(
        "ganvie-auberge-group",
        "A MrUSB group outside the Auberge Chez M in Ganvié",
      ),
      photo(
        "guest-ganvie-boats",
        "A traveller seated on a pirogue among the stilt homes of Ganvié on Lake Nokoué",
      ),
      photo(
        "lake-nokoue-aerial",
        "Aerial view of the channels, reed banks and boat landing of Lake Nokoué",
      ),
    ],
    highlights: [],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Board a pirogue",
        detail:
          "Push off from the Abomey-Calavi landing and glide out across Lake Nokoué.",
      },
      {
        title: "Enter the town on water",
        detail:
          "Weave between stilt houses, the floating market and the fishermen's acadja fish farms.",
      },
      {
        title: "Glide back to shore",
        detail: "With photos nobody back home will believe.",
      },
    ],
    vibe: "Bucket list",
    coordinates: { lat: 6.4667, lng: 2.4167 },
    tags: ["water", "culture", "experience"],
    featuredRank: 2,
  },
  {
    slug: "jetski-and-aqua-escape",
    title: "Jetski and Aqua Escape",
    tagline:
      "Full throttle on a jet ski, then slide, swim and play all day, with lunch by the water.",
    summary:
      "A whole day on the water at Aguégué: ride a jet ski, cruise through the mangroves by boat, swim, pedal a Hydro-Keke, roll across the water in a HydroBall, paddle a canoe and hit the waterslide, then eat at the waterfront restaurant.",
    destination: "Aguégué mangroves",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Moderate",
    startsFrom: "Aguégué",
    cover: photo(
      "jet-ski-couple",
      "Two travellers in life jackets on a red jet ski on the lake",
    ),
    gallery: [
      photo("jet-ski-lake", "A jet ski cutting across the open lake"),
      photo(
        "aqua-boat-mangroves",
        "A boat full of guests setting off through the mangroves, a jet ski behind",
      ),
      photo(
        "aqua-kayak-pair",
        "Two guests paddling a kayak together along the mangroves",
      ),
      photo(
        "aqua-kayak-portrait",
        "A guest sitting back in a yellow kayak, arms crossed, paddle across his lap",
      ),
      photo(
        "mangrove-splash",
        "A guest splashing beside a kayak in the mangroves",
      ),
      photo(
        "aqua-swim-splash-jump",
        "A guest bursting up out of the lake in a spray of water",
      ),
      photo(
        "aqua-swim-splash-friends",
        "Two friends splashing each other in the water by the mangroves",
      ),
      photo(
        "aqua-swim-inflatable",
        "Two guests relaxing in the water against a floating inflatable",
      ),
      photo("aqua-swim-wade", "A guest waist-deep in the lake, all smiles"),
      photo(
        "floating-water-park",
        "A guest at the top of the inflatable waterslide on the lake",
      ),
      photo(
        "aqua-slide-inflatables",
        "Guests laughing on the inflatables at the foot of the waterslide",
      ),
      photo(
        "aqua-trampoline-party",
        "A guest dancing on the floating trampoline while friends cheer",
      ),
      photo(
        "hydrobike-mangroves",
        "A guest pedalling a water bike along the mangroves",
      ),
      photo(
        "aqua-hydrokeke-lake",
        "Two guests pedalling a water bike out on the open lake",
      ),
      photo(
        "hydrokeke-guest",
        "A guest smiling at a table in the waterfront restaurant",
      ),
    ],
    highlights: [
      "Jetski",
      "Boat cruise",
      "Swimming",
      "Hydro-Keke",
      "HydroBall",
      "Canoeing",
      "Waterslide",
      "Waterfront restaurant",
    ],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Open the throttle",
        detail: "Life jacket on, then a jet ski and a boat cruise.",
      },
      {
        title: "Play on the water",
        detail:
          "Swim, ride a Hydro-Keke or a HydroBall, paddle a canoe, take the slide.",
      },
      {
        title: "Eat by the water",
        detail: "Finish at the waterfront restaurant.",
      },
    ],
    vibe: "Thrill",
    coordinates: { lat: 6.5167, lng: 2.5167 },
    tags: ["water", "adventure", "experience"],
    featuredRank: 3,
  },
  {
    slug: "sip-and-paint-beach",
    title: "Sip & paint on the beach as the sun goes down",
    tagline:
      "A canvas, a brush, a cold coconut, and the Atlantic turning gold behind you.",
    summary:
      "Our day event on the Cotonou coast: easels under a beach paillote, a resident artist walking you through your piece, fresh coconuts and grilled food, and a finished canvas to carry home. No experience needed, and nobody has ever left with a blank one.",
    destination: "Cotonou beachfront",
    country: "Benin Republic",
    durationDays: 1,
    groupSize: { min: 6, max: 40 },
    difficulty: "Easy",
    priceFCFA: 25000,
    startsFrom: "Cotonou",
    cover: photo(
      "sip-paint-easels-line",
      "Guests painting side by side at easels during a MrUSB Sip & Paint on the Cotonou coast",
    ),
    gallery: [
      photo(
        "sip-paint-beach-setup",
        "Easels and long tables set up under a thatched beach paillote before the Sip & Paint begins",
      ),
      photo(
        "sip-paint-artist-pink",
        "A guest in a floral cap painting a figure among palm fronds at her easel",
      ),
      photo(
        "sip-paint-focused-painter",
        "A young man leaning into his canvas, brush in hand, at the beach paillote",
      ),
      photo(
        "sip-paint-couple-canvas",
        "A line-drawn portrait of a couple taking shape on a canvas beside a vase of flowers",
      ),
      photo(
        "sip-paint-coconut-friends",
        "Two guests sipping fresh coconuts on the sand between painting sessions",
      ),
      photo(
        "sip-paint-frames-artwork-duo",
        "Two guests holding up their finished paintings inside the MrUSB photo frames",
      ),
      photo(
        "sip-paint-guest-laugh",
        "A guest laughing mid-brushstroke, henna on her hands, at the Sip & Paint",
      ),
      photo(
        "sip-paint-host-cheer",
        "A MrUSB host in a branded tee cheering under the paillote roof",
      ),
      photo(
        "sip-paint-friends-easel",
        "Two friends in sunglasses laughing behind their blank canvases at the Sip & Paint",
      ),
      photo(
        "sip-paint-brush-portrait",
        "A guest with burgundy locs turning from her easel, brush in hand",
      ),
      photo(
        "sip-paint-hat-portrait-canvas",
        "A guest painting a portrait in blue and yellow, complete with a wide-brimmed hat",
      ),
      photo(
        "sip-paint-guest-canvas",
        "A guest beside her canvas of a figure in a wide yellow hat",
      ),
      photo(
        "sip-paint-coconut-full-length",
        "A guest walking the sand with her coconut between painting sessions",
      ),
      photo(
        "sip-paint-frames-sunset-canvas",
        "Two guests presenting their paintings, a portrait and a palm-tree sunset, on the beach",
      ),
      photo(
        "sip-paint-frame-peace-duo",
        "Two guests throwing peace signs inside a MrUSB photo frame on the sand",
      ),
      photo(
        "sip-paint-table-row",
        "Guests seated in a row along the paillote tables, painting in the afternoon light",
      ),
      photo(
        "sip-paint-canvas-sketch",
        "A canvas sketched with a sun, a palm tree and a camper van waiting to be painted",
      ),
      photo(
        "sip-paint-blue-headwrap-canvas",
        "A finished canvas of a woman in a blue headwrap beside a vase of red flowers",
      ),
      photo(
        "sip-paint-orange-smile",
        "A guest in orange smiling over her shoulder with a paintbrush raised",
      ),
      photo(
        "sip-paint-coconut-locs",
        "A guest holding out a fresh coconut in front of the beach huts",
      ),
      photo(
        "sip-paint-coconut-orange",
        "A guest in an orange batik dress with a fresh coconut on the beach",
      ),
      photo(
        "sip-paint-frame-lola-canvas",
        "A guest in an orange halter top holding her colourful portrait inside the MrUSB photo frame",
      ),
      photo(
        "sip-paint-frame-abstract-canvas",
        "A guest grinning inside the MrUSB photo frame with his bold abstract painting",
      ),
      photo(
        "sip-paint-frame-pink-gown-canvas",
        "A guest smiling inside the MrUSB photo frame beside her painting of a woman in a pink gown",
      ),
      photo(
        "sip-paint-frames-kilma-duo",
        "Two guests posing in photo frames on the sand, each holding up her painting",
      ),
      photo(
        "sip-paint-frame-purple-duo",
        "Two friends throwing a peace sign inside the MrUSB photo frame on the beach",
      ),
      photo(
        "sip-paint-frames-friends",
        "Friends holding photo frames and the colourful canvases they painted",
      ),
    ],
    highlights: [],
    included: [
      "All art materials and a canvas per guest",
      "Artist-led session and guidance throughout",
      "Welcome drink and a fresh coconut",
      "Beach venue access for the day",
      "Event photography by the MrUSB team",
    ],
    notIncluded: [
      "Transport to the venue (can be arranged)",
      "Additional food and drinks",
    ],
    itinerary: [],
    steps: [
      {
        title: "Grab a coconut",
        detail:
          "Settle in under the beach paillote with a cold drink and a fresh coconut.",
      },
      {
        title: "Paint with an artist",
        detail:
          "A resident artist guides you stroke by stroke. Zero experience needed.",
      },
      {
        title: "Keep your canvas",
        detail:
          "Pose with your finished piece as the sun goes down, then take it home.",
      },
    ],
    vibe: "Chill",
    coordinates: { lat: 6.3419, lng: 2.4437 },
    tags: ["creative", "beach", "experience"],
    featuredRank: 4,
  },
  {
    slug: "door-of-no-return-ouidah",
    title: "Walk the Slave Route to Ouidah's Door of No Return",
    tagline:
      "Four kilometres from the auction square to the Atlantic: the last road more than a million captives were forced to walk.",
    summary:
      "Ouidah was one of the busiest slave ports on the Atlantic coast. Walk the route captives took from the town to the beach, past the Tree of Forgetting, and stand beneath the Door of No Return where it meets the ocean.",
    destination: "Ouidah",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Easy",
    startsFrom: "Ouidah",
    cover: photo(
      "door-of-no-return-arch",
      "The Door of No Return arch standing on the beach at Ouidah, the Atlantic beyond",
    ),
    gallery: [
      photo(
        "door-of-no-return-group",
        "MrUSB travellers beneath the Door of No Return, facing the ocean",
      ),
    ],
    highlights: [],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Start at the auction square",
        detail: "Begin where captives were sold, in the heart of old Ouidah.",
      },
      {
        title: "Walk the route",
        detail:
          "Pass the Tree of Forgetting and the memorials that line the road to the sea.",
      },
      {
        title: "Stand at the Door",
        detail:
          "Reach the Door of No Return on the beach and take a moment at the water's edge.",
      },
    ],
    vibe: "Heritage",
    coordinates: { lat: 6.3243, lng: 2.0891 },
    tags: ["heritage", "culture", "experience"],
    featuredRank: 5,
  },
  {
    slug: "tropical-adventures",
    title: "Tropical Adventures",
    tagline:
      "Cruise, paddle, swim, gallop and ride the sand, then watch the sun go down over the Atlantic.",
    summary:
      "A full day of tropical fun on the water and the sand: a boat cruise, kayaking and canoeing, a swim, horse riding and quad bikes, and a beach sunset to finish.",
    destination: "Lagoon & beach, near Cotonou",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Moderate",
    startsFrom: "Cotonou",
    cover: photo(
      "tropical-kayak-waterbike",
      "Two guests out on the lagoon, one in a kayak with paddle raised and one on a water bike, with a jet ski behind",
    ),
    gallery: [
      photo(
        "tropical-swim-splash",
        "Three guests splashing each other in the water beside the mangroves",
      ),
      photo(
        "lake-swim-couple",
        "A couple laughing together, waist-deep in the lagoon",
      ),
      photo(
        "tropical-pirogue-joy",
        "A guest throwing her arms up in the bow of a wooden canoe",
      ),
      photo(
        "quad-bike-fidjrosse",
        "A traveller waving from a quad bike on the sand at Fidjrossè Beach",
      ),
      photo(
        "quad-bike-fidjrosse-ride",
        "A traveller riding a quad bike across the sand at Fidjrossè Beach",
      ),
    ],
    highlights: [
      "Boat cruise",
      "Kayak",
      "Canoe",
      "Swimming",
      "Horse riding",
      "Quad bike",
      "Beach sunset",
    ],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Hit the water",
        detail: "A boat cruise, then kayak, canoe or swim.",
      },
      {
        title: "Ride the sand",
        detail: "Saddle up on a horse, then take a quad bike along the shore.",
      },
      {
        title: "Catch the sunset",
        detail: "Finish on the beach as the sun goes down.",
      },
    ],
    vibe: "Adventure",
    coordinates: { lat: 6.3441, lng: 2.3997 },
    tags: ["beach", "adventure", "experience"],
    featuredRank: 6,
  },
  {
    slug: "gogotinkpon-mud-bath",
    title: "Experience a therapeutic clay mud bath at Gogotinkpon",
    tagline:
      "Coat yourself head to toe in natural clay, let the sun bake it on, rinse, and glow.",
    summary:
      "Gogotinkpon is a quiet village on the shore of Lake Ahémé, well off the usual tourist trail. Its natural clay bath is the whole point: get covered, dry in the sun, wash it off, and feel it on your skin.",
    destination: "Gogotinkpon, Lake Ahémé",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Easy",
    startsFrom: "Gogotinkpon",
    cover: photo(
      "gogotinkpon-clay-couple-bridge",
      "Two guests covered head to toe in clay, posing on Gogotinkpon's rope bridge",
    ),
    gallery: [
      photo(
        "gogotinkpon-boat-arrival",
        "A boat full of guests crossing the water to Gogotinkpon",
      ),
      photo(
        "gogotinkpon-clay-bridge",
        "A guest covered head to toe in clay, posing on Gogotinkpon's rope bridge",
      ),
      photo(
        "gogotinkpon-clay-crew-bridge",
        "A group of guests coated in clay, smiling together on the rope bridge",
      ),
      photo(
        "gogotinkpon-clay-applied",
        "A guest being coated in natural clay at Gogotinkpon",
      ),
      photo(
        "gogotinkpon-clay-group",
        "Guests sitting in the sun on the deck, covered in drying clay",
      ),
      photo(
        "gogotinkpon-sign-coconut",
        "A guest with a fresh coconut beneath the Gogotinkpon sign by the water",
      ),
      photo(
        "gogotinkpon-net-hammock",
        "A guest relaxing in a net hammock over the water at Gogotinkpon",
      ),
      photo(
        "gogotinkpon-lake-swim-aerial",
        "Aerial view of guests swimming in the lake beside Gogotinkpon's deck",
      ),
    ],
    highlights: [],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Arrive at the lake",
        detail: "A quiet village on Lake Ahémé, far from the tourist crowds.",
      },
      {
        title: "Get muddy",
        detail:
          "Cover yourself head to toe in natural clay and let the sun do its work.",
      },
      {
        title: "Rinse and glow",
        detail: "Wash it off and feel the difference on your skin.",
      },
    ],
    vibe: "Wellness",
    coordinates: { lat: 6.3826, lng: 1.9466 },
    tags: ["wellness", "nature", "experience"],
    featuredRank: 7,
  },
  {
    slug: "graffiti-wall-cotonou",
    title: "Walk Africa's longest graffiti wall: 940 metres of art in Cotonou",
    tagline:
      "Kings, Amazon warriors and the legends of Dahomey, painted along almost a kilometre of city wall.",
    summary:
      "The Mur du Patrimoine in Cotonou's Dota district is the longest graffiti mural in Africa: 940 metres of street art telling the story of the Dahomey kingdom. Walk it end to end and find your favourite panel.",
    destination: "Mur du Patrimoine, Cotonou",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Easy",
    startsFrom: "Cotonou",
    cover: photo(
      "graffiti-wall-couple",
      "A couple posing in front of a vivid mural on Cotonou's graffiti wall",
    ),
    gallery: [],
    highlights: [],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Meet in Dota",
        detail: "Start at one end of the Mur du Patrimoine in central Cotonou.",
      },
      {
        title: "Walk the story",
        detail:
          "Almost a kilometre of murals: kings, Amazon warriors and scenes from Dahomey's history.",
      },
      {
        title: "Strike a pose",
        detail:
          "Pick your favourite panel for the photo. Every metre is a backdrop.",
      },
    ],
    vibe: "Street art",
    coordinates: { lat: 6.366, lng: 2.43 },
    tags: ["city", "creative", "experience"],
    featuredRank: 8,
  },
  {
    slug: "black-river-adjarra",
    title: "Glide by pirogue down the Black River of Adjarra",
    tagline:
      "Ink-dark water under a canopy of trees, on a river local communities hold sacred.",
    summary:
      "Just outside Porto-Novo, the Rivière Noire runs so dark beneath its trees that the water looks like ink. Drift down it by pirogue through mangroves and birdsong, on a river the communities along its banks consider sacred.",
    destination: "Adjarra, near Porto-Novo",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Easy",
    startsFrom: "Adjarra",
    cover: photo(
      "black-river-pirogue-boatman",
      "A boatman poling a pirogue of guests down the Black River of Adjarra, under the palms",
    ),
    gallery: [
      photo(
        "black-river-pirogue-friends",
        "Two friends in matching yellow dresses in a pirogue on the Black River of Adjarra",
      ),
      photo(
        "black-river-pirogue-selfie",
        "Two travellers smiling in a pirogue among the palms on the Black River",
      ),
    ],
    highlights: [],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Board a pirogue",
        detail:
          "Push off onto the Black River in Adjarra, just outside Porto-Novo.",
      },
      {
        title: "Drift under the canopy",
        detail:
          "Watch the water turn ink-black beneath the trees, and listen for the birds.",
      },
      {
        title: "Learn why it's sacred",
        detail:
          "Your guide explains what the river means to the communities who live along it.",
      },
    ],
    vibe: "Mystic",
    coordinates: { lat: 6.5424, lng: 2.6711 },
    tags: ["nature", "water", "experience"],
    featuredRank: 9,
  },
  {
    slug: "ganhi-market-cotonou",
    title: "Shop for groceries like a local at Cotonou's modern Ganhi Market",
    tagline:
      "Fresh produce, spices and everyday finds, with a local who knows the real prices.",
    summary:
      "Marché Ganhi is central Cotonou's modern market. Shop it with someone who lives here: what to buy, where to find it, and what it should cost.",
    destination: "Marché Ganhi, Cotonou",
    country: "Benin Republic",
    durationDays: 1,
    difficulty: "Easy",
    startsFrom: "Cotonou",
    cover: photo(
      "marche-ganhi-cotonou",
      "A guest striking a pose at the entrance to Marché Ganhi in Cotonou",
    ),
    gallery: [],
    highlights: [],
    included: [GUIDE],
    notIncluded: [],
    itinerary: [],
    steps: [
      {
        title: "Meet at Ganhi",
        detail:
          "Your guide meets you at Marché Ganhi in the centre of Cotonou.",
      },
      {
        title: "Shop with a local",
        detail:
          "Fill your basket with fresh produce and spices, with someone who knows the right price.",
      },
      {
        title: "Leave a regular",
        detail:
          "Head home stocked up, and ready to shop here on your own next time.",
      },
    ],
    vibe: "Local",
    coordinates: { lat: 6.357, lng: 2.433 },
    tags: ["city", "food", "experience"],
    featuredRank: 10,
  },
];
