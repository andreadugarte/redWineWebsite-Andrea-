"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart, formatPrice } from "@/components/cart/CartProvider";

export default function CheckoutPage() {
  const { items, subtotal, count, clear } = useCart();
  const [state, setState] = useState<"form" | "loading" | "done">("form");
  const [order, setOrder] = useState<{ orderId: string; simulated: boolean } | null>(null);

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const customer = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("loading");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, customer }),
    });
    const data = await res.json();
    setOrder(data);
    clear();
    setState("done");
  }

  if (state === "done" && order) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow">Order Confirmed</p>
          <h1 className="mt-4 font-serif text-display-md font-light">Thank you.</h1>
          <p className="mt-4 font-sans text-sm text-charcoal-soft">
            Your order <span className="font-semibold">{order.orderId}</span> has been received.
          </p>
          {order.simulated && (
            <p className="mx-auto mt-6 max-w-md border border-gold/40 bg-gold/5 px-6 py-4 font-sans text-xs leading-relaxed text-charcoal-soft">
              This was a <strong>simulated checkout</strong> — no payment was processed. Add your Stripe keys in Vercel to enable live payments (see README).
            </p>
          )}
          <Link href="/wines" className="btn-primary mt-10">Continue Exploring</Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <p className="font-serif text-2xl text-charcoal/50">Your cart is empty.</p>
        <Link href="/wines" className="btn-primary mt-6">Explore the Wines</Link>
      </div>
    );
  }

  return (
    <div className="container-x grid gap-16 pb-24 pt-36 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-3 font-serif text-display-md font-light">Almost there</h1>

        <form onSubmit={placeOrder} className="mt-10 grid gap-6">
          <Legend>Contact</Legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <F name="name" label="Full name" required />
            <F name="email" label="Email" type="email" required />
          </div>
          <Legend>Shipping address</Legend>
          <F name="address" label="Address" required />
          <div className="grid gap-6 sm:grid-cols-3">
            <F name="city" label="City" required />
            <F name="region" label="Region" />
            <F name="country" label="Country" required />
          </div>
          <button type="submit" disabled={state === "loading"} className="btn-primary mt-4 justify-self-start disabled:opacity-60">
            {state === "loading" ? "Placing order…" : "Place Order"}
          </button>
          <p className="font-sans text-[11px] text-charcoal/50">
            Demo checkout — no card is charged. Prices are indicative.
          </p>
        </form>
      </div>

      <aside className="h-fit bg-bone-warm p-8">
        <p className="eyebrow">Order Summary</p>
        <div className="mt-6 space-y-3">
          {items.map((it) => (
            <div key={it.slug} className="flex justify-between font-sans text-sm">
              <span className="text-charcoal-soft">{it.qty} × {it.name}</span>
              <span>{formatPrice(it.price * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between border-t border-charcoal/10 pt-4 font-serif text-2xl">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-right text-[11px] text-charcoal/50">{count} bottles</p>
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
