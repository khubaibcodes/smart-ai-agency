import { createPageMetadata, DEFAULT_TITLE } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import TechBar from "@/components/sections/TechBar";
import VoiceDemo from "@/components/sections/VoiceDemo";
import SectionHeader from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import BookingWebsites from "@/components/sections/BookingWebsites";
import BentoServices from "@/components/sections/BentoServices";
import IndustriesSection from "@/components/sections/IndustriesSection";
import ExamplesSection from "@/components/sections/ExamplesSection";
import WorkflowGraph from "@/components/sections/WorkflowGraph";
import ClaudeSection from "@/components/sections/ClaudeSection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import FaqSection from "@/components/sections/FaqSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = createPageMetadata({
  title: DEFAULT_TITLE,
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

      {/* Voice is the service clients ask for by name, so the homepage lets
          visitors try it before it explains anything else. */}
      <section id="demo" className="scroll-mt-[var(--navbar-h)] section-padding">
        <div className="container-site">
          <SectionHeader
            title={
              <>
                The call you just <span className="gradient-text">missed</span>
              </>
            }
            subtitle="Pick a business like yours and play the call through. Scripted demo — the same shape as the calls a live agent handles."
          />
          <div className="mx-auto max-w-5xl">
            <VoiceDemo />
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/voice-agents">
                How voice agents work
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BookingWebsites />
      <BentoServices />
      <IndustriesSection />
      <WorkflowGraph />
      {/* ExamplesSection replaces StoriesSection: the three client stories had
          no client sign-off, so until a verified story exists this shows
          clearly-labelled illustrative scenarios instead. */}
      <ExamplesSection />
      <ClaudeSection />
      {/* The FAQ carries this page's FAQPage markup — the questions an answer
          engine is most likely to quote, on the URL most likely to be cited.
          /contact shows the same questions for visitors but leaves the schema
          to this page so the two don't compete for the same query. */}
      <FaqSection
        subtitle="The questions we get asked before every project starts."
      />
      <CTASection />
      <ResourcesSection />
    </>
  );
}
