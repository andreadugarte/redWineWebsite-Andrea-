import type { Metadata } from "next";
import { bundles, getBundle, localizeBundle } from "@/lib/content";
import { BundleDetailView } from "@/components/bundles/BundleDetailView";

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBundle(params.slug);
  if (!b) return {};
  const pt = localizeBundle(b, "pt");
  return {
    title: pt.name,
    description: pt.description,
    alternates: {
      canonical: `/pt/packs/${params.slug}`,
      languages: {
        en: `/packs/${params.slug}`,
        es: `/es/packs/${params.slug}`,
        pt: `/pt/packs/${params.slug}`,
        zh: `/zh/packs/${params.slug}`,
      },
    },
  };
}

export default function BundleDetailPagePt({ params }: { params: { slug: string } }) {
  return <BundleDetailView slug={params.slug} locale="pt" />;
}
