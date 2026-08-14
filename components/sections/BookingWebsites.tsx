import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Globe, X } from "lucide-react";
import {
  ADOPTION_STATS,
  BOOKING_COMPARISON,
  BOOKING_CTA,
  BOOKING_INDUSTRIES,
  BOOKING_SECTION,
  BOOKING_STATS,
  BOOKING_STEPS,
  BOOKING_TRACE,
} from "@/lib/constants";
import type { CitedStat } from "@/lib/types";
import AgentConsole from "@/components/sections/AgentConsole";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import Spotlight from "@/components/ui/spotlight";
import Tilt from "@/components/ui/tilt";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Button } from "@/components/ui/button";

/**
 * "AI Websites, Fully Booked" — the flagship NZ-market section.
 *
 * Every figure renders through <Stat>, which forces the source to appear next
 * to the number and marks industry estimates differently from published
 * research. That distinction is the point: presenting a vendor's booking-uplift
 * estimate with the same authority as a Deloitte productivity finding is
 * exactly the overclaiming this site is meant to avoid.
 */

function Stat({ stat }: { stat: CitedStat }) {
  return (
    <Spotlight className="panel flex h-full flex-col p-5 sm:p-6">
      <div className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
        {stat.value}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
      <p className="mt-4 border-t border-[var(--hairline)] pt-3">
        <span className="mono-label">
          {stat.kind === "estimate" ? "Est. · " : ""}
          {stat.source}
        </span>
      </p>
    </Spotlight>
  );
}

