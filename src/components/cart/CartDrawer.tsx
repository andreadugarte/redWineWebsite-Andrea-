"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, formatPrice } from "./CartProvider";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, setQty, remove, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-charcoal/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[81] flex h-full w-full max-w-md flex-col bg-bone shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="font-serif text-2xl">Your Cellar Selection</h2>
              <button onClick={close} aria-label="Close cart" className="text-2xl leading-none hover:text-oxblood">
                &times;
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-serif text-2xl text-charcoal-soft">Your selection is empty.</p>
                <Link href="/wines" onClick={close} className="btn-primary">
                  Explore the Wines
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((it) => (
                    <div key={it.slug} className="flex gap-4 border-b border-charcoal/10 py-4">
                      <div className="relative h-24 w-16 shrink-0 bg-bone-warm">
                        <Image src={it.image} alt={it.name} fill className="object-contain" sizes="64px" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="eyebrow text-gold">{it.varietal}</p>
                        <p className="font-serif text-lg leading-tight">{it.name}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-charcoal/20">
                            <button className="px-2 py-1 hover:text-oxblood" onClick={() => setQty(it.slug, it.qty - 1)} aria-label="Decrease">−</button>
                            <span className="w-8 text-center text-sm">{it.qty}</span>
                            <button className="px-2 py-1 hover:text-oxblood" onClick={() => setQty(it.slug, it.qty + 1)} aria-label="Increase">+</button>
                          </div>
                          <span className="font-sans text-sm">{formatPrice(it.price * it.qty)}</span>
                        </div>
                      </div>
                      <button onClick={() => remove(it.slug)} aria-label="Remove" className="self-start text-charcoal/40 hover:text-oxblood">×</button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-charcoal/10 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="eyebrow">Subtotal · {count} {count === 1 ? "bottle" : "bottles"}</span>
                    <span className="font-serif text-2xl">{formatPrice(subtotal)}</span>
                  </div>
                  <Link href="/checkout" onClick={close} className="btn-primary w-full">
                    Proceed to Checkout
                  </Link>
                  <p className="mt-3 text-center text-[11px] text-charcoal/50">Shipping &amp; taxes calculated at checkout.</p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
