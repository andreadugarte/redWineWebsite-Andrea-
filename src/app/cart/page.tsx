"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, formatPrice } from "@/components/cart/CartProvider";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";
import { PaymentBadges } from "@/components/trust/PaymentBadges";

export default function CartPage() {
  const { items, subtotal, setQty, remove, count } = useCart();
  const tr = useT();
  const locale = useLocale();

  return (
    <div className="container-x min-h-[70vh] pt-36">
      <p className="eyebrow">{tr("cart.selection")}</p>
      <h1 className="mt-3 font-serif text-display-md font-light">{tr("cart.cart")}</h1>

      {items.length === 0 ? (
        <div className="py-20">
          <p className="font-serif text-2xl text-charcoal/50">{tr("cart.empty")}</p>
          <Link href={localizedPath("/wines", locale)} className="btn-primary mt-6">{tr("cart.explore")}</Link>
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
                  <Link href={localizedPath(`/wines/${it.slug}`, locale)} className="font-serif text-2xl leading-tight hover:text-oxblood">{it.name}</Link>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-charcoal/20">
                      <button className="px-3 py-1.5 hover:text-oxblood" onClick={() => setQty(it.slug, it.qty - 1)}>−</button>
                      <span className="w-10 text-center text-sm">{it.qty}</span>
                      <button className="px-3 py-1.5 hover:text-oxblood" onClick={() => setQty(it.slug, it.qty + 1)}>+</button>
                    </div>
                    <span className="font-sans text-sm">{formatPrice(it.price * it.qty, "CLP")}</span>
                  </div>
                </div>
                <button onClick={() => remove(it.slug)} className="self-start text-charcoal/40 hover:text-oxblood" aria-label={tr("cart.remove")}>×</button>
              </div>
            ))}
          </div>

          <aside className="h-fit bg-bone-warm p-8">
            <p className="eyebrow">{tr("cart.orderSummary")}</p>
            <div className="mt-6 flex justify-between border-b border-charcoal/10 pb-4 font-sans text-sm">
              <span>{tr("cart.subtotal")} · {count} {tr("cart.bottles")}</span>
              <span>{formatPrice(subtotal, "CLP")}</span>
            </div>
            <div className="mt-4 flex justify-between font-serif text-2xl">
              <span>{tr("cart.total")}</span>
              <span>{formatPrice(subtotal, "CLP")}</span>
            </div>
            <Link href={localizedPath("/checkout", locale)} className="btn-primary mt-8 w-full">{tr("cart.checkoutShort")}</Link>
            <p className="mt-3 text-center text-[11px] text-charcoal/60">
              {tr("cart.shippingNote")}{" "}
              <Link href={localizedPath("/shipping", locale)} className="underline underline-offset-2 hover:text-oxblood">{tr("cart.shippingInfo")}</Link>
            </p>
            <PaymentBadges className="mt-5 justify-center" />
          </aside>
        </div>
      )}
    </div>
  );
}
