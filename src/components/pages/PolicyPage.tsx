"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";
import { IMG } from "@/lib/images";
import { POLICIES } from "@/lib/policies";
import { PaymentBadges } from "@/components/trust/PaymentBadges";

export function PolicyPage({ kind }: { kind: "shipping" | "returns" }) {
  const locale = useLocale();
  const policy = POLICIES[kind][locale === "es" ? "es" : "en"];
  const other = kind === "shipping" ? "/returns" : "/shipping";
  const otherLabel = POLICIES[other === "/returns" ? "returns" : "shipping"][locale === "es" ? "es" : "en"].title;

  return (
    <>
      <PageHero eyebrow={policy.eyebrow} title={policy.title} image={IMG.office} intro={policy.intro} />
      <section className="container-x max-w-3xl py-20">
        <div className="space-y-12">
          {policy.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-serif text-2xl text-charcoal">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para} className="mt-3 font-sans text-base leading-relaxed text-charcoal-soft">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-charcoal/10 pt-8">
          <Link href={localizedPath(other, locale)} className="link-underline font-sans text-sm uppercase tracking-[0.14em] text-oxblood">
            {otherLabel} →
          </Link>
          <PaymentBadges className="mt-8" />
        </div>
      </section>
    </>
  );
}
