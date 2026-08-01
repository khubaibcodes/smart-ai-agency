import { AGENCY } from "@/lib/constants";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: AGENCY.name,
    url: AGENCY.domain,
    logo: `${AGENCY.domain}/favicon.svg`,
    description:
      "AI automation agency providing RAG agents, Voice AI, n8n workflows, SharePoint integration, and custom AI solutions.",
    sameAs: [AGENCY.linkedin.url],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: AGENCY.email,
      areaServed: ["US", "UK", "Europe", "Middle East", "Africa", "NZ"],
      availableLanguage: ["en"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: AGENCY.location.city,
      addressRegion: AGENCY.location.region,
      addressCountry: "NZ",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: AGENCY.name,
    url: AGENCY.domain,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfessionalServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: AGENCY.name,
    url: AGENCY.domain,
    email: AGENCY.email,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: AGENCY.location.city,
      addressCountry: "NZ",
    },
    serviceType: [
      "AI Automation",
      "RAG Agents",
      "Voice AI",
      "Workflow Automation",
      "SharePoint Integration",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqSchema({ items }: { items: { question: string; answer: string }[] }) {
  const schema = {
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
