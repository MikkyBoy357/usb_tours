import { describe, expect, it } from "vitest";
import { formatDuration, formatUSD } from "./format";

describe("formatUSD", () => {
  it("formats whole dollars with no decimals", () => {
    expect(formatUSD(720)).toBe("$720");
    expect(formatUSD(2850)).toBe("$2,850");
  });
  it("rounds fractional values", () => {
    expect(formatUSD(99.4)).toBe("$99");
    expect(formatUSD(99.6)).toBe("$100");
  });
});

describe("formatDuration", () => {
  it('pluralizes "days"', () => {
    expect(formatDuration(1)).toBe("1 day");
    expect(formatDuration(2)).toBe("2 days");
    expect(formatDuration(10)).toBe("10 days");
  });
});
