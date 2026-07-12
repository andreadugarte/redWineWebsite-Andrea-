import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { producers, getProducer, wines, FALLBACK_IMAGE, localizeProducer } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return producers.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const producer = getProducer(params.slug, "es");
  if (!producer) return {};
  return {
    title: producer.name,
    description: `${producer.name}${producer.winery ? ` · ${producer.winery}` : ""} — productor de vino de comercio justo en el Valle de Colchagua.`,
    alternates: {
      canonical: `/es/producers/${params.slug}`,
      languages: { en: `/producers/${params.slug}`, es: `/es/producers/${params.slug}` },
    },
  };
}

export default function ProducerDetailEs({ params }: { params: { slug: string } }) {
  const producer = getProducer(params.slug, "es");
  if (!producer) notFound();

  const relatedWines = wines.filter((w) => producer.varietals.includes(w.varietal));
  const tc = (s: string) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
  const others = producers.filter((p) => p.slug !== producer.slug && p.status !== "inactive").slice(0, 2);

  return (
    <article className="pt-24">
      <div className="container-x py-12 md:py-20">
        <Link href="/es/producers" className="link-underline font-sans text-xs uppercase tracking-[0.16em] text-charcoal/50">
          ← {t("producer.allProducers", "es")}
        </Link>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_2fr]">
          <div>
            {producer.portrait && (
              <div className="sticky top-32">
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/5">
                  <Image
                    src={producer.portrait.src || FALLBACK_IMAGE}
                    alt={tc(producer.name)}
                    fill
                    priority
                    className="object-cover grayscale"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow">{t("producers.detailEyebrow", "es")}</p>
            <h1 className="mt-3 font-serif text-display-md font-light">{tc(producer.name)}</h1>
            {producer.winery && <p className="mt-2 font-serif text-2xl italic text-charcoal/60">{producer.winery}</p>}
            <p className="mt-6 font-sans text-sm uppercase tracking-[0.12em] text-charcoal/60">{producer.varietals.join(" · ")}</p>

            {producer.status === "inactive" && (
              <div className="mt-12 border-l-2 border-oxblood pl-6">
                <p className="font-serif text-lg italic text-oxblood">{t("producer.inactiveNotice", "es")}</p>
              </div>
            )}

            <div className="mt-12 border-t border-charcoal/10 pt-8">
              {producer.bio.map((para, i) => (
                <Reveal as="p" key={i} delay={i * 0.05} className="mt-6 font-sans leading-relaxed text-charcoal-soft first:mt-0">
                  {para}
                </Reveal>
              ))}
            </div>

            {relatedWines.length > 0 && (
              <div className="mt-12 border-t border-charcoal/10 pt-8">
                <p className="eyebrow">{t("producer.relatedWines", "es")}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {relatedWines.map((w) => (
                    <Link key={w.slug} href={`/es/wines/${w.slug}`} className="group block transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                      <div className="relative aspect-[3/4] overflow-hidden bg-bone-warm">
                        <Image src={w.image?.src || FALLBACK_IMAGE} alt={w.name} fill sizes="25vw" className="object-contain p-8 group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <p className="mt-3 eyebrow">{w.varietal}</p>
                      <p className="font-serif text-lg">{w.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {others.length > 0 && (
          <div className="mt-24 border-t border-charcoal/10 pt-16">
            <p className="eyebrow">{t("producer.nextProducer", "es")}</p>
            <div className="mt-8 grid gap-12 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/es/producers/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
                    <Image
                      src={p.portrait?.src || FALLBACK_IMAGE}
                      alt={tc(p.name)}
                      fill
                      sizes="40vw"
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 font-serif text-xl leading-tight">{tc(p.name)}</p>
                  {p.winery && <p className="font-serif text-sm italic text-charcoal/60">{p.winery}</p>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