export default function BookingWebsites() {
  return (
    <section
      id="ai-websites"
      className="noise-overlay relative overflow-hidden scroll-mt-[var(--navbar-h)] section-padding"
    >
      {/* Atmosphere, used sparingly — this should read as a continuation of the
          hero's world, not a second template. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-20 size-[420px] rounded-full bg-brand-primary/[0.06] blur-[120px]" />
        <div className="absolute -right-32 bottom-10 size-[360px] rounded-full bg-brand-accent/[0.05] blur-[120px]" />
        <div className="hero-grid-mask absolute inset-0 opacity-20" />
      </div>

      <div className="container-site relative">
        <SectionHeader
          badge={
            <SectionBadge>
              <Globe className="size-4" />
              {BOOKING_SECTION.badge}
            </SectionBadge>
          }
          title={
            <>
              {BOOKING_SECTION.titleLead}{" "}
              <span className="gradient-text">{BOOKING_SECTION.titleAccent}</span>
            </>
          }
          subtitle={BOOKING_SECTION.subtitle}
        />

        {/* ---------- the opening argument ---------- */}
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADOPTION_STATS.map((stat, index) => (
            <AnimateOnScroll key={stat.value} delay={index * 80} className="h-full">
              <Stat stat={stat} />
            </AnimateOnScroll>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-brand-dim">
          The gap isn&apos;t belief — it&apos;s depth. Most businesses have tried a chatbot or a
          copilot and stopped there, because turning a tool into a working system is a different
          job. That&apos;s the job we do.
        </p>

        {/* ---------- show, don't tell ---------- */}
        <div
          id="booking-demo"
          className="mx-auto mt-16 grid max-w-6xl scroll-mt-[var(--navbar-h)] items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Console first in the DOM so it stacks above the explanation on
              mobile; moved to the right column from lg up. */}
          <div className="relative lg:order-2">
            <div
              className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-brand-primary/[0.07] blur-3xl"
              aria-hidden="true"
            />
            <Tilt max={6} className="relative">
              <AgentConsole traces={[BOOKING_TRACE]} />

              {/* Depth layers. translateZ lifts them off the console inside the
                  tilt's preserve-3d context; on touch and under reduced motion
                  the tilt never arms, so these simply sit flat. */}
              <div
                className="pointer-events-none absolute -right-3 -top-5 hidden sm:block"
                style={{ transform: "translateZ(55px)" }}
                aria-hidden="true"
              >
                <div className="panel panel-elevated flex items-center gap-2.5 px-3.5 py-2.5">
                  <CalendarCheck className="size-4 text-brand-primary" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-dim">
                      Live calendar
                    </div>
                    <div className="text-xs font-semibold">Sat 9:30am free</div>
                  </div>
                </div>
              </div>

              <div
                className="pointer-events-none absolute -bottom-6 -left-4 hidden sm:block"
                style={{ transform: "translateZ(85px)" }}
                aria-hidden="true"
              >
                <div className="panel panel-elevated flex items-center gap-2.5 px-3.5 py-2.5">
                  <span className="glow-dot" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-dim">
                      Confirmed
                    </div>
                    <div className="text-xs font-semibold">SMS sent · booked</div>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>

          {/* plain-language explanation */}
          <div className="lg:order-1">
            <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">
              What &ldquo;AI-integrated booking&rdquo; actually means
            </h3>
            <ol className="mt-7 space-y-5">
              {BOOKING_STEPS.map((step, index) => (
                <AnimateOnScroll key={step.title} delay={index * 60}>
                  <li className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/[0.07] text-brand-primary">
                      <ServiceIcon name={step.icon} className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                        <h4 className="text-base font-semibold">{step.title}</h4>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </AnimateOnScroll>
              ))}
            </ol>
          </div>
        </div>

        {/* ---------- what the phone is costing ---------- */}
        <div className="mx-auto mt-20 max-w-6xl">
          <h3 className="text-center text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            What taking bookings by phone actually costs
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOOKING_STATS.map((stat, index) => (
              <AnimateOnScroll key={stat.value} delay={index * 80} className="h-full">
                <Stat stat={stat} />
              </AnimateOnScroll>
            ))}
          </div>
          <p className="mt-6 text-center">
            <span className="mono-label">{BOOKING_SECTION.sourceNote}</span>
          </p>
        </div>

        {/* ---------- versus a bolted-on widget ---------- */}
        <div className="mx-auto mt-20 max-w-5xl">
          <h3 className="text-center text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            {BOOKING_COMPARISON.title}
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimateOnScroll className="h-full">
              <div className="panel h-full p-6 opacity-80">
                <h4 className="text-lg font-semibold text-brand-dim">
                  {BOOKING_COMPARISON.bolted.heading}
                </h4>
                <ul className="mt-5 space-y-3">
                  {BOOKING_COMPARISON.bolted.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-brand-dim" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={90} className="h-full">
              <Spotlight className="panel panel-elevated h-full border-brand-primary/25 p-6">
                <h4 className="text-lg font-semibold">{BOOKING_COMPARISON.built.heading}</h4>
                <ul className="mt-5 space-y-3">
                  {BOOKING_COMPARISON.built.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </AnimateOnScroll>
          </div>
        </div>

        {/* ---------- who it's for ---------- */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            If you take bookings, this is for you
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Not just salons and clinics. Any business where a customer has to reach a human to
            reserve a time is losing bookings to the ones who don&apos;t.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {BOOKING_INDUSTRIES.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-[var(--hairline)] bg-brand-card/70 px-4 py-2 font-mono text-xs text-brand-muted"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- CTA ---------- */}
        <AnimateOnScroll className="mx-auto mt-16 max-w-4xl">
          <Spotlight className="panel panel-elevated conic-ring p-8 text-center sm:p-10">
            <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-[2rem]">
              {BOOKING_CTA.headline}
            </h3>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {BOOKING_CTA.body}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="group w-full rounded-full sm:w-auto">
                <Link href={BOOKING_CTA.primary.href}>
                  {BOOKING_CTA.primary.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-brand-primary/25 sm:w-auto"
              >
                <Link href={BOOKING_CTA.secondary.href}>{BOOKING_CTA.secondary.label}</Link>
              </Button>
            </div>
          </Spotlight>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
