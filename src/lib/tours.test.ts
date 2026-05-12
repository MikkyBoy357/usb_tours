import { describe, expect, it } from "vitest";
import { getFeaturedTours, getRelatedTours, getTour, tours } from "./tours";

describe("tours data", () => {
  it("every tour has a unique slug", () => {
    const slugs = tours.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every tour has at least one highlight, one included item, and a non-empty itinerary", () => {
    for (const t of tours) {
      expect(t.highlights.length).toBeGreaterThan(0);
      expect(t.included.length).toBeGreaterThan(0);
      expect(t.itinerary.length).toBeGreaterThan(0);
    }
  });

  it("itinerary day numbers match durationDays", () => {
    for (const t of tours) {
      expect(t.itinerary.length).toBe(t.durationDays);
      expect(t.itinerary.map((d) => d.day)).toEqual(
        Array.from({ length: t.durationDays }, (_, i) => i + 1),
      );
    }
  });
});

describe("getTour", () => {
  it("returns the matching tour", () => {
    expect(getTour("pendjari-safari")?.slug).toBe("pendjari-safari");
  });
  it("returns undefined for unknown slug", () => {
    expect(getTour("does-not-exist")).toBeUndefined();
  });
});

describe("getFeaturedTours", () => {
  it("returns only featured tours", () => {
    const featured = getFeaturedTours();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((t) => t.featured)).toBe(true);
  });
});

describe("getRelatedTours", () => {
  it("excludes the source tour", () => {
    const related = getRelatedTours("pendjari-safari", 3);
    expect(related.find((t) => t.slug === "pendjari-safari")).toBeUndefined();
  });

  it("returns exactly n tours when enough exist", () => {
    expect(getRelatedTours("pendjari-safari", 3).length).toBe(3);
  });

  it("prefers tours that share tags with the source", () => {
    // pendjari-safari has tags: safari, wildlife, nature.
    // grand-tour shares "nature" via signature/comprehensive — actually no overlap,
    // but ouidah/abomey share no tags. Make sure at least one related shares a tag when possible.
    const source = getTour("ganvie-stilt-village");
    expect(source).toBeDefined();
    const related = getRelatedTours("ganvie-stilt-village", 3);
    const sourceTags = new Set(source?.tags ?? []);
    const haveOverlap = related.filter((t) =>
      t.tags.some((tag) => sourceTags.has(tag)),
    );
    expect(haveOverlap.length).toBeGreaterThan(0);
  });
});
