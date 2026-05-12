"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({ email: z.string().email() });

type Props = { variant?: "light" | "dark" };

export function NewsletterForm({ variant = "light" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [_error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const parsed = schema.safeParse({ email: data.get("email") });
    if (!parsed.success) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    // Stub: wire to Resend/Supabase in Phase 4.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  }

  const dark = variant === "dark";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full max-w-md items-center gap-2 rounded-full border p-1.5",
        dark ? "border-white/15 bg-white/5" : "border-border bg-background",
      )}
      noValidate
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        autoComplete="email"
        className={cn(
          "flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-current/40",
          dark ? "text-white" : "text-foreground",
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Subscribe"
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-60",
        )}
      >
        {status === "ok" ? (
          <Check className="size-4" />
        ) : (
          <ArrowRight className="size-4" />
        )}
      </button>
    </form>
  );
}
