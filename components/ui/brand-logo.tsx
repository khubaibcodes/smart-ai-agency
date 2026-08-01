import Link from "next/link";
import { Brain } from "lucide-react";
import { AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { icon: "size-5", box: "size-9", text: "text-lg" },
  md: { icon: "size-6", box: "size-11", text: "text-xl" },
  lg: { icon: "size-8", box: "size-16", text: "text-3xl md:text-4xl" },
} as const;

export default function BrandLogo({
  size = "md",
  asLink = true,
  className = "",
}: BrandLogoProps) {
  const config = sizeConfig[size];

  const content = (
    <span className={cn("inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary",
          config.box
        )}
      >
        <Brain className={config.icon} aria-hidden="true" />
      </span>
      <span className={cn("font-bold tracking-tight", config.text)}>
        Smart <span className="text-brand-primary">AI</span>
        <span className="hidden min-[420px]:inline"> Solutions</span>
      </span>
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-flex shrink-0 items-center" aria-label={`${AGENCY.name} home`}>
        {content}
      </Link>
    );
  }

  return <div className="inline-flex shrink-0 items-center">{content}</div>;
}
