import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { RESOURCE_CARDS } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResourcesSection() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <SectionHeader
          badge={
            <SectionBadge>
              <BookOpen className="size-4" />
              Learn & Build
            </SectionBadge>
          }
          title={
            <>
              AI Automation <span className="gradient-text">Resources</span>
            </>
          }
          subtitle="Expert guides, case studies, and implementation tips to help you succeed with AI."
        />

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {RESOURCE_CARDS.map((resource, index) => (
            <AnimateOnScroll key={resource.title} delay={index * 80}>
              <Card className="h-full text-center sm:text-left">
                <CardHeader className="items-center sm:items-start">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <ServiceIcon name={resource.icon} className="size-6" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                  <Link
                    href={resource.href}
                    className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-primary hover:underline sm:justify-start"
                  >
                    {resource.cta} <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-5 text-muted-foreground">Want personalized guidance on your specific use case?</p>
          <Button asChild size="lg">
            <Link href="/contact">Schedule Free Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
