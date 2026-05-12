import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please share your name."),
  email: z.string().email("That email doesn't look right."),
  phone: z.string().optional(),
  tourSlug: z.string().optional(),
  travelDate: z.string().optional(),
  groupSize: z.number().int().min(1).max(40).optional(),
  message: z.string().min(10, "A few sentences help us shape the trip."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<keyof InquiryInput, string>>;
    };
