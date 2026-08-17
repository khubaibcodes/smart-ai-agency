import { Building2 } from "lucide-react";
import { INDUSTRIES, INDUSTRIES_SECTION } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import { ServiceIcon } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils";

/**
 * "Who We Work With".
 *
 * Deliberately a row list rather than another card grid — the page already
 * uses bento tiles and stat panels, and a third grid would make it read as the
 * same template repeated. Rows scan faster for recognition ("that's me"),
 * which is this section's only job.
 *
 * Layout: sticky heading on the left from lg up, rows on the right separated
 * by hairlines. Pain sits in muted text, the fix in full-contrast text, so the
 * eye lands on the answer rather than the problem.
 */
export default function IndustriesSection() {
  return (
    <section id="industries" className="scroll-mt-[var(--navbar-h)] section-padding">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--navbar-h)+3rem)] lg:self-start">
            <SectionBadge>
              <Building2 className="size-4" />
              {INDUSTRIES_SECTION.badge}
            </SectionBadge>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] md:text-[2.9rem] md:leading-[1.08]">
              {INDUSTRIES_SECTION.titleLead}{" "}
              <span className="gradient-text">{INDUSTRIES_SECTION.titleAccent}</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              {INDUSTRIES_SECTION.subtitle}
            </p>
          </div>

          <ul className="lg:pt-2">
            {INDUSTRIES.map((industry, index) => (
              <AnimateOnScroll key={industry.id} delay={index * 60}>
                <li
                  className={cn(
                    "group grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-6",
                    index > 0 && "border-t border-[var(--hairline)]",
                  )}
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[var(--hairline)] bg-brand-primary/[0.06] text-brand-primary transition-colors duration-300 group-hover:border-brand-primary/30">
                    <ServiceIcon name={industry.icon} className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">{industry.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-dim">{industry.pain}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--brand-text)]">
                      {industry.fix}
                    </p>
                  </div>
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-12 max-w-2xl border-t border-[var(--hairline)] pt-8 text-center text-sm leading-relaxed text-muted-foreground">
          {INDUSTRIES_SECTION.closing}
        </p>
      </div>
    </section>
  );
}
