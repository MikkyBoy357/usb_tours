"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitInquiry } from "@/app/actions/inquiries";
import { Button } from "@/components/ui/button";
import { buildInquiryMailto, buildInquiryWhatsApp } from "@/lib/inquiry-mailto";
import { type InquiryInput, inquirySchema } from "@/lib/inquiry-schema";
import { siteConfig } from "@/lib/site";
import { tours } from "@/lib/tours";
import { cn } from "@/lib/utils";

type Props = {
  defaultTourSlug?: string;
  layout?: "stacked" | "card";
};

export function InquiryForm({ defaultTourSlug, layout = "card" }: Props) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState<{ mailto: string; whatsapp: string } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { tourSlug: defaultTourSlug },
  });

  function onSubmit(values: InquiryInput) {
    // Hand off to the mail client while we're still inside the click gesture —
    // browsers block protocol launches that happen after an await.
    const mailto = buildInquiryMailto(values);
    const whatsapp = buildInquiryWhatsApp(values);
    window.location.href = mailto;
    setDone({ mailto, whatsapp });

    // Best-effort server record. It only persists once Supabase/Resend are
    // configured, and it must never hold up or undo the handoff above.
    startTransition(async () => {
      try {
        await submitInquiry(values);
      } catch {
        // The traveler already has the message open; nothing to recover.
      }
    });
  }

  if (done) {
    return (
      // biome-ignore lint/a11y/useSemanticElements: <output> would alter form context; role="status" is correct for this confirmation panel
      <div
        className={cn(
          "flex flex-col items-center gap-3 rounded-3xl p-8 text-center",
          layout === "card" ? "border border-border bg-card" : "",
        )}
        role="status"
      >
        <CheckCircle2 className="size-10 text-accent" strokeWidth={1.4} />
        <h3 className="font-display text-2xl">One last step.</h3>
        <p className="max-w-md text-pretty text-sm text-muted-foreground">
          Your mail app should have opened with the message written and ready.
          Press send there and it reaches us — we'll reply within 24 hours.
        </p>
        <div className="mt-2 flex flex-col items-center gap-2">
          <a
            href={done.mailto}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Mail className="size-4" />
            Open my mail app again
          </a>
          <p className="text-xs text-muted-foreground">
            Nothing opened? Message us on{" "}
            <a
              href={done.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              WhatsApp
            </a>{" "}
            or write to{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        "space-y-5",
        layout === "card" &&
          "rounded-3xl border border-border bg-card p-6 sm:p-8",
      )}
      aria-busy={pending}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" id="iq-name" error={errors.name?.message}>
          <input
            id="iq-name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputStyles}
          />
        </Field>
        <Field label="Email" id="iq-email" error={errors.email?.message}>
          <input
            id="iq-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputStyles}
          />
        </Field>
        <Field
          label="Phone (optional)"
          id="iq-phone"
          error={errors.phone?.message}
        >
          <input
            id="iq-phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={inputStyles}
          />
        </Field>
        <Field
          label="Group size"
          id="iq-group"
          error={errors.groupSize?.message}
        >
          <input
            id="iq-group"
            type="number"
            min={1}
            max={40}
            {...register("groupSize", {
              setValueAs: (v) =>
                v === "" || v == null ? undefined : Number(v),
            })}
            className={inputStyles}
          />
        </Field>
        <Field
          label="Preferred tour (optional)"
          id="iq-tour"
          error={errors.tourSlug?.message}
        >
          <select
            id="iq-tour"
            {...register("tourSlug")}
            className={cn(inputStyles, "appearance-none")}
            defaultValue={defaultTourSlug ?? ""}
          >
            <option value="">No preference — open to ideas</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Approx. travel date"
          id="iq-date"
          error={errors.travelDate?.message}
        >
          <input
            id="iq-date"
            type="text"
            placeholder="e.g. November 2026"
            {...register("travelDate")}
            className={inputStyles}
          />
        </Field>
      </div>

      <Field
        label="Tell us about the trip you have in mind"
        id="iq-msg"
        error={errors.message?.message}
      >
        <textarea
          id="iq-msg"
          rows={5}
          {...register("message")}
          className={cn(inputStyles, "resize-y")}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs text-muted-foreground">
          Opens your mail app with everything filled in — you just press send.
          We reply within 24 hours.
        </p>
        <Button
          type="submit"
          disabled={pending}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Preparing…
            </>
          ) : (
            <>
              <Mail className="size-4" />
              Send inquiry
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

const inputStyles =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-accent/40";

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-foreground/80">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
