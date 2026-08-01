import { TEAM_MEMBERS } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionHeader from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamSection() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <SectionHeader
          title={
            <>
              Meet the <span className="gradient-text">Team</span>
            </>
          }
          subtitle="Senior engineers and strategists behind every delivery."
        />
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM_MEMBERS.map((member, index) => (
            <AnimateOnScroll key={member.name} delay={index * 70}>
              <Card className="h-full text-center">
                <CardHeader className="items-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-brand-primary/15 text-xl font-bold text-brand-primary">
                    {member.initials}
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm font-medium text-brand-primary">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
