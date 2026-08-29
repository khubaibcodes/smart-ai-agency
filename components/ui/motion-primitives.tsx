"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared motion vocabulary.
 *
 * Two springs, used everywhere instead of ad-hoc durations, so the whole site
 * shares one sense of weight:
 * - SPRING_TACTILE — snappy, for things a cursor touches (press, magnetic pull)
 * - SPRING_ENTRANCE — softer, for elements arriving on screen
 *
 * Everything here degrades under prefers-reduced-motion: entrances render
 * instantly visible, the magnetic effect never arms.
 */
export const SPRING_TACTILE = { type: "spring", stiffness: 380, damping: 26, mass: 0.7 } as const;
export const SPRING_ENTRANCE = { type: "spring", stiffness: 120, damping: 20, mass: 0.9 } as const;

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.07) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: SPRING_ENTRANCE },
};

/**
 * In-view stagger container. Children wrapped in <StaggerItem> cascade in one
 * after another instead of fading simultaneously.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.07,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** How much of the group must be visible before it plays. */
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      custom={stagger}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Magnetic wrapper for primary CTAs.
 *
 * The child translates toward the cursor within a small radius and springs
 * back on leave; pressing compresses it slightly on the tactile spring.
 * Armed only on fine pointers without reduced-motion — on touch it renders
 * as a plain wrapper, so nothing sticks or drifts.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset the element follows. */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_TACTILE);
  const sy = useSpring(y, SPRING_TACTILE);

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

  if (!enabled) return <div className={cn("inline-block", className)}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.965 }}
      transition={SPRING_TACTILE}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
