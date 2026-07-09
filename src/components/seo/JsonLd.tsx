import { SITE } from "@/lib/site";
import type { Wine } from "@/lib/content";

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        sameAs: [SITE.facebook, SITE.instagram],
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.region,
          addressCountry: "CL",
        },
      }}
    />
  );
}

export function ProductJsonLd({ wine }: { wine: Wine }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: `Red del Vino ${wine.name}`,
        image: wine.image?.src ? `${SITE.url}${wine.image.src}` : undefined,
        description: wine.description,
        brand: { "@type": "Brand", name: SITE.name },
        category: wine.varietal,
        offers: {
          "@type": "Offer",
          price: wine.price,
          priceCurrency: wine.currency,
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/wines/${wine.slug}`,
        },
      }}
    />
  );
}
