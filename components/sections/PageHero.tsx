import { cn } from "@/lib/utils";

export default function PageHero({
  badge,
  title,
  description,
  className,
}: {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border pt-[calc(var(--navbar-h)+3rem)] pb-16 md:pb-20",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 size-64 rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 size-72 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="hero-grid absolute inset-0 opacity-30" />
      </div>
      <div className="container-site relative">
        <div className="page-hero-copy">
          {badge ? <div className="flex justify-center">{badge}</div> : null}
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
