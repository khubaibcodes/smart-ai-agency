import { FAQ_ITEMS } from "@/lib/constants";
import type { FaqItem } from "@/lib/types";
import SectionHeader from "@/components/ui/section-header";
import { FaqSchema } from "@/components/ui/json-ld";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * A visible FAQ, with its FAQPage markup emitted from the same array.
 *
 * Keeping the schema here rather than in the page means the structured data
 * can never describe a question the visitor can't see — which is both the
 * rule Google enforces and the thing that makes an answer engine willing to
 * quote the page.
 *
 * `schema` is opt-out because FAQPage should appear on one URL per set of
 * questions: the same list marked up on two pages competes with itself.
 */
export default function FaqSection({
  items = FAQ_ITEMS,
  title,
  subtitle,
  id = "faq",
  schema = true,
  className,
}: {
  items?: FaqItem[];
  title?: React.ReactNode;
  subtitle?: string;
  id?: string;
  schema?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("section-padding scroll-mt-[var(--navbar-h)] bg-brand-bg-2", className)}
    >
      {schema && <FaqSchema items={items} />}
      <div className="container-site max-w-3xl">
        <SectionHeader
          title={
            title ?? (
              <>
                Common <span className="gradient-text">Questions</span>
              </>
            )
          }
          subtitle={subtitle}
        />
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
