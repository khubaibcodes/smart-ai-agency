import { DollarSign } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import SectionBadge from "@/components/ui/section-badge";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Transparent AI automation pricing — Starter, Professional, and Enterprise plans for RAG agents, Voice AI, and workflow automation.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        badge={
          <SectionBadge>
            <DollarSign className="size-4" />
            Transparent Pricing
          </SectionBadge>
        }
        title={
          <>
            Plans That <span className="gradient-text">Scale With You</span>
          </>
        }
        description="Clear pricing for every stage — from focused automations to enterprise deployments. Every plan includes a free discovery call."
      />
      <PricingSection sectionId="plans" showHeader={false} />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
