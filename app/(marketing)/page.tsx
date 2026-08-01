import { createPageMetadata } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import TechBar from "@/components/sections/TechBar";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ClaudeSection from "@/components/sections/ClaudeSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = createPageMetadata({
  title: "Smart AI Solutions | Intelligent AI Automation",
  description:
    "Expert AI automation agency — RAG agents, Voice AI, Claude-powered bots, n8n workflows, and SharePoint integration for international clients.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechBar />
      <ServicesPreview />
      <ClaudeSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <ResourcesSection />
    </>
  );
}
