import { Sparkles } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ServiceDetailSection from "@/components/sections/ServiceDetailSection";
import CTASection from "@/components/sections/CTASection";
import SectionBadge from "@/components/ui/section-badge";

export const metadata = createPageMetadata({
  title: "AI Services",
  description:
    "Voice agents that answer every call, WhatsApp and email agents that reply instantly, instant answers from your own documents, and fully-managed automation.",
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
            The work you stop <span className="gradient-text">doing by hand</span>
          </>
        }
        description="Calls answered, messages replied to, inboxes cleared, documents searchable. Pick the job that costs your team the most time — we'll start there."
      />
      <ServiceDetailSection />
      <CTASection />
    </>
  );
}
