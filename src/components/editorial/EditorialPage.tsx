import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { EditorialBody } from "@/components/editorial/EditorialBody";
import { getPage } from "@/lib/content";

export function EditorialPage({
  slug,
  eyebrow,
  heroImage,
  intro,
  galleryImages = [],
  children,
}: {
  slug: string;
  eyebrow: string;
  heroImage?: string;
  intro?: string;
  galleryImages?: string[];
  children?: React.ReactNode;
}) {
  const page = getPage(slug);
  if (!page) notFound();

  // Skip the first heading (it becomes the hero title) to avoid duplication.
  const firstHeadingIdx = page.blocks.findIndex((b) => b.type === "heading");
  const blocks = firstHeadingIdx >= 0 ? page.blocks.filter((_, i) => i !== firstHeadingIdx) : page.blocks;

  return (
    <>
      <PageHero eyebrow={eyebrow} title={page.hero_heading} image={heroImage || page.hero_image?.src} intro={intro} />
      <EditorialBody blocks={blocks} galleryImages={galleryImages} />
      {children}
    </>
  );
}
