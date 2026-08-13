import { createPageMetadata } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import TechBar from "@/components/sections/TechBar";
import BentoServices from "@/components/sections/BentoServices";
import WorkflowGraph from "@/components/sections/WorkflowGraph";
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

/**
 * Section order alternates texture deliberately: atmospheric hero, dense
 * marquee, open bento, then the pipeline band. Previously six card grids ran
 * back to back and the page read as one long template.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechBar />
      <BentoServices />
      <WorkflowGraph />
      <ClaudeSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <ResourcesSection />
    </>
  );
}
