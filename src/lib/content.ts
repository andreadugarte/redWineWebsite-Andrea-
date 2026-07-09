import pagesJson from "@content/site/pages.json";
import producersJson from "@content/site/producers.json";
import winesJson from "@content/site/wines.json";
import tourismJson from "@content/site/tourism.json";

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
  varietals: string[];
  portrait: ImageRef | null;
  bio: string[];
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

export function getPage(slug: string): Page | undefined {
  return pages[slug];
}
export function getProducer(slug: string): Producer | undefined {
  return producers.find((p) => p.slug === slug);
}
export function getWine(slug: string): Wine | undefined {
  return wines.find((w) => w.slug === slug);
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
