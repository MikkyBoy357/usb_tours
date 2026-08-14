import type { Metadata } from "next";

import { LegalProse, type LegalSection } from "@/components/site/legal-prose";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "How bookings, payments, cancellations, and responsibilities work when you travel with Tour with MrUSB.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "14 August 2026";

const sections: LegalSection[] = [
  {
    heading: "Booking a trip",
    paragraphs: [
      "An enquiry is not a booking. It starts a conversation. A trip is confirmed only once we have agreed the itinerary and dates with you in writing and the agreed payment has been received.",
      "We will confirm the full price, the payment schedule, and what that price covers in writing before you commit to anything. If a detail of your itinerary is still being arranged, we will say so rather than imply it is settled.",
    ],
  },
  {
    heading: "Prices and payment",
    paragraphs: [
      "All prices on this site are quoted in CFA francs (FCFA) per traveler unless stated otherwise on the package itself. Each tour page lists what is included and what is not — read both lists, as our day packages do not include accommodation or meals.",
      "Prices shown on the site are indicative and may change as costs move or as we tailor an itinerary to you. The price we confirm to you in writing at the time of booking is the one that applies to your trip.",
      "Third-party costs outside our control — park entry fees, fuel, ferry and boat charges — can shift between quotation and departure. Where that materially changes your price we will tell you before you travel, and you may cancel for a full refund if you do not accept the difference.",
    ],
  },
  {
    heading: "Changes and cancellations",
    paragraphs: [
      "If you cancel: full refund up to 60 days before departure; 50% refund between 30 and 60 days before; no refund within 30 days, except in the case of a documented medical emergency. We strongly recommend travel insurance.",
      "If we cancel: should we call off a departure for any reason within our control, you receive a full refund of everything you have paid us, or the option to move to another date.",
      "Some things are outside anyone's control — weather, civil unrest, road closures, border decisions, or the timing of a ceremony that is not ours to schedule. Where that forces a change we will offer the closest equivalent we can arrange, and we will be straight with you about what changed and why.",
    ],
  },
  {
    heading: "Cultural sites and ceremonies",
    paragraphs: [
      "Several places we visit are active places of worship and living cultural sites, not attractions. Access to Vodun ceremonies, sacred forests, and royal sites depends on the communities who hold them and can be restricted or withdrawn at short notice.",
      "You agree to follow your guide's instructions on where photography is permitted, what may be touched, and how to conduct yourself. Where a site charges its own photography or ceremony fee, your guide will tell you before you commit to it.",
    ],
  },
  {
    heading: "Your responsibilities",
    paragraphs: [
      "You are responsible for holding a valid passport and any visa required for Benin Republic, for meeting vaccination requirements in force at the time you travel, and for arranging your own travel insurance. We can advise, but we cannot obtain these for you.",
      "You must tell us at the time of booking about any medical condition, allergy, dietary requirement, or mobility need that affects your trip, so we can plan around it honestly or tell you if we cannot.",
      "We may end a traveler's participation without refund where their behaviour puts other travelers, our team, or our hosts at risk.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "We take responsibility for arranging the services described in your confirmed itinerary and for exercising reasonable care in choosing the partners who deliver them.",
      "We are not liable for loss, injury, or delay caused by events outside our reasonable control, nor for the independent acts of third-party suppliers, nor for losses covered by the travel insurance you are asked to hold. Nothing here limits any liability that cannot lawfully be limited.",
    ],
  },
  {
    heading: "Photography on tour",
    paragraphs: [
      "We photograph our departures, and images from them appear on this site and on our social channels. If you would rather not appear, tell your host at the start of the trip and we will keep you out of anything we publish.",
    ],
  },
  {
    heading: "Governing law and contact",
    paragraphs: [
      "These terms are governed by the law of the Republic of Benin.",
      `${siteConfig.name} operates from ${siteConfig.contact.address}. Questions about these terms can go to ${siteConfig.contact.email} or ${siteConfig.contact.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions."
        description="What you can expect from us, and what we need from you, when you travel with MrUSB."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
        image={{
          src: "/photos/benin-town-aerial.jpg",
          alt: "A Benin town from the air",
        }}
      />
      <LegalProse
        updated={UPDATED}
        intro={`These terms apply to trips booked with ${siteConfig.name}. They sit alongside the specific itinerary and price we confirm to you in writing, which takes precedence wherever the two differ.`}
        sections={sections}
      />
    </>
  );
}
