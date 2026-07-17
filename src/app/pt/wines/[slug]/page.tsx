import type { Metadata } from "next";
import { wines, getWine } from "@/lib/content";
import { WineDetailView } from "@/components/wines/WineDetailView";

export function generateStaticParams() {
  return wines.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const wine = getWine(params.slug, "pt");
  if (!wine) return {};
  return {
    title: wine.name,
    description: wine.description,
    openGraph: { images: wine.image ? [wine.image.src] : [] },
    alternates: {
      canonical: `/pt/wines/${params.slug}`,
      languages: {
        en: `/wines/${params.slug}`,
        es: `/es/wines/${params.slug}`,
        pt: `/pt/wines/${params.slug}`,
        zh: `/zh/wines/${params.slug}`,
      },
    },
  };
}

export default function WineDetailPagePt({ params }: { params: { slug: string } }) {
  return <WineDetailView slug={params.slug} locale="pt" />;
}
