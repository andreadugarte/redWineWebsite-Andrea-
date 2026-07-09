"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { KenBurns } from "@/components/motion/Parallax";
import type { Block } from "@/lib/content";

type Section = { eyebrow?: string; heading?: string; paragraphs: string[] };

function toSections(blocks: Block[]): { sections: Section[]; images: string[] } {
  const sections: Section[] = [];
  const images: string[] = [];
  let cur: Section | null = null;
  const push = () => {
    if (cur && (cur.heading || cur.paragraphs.length)) sections.push(cur);
    cur = null;
  };
  for (const b of blocks) {
    if (b.type === "image") {
      images.push(b.src);
      continue;
    }
    if (b.type === "eyebrow") {
      push();
      cur = { eyebrow: b.text, paragraphs: [] };
    } else if (b.type === "heading") {
      if (cur && cur.heading) push();
      if (!cur) cur = { paragraphs: [] };
      cur.heading = b.text;
    } else if (b.type === "text") {
      if (!cur) cur = { paragraphs: [] };
      cur.paragraphs.push(...b.paragraphs);
      push();
    }
  }
  push();
  return { sections, images };
}

export function EditorialBody({ blocks, galleryImages = [] }: { blocks: Block[]; galleryImages?: string[] }) {
  const { sections, images } = toSections(blocks);
  const pool = [...images, ...galleryImages];

  return (
    <div className="bg-bone py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          {sections.map((s, i) => (
            <Reveal as="section" key={i} className="mb-16 last:mb-0">
              {s.eyebrow && <p className="eyebrow mb-4">{s.eyebrow}</p>}
              {s.heading && (
                <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-charcoal md:text-4xl">{s.heading}</h2>
              )}
              <div className="space-y-5">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="font-sans text-base leading-relaxed text-charcoal-soft">{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {pool.length > 0 && (
        <div className="mt-24 grid gap-2 md:grid-cols-2">
          {pool.slice(0, 4).map((src, i) => (
            <KenBurns key={i} className="relative aspect-[4/3] overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </KenBurns>
          ))}
        </div>
      )}
    </div>
  );
}
