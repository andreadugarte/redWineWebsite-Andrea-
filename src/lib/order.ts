import { listedWines } from "@/lib/content";

/**
 * Flow only accepts ~250 characters in `optional`, so the order is packed into
 * short keys and wines are referenced by their index in the alphabetical slug
 * list (the same list decodes them in the confirmation webhook).
 */
const SLUGS = listedWines.map((w) => w.slug).sort();
const LIMIT = 245;
const clip = (v: unknown, n: number) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, n);

type Cust = Record<string, unknown>;

export function encodeOrder(items: { slug?: string; qty: number }[], c: Cust, lang = "es"): Record<string, string> {
  const o = items
    .map((i) => `${SLUGS.indexOf(String(i.slug))}x${i.qty}`)
    .join(",")
    .slice(0, 70);
  let addr = 70;
  let packed: Record<string, string>;
  do {
    packed = {
      n: clip(c.name, 35),
      d: clip(c.address, addr),
      c: clip(c.city, 25),
      r: clip(c.region, 20),
      p: clip(c.country, 15),
      l: lang,
      o,
    };
    addr -= 5;
  } while (JSON.stringify(packed).length > LIMIT && addr > 10);
  return packed;
}

export function decodeOrder(p: Record<string, string>) {
  const items = (p.o || "")
    .split(",")
    .filter(Boolean)
    .map((t) => {
      const [idx, qty] = t.split("x");
      const w = listedWines.find((x) => x.slug === SLUGS[Number(idx)]);
      return { name: w ? w.name : "", price: w ? w.price : 0, qty: Number(qty) || 0 };
    });
  return {
    nombre: p.n || "",
    direccion: [p.d, p.c, p.r, p.p].filter(Boolean).join(", "),
    lang: p.l || "es",
    items,
  };
}
