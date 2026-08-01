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
        <h2 className="text-3xl font-bold md:text-4xl">Ready to save time with AI?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Book a {AGENCY.discoveryCall}. No commitment required.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" variant="white">
            <Link href="/contact">Book Free Call</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">See All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
