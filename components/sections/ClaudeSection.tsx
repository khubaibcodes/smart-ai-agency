import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import { CLAUDE_OFFERINGS, CLAUDE_SECTION } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClaudeSection() {
  return (
    <section className="section-padding bg-brand-bg-2">
      <div className="container-site">
        <SectionHeader
          badge={
            <SectionBadge>
              <Brain className="size-4" />
              Claude AI Powered
            </SectionBadge>
          }
          title={
            <>
              {CLAUDE_SECTION.titleLead}{" "}
              <span className="gradient-text">{CLAUDE_SECTION.titleAccent}</span>{" "}
              {CLAUDE_SECTION.titleTail}
            </>
          }
          subtitle={CLAUDE_SECTION.subtitle}
        />

        <div className="mb-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/contact">
              Start a Claude Project <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {CLAUDE_OFFERINGS.map((offering, index) => (
            <AnimateOnScroll key={offering.title} delay={index * 70}>
              <Card className="h-full bg-brand-card text-center sm:text-left">
                <CardHeader className="items-center sm:items-start">
                  <CardTitle className="text-lg">{offering.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{offering.description}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    {offering.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
