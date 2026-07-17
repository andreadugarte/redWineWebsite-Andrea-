import type { Metadata } from "next";
import { producers, getProducer } from "@/lib/content";
import { ProducerDetailView } from "@/components/producers/ProducerDetailView";

const tc = (s: string) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export function generateStaticParams() {
  return producers.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProducer(params.slug, "pt");
  if (!p) return {};
  return {
    title: tc(p.name),
    description: p.bio[0]?.slice(0, 160),
    alternates: {
      canonical: `/pt/producers/${params.slug}`,
      languages: {
        en: `/producers/${params.slug}`,
        es: `/es/producers/${params.slug}`,
        pt: `/pt/producers/${params.slug}`,
        zh: `/zh/producers/${params.slug}`,
      },
    },
  };
}

export default function ProducerDetailPagePt({ params }: { params: { slug: string } }) {
  return <ProducerDetailView slug={params.slug} locale="pt" />;
}
