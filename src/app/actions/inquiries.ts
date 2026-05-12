"use server";

import { headers } from "next/headers";

import {
  type InquiryInput,
  type InquiryResult,
  inquirySchema,
} from "@/lib/inquiry-schema";
import { getResend } from "@/lib/integrations/resend";
import { getSupabaseAdmin } from "@/lib/integrations/supabase";
import { siteConfig } from "@/lib/site";
import { tours } from "@/lib/tours";

export async function submitInquiry(
  input: InquiryInput,
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof InquiryInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as keyof InquiryInput;
      if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const tourTitle = data.tourSlug
    ? tours.find((t) => t.slug === data.tourSlug)?.title
    : undefined;

  const h = await headers();
  const userAgent = h.get("user-agent") ?? null;
  const referer = h.get("referer") ?? null;

  // Persist to Supabase (best-effort — failure should not block the user).
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      tour_slug: data.tourSlug ?? null,
      travel_date: data.travelDate ?? null,
      group_size: data.groupSize ?? null,
      message: data.message,
      source: referer,
      user_agent: userAgent,
    });
    if (error)
      console.error("[inquiry] supabase insert failed:", error.message);
  } else {
    console.log("[inquiry] (no supabase configured) payload:", data);
  }

  // Notify the team via Resend (also best-effort).
  const resend = getResend();
  const to = process.env.RESEND_TO;
  const from = process.env.RESEND_FROM;
  if (resend && to && from) {
    try {
      await resend.emails.send({
        from,
        to: to.split(",").map((s) => s.trim()),
        replyTo: data.email,
        subject: `New inquiry — ${data.name}${tourTitle ? ` · ${tourTitle}` : ""}`,
        text: formatPlainText(data, { tourTitle, referer }),
        html: formatHtml(data, { tourTitle, referer }),
      });
    } catch (e) {
      console.error("[inquiry] resend send failed:", e);
    }
  }

  return { ok: true };
}

function formatPlainText(
  d: InquiryInput,
  meta: { tourTitle?: string; referer?: string | null },
) {
  return [
    `From: ${d.name} <${d.email}>`,
    d.phone ? `Phone: ${d.phone}` : null,
    meta.tourTitle ? `Tour: ${meta.tourTitle} (${d.tourSlug})` : null,
    d.travelDate ? `Travel date: ${d.travelDate}` : null,
    d.groupSize ? `Group size: ${d.groupSize}` : null,
    "",
    "Message:",
    d.message,
    "",
    meta.referer ? `Page: ${meta.referer}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatHtml(
  d: InquiryInput,
  meta: { tourTitle?: string; referer?: string | null },
) {
  const row = (k: string, v?: string | number | null) =>
    v
      ? `<tr><td style="padding:6px 12px 6px 0;color:#888">${k}</td><td style="padding:6px 0">${escapeHtml(String(v))}</td></tr>`
      : "";
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;line-height:1.5">
    <h2 style="margin:0 0 12px">New inquiry from ${escapeHtml(d.name)}</h2>
    <table style="border-collapse:collapse;font-size:14px">
      ${row("Email", d.email)}
      ${row("Phone", d.phone)}
      ${row("Tour", meta.tourTitle)}
      ${row("Travel date", d.travelDate)}
      ${row("Group size", d.groupSize)}
    </table>
    <h3 style="margin:20px 0 8px;font-size:14px;color:#888">Message</h3>
    <div style="white-space:pre-wrap;font-size:15px">${escapeHtml(d.message)}</div>
    ${meta.referer ? `<p style="margin-top:24px;font-size:12px;color:#888">From: ${escapeHtml(meta.referer)}</p>` : ""}
    <hr style="margin:24px 0;border:0;border-top:1px solid #eee" />
    <p style="font-size:12px;color:#888">${siteConfig.name}</p>
  </body></html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
