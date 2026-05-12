export type FaqGroup = {
  group: string;
  items: { q: string; a: string }[];
};

export const faqs: FaqGroup[] = [
  {
    group: "Before you book",
    items: [
      {
        q: "Is Benin safe to visit?",
        a: "Yes. Benin is one of the most politically stable countries in West Africa, with a long democratic tradition and a strong tourism infrastructure. Standard travel sense applies: keep an eye on belongings in crowded markets, prefer registered transport, and follow your guide's lead in unfamiliar neighborhoods. We track regional advisories continuously and adjust routes if needed.",
      },
      {
        q: "Do I need a visa?",
        a: "Most travelers can apply for an e-Visa online at evisa.gouv.bj. Approval is typically issued in 48–72 hours. ECOWAS citizens enter visa-free. We send a checklist with the exact requirements once you book.",
      },
      {
        q: "What vaccinations do I need?",
        a: "Yellow fever is required (you'll be asked for your certificate at the border). Typhoid, Hepatitis A, and meningitis are recommended. Malaria is present year-round — bring antimalarials. We send a complete health briefing 6 weeks before departure.",
      },
      {
        q: "When's the best time to visit?",
        a: "November through February for the country as a whole — cool, dry, and parks are open. January 10 is the Voodoo Festival and one of the best weeks to be in Ouidah. The north (Pendjari) is only worth visiting in the dry season, roughly December through April.",
      },
    ],
  },
  {
    group: "On the trip",
    items: [
      {
        q: "How big are your groups?",
        a: "Maximum 10 travelers per departure. Most run smaller. Private departures are available for any of our tours.",
      },
      {
        q: "What's the accommodation like?",
        a: "Boutique hotels in cities, eco-lodges in the parks, and family-run guesthouses or homestays in villages where we want the cultural depth that hotels can't offer. Everywhere has private en-suite bathrooms unless we tell you otherwise in advance.",
      },
      {
        q: "Will I need to speak French?",
        a: "Not at all — every guide we work with is fully bilingual French/English. Knowing a few words of French is appreciated in shops and markets but never required.",
      },
      {
        q: "What about the food?",
        a: "Generous. Beninese cuisine leans on grilled fish, slow-cooked sauces, plantain, and rice — flavorful, mostly mild. We accommodate vegetarian, pescatarian, and most allergies; tell us when you book.",
      },
      {
        q: "Can I do a private or custom trip?",
        a: "Yes — most of what we run is custom-finished. Tell us how long you have, what you care about, and any constraints, and we'll build the trip around you. Custom trips start from US$250 / day / traveler.",
      },
    ],
  },
  {
    group: "Money & policy",
    items: [
      {
        q: "What's included in the price?",
        a: "Accommodation, all transport once you arrive, every entry fee, all meals on multi-day tours outside cities, and your guide. International flights and travel insurance are not included.",
      },
      {
        q: "What's your cancellation policy?",
        a: "Full refund up to 60 days before departure. 50% refund 30–60 days before. No refund within 30 days, except for documented medical emergencies. We strongly recommend travel insurance.",
      },
      {
        q: "Do I need to tip?",
        a: "Tipping is appreciated but not expected. If you'd like to tip your guide or driver, US$10–15 per day per traveler is generous. We pay our team above market regardless.",
      },
    ],
  },
];
