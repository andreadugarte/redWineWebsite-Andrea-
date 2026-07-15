"use client";

import { useState } from "react";
import { useT } from "@/components/i18n/LocaleProvider";

export function NewsletterForm() {
  const tr = useT();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return <p className="font-sans text-sm text-gold-pale">{tr("form.thankYou")}</p>;

  return (
    <form onSubmit={submit} className="flex border-b border-bone/40 focus-within:border-bone">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={tr("footer.emailPlaceholder")}
        className="flex-1 bg-transparent py-2 font-sans text-sm text-bone placeholder:text-bone/40 focus:outline-none"
      />
      <button type="submit" disabled={state === "loading"} className="font-sans text-xs uppercase tracking-[0.18em] text-gold-soft hover:text-bone disabled:opacity-50">
        {state === "loading" ? "…" : tr("footer.join")}
      </button>
    </form>
  );
}
