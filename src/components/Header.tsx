"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV, SITE } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "ES">("EN");
  const { count, open } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled || !isHome || menuOpen;
  const text = solid ? "text-charcoal" : "text-bone";

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${solid ? "bg-bone/95 backdrop-blur-md shadow-[0_1px_0_rgba(38,34,31,0.08)]" : "bg-transparent"}`}
      >
        <div className="container-x flex items-center justify-between py-4">
          <button className={`lg:hidden ${text}`} aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
            <span className="block h-px w-7 bg-current" />
            <span className="mt-1.5 block h-px w-7 bg-current" />
            <span className="mt-1.5 block h-px w-5 bg-current" />
          </button>

          <Link href="/" className={`font-serif text-2xl leading-none tracking-tight ${text}`}>
            Red del Vino
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`link-underline font-sans text-[13px] uppercase tracking-[0.14em] ${text} ${pathname.startsWith(n.href) ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className={`flex items-center gap-4 ${text}`}>
            <button
              onClick={() => setLang((l) => (l === "EN" ? "ES" : "EN"))}
              className="hidden font-sans text-[12px] font-semibold tracking-[0.14em] opacity-80 hover:opacity-100 sm:block"
              aria-label="Switch language"
              title="Language (ES coming soon)"
            >
              {lang} <span className="opacity-40">/ {lang === "EN" ? "ES" : "EN"}</span>
            </button>
            <button onClick={open} className="relative" aria-label="Open cart">
              <CartIcon />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-oxblood px-1 text-[10px] font-semibold text-bone">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[69] bg-bone px-6 pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link href={n.href} className="block border-b border-charcoal/10 py-4 font-serif text-3xl">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="mt-10 font-sans text-sm text-charcoal-soft">{SITE.reservationsEmail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
