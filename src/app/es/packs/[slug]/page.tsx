import type { Metadata } from "next";
import BundleDetail, { generateStaticParams as genParams } from "@/app/packs/[slug]/page";
import { getBundle, localizeBundle } from "@/lib/content";

export function generateStaticParams() {
  return genParams();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBundle(params.slug);
  if (!b) return {};
  const es = localizeBundle(b, "es");
  return {
    title: es.name,
    description: es.description,
    alternates: {
      canonical: `/es/packs/${params.slug}`,
      languages: { en: `/packs/${params.slug}`, es: `/es/packs/${params.slug}` },
    },
  };
}

export default function BundleDetailEs({ params }: { params: { slug: string } }) {
  return <BundleDetail params={params} locale="es" />;
}
