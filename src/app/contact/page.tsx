import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit or contact Red del Vino at ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}, Chile.`,
};

const mapQuery = encodeURIComponent(
  `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}, ${SITE.address.country}`
);

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in Touch" title="Contact Us" image={IMG.office} />

      <section className="bg-bone py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal as="div" className="space-y-10">
            <Detail label="Address">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.region}
              <br />
              {SITE.address.country}
            </Detail>
            <Detail label="General">
              <a href={`mailto:${SITE.email}`} className="link-underline">{SITE.email}</a>
            </Detail>
            <Detail label="Reservations">
              <a href={`mailto:${SITE.reservationsEmail}`} className="link-underline">{SITE.reservationsEmail}</a>
            </Detail>
            <Detail label="Follow">
              <a href={SITE.facebook} className="link-underline">Facebook</a>
              <span className="mx-2 text-charcoal/30">·</span>
              <a href={SITE.instagram} className="link-underline">Instagram</a>
            </Detail>
          </Reveal>

          <Reveal as="div">
            <h2 className="font-serif text-3xl font-light md:text-4xl">Send us a message</h2>
            <div className="mt-8">
              <InquiryForm variant="contact" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[420px] w-full">
        <iframe
          title="Red del Vino location"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-full w-full grayscale-[0.3]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-charcoal/40">{label}</p>
      <p className="mt-3 font-serif text-2xl leading-snug text-charcoal">{children}</p>
    </div>
  );
}
