import { Mail } from "lucide-react";
import { AGENCY, FAQ_ITEMS } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import ContactForm from "@/components/forms/ContactForm";
import ContactDetails from "@/components/common/ContactDetails";
import FaqSection from "@/components/sections/FaqSection";
import PageHero from "@/components/sections/PageHero";
import SectionBadge from "@/components/ui/section-badge";
import { FaqSchema } from "@/components/ui/json-ld";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Smart AI Solutions — book a free discovery call or send us a message about your AI project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <FaqSchema items={FAQ_ITEMS} />
      <PageHero
        badge={
          <SectionBadge>
            <Mail className="size-4" />
            Get in Touch
          </SectionBadge>
        }
        title={
          <>
            Let&apos;s Build Your <span className="gradient-text">AI Solution</span>
          </>
        }
        description={`Book a ${AGENCY.discoveryCall} or drop us a message. We respond ${AGENCY.responseTime}.`}
      />

      <section className="section-padding">
        <div className="container-site">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold">
                We&apos;d love to <span className="gradient-text">hear from you</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Whether you have a fully scoped project or just a problem you&apos;re trying to solve —
                reach out. We&apos;ll listen, ask the right questions, and tell you honestly how AI can
                (and can&apos;t) help.
              </p>
              <ContactDetails className="mt-8" />
            </div>

            <div className="mx-auto w-full max-w-xl lg:max-w-none">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
