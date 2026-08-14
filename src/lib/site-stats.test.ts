import { describe, expect, it } from "vitest";
import { destinations } from "./destinations";
import { buildGalleryItems } from "./gallery-items";
import { getSiteStats } from "./site-stats";
import { testimonials } from "./testimonials";
import { tours } from "./tours";

// The homepage band previously advertised 14 tours and 6 countries against a
// catalogue of 11 tours in a single country. These lock every figure to the
// data it describes so it cannot drift again.
describe("getSiteStats", () => {
  const byLabel = (label: string) =>
    getSiteStats().find((s) => s.label === label);

  it("counts tours from the catalogue", () => {
    expect(byLabel("Tour packages")?.value).toBe(tours.length);
  });

  it("counts destinations from the catalogue", () => {
    expect(byLabel("Destinations")?.value).toBe(destinations.length);
  });

  it("counts photos from what the gallery actually renders", () => {
    expect(byLabel("Photos, all our own")?.value).toBe(
      buildGalleryItems().length,
    );
  });

  it("counts distinct countries rather than asserting a number", () => {
    const countries = new Set(tours.map((t) => t.country));
    expect(byLabel("Country, known deeply")?.value).toBe(countries.size);
  });

  it("claims no figure it cannot derive from site data", () => {
    const labels = getSiteStats().map((s) => s.label.toLowerCase());
    expect(labels.some((l) => l.includes("traveler"))).toBe(false);
    expect(labels.some((l) => l.includes("book again"))).toBe(false);
  });
});

describe("gallery items", () => {
  it("excludes package flyers, which are artwork not photography", () => {
    expect(
      buildGalleryItems().some((i) => i.src.startsWith("/tour_packages/")),
    ).toBe(false);
  });

  it("has no duplicate sources", () => {
    const srcs = buildGalleryItems().map((i) => i.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });
});

describe("testimonials", () => {
  it("holds only real, attributable reviews", () => {
    // Guards the review structured data: anything in this list is published as
    // schema.org Review markup under a named person.
    for (const t of testimonials) {
      expect(t.name.trim().length).toBeGreaterThan(0);
      expect(t.quote.trim().length).toBeGreaterThan(0);
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });
});
