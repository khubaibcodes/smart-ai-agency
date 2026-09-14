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

  /**
   * The real figure is rendered server-side (see the span below) and the
   * count-up is a pure enhancement on top of it.
   *
   * This used to be the other way round: the markup said `0` and only a GSAP
   * ScrollTrigger ever wrote the real number. Anything that didn't run that
   * animation — the server-rendered HTML, a crawler, an AI answer engine, a
   * visitor with reduced motion, a slow or failed JS load — saw "0+ / 0+ / 0%".
   * An agency page advertising zero projects delivered is worse than no stats
   * at all, so the number now only ever moves *up to* a value that is already
   * correct without JavaScript.
   */
  useGSAP(() => {
    const num = numRef.current;
    if (!num || !rootRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
      // Zeroed here rather than up front so the correct value stays on screen
      // until the moment the count-up actually starts.
      onStart() {
        num.textContent = "0";
      },
      onUpdate() {
        num.textContent = Math.round(obj.val).toString();
      },
      // However the tween ends — completed, interrupted, or killed by a
      // route change mid-count — the final state is the true figure.
      onComplete() {
        num.textContent = value.toString();
      },
      onInterrupt() {
        num.textContent = value.toString();
      },
    });
  }, [value, index]);

  const isCard = variant === "card";

  return (
    <div ref={rootRef} className={cn("text-center", isCard ? "px-0" : "px-8", className)}>
      {/* The count-up rewrites one text node, which a screen reader would
          otherwise announce as it ticks. The group carries the finished value
          as its label and the digits themselves are hidden from the AT tree. */}
      <div
        className="flex items-end justify-center gap-0.5"
        role="img"
        aria-label={`${value}${suffix} ${label}`}
      >
        <span
          ref={numRef}
          aria-hidden="true"
          className={cn(
            "font-bold tabular-nums leading-none",
            isCard ? "text-3xl text-brand-primary" : "gradient-text",
            !isCard && (compact ? "text-2xl md:text-3xl" : "text-3xl sm:text-4xl"),
          )}
        >
          {value}
        </span>
        <span
          aria-hidden="true"
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
