"use client";

import Link from "next/link";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** Reassurance row for checkout/cart: what a first-time buyer wants confirmed before paying. */
export function TrustStrip({ className = "" }: { className?: string }) {
  const tr = useT();
  const locale = useLocale();
  const items: { icon: string; text: string; href?: string; external?: boolean }[] = [
    { icon: "🔒", text: tr("trust.secure") },
    { icon: "🚚", text: tr("trust.ship"), href: localizedPath("/shipping", locale) },
    { icon: "↩", text: tr("trust.returns"), href: localizedPath("/returns", locale) },
    { icon: "💬", text: tr("trust.help"), href: `https://wa.me/${SITE.whatsapp}`, external: true },
  ];
  return (
    <ul className={`grid gap-3 font-sans text-xs text-charcoal-soft sm:grid-cols-2 ${className}`}>
      {items.map((it) => {
        const inner = (
          <>
            <span aria-hidden className="mr-2">{it.icon}</span>
            {it.text}
          </>
        );
        return (
          <li key={it.text}>
            {it.href ? (
              it.external ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer" className="hover:text-oxblood">{inner}</a>
              ) : (
                <Link href={it.href} className="hover:text-oxblood">{inner}</Link>
              )
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ul>
  );
}
