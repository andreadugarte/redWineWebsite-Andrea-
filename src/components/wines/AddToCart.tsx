"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useT } from "@/components/i18n/LocaleProvider";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";

export function AddToCart({ wine }: { wine: Wine }) {
  const { add, open } = useCart();
  const tr = useT();
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");
  const [notifyState, setNotifyState] = useState<"idle" | "loading" | "done" | "error">("idle");

  if (wine.stock === 0) {
    // Back-in-stock capture instead of a dead end (CRO: customer capture moment).
    if (notifyState === "done") {
      return <p className="font-sans text-sm text-vine">{tr("form.thankYou")}</p>;
    }
    return (
      <div>
        <div className="mb-4 inline-block border border-charcoal/25 bg-charcoal/5 px-6 py-3 font-sans text-sm uppercase tracking-[0.14em] text-charcoal/50">
          {tr("wines.soldOut")}
        </div>
        <form
          className="flex max-w-md gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setNotifyState("loading");
            try {
              const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, context: `restock:${wine.slug}` }),
              });
              setNotifyState(res.ok ? "done" : "error");
            } catch {
              setNotifyState("error");
            }
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={tr("form.email")}
            className="w-full border-b border-charcoal/25 bg-transparent py-2.5 font-sans text-sm focus:border-oxblood focus:outline-none"
          />
          <button type="submit" disabled={notifyState === "loading"} className="btn-primary whitespace-nowrap disabled:opacity-60">
            {tr("wine.notifyMe")}
          </button>
        </form>
        {notifyState === "error" && <p className="mt-2 font-sans text-sm text-oxblood">{tr("form.error")}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-stretch gap-4">
      <div className="flex items-center border border-charcoal/25">
        <button className="px-4 py-3 text-lg hover:text-oxblood" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
        <span className="w-10 text-center font-sans text-sm">{qty}</span>
        <button className="px-4 py-3 text-lg hover:text-oxblood" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
      </div>
      <button
        className="btn-primary flex-1 sm:flex-none"
        onClick={() => {
          add(
            {
              slug: wine.slug,
              name: wine.name,
              varietal: wine.varietal,
              price: wine.price,
              image: wine.image?.src || FALLBACK_IMAGE,
            },
            qty
          );
          open();
        }}
      >
        {tr("cart.addToCart")}
      </button>
    </div>
  );
}
