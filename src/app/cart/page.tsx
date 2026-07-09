"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, formatPrice } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { items, subtotal, setQty, remove, count } = useCart();

  return (
    <div className="container-x min-h-[70vh] pt-36">
      <p className="eyebrow">Your Selection</p>
      <h1 className="mt-3 font-serif text-display-md font-light">Cart</h1>

      {items.length === 0 ? (
        <div className="py-20">
          <p className="font-serif text-2xl text-charcoal/50">Your cart is empty.</p>
          <Link href="/wines" className="btn-primary mt-6">Explore the Wines</Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 pb-24 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {items.map((it) => (
              <div key={it.slug} className="flex gap-6 py-6">
                <div className="relative h-32 w-24 shrink-0 bg-bone-warm">
                  <Image src={it.image} alt={it.name} fill className="object-contain p-2" sizes="96px" />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="eyebrow">{it.varietal}</p>
                  <Link href={`/wines/${it.slug}`} className="font-serif text-2xl leading-tight hover:text-oxblood">{it.name}</Link>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-charcoal/20">
                      <button className="px-3 py-1.5 hover:text-oxblood" onClick={() => setQty(it.slug, it.qty - 1)}>−</button>
                      <span className="w-10 text-center text-sm">{it.qty}</span>
                      <button className="px-3 py-1.5 hover:text-oxblood" onClick={() => setQty(it.slug, it.qty + 1)}>+</button>
                    </div>
                    <span className="font-sans text-sm">{formatPrice(it.price * it.qty)}</span>
                  </div>
                </div>
                <button onClick={() => remove(it.slug)} className="self-start text-charcoal/40 hover:text-oxblood" aria-label="Remove">×</button>
              </div>
            ))}
          </div>

          <aside className="h-fit bg-bone-warm p-8">
            <p className="eyebrow">Order Summary</p>
            <div className="mt-6 flex justify-between border-b border-charcoal/10 pb-4 font-sans text-sm">
              <span>Subtotal · {count} bottles</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-4 flex justify-between font-serif text-2xl">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" className="btn-primary mt-8 w-full">Checkout</Link>
            <p className="mt-3 text-center text-[11px] text-charcoal/50">Shipping &amp; taxes calculated at checkout.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
