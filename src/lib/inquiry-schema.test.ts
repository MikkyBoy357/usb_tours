import { describe, expect, it } from "vitest";
import { inquirySchema } from "./inquiry-schema";

describe("inquirySchema", () => {
  const valid = {
    name: "Jane Traveler",
    email: "jane@example.com",
    message: "I would love to do the Ouidah trip in March.",
  };

  it("accepts the minimum valid payload", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects too-short names", () => {
    const r = inquirySchema.safeParse({ ...valid, name: "J" });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues[0].path).toEqual(["name"]);
    }
  });

  it("rejects invalid emails", () => {
    const r = inquirySchema.safeParse({ ...valid, email: "not-an-email" });
    expect(r.success).toBe(false);
  });

  it("rejects too-short messages", () => {
    const r = inquirySchema.safeParse({ ...valid, message: "hi" });
    expect(r.success).toBe(false);
  });

  it("accepts optional fields when present", () => {
    const r = inquirySchema.safeParse({
      ...valid,
      phone: "+22912345678",
      tourSlug: "pendjari-safari",
      travelDate: "November 2026",
      groupSize: 4,
    });
    expect(r.success).toBe(true);
  });

  it("clamps groupSize to integers 1–40", () => {
    expect(inquirySchema.safeParse({ ...valid, groupSize: 0 }).success).toBe(
      false,
    );
    expect(inquirySchema.safeParse({ ...valid, groupSize: 41 }).success).toBe(
      false,
    );
    expect(inquirySchema.safeParse({ ...valid, groupSize: 4.5 }).success).toBe(
      false,
    );
  });
});
