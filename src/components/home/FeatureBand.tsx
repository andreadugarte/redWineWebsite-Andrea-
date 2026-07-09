"use client";

import Image from "next/image";
import Link from "next/link";
import { KenBurns } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

/** Full-bleed cinematic band with a parallax image and overlaid editorial copy. */
export function FeatureBand({
  image,
  eyebrow,
  heading,
  body,
  cta,
  align = "left",
  tone = "dark",
}: {
  image: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta?: { label: string; href: string };
  align?: "left" | "right" | "center";
  tone?: "dark" | "light";
}) {
  const alignCls =
    align === "center" ? "items-center text-center mx-auto" : align === "right" ? "ml-auto text-left" : "text-left";
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <KenBurns className="absolute inset-0">
        <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
      </KenBurns>
      <div className={`absolute inset-0 ${tone === "dark" ? "bg-oxblood-deep/60" : "bg-bone/50"}`} />
      <div className="container-x relative z-10 flex min-h-[80vh] items-center py-24">
        <Reveal className={`flex max-w-xl flex-col ${alignCls}`}>
          <p className={`eyebrow ${tone === "dark" ? "text-gold-pale" : "text-oxblood"}`}>{eyebrow}</p>
          <h2 className={`mt-5 font-serif text-display-md font-light ${tone === "dark" ? "text-bone" : "text-charcoal"}`}>
            {heading}
          </h2>
          <p className={`mt-6 font-sans text-base leading-relaxed ${tone === "dark" ? "text-bone/80" : "text-charcoal-soft"}`}>
            {body}
          </p>
          {cta && (
            <div className="mt-9">
              <Link
                href={cta.href}
                className={tone === "dark" ? "btn border border-bone/60 px-8 py-4 text-bone hover:bg-bone hover:text-charcoal" : "btn-outline text-charcoal"}
              >
                {cta.label}
              </Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
