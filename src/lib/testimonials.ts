export type Testimonial = {
  name: string;
  origin: string;
  tour: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

// Real traveler reviews only.
//
// This list was previously filled with invented people. Those quotes were also
// being emitted as schema.org Review + AggregateRating markup, which Google
// treats as review spam, so nothing goes in here that a real traveler did not
// actually say and agree to have published under their name.
//
// To add one, paste the quote and attribution below — the homepage carousel,
// the /testimonials page, and the review structured data all switch back on by
// themselves as soon as this array is non-empty:
//
//   {
//     name: "Full name, as they want it shown",
//     origin: "City, Country",
//     tour: "Which package they travelled on",
//     quote: "Their words, unedited.",
//     rating: 5,
//   },
export const testimonials: Testimonial[] = [];
