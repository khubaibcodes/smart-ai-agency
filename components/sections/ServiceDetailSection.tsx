import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SERVICES, SERVICE_MEDIA } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import Spotlight from "@/components/ui/spotlight";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ServiceDetailSection() {
  return (
    <div className="space-y-0">
      {SERVICES.map((service, index) => {
        const media = SERVICE_MEDIA[service.id];

        return (
          <section
            key={service.id}
            id={service.id}
            className={cn(
              "section-padding scroll-mt-[var(--navbar-h)]",
              index % 2 === 1 && "bg-brand-bg-2",
            )}
          >
            <div className="container-site">
              <div
                className={cn(
                  "mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14",
                  service.reverse && "lg:[&>*:first-child]:order-2"
                )}
              >
                <AnimateOnScroll>
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <SectionBadge>{service.badge}</SectionBadge>
                    <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-4xl">
                      {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className="gradient-text">
                        {service.title.split(" ").slice(-1)[0]}
                      </span>
                    </h2>
                    <div className="mt-5 max-w-xl space-y-4 leading-relaxed text-muted-foreground">
                      {service.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <ul className="mt-7 w-full max-w-xl space-y-3 text-left">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-brand-primary"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-8 rounded-full" size="lg">
                      <Link href="/contact">{service.cta}</Link>
                    </Button>
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={120}>
                  <Spotlight className="panel mx-auto flex w-full max-w-md items-center justify-center overflow-hidden lg:max-w-none">
                    {media ? (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        width={media.width}
                        height={media.height}
                        sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 90vw"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex min-h-72 w-full items-center justify-center p-10">
                        <ServiceIcon
                          name={service.icon}
                          className="size-24 text-brand-primary/80"
                        />
                      </div>
                    )}
                  </Spotlight>
                </AnimateOnScroll>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
