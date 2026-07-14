"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  varietal: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  /** "Es un regalo" — adds gift presentation as an order note at checkout. */
  isGift: boolean;
  setGift: (v: boolean) => void;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "rdv-cart-v1";
const GIFT_KEY = "rdv-cart-gift";

/**
 * Free-shipping threshold to Santiago, in bottles. Source: live
 * reddelvino.com policy confirmed in the July 2026 email thread.
 * REQUIRES CONFIRMATION FROM RED DEL VINO if it's to change.
 */
export const FREE_SHIPPING_BOTTLES = 6;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isGift, setIsGift] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      setIsGift(localStorage.getItem(GIFT_KEY) === "1");
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(GIFT_KEY, isGift ? "1" : "0");
  }, [isGift, hydrated]);

  const api = useMemo<CartCtx>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      isGift,
      setGift: setIsGift,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (item, qty = 1) =>
        setItems((prev) => {
          const found = prev.find((p) => p.slug === item.slug);
          if (found) return prev.map((p) => (p.slug === item.slug ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { ...item, qty }];
        }),
      remove: (slug) => setItems((prev) => prev.filter((p) => p.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, qty: Math.max(1, qty) } : p)).filter((p) => p.qty > 0)),
      clear: () => setItems([]),
    };
  }, [items, isOpen, isGift]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { formatPrice } from "@/lib/format";
