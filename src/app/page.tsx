import { CtaBand } from "@/components/home/cta-band";
import { Experiences } from "@/components/home/experiences";
import { ExploreBenin } from "@/components/home/explore-benin";
import { FeaturedTours } from "@/components/home/featured-tours";
import { Hero } from "@/components/home/hero";
import { JournalPreview } from "@/components/home/journal-preview";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { WhyUs } from "@/components/home/why-us";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <Hero />
      <Stats />
      <FeaturedTours />
      <WhyUs />
      <ExploreBenin />
      <Experiences />
      <Testimonials />
      <JournalPreview />
      <CtaBand />
    </>
  );
}
