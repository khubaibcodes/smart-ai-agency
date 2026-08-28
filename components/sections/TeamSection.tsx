import { Globe } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";
import type { TeamMemberLinks } from "@/lib/types";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionHeader from "@/components/ui/section-header";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Icon + accessible label per profile-link kind. Order is render order. */
const LINK_KINDS: {
  key: keyof TeamMemberLinks;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}[] = [
  { key: "linkedin", icon: LinkedInIcon, label: "LinkedIn" },
  { key: "github", icon: GitHubIcon, label: "GitHub" },
  { key: "portfolio", icon: Globe, label: "Portfolio" },
  { key: "instagram", icon: InstagramIcon, label: "Instagram" },
];

/**
 * Two real people, verifiable profiles. Links render as icon buttons, never
 * as raw URLs in the visible text; initials stand in until headshots exist.
 */
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
          subtitle="The two engineers on every project — one builds the agents, one builds the sites they live in."
        />
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
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
                  {member.links ? (
                    <div className="mt-5 flex justify-center gap-2.5">
                      {LINK_KINDS.map(({ key, icon: Icon, label }) => {
                        const href = member.links?.[key];
                        if (!href) return null;
                        return (
                          <a
                            key={key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on ${label}`}
                            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand-primary/35 hover:text-brand-primary"
                          >
                            <Icon className="size-4" />
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
