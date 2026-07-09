import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { EditorialBody } from "@/components/editorial/EditorialBody";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { getPage, tours, FALLBACK_IMAGE } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Wine Tourism",
  description: "Tastings, viticultural tours, bike and kayak rentals in the Colchagua Valley with Red del Vino.",
};

export default function TourismPage() {
  const page = getPage("tourism-colchagua-chile");
  const blocks = page ? page.blocks.filter((b) => b.type === "text" || b.type === "eyebrow") : [];

  return (
    <>
      <PageHero
        eyebrow="Visit Colchagua"
        title="Wine Tastings & Tours"
        image={IMG.tourGlass}
        intro="Experience the valley where our wines are born — guided tastings, vineyard tours, bikes and kayaks."
      />

      {blocks.length > 0 && <EditorialBody blocks={blocks} />}

      <section className="bg-bone-warm py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Experiences</p>
            <h2 className="mt-3 font-serif text-display-md font-light">Ways to spend a day in the vines</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {tours.map((t, i) => (
              <Reveal as="div" key={t.slug} delay={i * 0.06}>
                <div className="group relative overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={t.image?.src || FALLBACK_IMAGE}
                      alt={t.name}
                      fill
                      sizes="(max-width:640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                    <h3 className="absolute bottom-5 left-6 font-serif text-3xl text-bone">{t.name}</h3>
                  </div>
                  {t.body[0] && <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-charcoal-soft">{t.body[0]}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-24">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Book a Visit</p>
            <h2 className="mt-3 font-serif text-display-md font-light">Reserve your tasting</h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-charcoal-soft">
              Tell us your preferred date and group size and our team will confirm availability. Please review our{" "}
              <Link href="/reservation-policy" className="link-underline text-oxblood">reservation policy</Link> before booking.
            </p>
          </div>
          <InquiryForm variant="reservation" subject="Wine tasting / tour" />
        </div>
      </section>
    </>
  );
}
