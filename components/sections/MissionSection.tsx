import { MISSION_VALUES } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionHeader from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MissionSection() {
  return (
    <section className="section-padding bg-brand-bg-2">
      <div className="container-site">
        <SectionHeader
          title={
            <>
              Why Clients <span className="gradient-text">Choose Us</span>
            </>
          }
          subtitle="Small, senior, and fully dedicated to your project from day one."
        />
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {MISSION_VALUES.map((value, index) => (
            <AnimateOnScroll key={value.title} delay={index * 80}>
              <Card className="h-full text-center">
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
