import { TECH_STACK } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export default function TechBar() {
  return (
    <section className="border-y border-border bg-brand-bg-2 py-8">
      <div className="container-site">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Powered by the world&apos;s best AI tools
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {TECH_STACK.map((tool) => (
            <Badge key={tool} variant="secondary" className="px-3 py-1.5 text-xs">
              {tool}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
