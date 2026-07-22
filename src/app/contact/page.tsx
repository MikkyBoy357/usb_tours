import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TourMap } from "@/components/tours/tour-map";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tour with MrUSB. We reply to every inquiry within 24 hours.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us instantly",
    href: siteConfig.links.whatsapp,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Office",
    value: siteConfig.contact.address,
    href: "https://www.openstreetmap.org/?mlat=6.3654&mlon=2.4183#map=12/6.3654/2.4183",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan something."
        description="Tell us about the trip you have in mind. We reply within 24 hours — and we don't share your details with anyone."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={{
          src: "/photos/amazon-statue-cotonou.jpg",
          alt: "The Amazon of Dahomey monument rising over Cotonou",
        }}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Reach us"
                title="Pick whatever's easiest."
                description="We're a small team. The same humans answer every channel."
              />
              <ul className="mt-10 space-y-1">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-muted"
                    >
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <c.icon className="size-5" strokeWidth={1.6} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {c.label}
                        </span>
                        <span className="font-medium transition-colors group-hover:text-accent">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <TourMap
                  lat={6.3654}
                  lng={2.4183}
                  label="Cotonou, Benin Republic"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <InquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
