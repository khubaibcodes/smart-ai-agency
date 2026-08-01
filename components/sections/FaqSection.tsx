import { FAQ_ITEMS } from "@/lib/constants";
import SectionHeader from "@/components/ui/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section className="section-padding bg-brand-bg-2">
      <div className="container-site max-w-3xl">
        <SectionHeader
          title={
            <>
              Common <span className="gradient-text">Questions</span>
            </>
          }
        />
        <Accordion type="single" collapsible className="space-y-3">
          {FAQ_ITEMS.map((item) => (
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
