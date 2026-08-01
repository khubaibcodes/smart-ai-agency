import { createPageMetadata } from "@/lib/seo";
import LegalDocument from "@/components/layout/LegalDocument";
import PageHero from "@/components/sections/PageHero";
import SectionBadge from "@/components/ui/section-badge";
import { PRIVACY_SECTIONS } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy — Smart AI Solutions. How we collect, use, and protect your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        badge={<SectionBadge>Legal</SectionBadge>}
        title="Privacy Policy"
        description="How we collect, use, and safeguard your information."
      />
      <LegalDocument title="Privacy Policy" updated="August 2026" sections={PRIVACY_SECTIONS} />
    </>
  );
}
