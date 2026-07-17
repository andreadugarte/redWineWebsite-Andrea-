import pagesJson from "@content/site/pages.json";
import producersJson from "@content/site/producers.json";
import winesJson from "@content/site/wines.json";
import tourismJson from "@content/site/tourism.json";
import bundlesJson from "@content/site/bundles.json";
import type { Locale } from "@/lib/i18n";

export type ImageRef = { src: string; alt: string; w?: number | null; h?: number | null };

export type Block =
  | { type: "heading"; text: string }
  | { type: "eyebrow"; text: string }
  | { type: "text"; paragraphs: string[] }
  | ({ type: "image" } & ImageRef);

export type Page = {
  slug: string;
  title: string;
  hero_heading: string;
  hero_image: ImageRef | null;
  blocks: Block[];
};

export type Producer = {
  slug: string;
  name: string;
  status?: "active" | "inactive";
  /**
   * "grower" = cooperative member who grows grapes but doesn't bottle their
   * own wine (Rodrigo, Jul 10 2026: "sólo elaboran uva"). Absent = winemaker.
   */
  role?: "grower";
  winery?: string;
  varietals: string[];
  portrait: ImageRef | null;
  bio: string[];
  /** Translated bios (path-based i18n). Fall back to English when absent. */
  bio_es?: string[];
  bio_pt?: string[];
  bio_zh?: string[];
};

export type Wine = {
  slug: string;
  name: string;
  varietal: string;
  color: "red" | "white" | "rose";
  /** Occasion/style tags used by the shop filter and the Find Your Wine quiz. */
  occasions?: string[];
  image: ImageRef | null;
  notes: string[];
  description: string;
  price: number;
  currency: string;
  /** Optional — absent for catalogue wines whose vintage isn't confirmed. */
  vintage?: number;
  /** Optional — absent for catalogue wines whose ABV isn't confirmed. */
  abv?: string;
  stock?: number;
  /** Producer brand / winery label this wine is sold under (e.g. "Campesino", "La Pascuala"). */
  brand?: string;
  /** Slug of the producer behind this wine, when a single one is confirmed. */
  producerSlug?: string;
  /** Internal-only note (not rendered) — e.g. a pending question about a wine. */
  internalNote?: string;
  /** Kept in the data but not part of the current public store (e.g. discontinued/unconfirmed). */
  pending?: boolean;
  /** Translated content (path-based i18n). Fall back to English when absent. */
  notes_es?: string[];
  description_es?: string;
  notes_pt?: string[];
  description_pt?: string;
  notes_zh?: string[];
  description_zh?: string;
};

export type Tour = {
  slug: string;
  name: string;
  image: ImageRef | null;
  body: string[];
  blocks: Block[];
};

export type Bundle = {
  slug: string;
  name: string;
  name_es?: string;
  name_pt?: string;
  name_zh?: string;
  type: "discovery" | "occasion" | "beginner" | "gift" | "feria";
  permanence: "permanent" | "seasonal" | "campaign";
  wineSlugs: string[];
  /** REQUIRES CONFIRMATION FROM RED DEL VINO — recommend 8-10%. Defaults to 0 (no discount). */
  discountPercent: number;
  valueAdd: "producerCard" | "giftPackaging" | "freeShippingIncluded";
  description: string;
  description_es?: string;
  description_pt?: string;
  description_zh?: string;
  /** Internal-only note (not rendered). */
  internalNote?: string;
};

const pages = pagesJson as Record<string, Page>;
export const producers = producersJson as Producer[];
export const wines = winesJson as Wine[];
export const tours = tourismJson as Tour[];

/**
 * Wines shown in the public /wines catalogue. Excludes entries flagged
 * `pending` — kept in the data but not part of the current store (e.g. the
 * Campesino Cabernet Sauvignon Reserva, still unconfirmed with Rodrigo).
 */
export const listedWines = wines.filter((w) => !w.pending);

/** All wines sold under a given brand (includes pending entries). */
export function winesByBrand(brand: string): Wine[] {
  return wines.filter((w) => w.brand === brand);
}

export const bundles = bundlesJson as Bundle[];

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

/** Wines referenced by a bundle, in bundle order (skips unknown slugs). */
export function bundleWines(bundle: Bundle): Wine[] {
  return bundle.wineSlugs
    .map((s) => wines.find((w) => w.slug === s))
    .filter((w): w is Wine => Boolean(w));
}

/**
 * Bundle price derived live from its wines' current prices so it never
 * drifts out of sync. Returns the full summed price and the price after
 * the (confirmed) discount — with discountPercent 0 they're equal.
 */
export function bundlePrice(bundle: Bundle): { full: number; final: number; currency: string } {
  const ws = bundleWines(bundle);
  const full = ws.reduce((n, w) => n + w.price, 0);
  const final = Math.round(full * (1 - bundle.discountPercent / 100));
  return { full, final, currency: ws[0]?.currency ?? "CLP" };
}

/** Every bundle that includes the given wine. */
export function bundlesContaining(wineSlug: string): Bundle[] {
  return bundles.filter((b) => b.wineSlugs.includes(wineSlug));
}

/** Localized bundle name/description. */
export function localizeBundle(b: Bundle, locale: Locale): Bundle {
  if (locale === "en") return b;
  const name = { es: b.name_es, pt: b.name_pt, zh: b.name_zh }[locale];
  const description = { es: b.description_es, pt: b.description_pt, zh: b.description_zh }[locale];
  return { ...b, name: name || b.name, description: description || b.description };
}

/**
 * Producers shown by default in public listings. A producer is considered
 * active unless explicitly marked "inactive" — so the entries whose status
 * has not been confirmed yet stay visible.
 */
export const activeProducers = producers.filter((p) => p.status !== "inactive");

export function getPage(slug: string): Page | undefined {
  return pages[slug];
}

/** Swap a producer's text fields to the given locale, falling back to English. */
export function localizeProducer(p: Producer, locale: Locale): Producer {
  const bio = { es: p.bio_es, pt: p.bio_pt, zh: p.bio_zh }[locale as "es" | "pt" | "zh"];
  if (locale !== "en" && bio?.length) return { ...p, bio };
  return p;
}
/** Swap a wine's text fields to the given locale, falling back to English. */
export function localizeWine(w: Wine, locale: Locale): Wine {
  if (locale === "en") return w;
  const notes = { es: w.notes_es, pt: w.notes_pt, zh: w.notes_zh }[locale as "es" | "pt" | "zh"];
  const description = { es: w.description_es, pt: w.description_pt, zh: w.description_zh }[locale as "es" | "pt" | "zh"];
  return {
    ...w,
    notes: notes?.length ? notes : w.notes,
    description: description || w.description,
  };
}
export function localizedProducers(list: Producer[], locale: Locale): Producer[] {
  return list.map((p) => localizeProducer(p, locale));
}
export function localizedWines(list: Wine[], locale: Locale): Wine[] {
  return list.map((w) => localizeWine(w, locale));
}

export function getProducer(slug: string, locale: Locale = "en"): Producer | undefined {
  const p = producers.find((x) => x.slug === slug);
  return p ? localizeProducer(p, locale) : undefined;
}
export function getWine(slug: string, locale: Locale = "en"): Wine | undefined {
  const w = wines.find((x) => x.slug === slug);
  return w ? localizeWine(w, locale) : undefined;
}

/** Prefer a real portrait; otherwise fall back to a curated vineyard image. */
export const FALLBACK_IMAGE = "/images/original/Red-del-Vino-Grapes.jpg";

export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export const ALL_VARIETALS = Array.from(
  new Set(producers.flatMap((p) => p.varietals))
).sort();
