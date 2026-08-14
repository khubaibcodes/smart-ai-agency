import Link from "next/link";
import { AGENCY } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="section-padding scroll-mt-[var(--navbar-h)] bg-gradient-to-br from-brand-primary/15 via-brand-bg to-brand-bg-2"
    >
      <div className="container-site text-center">
        <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-[2.6rem]">
          What would you stop doing tomorrow?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Tell us the job that eats your week. We&apos;ll say honestly whether AI can take it
          off you — and what that would cost. Book a {AGENCY.discoveryCall}, no commitment.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" variant="white" className="w-full rounded-full sm:w-auto">
            <Link href="/contact">Book a Free Call</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full rounded-full sm:w-auto">
            <Link href="/contact">Get a Custom Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
