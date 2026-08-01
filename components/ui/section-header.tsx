import { cn } from "@/lib/utils";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}: {
  badge?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        centered && "text-center",
        "mb-12 md:mb-16",
        className
      )}
    >
      {badge ? <div className="mb-4 flex justify-center">{badge}</div> : null}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          centered && "mx-auto max-w-4xl"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base text-muted-foreground md:text-lg",
            centered && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
