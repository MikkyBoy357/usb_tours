import type { InquiryInput } from "@/lib/inquiry-schema";
import { siteConfig } from "@/lib/site";
import { tours } from "@/lib/tours";

// The site has no mail backend, so an inquiry is handed off to the traveler's
// own mail client with everything pre-filled. They press send; the message
// arrives from their real address, so replying to it just works.

// Mail clients and browsers truncate very long mailto: URLs rather than
// erroring, which would silently cut the message in half. Stay well under the
// most conservative limit and trim the free-text field ourselves instead.
const MAX_URL_LENGTH = 1800;
const TRUNCATION_NOTE = "\r\n\r\n[…continued — ask me for the rest!]";

function line(label: string, value?: string | number | null) {
  return value === undefined || value === null || value === ""
    ? null
    : `${label}: ${value}`;
}

export function buildInquirySubject(d: InquiryInput): string {
  const tourTitle = d.tourSlug
    ? tours.find((t) => t.slug === d.tourSlug)?.title
    : undefined;
  return tourTitle
    ? `Trip inquiry — ${d.name} · ${tourTitle}`
    : `Trip inquiry — ${d.name}`;
}

export function buildInquiryBody(d: InquiryInput, message = d.message): string {
  const tourTitle = d.tourSlug
    ? tours.find((t) => t.slug === d.tourSlug)?.title
    : undefined;
  return [
    `Hi ${siteConfig.name},`,
    "",
    "I'd like to enquire about a trip. Here are my details:",
    "",
    line("Name", d.name),
    line("Email", d.email),
    line("Phone", d.phone),
    line("Preferred tour", tourTitle),
    line("Approx. travel date", d.travelDate),
    line("Group size", d.groupSize),
    "",
    "About the trip I have in mind:",
    message,
    "",
    "—",
    `Sent from ${siteConfig.url}`,
  ]
    .filter((l) => l !== null)
    .join("\r\n");
}

export function buildInquiryMailto(d: InquiryInput): string {
  const to = siteConfig.contact.email;
  const subject = encodeURIComponent(buildInquirySubject(d));

  const build = (message: string) =>
    `mailto:${to}?subject=${subject}&body=${encodeURIComponent(
      buildInquiryBody(d, message),
    )}`;

  const full = build(d.message);
  if (full.length <= MAX_URL_LENGTH) return full;

  // Binary-search the longest message that still fits, so we trim as little as
  // possible rather than guessing at a character budget.
  let lo = 0;
  let hi = d.message.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (
      build(d.message.slice(0, mid) + TRUNCATION_NOTE).length <= MAX_URL_LENGTH
    )
      lo = mid;
    else hi = mid - 1;
  }
  return build(d.message.slice(0, lo) + TRUNCATION_NOTE);
}

export function buildInquiryWhatsApp(d: InquiryInput): string {
  const text = encodeURIComponent(buildInquiryBody(d));
  return `${siteConfig.links.whatsapp}?text=${text}`;
}
