import { Sparkles } from "lucide-react";
import { EXAMPLES_SECTION, ILLUSTRATIVE_EXAMPLES } from "@/lib/constants";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion-primitives";
import SectionBadge from "@/components/ui/section-badge";
import { ServiceIcon } from "@/components/ui/service-icon";

/**
 * Illustrative examples — replaces the former StoriesSection.
 *
 * The old section carried three real-sounding client stories that no client
 * had signed off. This one keeps the "show, don't just tell" value without
 * implying a track record that isn't verified yet: every card wears the same
 * visible "Illustrative example" tag the AgentConsole uses for its scripted
 * trace, shows a general before-state, and walks the mechanism with the
 * numbered step pattern from the booking section. No names, no figures, no
 * quotes.
 *
 * When verified client stories exist they render through `Story` and replace
 * or sit alongside this section — see lib/constants/examples.ts.
 */
export default function ExamplesSection() {
  return (
    <section
      id="examples"
      className="scroll-mt-[var(--navbar-h)] border-y border-border bg-brand-bg-2 section-padding"
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionBadge>
              <Sparkles className="size-4" />
              {EXAMPLES_SECTION.badge}
            </SectionBadge>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] md:text-[2.9rem] md:leading-[1.08]">
            {EXAMPLES_SECTION.titleLead}{" "}
            <span className="gradient-text">{EXAMPLES_SECTION.titleAccent}</span>
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">{EXAMPLES_SECTION.subtitle}</p>
        </div>

        <StaggerGroup
          stagger={0.09}
          className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-2"
        >
          {ILLUSTRATIVE_EXAMPLES.map((example) => (
            <StaggerItem key={example.id} className="h-full">
              <article className="panel flex h-full flex-col p-6 sm:p-7">
                {/* channel + the non-negotiable illustrative tag */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/[0.07] text-brand-primary">
                    <ServiceIcon name={example.icon} className="size-5" />
                  </div>
                  <span className="mono-label">{example.channel}</span>
                  <span className="ml-auto shrink-0 rounded-full border border-[var(--hairline)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-brand-dim">
                    {EXAMPLES_SECTION.tag}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">{example.title}</h3>

                {/* general before-state — never a named business */}
                <p className="mt-2 text-sm leading-relaxed text-brand-dim">{example.before}</p>

                {/* the mechanism, numbered like the booking steps */}
                <ol className="mt-5 space-y-2.5 border-t border-[var(--hairline)] pt-5">
                  {example.steps.map((step, stepIndex) => (
                    <li key={step} className="flex items-baseline gap-2.5 text-sm">
                      <span className="mono-label shrink-0">
                        {String(stepIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-brand-muted">{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-auto pt-5">
                  <p className="border-l-2 border-brand-primary/30 pl-4 text-sm leading-relaxed text-muted-foreground">
                    {example.outcome}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
