import { createPageMetadata } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import TechBar from "@/components/sections/TechBar";
import BookingWebsites from "@/components/sections/BookingWebsites";
import BentoServices from "@/components/sections/BentoServices";
import WorkflowGraph from "@/components/sections/WorkflowGraph";
import ClaudeSection from "@/components/sections/ClaudeSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = createPageMetadata({
  title: "Smart AI Solutions | Intelligent AI Automation",
  description:
    "AI agents that answer your calls, reply to WhatsApp and email, and clear repetitive admin around the clock. Voice, messaging, document and workflow automation for growing businesses.",
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
      <BookingWebsites />
      <BentoServices />
      <WorkflowGraph />
      <ClaudeSection />
      <TestimonialsSection />
      <CTASection />
      <ResourcesSection />
    </>
  );
}
