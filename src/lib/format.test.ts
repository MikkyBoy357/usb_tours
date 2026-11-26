import { describe, expect, it } from "vitest";
import { formatDuration, formatFCFA, formatPrice } from "./format";

describe("formatFCFA", () => {
  it("formats whole francs with no decimals", () => {
    expect(formatFCFA(70000)).toBe("70,000 FCFA");
    expect(formatFCFA(1710000)).toBe("1,710,000 FCFA");
  });
  it("rounds fractional values", () => {
    expect(formatFCFA(99.4)).toBe("99 FCFA");
    expect(formatFCFA(99.6)).toBe("100 FCFA");
  });
});

describe("formatDuration", () => {
  it('pluralizes "days"', () => {
    expect(formatDuration(1)).toBe("1 day");
    expect(formatDuration(2)).toBe("2 days");
    expect(formatDuration(10)).toBe("10 days");
  });
});

describe("formatPrice", () => {
  it("formats a set price", () => {
    expect(formatPrice(25000)).toBe("25,000 FCFA");
  });
  it("asks for the price when none is set", () => {
    expect(formatPrice(undefined)).toBe("Ask for price");
  });
});
