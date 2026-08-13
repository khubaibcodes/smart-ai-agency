import { TECH_STACK } from "@/lib/constants";

/**
 * Continuous tech marquee. The track holds two identical copies and shifts by
 * -50%, so the loop is seamless; the duplicate is hidden from assistive tech.
 * Hovering pauses it, and reduced-motion stops it outright (globals.css).
 */
export default function TechBar() {
  return (
    <section className="relative border-y border-border bg-brand-bg-2 py-9">
      <div className="container-site">
        <p className="mb-6 text-center">
          <span className="mono-label">Powered by the world&apos;s best AI tools</span>
        </p>
      </div>

      <div className="marquee-wrap marquee-mask relative overflow-hidden">
        <div className="marquee-track gap-3" style={{ ["--marquee-duration" as string]: "46s" }}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 gap-3 pr-3"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {TECH_STACK.map((tool) => (
                <span
                  key={tool}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--hairline)] bg-brand-card/70 px-4 py-2 font-mono text-xs text-brand-muted backdrop-blur-sm transition-colors hover:border-brand-primary/30 hover:text-[var(--brand-text)]"
                >
                  <span className="size-1 rounded-full bg-brand-primary/60" aria-hidden="true" />
                  {tool}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
