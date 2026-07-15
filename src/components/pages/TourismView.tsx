import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { EditorialBody } from "@/components/editorial/EditorialBody";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { getPage, tours, FALLBACK_IMAGE } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { IMG } from "@/lib/images";

type Fact = { term: string; detail: string };
type Copy = {
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  expEyebrow: string;
  expTitle: string;
  reserveEyebrow: string;
  reserveTitle: string;
  reserveIntro: string;
  facts: Fact[];
  policyBefore: string;
  policyLink: string;
  policyHref: string;
  policyAfter: string;
  formSubject: string;
};

// Tour facts mirror the real reddelvino.com/turismo tour page verbatim.
const COPY: Record<Locale, Copy> = {
  en: {
    heroEyebrow: "Visit Colchagua",
    heroTitle: "Wine Tastings & Tours",
    heroIntro: "Experience the valley where our wines are born — guided tastings, vineyard tours, bikes and kayaks.",
    expEyebrow: "Experiences",
    expTitle: "Ways to spend a day in the vines",
    reserveEyebrow: "Book a Visit",
    reserveTitle: "Reserve your tour",
    reserveIntro:
      "Our vineyard tour runs every day and visits one private family estate in the valley. Tell us your preferred date and group size and our team will confirm your visit.",
    facts: [
      { term: "Hours", detail: "Every day, 10:00–18:00" },
      { term: "Duration", detail: "Approx. 1 hour" },
      { term: "Price", detail: "CLP 10,000 per person (≈ USD 13)" },
      { term: "Payment", detail: "At the start of the tour — bank transfer or cash" },
      { term: "Language", detail: "Spanish" },
      { term: "Includes", detail: "One private vineyard in Patagua, Chépica, Palmilla, Nancagua or Peralillo" },
      { term: "Not included", detail: "Transport" },
    ],
    policyBefore: "Please review our ",
    policyLink: "reservation policy",
    policyHref: "/reservation-policy",
    policyAfter: " before booking.",
    formSubject: "Wine tour · Colchagua",
  },
  es: {
    heroEyebrow: "Visita Colchagua",
    heroTitle: "Catas y Tours de Vino",
    heroIntro: "Vive el valle donde nacen nuestros vinos — catas guiadas, tours por los viñedos, bicicletas y kayaks.",
    expEyebrow: "Experiencias",
    expTitle: "Formas de pasar un día entre las viñas",
    reserveEyebrow: "Reserva una visita",
    reserveTitle: "Reserva tu tour",
    reserveIntro:
      "Nuestro tour vitivinícola se realiza todos los días y visita un viñedo privado del valle. Cuéntanos la fecha que prefieres y el número de personas, y nuestro equipo confirmará tu visita.",
    facts: [
      { term: "Horario", detail: "Todos los días, 10:00–18:00" },
      { term: "Duración", detail: "Aproximadamente 1 hora" },
      { term: "Valor", detail: "CLP 10,000 por persona (≈ USD 13)" },
      { term: "Pago", detail: "Al inicio del tour — transferencia o efectivo" },
      { term: "Idioma", detail: "Español" },
      { term: "Incluye", detail: "Un viñedo privado en Patagua, Chépica, Palmilla, Nancagua o Peralillo" },
      { term: "No incluye", detail: "Transporte" },
    ],
    policyBefore: "Revisa nuestra ",
    policyLink: "política de reservas",
    policyHref: "/es/reservation-policy",
    policyAfter: " antes de reservar.",
    formSubject: "Tour del vino · Colchagua",
  },
};

export function TourismView({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
  const page = getPage("tourism-colchagua-chile");
  const blocks = page ? page.blocks.filter((b) => b.type === "text" || b.type === "eyebrow") : [];

  return (
    <>
      <PageHero eyebrow={c.heroEyebrow} title={c.heroTitle} image={IMG.tourGlass} intro={c.heroIntro} />

      {blocks.length > 0 && <EditorialBody blocks={blocks} />}

      <section className="bg-bone-warm py-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{c.expEyebrow}</p>
            <h2 className="mt-3 font-serif text-display-md font-light">{c.expTitle}</h2>
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
            <p className="eyebrow">{c.reserveEyebrow}</p>
            <h2 className="mt-3 font-serif text-display-md font-light">{c.reserveTitle}</h2>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-charcoal-soft">{c.reserveIntro}</p>
            <dl className="mt-8 max-w-md divide-y divide-charcoal/10 border-t border-charcoal/10">
              {c.facts.map((f) => (
                <div key={f.term} className="grid grid-cols-[110px_1fr] gap-4 py-4">
                  <dt className="eyebrow text-charcoal/40">{f.term}</dt>
                  <dd className="font-sans text-sm leading-relaxed text-charcoal-soft">{f.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-charcoal-soft">
              {c.policyBefore}
              <Link href={c.policyHref} className="link-underline text-oxblood">{c.policyLink}</Link>
              {c.policyAfter}
            </p>
          </div>
          <InquiryForm variant="reservation" subject={c.formSubject} />
        </div>
      </section>
    </>
  );
}
