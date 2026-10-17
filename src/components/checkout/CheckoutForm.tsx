"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart, formatPrice } from "@/components/cart/CartProvider";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";
import { PaymentBadges } from "@/components/trust/PaymentBadges";
import { TrustStrip } from "@/components/trust/TrustStrip";

export function CheckoutForm({ flowConfigured }: { flowConfigured: boolean }) {
  const { items, subtotal, count, clear } = useCart();
  const tr = useT();
  const locale = useLocale();
  const [state, setState] = useState<"form" | "loading" | "done">("form");
  const [order, setOrder] = useState<{ orderId: string; simulated: boolean } | null>(null);

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const customer = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("loading");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, customer, locale }),
    });
    const data = await res.json();
    // Real Flow order: hand the browser off to Flow's payment page rather
    // than showing our own confirmation — Flow redirects back to /checkout/return.
    if (data.redirectUrl) {
      clear();
      window.location.href = data.redirectUrl;
      return;
    }
    setOrder(data);
    clear();
    setState("done");
  }

  if (state === "done" && order) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">{order.simulated ? "Test order (no payment)" : tr("checkout.confirmed")}</p>
          <h1 className="mt-4 font-serif text-display-md font-light">{order.simulated ? "Almost there." : tr("checkout.thanks")}</h1>
          <p className="mt-4 font-sans text-sm text-charcoal-soft">
            {order.simulated ? "Reference" : tr("checkout.yourOrder")} <span className="font-semibold">{order.orderId}</span>{order.simulated ? " — payments are not enabled yet, so nothing was charged and no order was placed." : ` ${tr("checkout.received")}`}
          </p>
          {order.simulated && (
            <p className="mx-auto mt-6 max-w-md border border-gold/40 bg-gold/5 px-6 py-4 font-sans text-xs leading-relaxed text-charcoal-soft">
              This was a <strong>simulated checkout</strong> — no payment was processed. Add your Flow keys in Vercel to enable live payments (see README).
            </p>
          )}
          <Link href={localizedPath("/wines", locale)} className="btn-primary mt-10">{tr("checkout.continue")}</Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <p className="font-serif text-2xl text-charcoal/50">{tr("checkout.empty")}</p>
        <Link href={localizedPath("/wines", locale)} className="btn-primary mt-6">{tr("cart.explore")}</Link>
      </div>
    );
  }

  return (
    <div className="container-x grid gap-16 pb-24 pt-36 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="eyebrow">{tr("checkout.eyebrow")}</p>
        <h1 className="mt-3 font-serif text-display-md font-light">{tr("checkout.title")}</h1>

        <form onSubmit={placeOrder} className="mt-10 grid gap-6">
          <Legend>{tr("checkout.contact")}</Legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <F name="name" label={tr("checkout.name")} required />
            <F name="email" label={tr("checkout.email")} type="email" required />
          </div>
          <Legend>{tr("checkout.shipTo")}</Legend>
          <F name="address" label={tr("checkout.address")} required />
          <div className="grid gap-6 sm:grid-cols-3">
            <F name="city" label={tr("checkout.city")} required />
            <F name="region" label={tr("checkout.region")} />
            <F name="country" label={tr("checkout.country")} required />
          </div>
          <button type="submit" disabled={state === "loading"} className="btn-primary mt-4 justify-self-start disabled:opacity-60">
            {state === "loading" ? tr("checkout.placing") : tr("checkout.place")}
          </button>
          <p className="font-sans text-xs text-charcoal/60">
            {flowConfigured ? tr("checkout.noteLive") : tr("checkout.noteDemo")}
          </p>
          <PaymentBadges />
          <TrustStrip className="mt-2 border-t border-charcoal/10 pt-5" />
        </form>
      </div>

      <aside className="h-fit bg-bone-warm p-8">
        <p className="eyebrow">{tr("cart.orderSummary")}</p>
        <div className="mt-6 space-y-3">
          {items.map((it) => (
            <div key={it.slug} className="flex justify-between font-sans text-sm">
              <span className="text-charcoal-soft">{it.qty} × {it.name}</span>
              <span>{formatPrice(it.price * it.qty, "CLP")}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between border-t border-charcoal/10 pt-4 font-serif text-2xl">
          <span>{tr("cart.total")}</span>
          <span>{formatPrice(subtotal, "CLP")}</span>
        </div>
        <p className="mt-2 text-right text-[11px] text-charcoal/50">{count} {count === 1 ? tr("cart.bottle") : tr("checkout.bottlesCount")}</p>
      </aside>
    </div>
  );
}

function Legend({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow border-b border-charcoal/10 pb-2 text-charcoal/50">{children}</p>;
}
function F({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal/50">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} className="mt-2 w-full border-b border-charcoal/25 bg-transparent py-2.5 font-sans text-sm focus:border-oxblood focus:outline-none" />
    </label>
  );
}
