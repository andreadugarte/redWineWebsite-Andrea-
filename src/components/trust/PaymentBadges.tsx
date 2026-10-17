"use client";

import { useT } from "@/components/i18n/LocaleProvider";

/**
 * Payment methods accepted through Flow (Webpay, credit/debit cards).
 * Neutral text/shape badges rather than reproduced brand artwork — swap in
 * the official logo files here if Red del Vino supplies them.
 */
export function PaymentBadges({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const tr = useT();
  const pill =
    tone === "light"
      ? "border-bone/30 bg-bone/10 text-bone"
      : "border-charcoal/15 bg-white text-charcoal";
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="list" aria-label={tr("pay.title")}>
      <span role="listitem" className={`rounded border px-2 py-1 font-sans text-[11px] font-bold tracking-wide ${pill}`}>
        <span className="text-[#d6001c]">Web</span>
        <span className={tone === "light" ? "text-bone" : "text-[#1c1c6b]"}>pay</span>
      </span>
      <span role="listitem" className={`rounded border px-2 py-1 font-sans text-[12px] font-extrabold italic tracking-tight ${pill}`}>
        <span className={tone === "light" ? "text-bone" : "text-[#1a1f71]"}>VISA</span>
      </span>
      <span role="listitem" className={`flex items-center gap-1 rounded border px-2 py-[5px] font-sans text-[11px] font-semibold ${pill}`} aria-label="Mastercard">
        <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden>
          <circle cx="7" cy="6" r="5.5" fill="#eb001b" />
          <circle cx="13" cy="6" r="5.5" fill="#f79e1b" fillOpacity=".9" />
        </svg>
        Mastercard
      </span>
      <span role="listitem" className={`rounded border px-2 py-1 font-sans text-[11px] font-semibold ${pill}`}>Redcompra</span>
      <span role="listitem" className={`rounded border px-2 py-1 font-sans text-[11px] font-semibold ${pill}`}>Amex</span>
      <span className={`w-full font-sans text-[11px] ${tone === "light" ? "text-bone/60" : "text-charcoal/55"}`}>🔒 {tr("pay.via")}</span>
    </div>
  );
}
