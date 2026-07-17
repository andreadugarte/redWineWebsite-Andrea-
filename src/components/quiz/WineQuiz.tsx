"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Bundle, Wine } from "@/lib/content";
import { FALLBACK_IMAGE, bundlePrice, localizeBundle, localizeWine } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

type Occasion = "solo" | "meal" | "asado" | "gift";
type Color = "red" | "white" | "rose" | "any";
type Intensity = "light" | "medium" | "bold";
type Budget = "low" | "mid" | "high";

type Answers = { occasion?: Occasion; color?: Color; intensity?: Intensity; budget?: Budget };

const BUDGET_RANGE: Record<Budget, [number, number]> = {
  low: [0, 8000],
  mid: [8000, 14000],
  high: [14000, Infinity],
};

function scoreWine(w: Wine, a: Answers): number {
  let s = 0;
  if (a.color && a.color !== "any") s += w.color === a.color ? 2 : -3;
  if (a.intensity) {
    const tag = a.intensity === "bold" ? "rich" : a.intensity;
    if (w.occasions?.includes(tag)) s += 2;
  }
  if (a.budget) {
    const [lo, hi] = BUDGET_RANGE[a.budget];
    if (w.price >= lo && w.price <= hi) s += 2;
    else s -= 1;
  }
  if (a.occasion === "asado" && w.occasions?.includes("asado")) s += 1;
  return s;
}

