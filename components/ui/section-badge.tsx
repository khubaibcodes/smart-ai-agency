import { cn } from "@/lib/utils";

export default function SectionBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
