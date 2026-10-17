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
    { icon: "M5 11V8a5 5 0 0110 0v3M4 11h12v7H4z", text: tr("trust.secure") },
    { icon: "M2 6h9v8H2zM11 9h4l3 3v2h-7z", text: tr("trust.ship"), href: localizedPath("/shipping", locale) },
    { icon: "M4 9a6 6 0 11-1 4M4 5v4h4", text: tr("trust.returns"), href: localizedPath("/returns", locale) },
    { icon: "M3 4h14v10H8l-4 3v-3H3z", text: tr("trust.help"), href: `https://wa.me/${SITE.whatsapp}`, external: true },
  ];
  return (
    <ul className={`grid gap-3 font-sans text-xs text-charcoal-soft sm:grid-cols-2 ${className}`}>
      {items.map((it) => {
        const inner = (
          <>
            <svg aria-hidden width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="mr-2 inline-block align-[-3px] text-oxblood"><path d={it.icon} /></svg>
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
