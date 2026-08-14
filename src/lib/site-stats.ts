import { destinations } from "@/lib/destinations";
import { buildGalleryItems } from "@/lib/gallery-items";
import { tours } from "@/lib/tours";

export type SiteStat = { value: number; suffix?: string; label: string };

// Every figure here is counted from the site's own data, so the band can never
// claim something a visitor can disprove by scrolling. The previous version was
// hardcoded and had drifted badly — it advertised 14 tours against a catalogue
// of 11, and 6 countries against a catalogue that is entirely Benin Republic.
//
// Traveler counts and satisfaction rates are deliberately absent: they are real
// numbers only the owner has, and there is no honest way to derive them here.
export function getSiteStats(): SiteStat[] {
  const countries = new Set(tours.map((t) => t.country));

  return [
    { value: tours.length, label: "Tour packages" },
    { value: destinations.length, label: "Destinations" },
    { value: buildGalleryItems().length, label: "Photos, all our own" },
    { value: countries.size, label: "Country, known deeply" },
  ];
}
