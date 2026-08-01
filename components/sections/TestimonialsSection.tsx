import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-brand-bg-2">
      <div className="container-site">
        <SectionHeader
          badge={
            <SectionBadge>
              <Star className="size-4" />
              Client Stories
            </SectionBadge>
          }
          title={
            <>
              What Our <span className="gradient-text">Clients Say</span>
            </>
          }
        />

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <AnimateOnScroll key={item.name} delay={index * 90}>
              <Card
                className={cn(
                  "h-full text-center sm:text-left",
                  item.featured && "border-brand-primary/35 bg-brand-elevated",
                )}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center gap-1 text-brand-primary sm:justify-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand-primary/15 font-semibold text-brand-primary">
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.role}</div>
                    </div>
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
