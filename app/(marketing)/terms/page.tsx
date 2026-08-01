import { createPageMetadata } from "@/lib/seo";
import LegalDocument from "@/components/layout/LegalDocument";
import PageHero from "@/components/sections/PageHero";
import SectionBadge from "@/components/ui/section-badge";
import { TERMS_SECTIONS } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of Service — Smart AI Solutions website and professional services agreement.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        badge={<SectionBadge>Legal</SectionBadge>}
        title="Terms of Service"
        description="Terms governing use of our website and engagement of our services."
      />
      <LegalDocument title="Terms of Service" updated="August 2026" sections={TERMS_SECTIONS} />
    </>
  );
}
