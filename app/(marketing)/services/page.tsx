import { Sparkles } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ServiceDetailSection from "@/components/sections/ServiceDetailSection";
import CTASection from "@/components/sections/CTASection";
import SectionBadge from "@/components/ui/section-badge";

export const metadata = createPageMetadata({
  title: "AI Services",
  description:
    "RAG Agents, Voice AI, Claude-powered agents, n8n automation, SharePoint integration, and custom AI solutions.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge={
          <SectionBadge>
            <Sparkles className="size-4" />
            What We Offer
          </SectionBadge>
        }
        title={
          <>
            Our <span className="gradient-text">AI Services</span>
          </>
        }
        description="Every solution we build is designed to save time, reduce friction, and scale with your business."
      />
      <ServiceDetailSection />
      <CTASection />
    </>
  );
}
