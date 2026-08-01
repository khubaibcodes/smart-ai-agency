import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import StatsGrid from "@/components/common/StatsGrid";
import MissionSection from "@/components/sections/MissionSection";
import TeamSection from "@/components/sections/TeamSection";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionBadge from "@/components/ui/section-badge";
import { Button } from "@/components/ui/button";
import { ABOUT_STATS } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "About Smart AI Solutions — who we are, our mission, and the team behind your AI automation projects.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge={<SectionBadge>Who We Are</SectionBadge>}
        title={
          <>
            Building AI That <span className="gradient-text">Actually Works</span>
          </>
        }
        description="We're a boutique AI engineering studio helping international businesses automate intelligently — with production-grade systems, not slide-deck demos."
      />

      <section className="section-padding">
        <div className="container-site">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold md:text-4xl">
                A studio focused on <span className="gradient-text">real outcomes</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Unlike large consultancies, we stay small and hands-on. Every project is handled by
                senior engineers who understand both the business problem and the technical
                implementation.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                From RAG document agents to voice-powered workflows and SharePoint automation, we
                deliver systems your team will actually use — and maintain.
              </p>
              <Button asChild className="mt-8">
                <Link href="/contact">Work With Us</Link>
              </Button>
            </div>
            <StatsGrid stats={ABOUT_STATS} className="mx-auto w-full max-w-md lg:max-w-none" />
          </div>
        </div>
      </section>

      <MissionSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
