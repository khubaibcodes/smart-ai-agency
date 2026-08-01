import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HOME_SERVICE_HIGHLIGHTS } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServicesPreview() {
  return (
    <section id="services" className="section-padding scroll-mt-[var(--navbar-h)]">
      <div className="container-site">
        <SectionHeader
          badge={
            <SectionBadge>
              <Sparkles className="size-4" />
              What We Build
            </SectionBadge>
          }
          title={
            <>
              AI Solutions That <span className="gradient-text">Work For You</span>
            </>
          }
          subtitle="From intelligent document search to hands-free voice commands — we deliver automation that fits your workflow perfectly."
        />

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {HOME_SERVICE_HIGHLIGHTS.map((service, index) => (
            <AnimateOnScroll key={service.id} delay={index * 80}>
              <Card className="h-full border-border/80 bg-brand-card text-center transition-colors hover:border-brand-primary/30 hover:bg-brand-elevated sm:text-left">
                <CardHeader className="items-center sm:items-start">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-primary hover:underline sm:justify-start"
                  >
                    Learn more <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
