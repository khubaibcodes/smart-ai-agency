import { AGENCY, SERVICES } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site-url";
import type { FaqItem } from "@/lib/types";

/**
 * Structured data for the site.
 *
 * Everything is emitted as one linked graph rather than a pile of loose
 * objects: `@id`s let Organization, LocalBusiness and each Service reference
 * one another, which is what lets a search or answer engine treat them as
 * facts about a single business instead of three unrelated blobs.
 *
 * The agency sells GEO/AEO work, so the markup here is also a sample of it.
 * Every claim below is one the site itself can stand behind — no invented
 * ratings, no review counts, no fabricated opening hours.
 */

const ORG_ID = `${AGENCY.domain}/#organization`;
const SITE_ID = `${AGENCY.domain}/#website`;
const BUSINESS_ID = `${AGENCY.domain}/#localbusiness`;

function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // Slashes are escaped so a "</script>" inside any string can't close
      // the tag early. JSON.stringify alone does not protect against that.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: AGENCY.location.city,
  addressRegion: AGENCY.location.region,
  addressCountry: "NZ",
} as const;

const SAME_AS = [AGENCY.linkedin.url, AGENCY.instagram.url, AGENCY.github.url];

export function OrganizationSchema() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: AGENCY.name,
        url: AGENCY.domain,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/favicon.svg"),
        },
        image: absoluteUrl("/opengraph-image"),
        description:
          "AI automation agency building voice agents, messaging and email agents, document Q&A and workflow automation for growing businesses.",
        slogan: AGENCY.tagline,
        sameAs: SAME_AS,
        email: AGENCY.email,
        telephone: AGENCY.phoneTel,
        address: POSTAL_ADDRESS,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Sales",
          email: AGENCY.email,
          telephone: AGENCY.phoneTel,
          areaServed: ["NZ", "AU", "US", "GB", "EU"],
          availableLanguage: ["en"],
        },
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": SITE_ID,
        name: AGENCY.name,
        url: AGENCY.domain,
        publisher: { "@id": ORG_ID },
        inLanguage: "en",
      }}
    />
  );
}

/**
 * LocalBusiness — the NZ footprint.
 *
 * `ProfessionalService` is the LocalBusiness subtype that actually fits an
 * agency, and it inherits every LocalBusiness property. `geo` is the city
 * centroid, which is honest for a business without a walk-in storefront;
 * `priceRange` stays a coarse band because the site deliberately quotes no
 * fixed prices.
 */
export function LocalBusinessSchema() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: AGENCY.name,
        url: AGENCY.domain,
        parentOrganization: { "@id": ORG_ID },
        image: absoluteUrl("/opengraph-image"),
        description:
          "AI automation studio in Palmerston North, New Zealand, building voice agents, messaging agents and workflow automation for businesses locally and worldwide.",
        email: AGENCY.email,
        telephone: AGENCY.phoneTel,
        address: POSTAL_ADDRESS,
        geo: {
          "@type": "GeoCoordinates",
          latitude: -40.3523,
          longitude: 175.6082,
        },
        areaServed: [
          { "@type": "City", name: AGENCY.location.city },
          { "@type": "Country", name: "New Zealand" },
          { "@type": "Place", name: AGENCY.availability },
        ],
        sameAs: SAME_AS,
        priceRange: "$$",
        currenciesAccepted: "NZD",
        knowsAbout: [
          "AI voice agents",
          "Conversational AI",
          "Retrieval-augmented generation",
          "Workflow automation",
          "WhatsApp Business automation",
          "SharePoint integration",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI automation services",
          itemListElement: SERVICES.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              url: absoluteUrl(`/services#${service.id}`),
            },
          })),
        },
      }}
    />
  );
}

/**
 * One Service node per offering, each pointing back at the provider.
 *
 * Emitted on the services page, where the matching copy actually lives —
 * structured data describing content that isn't on the page is the fastest
 * way to lose trust with a validator.
 */
export function ServicesSchema() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@graph": SERVICES.map((service) => ({
          "@type": "Service",
          "@id": absoluteUrl(`/services#${service.id}`),
          name: service.title,
          description: service.paragraphs[0],
          serviceType: service.badge,
          url: absoluteUrl(`/services#${service.id}`),
          provider: { "@id": ORG_ID },
          areaServed: [
            { "@type": "Country", name: "New Zealand" },
            { "@type": "Place", name: AGENCY.availability },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} — what's included`,
            itemListElement: service.features.map((feature) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: feature },
            })),
          },
        })),
      }}
    />
  );
}

/** A single Service node, for a page dedicated to one offering. */
export function ServiceSchema({
  id,
  name,
  description,
  path,
}: {
  id: string;
  name: string;
  description: string;
  path: string;
}) {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${absoluteUrl(path)}#${id}`,
        name,
        description,
        url: absoluteUrl(path),
        provider: { "@id": ORG_ID },
        areaServed: [
          { "@type": "Country", name: "New Zealand" },
          { "@type": "Place", name: AGENCY.availability },
        ],
      }}
    />
  );
}

/**
 * BreadcrumbList. Home is always the first crumb, so callers pass only the
 * trail below it.
 */
export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  const items = [{ name: "Home", path: "/" }, ...trail];

  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

/** Kept as a named export for the root layout's existing import. */
export const ProfessionalServiceSchema = LocalBusinessSchema;
