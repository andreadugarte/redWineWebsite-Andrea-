import Image from "next/image";
import { FALLBACK_IMAGE } from "@/lib/content";

/** Compact cinematic hero for interior pages. */
export function PageHero({
  eyebrow,
  title,
  image,
  intro,
}: {
  eyebrow: string;
  title: string;
  image?: string | null;
  intro?: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-32">
      <Image src={image || FALLBACK_IMAGE} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-oxblood-deep/85 via-charcoal/40 to-charcoal/30" />
      <div className="container-x relative z-10">
        <p className="eyebrow text-gold-pale">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-display-lg font-light text-bone">{title}</h1>
        {intro && <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-bone/80">{intro}</p>}
      </div>
    </section>
  );
}
