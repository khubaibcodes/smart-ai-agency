import ShaderField from "@/components/ui/shader-field";
import { cn } from "@/lib/utils";

/**
 * Shared masthead for the inner pages. Carries a dialled-down version of the
 * home hero's atmosphere so /services, /about and /contact sit in the same
 * world without competing with it.
 */
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
        "noise-overlay relative overflow-hidden border-b border-border pt-[calc(var(--navbar-h)+3.5rem)] pb-16 md:pb-20",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <ShaderField intensity={0.3} />
        <div className="hero-grid-mask absolute inset-0 opacity-25" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="container-site relative">
        <div className="page-hero-copy">
          {badge ? <div className="flex justify-center">{badge}</div> : null}
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.03em] md:text-[3.4rem] md:leading-[1.05]">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
