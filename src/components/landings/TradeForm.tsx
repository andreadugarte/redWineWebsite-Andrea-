"use client";

import { useState } from "react";
import { useT } from "@/components/i18n/LocaleProvider";

/**
 * B2B enquiry form. Posts to /api/contact with variant "trade" — the same
 * real mail delivery the contact page uses (no fake success states).
 * NOTE: wholesale/trade pricing is intentionally NOT displayed publicly;
 * it's for quoting directly to enquirers.
 */
export function TradeForm() {
  const tr = useT();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, variant: "trade" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="border border-vine/40 bg-vine/5 p-8 text-center">
        <p className="font-serif text-2xl">{tr("form.thankYou")}</p>
        <p className="mt-2 font-sans text-sm text-charcoal-soft">{tr("form.thankYouBody")}</p>
      </div>
    );

  const cls =
    "w-full border-b border-charcoal/25 bg-transparent py-2.5 font-sans text-sm focus:border-oxblood focus:outline-none";

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-charcoal/50">{tr("form.name")} *</span>
          <input name="name" required className={`mt-2 ${cls}`} />
        </label>
        <label className="block">
          <span className="eyebrow text-charcoal/50">{tr("form.email")} *</span>
          <input name="email" type="email" required className={`mt-2 ${cls}`} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-charcoal/50">{tr("trade.businessType")}</span>
          <input name="businessType" className={`mt-2 ${cls}`} />
        </label>
        <label className="block">
          <span className="eyebrow text-charcoal/50">{tr("trade.location")}</span>
          <input name="location" className={`mt-2 ${cls}`} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-charcoal/50">{tr("trade.volume")}</span>
          <input name="volume" className={`mt-2 ${cls}`} />
        </label>
        <label className="block">
          <span className="eyebrow text-charcoal/50">{tr("trade.interest")}</span>
          <input name="interest" className={`mt-2 ${cls}`} />
        </label>
      </div>
      <label className="block">
        <span className="eyebrow text-charcoal/50">{tr("form.message")}</span>
        <textarea name="message" rows={4} className={`mt-2 ${cls}`} />
      </label>
      <button type="submit" disabled={state === "loading"} className="btn-primary justify-self-start disabled:opacity-60">
        {state === "loading" ? tr("form.sending") : tr("trade.cta")}
      </button>
      {state === "error" && <p className="font-sans text-sm text-oxblood">{tr("form.error")}</p>}
    </form>
  );
}
