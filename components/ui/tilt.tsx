"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt driven by pointer position.
 *
 * Gated three ways, because mouse-tracking depth is a desktop-only pleasure:
 * - `prefers-reduced-motion` disables it entirely
 * - `(hover: hover) and (pointer: fine)` means touch devices never arm it, so
 *   there is no scroll-jacking or sticky transform left behind on mobile
 * - transforms are written once per animation frame, not per pointer event
 *
 * Max rotation stays in single digits: past about 8deg it stops reading as
 * depth and starts reading as a gimmick.
 */
export default function Tilt({
  children,
  className,
  max = 5,
  scale = 1.01,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();

    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || frame.current) return;
      const { clientX, clientY } = event;

      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        // -0.5..0.5 from the centre of the element
        const px = (clientX - rect.left) / rect.width - 0.5;
        const py = (clientY - rect.top) / rect.height - 0.5;

        el.style.transform =
          `perspective(1200px) rotateY(${px * max * 2}deg) ` +
          `rotateX(${-py * max * 2}deg) scale(${scale})`;
      });
    },
    [enabled, max, scale],
  );

  const reset = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  useEffect(() => {
    // Dropping below the breakpoint mid-session must not strand a transform.
    if (!enabled) reset();
  }, [enabled, reset]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("transition-transform duration-300 ease-out will-change-transform", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
