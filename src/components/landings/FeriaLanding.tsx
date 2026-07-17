"use client";

// QR PLACEMENT: feria stand signage / producer stand chalkboards.
// CAPTURES: which feria via ?utm_campaign=<feria-name-date> (or the dropdown
//           below when the param is missing), email via the newsletter API
//           tagged context "feria".
// FOLLOW-UP: feria-tagged subscribers should get a post-feria email within
//            48h — operational task for Red del Vino, not code.

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Bundle, Wine } from "@/lib/content";
import { BundleCard } from "@/components/bundles/BundleCard";
import { useT } from "@/components/i18n/LocaleProvider";

export function FeriaLanding({ feriaBundle }: { feriaBundle: Bundle | undefined; wines: Wine[] }) {
  const tr = useT();
  const params = useSearchParams();
  const campaign = params.get("utm_campaign") || "";
  const [feria, setFeria] = useState(campaign);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, context: "feria", detail: feria || campaign || "unknown" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="container-x py-16 md:py-24">
      {feriaBundle && (
        <div className="mx-auto max-w-md">
          <BundleCard bundle={feriaBundle} />
        </div>
      )}

      <div className="mx-auto mt-14 max-w-md border-t border-charcoal/10 pt-8">
        {state === "done" ? (
          <p className="text-center font-sans text-sm text-vine">{tr("form.thankYou")}</p>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            <label className="block">
              <span className="eyebrow text-charcoal/50">{tr("feria.which")}</span>
              <input
                value={feria}
                onChange={(e) => setFeria(e.target.value)}
                placeholder={tr("feria.namePlaceholder")}
                className="mt-2 w-full border-b border-charcoal/25 bg-transparent py-2.5 font-sans text-sm focus:border-oxblood focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-charcoal/50">{tr("form.email")}</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border-b border-charcoal/25 bg-transparent py-2.5 font-sans text-sm focus:border-oxblood focus:outline-none"
              />
            </label>
            <button type="submit" disabled={state === "loading"} className="btn-primary justify-self-start disabled:opacity-60">
              {tr("feria.keepPosted")}
            </button>
            {state === "error" && <p className="font-sans text-sm text-oxblood">{tr("form.error")}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
