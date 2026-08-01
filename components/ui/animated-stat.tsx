"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  index?: number;
  compact?: boolean;
  variant?: "hero" | "card";
  className?: string;
}

export default function AnimatedStat({
  value,
  suffix,
  label,
  index = 0,
  compact = false,
  variant = "hero",
  className,
}: AnimatedStatProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!numRef.current || !rootRef.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      delay: index * 0.12,
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top 92%",
        once: true,
      },
      onUpdate() {
        if (numRef.current) {
          numRef.current.textContent = Math.round(obj.val).toString();
        }
      },
    });
  }, [value, index]);

  const isCard = variant === "card";

  return (
    <div ref={rootRef} className={cn("text-center", isCard ? "px-0" : "px-8", className)}>
      <div className="flex items-end justify-center gap-0.5">
        <span
          ref={numRef}
          className={cn(
            "font-bold tabular-nums leading-none",
            isCard ? "text-3xl text-brand-primary" : "gradient-text",
            !isCard && (compact ? "text-2xl md:text-3xl" : "text-3xl sm:text-4xl"),
          )}
        >
          0
        </span>
        <span
          className={cn(
            "pb-0.5 font-bold leading-none",
            isCard ? "text-2xl text-brand-primary" : "gradient-text",
            !isCard && (compact ? "text-lg md:text-xl" : "text-xl sm:text-2xl"),
          )}
        >
          {suffix}
        </span>
      </div>
      <div
        className={cn(
          isCard
            ? "mt-1 text-sm text-muted-foreground"
            : "mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-text-dim",
        )}
      >
        {label}
      </div>
    </div>
  );
}
