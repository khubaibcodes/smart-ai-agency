import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { HOME_SERVICE_HIGHLIGHTS, POSITIONING, SERVICES } from "@/lib/constants";
import { StaggerGroup, StaggerItem } from "@/components/ui/motion-primitives";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import Spotlight from "@/components/ui/spotlight";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Asymmetric bento grid.
 *
 * Replaces the previous uniform 3-column card wall: equal tiles gave every
 * service equal weight and made six sections in a row look identical. Here the
 * lead service gets a tall tile with its real feature list (pulled from
 * SERVICES, not duplicated), and the rest step down in size.
 *
 * Spans are positional on a 6-column grid (seven tiles):
 *   row 1–2  [ feature (3 wide, 2 tall) ][ tile (3) ]
 *                                        [ tile (3) ]
 *   row 3    [ tile (2) ][ tile (2) ][ tile (2) ]
 *   row 4    [ wide closing tile (6) ]
 */
const SPANS = [
  "lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "sm:col-span-2 lg:col-span-6",
];

export default function BentoServices() {
  const [feature, ...rest] = HOME_SERVICE_HIGHLIGHTS;
  const featureDetail = SERVICES.find((service) => service.id === feature.id);

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
          subtitle="From instant answers in your documents to a voice that books the job — every one of these is the same agent doing a different part of the work."
        />

        {/* Reframes the tiles below as one hire with several duties, rather
            than a menu of unrelated products. Sits above the grid as a band so
            it reads as a preamble, not a seventh tile. */}
        <div className="mx-auto mb-10 grid max-w-6xl gap-8 rounded-2xl border border-[var(--hairline)] bg-brand-bg-2/50 p-6 sm:p-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
          <div>
            <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-[1.75rem]">
              {POSITIONING.framing.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {POSITIONING.framing.body}
            </p>
          </div>

          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {POSITIONING.framing.jobs.map((job) => (
              <li key={job} className="flex items-center gap-2.5 text-sm">
                <span
                  className="size-1.5 shrink-0 rounded-full bg-brand-primary/70"
                  aria-hidden="true"
                />
                {job}
              </li>
            ))}
          </ul>
        </div>

        {/* Tiles cascade in with staggered springs rather than identical
            simultaneous fades — one group orchestrates all seven. */}
        <StaggerGroup className="mx-auto grid max-w-6xl auto-rows-[minmax(0,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* lead tile */}
          <StaggerItem className={cn("h-full sm:col-span-2", SPANS[0])}>
            <Spotlight className="panel group flex h-full flex-col overflow-hidden p-6 sm:p-7">
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.08] text-brand-primary">
                <ServiceIcon name={feature.icon} className="size-7" />
              </div>

              <span className="mono-label">01 · Flagship</span>
              <h3 className="mt-2 text-2xl font-bold sm:text-[1.7rem]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              {featureDetail ? (
                <ul className="mt-6 space-y-2.5 border-t border-[var(--hairline)] pt-5">
                  {featureDetail.features.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-brand-muted">
                      <span
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-brand-primary/70"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                href={feature.href}
                className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-semibold text-brand-primary"
              >
                Explore {feature.title}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Spotlight>
          </StaggerItem>

          {/* remaining tiles */}
          {rest.map((service, index) => (
            <StaggerItem
              key={service.id}
              className={cn("h-full", SPANS[index + 1] ?? "lg:col-span-2")}
            >
              <Spotlight className="panel group flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--hairline)] bg-brand-primary/[0.06] text-brand-primary">
                    <ServiceIcon name={service.icon} className="size-5" />
                  </div>
                  <span className="mono-label">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-5 text-[13px] font-semibold text-brand-primary/90 transition-colors hover:text-brand-primary"
                >
                  Learn more
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Spotlight>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
