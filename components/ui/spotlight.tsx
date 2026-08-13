"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Feeds cursor position into the `.spotlight` CSS custom properties so the
 * bronze rim-light tracks the pointer. All the visuals live in globals.css —
 * this only supplies coordinates, and only while the pointer is over the card.
 */
export default function Spotlight({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    // Coalesce to one write per frame; pointermove fires far faster than paint.
    if (frame.current) return;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onPointerMove}
      className={cn("spotlight", className)}
    >
      {children}
    </Tag>
  );
}
