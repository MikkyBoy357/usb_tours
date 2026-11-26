import { describe, expect, it } from "vitest";
import { getFeaturedTours, getRelatedTours, getTour, tours } from "./tours";

describe("tours data", () => {
  it("every tour has a unique slug", () => {
    const slugs = tours.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every tour says what's included", () => {
    for (const t of tours) {
      expect(t.included.length).toBeGreaterThan(0);
    }
  });

  it("every package has highlights and a day for each day of its itinerary", () => {
    for (const t of tours.filter((t) => !t.steps)) {
      expect(t.highlights.length).toBeGreaterThan(0);
      expect(t.itinerary.length).toBe(t.durationDays);
      expect(t.itinerary.map((d) => d.day)).toEqual(
        Array.from({ length: t.durationDays }, (_, i) => i + 1),
      );
    }
  });

  it("every experience is a single day told in two to four steps", () => {
    const experiences = tours.filter((t) => t.steps);
    expect(experiences.length).toBeGreaterThan(0);
    for (const t of experiences) {
      expect(t.durationDays).toBe(1);
      expect(t.steps?.length).toBeGreaterThanOrEqual(2);
      expect(t.steps?.length).toBeLessThanOrEqual(4);
      expect(t.itinerary).toEqual([]);
    }
  });

  it("every tour shows a real photo or a stand-in tone, never neither", () => {
    for (const t of tours) {
      expect(Boolean(t.cover) || Boolean(t.coverTone)).toBe(true);
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
  it("returns only ranked tours, in rank order", () => {
    const featured = getFeaturedTours();
    expect(featured.length).toBeGreaterThan(0);
    const ranks = featured.map((t) => t.featuredRank);
    expect(ranks.every((r) => r !== undefined)).toBe(true);
    expect(ranks).toEqual([...ranks].sort((a, b) => (a ?? 0) - (b ?? 0)));
  });

  it("gives every featured tour a distinct rank", () => {
    const ranks = getFeaturedTours().map((t) => t.featuredRank);
    expect(new Set(ranks).size).toBe(ranks.length);
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