export function WineQuiz({ wines, bundles }: { wines: Wine[]; bundles: Bundle[] }) {
  const locale = useLocale();
  const tr = useT();
  const { add, open } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const giftBundle = bundles.find((b) => b.type === "gift");
  const isGift = answers.occasion === "gift";
  const done = isGift || step >= 4;

  const matches = useMemo(() => {
    if (!done || isGift) return [];
    return wines
      .filter((w) => w.stock !== 0)
      .map((w) => ({ w, s: scoreWine(w, answers) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map((x) => localizeWine(x.w, locale));
  }, [done, isGift, wines, answers, locale]);

  const suggestedBundle = useMemo(() => {
    if (!done || isGift) return undefined;
    const type =
      answers.occasion === "asado" ? "occasion" : answers.budget === "low" ? "beginner" : "discovery";
    const b = bundles.find((x) => x.type === type) || bundles.find((x) => x.type === "discovery");
    return b ? localizeBundle(b, locale) : undefined;
  }, [done, isGift, answers, bundles, locale]);

  function pick<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setEmailState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          context: "quiz-results",
          detail: matches.map((m) => m.slug).join(", ") || suggestedBundle?.slug || "gift",
        }),
      });
      setEmailState(res.ok ? "done" : "error");
    } catch {
      setEmailState("error");
    }
  }

  const OPTION =
    "border border-charcoal/20 px-6 py-4 text-left font-sans text-sm transition-colors hover:border-oxblood hover:text-oxblood";

  if (!done) {
    const questions = [
      {
        q: tr("quiz.q1"),
        options: [
          { label: tr("quiz.q1.solo"), fn: () => pick("occasion", "solo") },
          { label: tr("quiz.q1.meal"), fn: () => pick("occasion", "meal") },
          { label: tr("quiz.q1.asado"), fn: () => pick("occasion", "asado") },
          { label: tr("quiz.q1.gift"), fn: () => pick("occasion", "gift") },
        ],
      },
      {
        q: tr("quiz.q2"),
        options: [
          { label: tr("quiz.q2.red"), fn: () => pick("color", "red") },
          { label: tr("quiz.q2.white"), fn: () => pick("color", "white") },
          { label: tr("quiz.q2.rose"), fn: () => pick("color", "rose") },
          { label: tr("quiz.q2.any"), fn: () => pick("color", "any") },
        ],
      },
      {
        q: tr("quiz.q3"),
        options: [
          { label: tr("quiz.q3.light"), fn: () => pick("intensity", "light") },
          { label: tr("quiz.q3.medium"), fn: () => pick("intensity", "medium") },
          { label: tr("quiz.q3.bold"), fn: () => pick("intensity", "bold") },
        ],
      },
      {
        q: tr("quiz.q4"),
        options: [
          { label: tr("quiz.q4.low"), fn: () => pick("budget", "low") },
          { label: tr("quiz.q4.mid"), fn: () => pick("budget", "mid") },
          { label: tr("quiz.q4.high"), fn: () => pick("budget", "high") },
        ],
      },
    ];
    const cur = questions[step];

    return (
      <div className="mx-auto max-w-xl">
        <p className="eyebrow text-charcoal/40">
          {step + 1} / 4
        </p>
        <h2 className="mt-3 font-serif text-3xl">{cur.q}</h2>
        <div className="mt-8 grid gap-3">
          {cur.options.map((o) => (
            <button key={o.label} className={OPTION} onClick={o.fn}>
              {o.label}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button className="link-underline mt-8 font-sans text-xs uppercase tracking-[0.14em] text-charcoal/50" onClick={() => setStep((s) => s - 1)}>
            ← {tr("quiz.back")}
          </button>
        )}
      </div>
    );
  }

  // Results
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="font-serif text-display-md font-light">{tr("quiz.results.title")}</h2>

      {isGift && giftBundle ? (
        <div className="mt-8">
          <p className="font-sans text-sm text-charcoal-soft">{tr("quiz.results.giftLead")}</p>
          <BundleSuggestion bundle={localizeBundle(giftBundle, locale)} locale={locale} />
        </div>
      ) : (
        <>
          {matches.length > 0 && matches.length < 3 && (
            <p className="mt-3 font-sans text-sm text-charcoal-soft">{tr("quiz.results.close")}</p>
          )}
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {matches.map((w) => (
              <div key={w.slug}>
                <Link href={localizedPath(`/wines/${w.slug}`, locale)} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-bone-warm">
                    <Image src={w.image?.src || FALLBACK_IMAGE} alt={w.name} fill sizes="33vw" className="object-contain p-8 transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 eyebrow">{w.varietal}</p>
                  <p className="font-serif text-lg leading-tight">{w.name}</p>
                  <p className="mt-1 font-sans text-sm text-charcoal-soft">{formatPrice(w.price, w.currency)}</p>
                </Link>
                {w.stock !== 0 && (
                  <button
                    type="button"
                    className="btn-primary mt-3 w-full"
                    onClick={() => {
                      add({ slug: w.slug, name: w.name, varietal: w.varietal, price: w.price, image: w.image?.src || FALLBACK_IMAGE }, 1);
                      open();
                    }}
                  >
                    {tr("cart.addToCart")}
                  </button>
                )}
              </div>
            ))}
          </div>
          {matches.length === 0 && (
            <p className="mt-6 font-sans text-sm text-charcoal-soft">{tr("quiz.results.close")}</p>
          )}
          {suggestedBundle && (
            <div className="mt-12">
              <p className="eyebrow text-charcoal/40">{tr("quiz.results.bundle")}</p>
              <BundleSuggestion bundle={suggestedBundle} locale={locale} />
            </div>
          )}
        </>
      )}

      {/* Email capture — a customer-capture moment, not a dead end */}
      <div className="mt-14 border-t border-charcoal/10 pt-8">
        {emailState === "done" ? (
          <p className="font-sans text-sm text-vine">{tr("form.thankYou")}</p>
        ) : (
          <form onSubmit={submitEmail} className="flex max-w-md gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tr("form.email")}
              className="w-full border-b border-charcoal/25 bg-transparent py-2.5 font-sans text-sm focus:border-oxblood focus:outline-none"
            />
            <button type="submit" disabled={emailState === "loading"} className="btn-primary whitespace-nowrap disabled:opacity-60">
              {locale === "es" ? "Envíame mis resultados" : "Email me my results"}
            </button>
          </form>
        )}
        {emailState === "error" && <p className="mt-2 font-sans text-sm text-oxblood">{tr("form.error")}</p>}
      </div>

      <button
        className="link-underline mt-10 font-sans text-xs uppercase tracking-[0.14em] text-charcoal/50"
        onClick={() => {
          setAnswers({});
          setStep(0);
          setEmailState("idle");
        }}
      >
        ↺ {tr("quiz.results.restart")}
      </button>
    </div>
  );
}

function BundleSuggestion({ bundle, locale }: { bundle: Bundle; locale: "en" | "es" }) {
  const price = bundlePrice(bundle);
  return (
    <Link
      href={localizedPath(`/packs/${bundle.slug}`, locale)}
      className="mt-4 flex items-baseline justify-between border border-charcoal/15 bg-bone-warm px-6 py-5 transition-colors hover:border-oxblood"
    >
      <span>
        <span className="font-serif text-2xl">{bundle.name}</span>
        <span className="mt-1 block font-sans text-sm text-charcoal-soft">{bundle.description}</span>
      </span>
      <span className="ml-6 whitespace-nowrap font-serif text-xl text-oxblood">
        {formatPrice(price.final, price.currency)}
      </span>
    </Link>
  );
}
