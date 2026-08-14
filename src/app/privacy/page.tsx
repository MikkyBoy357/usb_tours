import type { Metadata } from "next";

import { LegalProse, type LegalSection } from "@/components/site/legal-prose";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What we collect when you enquire about a trip, why we collect it, and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "14 August 2026";

const sections: LegalSection[] = [
  {
    heading: "What we collect",
    paragraphs: [
      "When you fill in an enquiry form on this site, we ask for your name, email address, and a description of the trip you have in mind. Phone number, preferred tour, approximate travel date, and group size are optional — you decide whether to give them.",
      "The enquiry form does not transmit anything on its own. It opens your own email app with the message pre-written, and you send it yourself. That means we only ever receive what you chose to send, from your own mail account, and nothing reaches us if you close the draft.",
      "If you contact us by WhatsApp, email, or phone instead, we hold whatever you send us in those conversations.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "We use your details for one purpose: to answer your enquiry and, if you decide to travel with us, to plan and run your trip. That can include sharing the details necessary for a booking with the hotels, guides, drivers, and park authorities involved in your specific itinerary.",
      "We do not sell your information, rent it, or share it with advertisers. We will not add you to a mailing list off the back of an enquiry.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Enquiries that do not turn into a booking are kept while the conversation is live and deleted once it is clearly over. Records tied to a trip that actually ran are kept for as long as we need them for accounting and insurance purposes.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "This site sets no advertising or tracking cookies, and runs no third-party analytics. Our host, Vercel, records standard server request logs for security and reliability.",
      "Some pages embed a map from a third party. Loading one means your browser contacts that provider directly, and their own privacy terms apply to that request.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      `You can ask us what we hold about you, ask for it to be corrected, or ask us to delete it. Write to ${siteConfig.contact.email} and we will act on it.`,
      "Because the enquiry form hands off to your own email client, you always have your own copy of exactly what you sent us.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `${siteConfig.name} operates from ${siteConfig.contact.address}. Questions about this policy can go to ${siteConfig.contact.email} or ${siteConfig.contact.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy."
        description="The short version: we collect what we need to plan your trip, and nothing else."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        image={{
          src: "/photos/lake-nokoue-aerial.jpg",
          alt: "Aerial view of the channels of Lake Nokoué",
        }}
      />
      <LegalProse
        updated={UPDATED}
        intro={`This policy covers ${siteConfig.url} and the enquiries that come to us through it. We have tried to write it in plain language rather than legal boilerplate.`}
        sections={sections}
      />
    </>
  );
}
