"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath, otherLocalePath } from "@/lib/i18n";

const NAV_KEY: Record<string, string> = {
  "/wines": "nav.wines",
  "/packs": "nav.packs",
  "/find-your-wine": "nav.findWine",
  "/producers": "nav.producers",
  "/story": "nav.story",
  "/sustainability": "nav.sustainability",
  "/tourism": "nav.tourism",
  "/event-center": "nav.events",
  "/contact": "nav.contact",
};

export function Header() {
  const pathname = usePathname() || "/";
  const locale = useLocale();
  const tr = useT();
  const basePath = locale === "es" ? pathname.slice(3) || "/" : pathname;
  const isHome = basePath === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled || !isHome || menuOpen;
  const text = solid ? "text-charcoal" : "text-bone";

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${solid ? "bg-bone/95 backdrop-blur-md shadow-[0_1px_0_rgba(38,34,31,0.08)]" : "bg-transparent"}`}
      >
        <div className="container-x flex items-center justify-between py-4">
          <button className={`lg:hidden ${text}`} aria-label={tr("header.menu")} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <span className="block h-px w-7 bg-current" />
            <span className="mt-1.5 block h-px w-7 bg-current" />
            <span className="mt-1.5 block h-px w-5 bg-current" />
          </button>

          <Link href={localizedPath("/", locale)} className={`font-serif text-2xl leading-none tracking-tight ${text}`}>
            Red del Vino
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => {
              const active = basePath.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={localizedPath(n.href, locale)}
                  aria-current={active ? "page" : undefined}
                  className={`link-underline relative font-sans text-[13px] uppercase tracking-[0.14em] ${text} ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                >
                  {tr(NAV_KEY[n.href] ?? "")}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-current"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={`flex items-center gap-4 ${text}`}>
            <Link
              href={otherLocalePath(pathname)}
              className="font-sans text-[12px] font-semibold tracking-[0.14em] opacity-80 hover:opacity-100"
              aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
            >
              {locale === "en" ? "ES" : "EN"}
            </Link>
            <button onClick={open} className="relative" aria-label={tr("header.openCart")}>
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
            initial={{ opacity: 0, pointerEvents: "none" }}
            animate={{ opacity: 1, pointerEvents: "auto" }}
            exit={{ opacity: 0, pointerEvents: "none" }}
          >
            <button
              className="absolute right-6 top-6 text-charcoal"
              aria-label={tr("header.closeMenu")}
              onClick={() => setMenuOpen(false)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
            <nav className="flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link href={localizedPath(n.href, locale)} className="block border-b border-charcoal/10 py-4 font-serif text-3xl">
                    {tr(NAV_KEY[n.href] ?? "")}
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
