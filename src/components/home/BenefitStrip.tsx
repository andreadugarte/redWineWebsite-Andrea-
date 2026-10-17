"use client";

import { useT } from "@/components/i18n/LocaleProvider";

const ICONS: Record<string, React.ReactNode> = {
  ship: <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7zM6 19a1.7 1.7 0 100-3.400 1.700 1.700 0 000 3.400zM17 19a1.700 1.700 0 100-3.400 1.700 1.700 0 000 3.400z" />,
  pay: <path d="M3 6h18v12H3zM3 10h18M7 15h4" />,
  fair: <path d="M12 3l2.600 5.400 5.900.8-4.300 4.100 1 5.800L12 16.300 6.800 19.100l1-5.800L3.500 9.200l5.900-.8z" />,
  store: <path d="M4 10l1.500-5h13L20 10M4 10h16v9H4zM10 19v-5h4v5" />,
};

/** Four plain reassurances under the hero, the way established wine retailers open their page. */
export function BenefitStrip() {
  const tr = useT();
  const items = [
    ["ship", tr("home.benefit.ship")],
    ["pay", tr("home.benefit.pay")],
    ["fair", tr("home.benefit.fair")],
    ["store", tr("home.benefit.store")],
  ] as const;
  return (
    <section className="border-b border-charcoal/10 bg-bone">
      <ul className="container-x grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:grid-cols-4">
        {items.map(([k, text]) => (
          <li key={k} className="flex items-center gap-3 font-sans text-[13px] leading-snug text-charcoal-soft">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" className="shrink-0 text-oxblood" aria-hidden>
              {ICONS[k]}
            </svg>
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
