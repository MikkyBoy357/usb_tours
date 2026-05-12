"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitInquiry } from "@/app/actions/inquiries";
import { Button } from "@/components/ui/button";
import { type InquiryInput, inquirySchema } from "@/lib/inquiry-schema";
import { tours } from "@/lib/tours";
import { cn } from "@/lib/utils";

type Props = {
  defaultTourSlug?: string;
  layout?: "stacked" | "card";
};

export function InquiryForm({ defaultTourSlug, layout = "card" }: Props) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [topError, setTopError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { tourSlug: defaultTourSlug },
  });

  function onSubmit(values: InquiryInput) {
    setTopError(null);
    startTransition(async () => {
      const res = await submitInquiry(values);
      if (res.ok) {
        setDone(true);
        return;
      }
      setTopError(res.error);
      if (res.fieldErrors) {
        for (const [k, msg] of Object.entries(res.fieldErrors)) {
          setError(k as keyof InquiryInput, { message: msg });
        }
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
        <h3 className="font-display text-2xl">Got it. Thank you.</h3>
        <p className="max-w-md text-pretty text-sm text-muted-foreground">
          We'll write back inside 24 hours with a draft itinerary tailored to
          what you've described.
        </p>
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

      {topError && (
        <p role="alert" className="text-sm text-destructive">
          {topError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We'll reply within 24 hours. No spam, ever.
        </p>
        <Button
          type="submit"
          disabled={pending}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send inquiry"
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
