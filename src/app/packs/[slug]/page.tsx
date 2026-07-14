import type { Metadata } from "next";
import { bundles, getBundle } from "@/lib/content";
import { BundleDetailView } from "@/components/bundles/BundleDetailView";

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBundle(params.slug);
  if (!b) return {};
  return { title: b.name, description: b.description };
}

export default function BundleDetailPage({ params }: { params: { slug: string } }) {
  return <BundleDetailView slug={params.slug} locale="en" />;
}
