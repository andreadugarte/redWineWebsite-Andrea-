"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Parallax } from "@/components/motion/Parallax";
import { Counter } from "@/components/motion/CounterScroll";
import { IMG } from "@/lib/images";

export function StoryIntro({ body }: { body: string }) {
  return (
    <section className="section-y bg-bone">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <Parallax className="relative aspect-[4/5] overflow-hidden" distance={60}>
            <Image src={IMG.grower} alt="A Colchagua wine grower in the vineyard" fill className="scale-110 object-cover" sizes="(max-width:1024px) 100vw, 45vw" />
          </Parallax>
          <div className="absolute -bottom-8 -right-4 hidden w-48 bg-oxblood p-6 text-bone md:block lg:-right-10">
            <Image src={IMG.fairtradeBadge} alt="Fairtrade certified" width={64} height={64} className="mb-3" />
            <p className="font-sans text-xs leading-relaxed">Fairtrade certified — the first certified peasant association in the region.</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Welcome to Red del Vino"
            title="Maintaining the traditions and identity of rural wine farmers."
          >
            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-charcoal-soft">{body}</p>
            <Link href="/story" className="mt-8 inline-block link-underline font-sans text-sm uppercase tracking-[0.14em] text-oxblood">
              Read our story
            </Link>
          </SectionHeading>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-charcoal/15 pt-10">
            <Stat n={2004} label="Founded" />
            <Stat n={19} label="Producer families" />
            <Stat n={1} label="Valley · Colchagua" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <p className="font-serif text-5xl text-oxblood">
        <Counter to={n} />
      </p>
      <p className="mt-2 font-sans text-xs uppercase tracking-[0.14em] text-charcoal/60">{label}</p>
    </div>
  );
}
