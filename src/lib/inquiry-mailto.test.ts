import { describe, expect, it } from "vitest";
import {
  buildInquiryBody,
  buildInquiryMailto,
  buildInquirySubject,
} from "./inquiry-mailto";
import type { InquiryInput } from "./inquiry-schema";
import { siteConfig } from "./site";

const base: InquiryInput = {
  name: "Jane Traveler",
  email: "jane@example.com",
  message: "I'd like to bring four people in November.",
};

describe("buildInquirySubject", () => {
  it("names the traveler", () => {
    expect(buildInquirySubject(base)).toBe("Trip inquiry — Jane Traveler");
  });
  it("appends the tour title when one is chosen", () => {
    expect(
      buildInquirySubject({ ...base, tourSlug: "basic-cotonou-tour" }),
    ).toBe("Trip inquiry — Jane Traveler · Basic Package: The Cotonou Tour");
  });
  it("ignores an unknown slug rather than printing it raw", () => {
    expect(buildInquirySubject({ ...base, tourSlug: "nope" })).toBe(
      "Trip inquiry — Jane Traveler",
    );
  });
});

describe("buildInquiryBody", () => {
  it("includes every supplied field", () => {
    const body = buildInquiryBody({
      ...base,
      phone: "+229 01 00 00 00 00",
      travelDate: "November 2026",
      groupSize: 4,
      tourSlug: "basic-cotonou-tour",
    });
    expect(body).toContain("Name: Jane Traveler");
    expect(body).toContain("Phone: +229 01 00 00 00 00");
    expect(body).toContain("Group size: 4");
    expect(body).toContain("Preferred tour: Basic Package: The Cotonou Tour");
    expect(body).toContain(base.message);
  });

  it("omits optional fields that were left blank", () => {
    const body = buildInquiryBody(base);
    expect(body).not.toContain("Phone:");
    expect(body).not.toContain("Group size:");
    expect(body).not.toContain("Preferred tour:");
  });
});

describe("buildInquiryMailto", () => {
  it("addresses the site's contact inbox", () => {
    expect(buildInquiryMailto(base)).toMatch(
      new RegExp(`^mailto:${siteConfig.contact.email}\\?`),
    );
  });

  it("encodes the subject and body as query params", () => {
    const url = buildInquiryMailto(base);
    expect(url).toContain("?subject=");
    expect(url).toContain("&body=");
    expect(decodeURIComponent(url)).toContain(base.message);
  });

  it("truncates an over-long message instead of letting a client cut it", () => {
    const url = buildInquiryMailto({ ...base, message: "x".repeat(5000) });
    expect(url.length).toBeLessThanOrEqual(1800);
    expect(decodeURIComponent(url)).toContain("continued");
  });

  it("keeps a short message completely intact", () => {
    const url = buildInquiryMailto(base);
    expect(decodeURIComponent(url)).not.toContain("continued");
  });
});
