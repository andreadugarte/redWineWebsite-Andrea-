import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { EditorialBody } from "@/components/editorial/EditorialBody";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { getPage } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Event Center",
  description: "Weddings, christenings, celebrations and corporate events at a rustic vineyard Event Center minutes from Santa Cruz in Palmilla, Colchagua.",
};

export default function EventCenterPage() {
  const page = getPage("event-center");
  const blocks = page ? page.blocks.filter((b) => b.type !== "image") : [];
  const firstHeadingIdx = blocks.findIndex((b) => b.type === "heading");
  const body = firstHeadingIdx >= 0 ? blocks.filter((_, i) => i !== firstHeadingIdx) : blocks;

  return (
    <>
      <PageHero
        eyebrow="Celebrate in the Vineyard"
        title="Event Center"
        image={IMG.eventCenter}
        intro="A tranquil, private space set in the countryside on a vineyard — minutes from Santa Cruz in Palmilla."
      />
      <EditorialBody blocks={body} galleryImages={[IMG.eventGallery, IMG.eventCenter]} />

      <section className="bg-oxblood py-24 text-bone">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold-soft">Enquire</p>
            <h2 className="mt-3 font-serif text-display-md font-light">Plan your celebration</h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-bone/80">
              Capacity from 50 to 200 guests, with catering, furniture and full event services. Send us your details and we&apos;ll be in touch.
            </p>
          </div>
          <div className="bg-bone p-8 text-charcoal md:p-10">
            <InquiryForm variant="event" subject="Event Center enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
