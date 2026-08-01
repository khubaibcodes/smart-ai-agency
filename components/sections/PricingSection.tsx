import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_TIERS } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PricingSection({
  sectionId = "pricing",
  showHeader = true,
}: {
  sectionId?: string;
  showHeader?: boolean;
}) {
  return (
    <section id={sectionId} className="section-padding scroll-mt-[var(--navbar-h)]">
      <div className="container-site">
        {showHeader ? (
          <SectionHeader
            badge={<SectionBadge>Transparent Pricing</SectionBadge>}
            title={
              <>
                Plans That <span className="gradient-text">Scale With You</span>
              </>
            }
            subtitle="Clear pricing for every stage — from focused automations to enterprise deployments."
          />
        ) : null}

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier, index) => (
            <AnimateOnScroll key={tier.name} delay={index * 90}>
              <Card
                className={cn(
                  "flex h-full flex-col text-center sm:text-left",
                  tier.featured && "border-brand-primary/40 shadow-[0_0_40px_rgba(217,161,91,0.08)]",
                )}
              >
                <CardHeader className="items-center sm:items-start">
                  {tier.featured ? (
                    <span className="mb-2 inline-flex w-fit rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold text-black">
                      Most Popular
                    </span>
                  ) : null}
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="mt-3 flex items-end justify-center gap-1 sm:justify-start">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="pb-1 text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={tier.featured ? "default" : "outline"}>
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          <strong className="text-foreground">Have a different budget?</strong> We can tailor solutions
          from $500 for quick automations to six-figure enterprise deployments.{" "}
          <Link href="/contact" className="text-brand-primary underline">
            Chat with us.
          </Link>
        </p>
      </div>
    </section>
  );
}
