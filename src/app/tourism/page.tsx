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
            <h2 className="mt-3 font-serif text-display-md font-light">Reserve your tour</h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-charcoal-soft">
              Our vineyard tour runs every day and visits one of the family estates in the valley.
              Tell us your preferred date and group size and our team will confirm your visit.
            </p>
            <dl className="mt-8 max-w-md divide-y divide-charcoal/10 border-t border-charcoal/10">
              <TourFact term="Hours" detail="Every day, 10:00–18:00" />
              <TourFact term="Duration" detail="Approx. 1 hour" />
              <TourFact term="Price" detail="$10.000 CLP per person (≈ US$13)" />
              <TourFact term="Payment" detail="At the start of the tour — bank transfer or cash" />
              <TourFact term="Where" detail="One private vineyard in Patagua, Chépica, Palmilla, Nancagua or Peralillo" />
            </dl>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-charcoal-soft">
              Please review our{" "}
              <Link href="/reservation-policy" className="link-underline text-oxblood">reservation policy</Link> before booking.
            </p>
          </div>
          <InquiryForm variant="reservation" subject="Wine tour · Colchagua" />
        </div>
      </section>
    </>
  );
}

function TourFact({ term, detail }: { term: string; detail: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 py-4">
      <dt className="eyebrow text-charcoal/40">{term}</dt>
      <dd className="font-sans text-sm leading-relaxed text-charcoal-soft">{detail}</dd>
    </div>
  );
}
