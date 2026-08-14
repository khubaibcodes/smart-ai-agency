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
    "A small, senior AI studio that builds automation businesses actually use — and says no when AI isn't the answer.",
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
        description="A small, senior studio that builds automation businesses keep using after the novelty wears off — and tells you when AI isn't the answer."
      />

      <section className="section-padding">
        <div className="container-site">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold md:text-4xl">
                A studio focused on <span className="gradient-text">real outcomes</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Most AI projects fail quietly. They demo well, go live, and are abandoned within a
                quarter because nobody wanted the thing that got built. We stay small and hands-on
                so that doesn&apos;t happen: every project is run by senior engineers who understand
                the business problem before they touch the technology.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We start with the job that costs you the most time — the calls going unanswered, the
                inbox nobody has cleared, the folder everyone dreads searching — and automate that
                first. If AI isn&apos;t the right tool for it, we&apos;ll tell you so.
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
