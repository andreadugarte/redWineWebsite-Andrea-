import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { listedWines, producers, bundles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const routes = [
    "",
    "/wines",
    "/packs",
    "/find-your-wine",
    "/producers",
    "/story",
    "/sustainability",
    "/social-responsibility",
    "/tourism",
    "/event-center",
    "/reservation-policy",
    "/contact",
    "/trade",
    "/privacy-policy",
  ].map((r) => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 }));

  const wineRoutes = listedWines.map((w) => ({ url: `${base}/wines/${w.slug}`, lastModified: new Date(), priority: 0.8 }));
  const packRoutes = bundles.map((b) => ({ url: `${base}/packs/${b.slug}`, lastModified: new Date(), priority: 0.8 }));
  const producerRoutes = producers.map((p) => ({ url: `${base}/producers/${p.slug}`, lastModified: new Date(), priority: 0.6 }));

  return [...routes, ...wineRoutes, ...packRoutes, ...producerRoutes];
}
