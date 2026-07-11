import pagesJson from "@content/site/pages.json";
import producersJson from "@content/site/producers.json";
import winesJson from "@content/site/wines.json";
import tourismJson from "@content/site/tourism.json";
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
  winery?: string;
  varietals: string[];
  portrait: ImageRef | null;
  bio: string[];
  /** Spanish bio (path-based i18n). Falls back to English when absent. */
  bio_es?: string[];
};

export type Wine = {
  slug: string;
  name: string;
  varietal: string;
  color: "red" | "white";
  image: ImageRef | null;
  notes: string[];
  description: string;
  price: number;
  currency: string;
  vintage: number;
  abv: string;
  stock?: number;
  /** Spanish content (path-based i18n). Falls back to English when absent. */
  notes_es?: string[];
  description_es?: string;
};

export type Tour = {
  slug: string;
  name: string;
  image: ImageRef | null;
  body: string[];
  blocks: Block[];
};

const pages = pagesJson as Record<string, Page>;
export const producers = producersJson as Producer[];
export const wines = winesJson as Wine[];
export const tours = tourismJson as Tour[];

/**
 * Producers shown by default in public listings. A producer is considered
 * active unless explicitly marked "inactive" — so the entries whose status
 * has not been confirmed yet stay visible.
 */
export const activeProducers = producers.filter((p) => p.status !== "inactive");

export function getPage(slug: string): Page | undefined {
  return pages[slug];
}

/** Swap a producer's text fields to Spanish, falling back to English. */
export function localizeProducer(p: Producer, locale: Locale): Producer {
  if (locale === "es" && p.bio_es?.length) return { ...p, bio: p.bio_es };
  return p;
}
/** Swap a wine's text fields to Spanish, falling back to English. */
export function localizeWine(w: Wine, locale: Locale): Wine {
  if (locale !== "es") return w;
  return {
    ...w,
    notes: w.notes_es?.length ? w.notes_es : w.notes,
    description: w.description_es || w.description,
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
