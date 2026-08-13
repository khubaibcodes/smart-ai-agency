"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word mask reveal for headlines.
 *
 * Splits on words rather than characters: characters shred screen-reader
 * output and cost far more DOM nodes for a difference nobody perceives at
 * headline size. The full string stays readable — each word is wrapped in an
 * overflow-hidden span and slid up from beneath its own baseline.
 */
export default function KineticText({
  text,
  className,
  highlight,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  /** Words in this list render in the amber gradient. */
  highlight?: string[];
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const accent = new Set((highlight ?? []).map((w) => w.toLowerCase()));

  if (reduced) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={accent.has(word.toLowerCase().replace(/[.,]/g, "")) ? "gradient-text" : undefined}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={cn(
              "inline-block",
              accent.has(word.toLowerCase().replace(/[.,]/g, "")) && "gradient-text",
            )}
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.72,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
