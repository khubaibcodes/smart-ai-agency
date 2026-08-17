import { Quote } from "lucide-react";
import { STORIES, STORIES_SECTION } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import { cn } from "@/lib/utils";

/**
 * Client stories — deliberately the least "designed" section on the page.
 *
 * Everywhere else proves the technology is real: shader light, glass panels,
 * live traces. This one has to prove it worked for a person, so it drops the
 * glow entirely — flat surfaces, an initial-avatar, editorial before/after
 * columns, and the client's own words pulled out. The contrast is the point.
 *
 * Stories carrying `verified: false` render a visible marker. See
 * lib/constants/stories.ts for the sourcing rule.
 */
export default function StoriesSection() {
  const anyUnverified = STORIES.some((story) => !story.verified);

  return (
    <section
      id="stories"
      className="scroll-mt-[var(--navbar-h)] border-y border-border bg-brand-bg-2 section-padding"
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionBadge>
              <Quote className="size-4" />
              {STORIES_SECTION.badge}
            </SectionBadge>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] md:text-[2.9rem] md:leading-[1.08]">
            {STORIES_SECTION.titleLead}{" "}
            <span className="gradient-text">{STORIES_SECTION.titleAccent}</span>
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">{STORIES_SECTION.subtitle}</p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          {STORIES.map((story, index) => (
            <AnimateOnScroll key={story.id} delay={index * 80}>
              <article
                className={cn(
                  "py-10",
                  index > 0 && "border-t border-[var(--hairline)]",
                )}
              >
                {/* who */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/[0.08] font-semibold text-brand-primary"
                    aria-hidden="true"
                  >
                    {story.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{story.who}</h3>
                    <p className="text-sm text-brand-dim">{story.sector}</p>
                  </div>
                  {!story.verified && (
                    <span className="ml-auto shrink-0 rounded-full border border-[var(--hairline)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-brand-dim">
                      Awaiting sign-off
                    </span>
                  )}
                </div>

                {/* before / after */}
                <div className="mt-7 grid gap-6 sm:grid-cols-2 sm:gap-10">
                  <div>
                    <span className="mono-label">Before</span>
                    <p className="mt-2.5 text-sm leading-relaxed text-brand-dim">{story.before}</p>
                  </div>
                  <div>
                    <span className="mono-label">After</span>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--brand-text)]">
                      {story.after}
                    </p>
                  </div>
                </div>

                {/* what we built */}
                <p className="mt-6 border-l-2 border-brand-primary/30 pl-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-[var(--brand-text)]">What we built: </span>
                  {story.built}
                </p>

                {story.quote && (
                  <blockquote className="mt-6 text-lg font-medium leading-relaxed tracking-[-0.01em] text-[var(--brand-text)] md:text-xl">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                )}
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        {anyUnverified && (
          <p className="mx-auto mt-6 max-w-2xl text-center">
            <span className="mono-label">{STORIES_SECTION.unverifiedNote}</span>
          </p>
        )}
      </div>
    </section>
  );
}
