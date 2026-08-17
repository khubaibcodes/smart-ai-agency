import Link from "next/link";
import { ArrowRight, PhoneOff, Mic } from "lucide-react";
import {
  VOICE_CAPABILITIES,
  VOICE_HANDOFF,
  VOICE_MOMENTS,
  VOICE_PAGE,
  VOICE_TRACE,
} from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import AgentConsole from "@/components/sections/AgentConsole";
import CTASection from "@/components/sections/CTASection";
import PageHero from "@/components/sections/PageHero";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import Spotlight from "@/components/ui/spotlight";
import Tilt from "@/components/ui/tilt";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Button } from "@/components/ui/button";

export const metadata = createPageMetadata({
  title: "Voice AI Agents",
  description:
    "A receptionist that never goes home. Answers every call on the first ring, books and reschedules against your live calendar, follows up on cold leads, and hands over to a person when one is needed.",
  path: "/voice-agents",
});

export default function VoiceAgentsPage() {
  return (
    <>
      <PageHero
        badge={
          <SectionBadge>
            <Mic className="size-4" />
            {VOICE_PAGE.badge}
          </SectionBadge>
        }
        title={
          <>
            {VOICE_PAGE.titleLead}{" "}
            <span className="gradient-text">{VOICE_PAGE.titleAccent}</span>
          </>
        }
        description={VOICE_PAGE.subtitle}
      />

      {/* ---------- when calls actually get missed ----------
          A tight four-across strip rather than cards: these are moments, not
          features, and they should read almost as a single sentence. */}
      <section className="border-b border-border bg-brand-bg-2 py-12">
        <div className="container-site">
          <p className="mb-8 flex items-center justify-center gap-2.5 text-center">
            <PhoneOff className="size-4 text-brand-dim" aria-hidden="true" />
            <span className="mono-label">Where the missed calls actually happen</span>
          </p>

          <div className="mx-auto grid max-w-5xl gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {VOICE_MOMENTS.map((moment, index) => (
              <AnimateOnScroll key={moment.when} delay={index * 70}>
                <div className="border-t border-brand-primary/25 pt-4">
                  <h3 className="text-base font-semibold">{moment.when}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {moment.detail}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- the call flow ---------- */}
      <section id="call-flow" className="scroll-mt-[var(--navbar-h)] section-padding">
        <div className="container-site">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative lg:order-2">
              <div
                className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-brand-primary/[0.07] blur-3xl"
                aria-hidden="true"
              />
              <Tilt max={5} className="relative">
                <AgentConsole traces={[VOICE_TRACE]} />
              </Tilt>
            </div>

            <div className="lg:order-1">
              <h2 className="text-3xl font-bold tracking-[-0.03em] md:text-[2.6rem] md:leading-[1.08]">
                One call, start to <span className="gradient-text">finish</span>
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                The caller talks normally. The agent listens, works out what they need, checks what
                is genuinely free, books it, and texts the confirmation before they hang up. No
                menu tree, no &ldquo;press one for bookings&rdquo;, no callback promised for
                tomorrow.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Everything it did on that call is written where your business already keeps it —
                the calendar, the customer record, the message thread.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-full">
                <Link href={VOICE_PAGE.primaryCta.href}>
                  {VOICE_PAGE.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- what it does ----------
          Stacked full-width rows: each capability is substantial enough to
          deserve its own band, and this avoids repeating the bento pattern. */}
      <section className="border-y border-border bg-brand-bg-2 section-padding">
        <div className="container-site">
          <div className="mx-auto max-w-6xl space-y-4">
            {VOICE_CAPABILITIES.map((capability, index) => (
              <AnimateOnScroll key={capability.title} delay={index * 80}>
                <Spotlight className="panel grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/[0.07] text-brand-primary">
                        <ServiceIcon name={capability.icon} className="size-5" />
                      </div>
                      <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                      {capability.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {capability.description}
                    </p>
                  </div>

                  <ul className="grid gap-3 self-center sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {capability.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm">
                        <span
                          className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-primary/70"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- handoff ---------- */}
      <section className="section-padding">
        <div className="container-site">
          <AnimateOnScroll className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              {VOICE_HANDOFF.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {VOICE_HANDOFF.body}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <CTASection />
    </>
  );
}
