"use client";

import { useEffect, useRef, useState } from "react";
import { Check, CornerDownLeft, Loader2 } from "lucide-react";
import { AGENT_TRACES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const QUERY_CPS = 26; // ms per character while typing the question
const ANSWER_CPS = 13; // ms per character while streaming the answer
const HOLD_MS = 2600; // pause on the finished state before advancing

type Phase = "query" | "steps" | "answer" | "done";

/**
 * Scripted agent run — the hero's proof-of-work.
 *
 * We sell RAG, voice and workflow agents, so the hero shows one running
 * instead of describing one. It is explicitly labelled as an illustrative
 * trace: it replays fixed scripts from lib/constants/demo.ts and makes no
 * model call. Pretending otherwise would be the exact overclaiming we tell
 * clients to avoid.
 */
export default function AgentConsole({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("query");
  const [typed, setTyped] = useState(0);
  const [stepsDone, setStepsDone] = useState(0);
  const [answerChars, setAnswerChars] = useState(0);

  const trace = AGENT_TRACES[index];

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(host);
    return () => io.disconnect();
  }, []);

  // One timeout chain per trace. Cancelled wholesale on unmount, on losing
  // visibility, or when the visitor picks a different trace.
  useEffect(() => {
    if (reduced || !inView) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const run = async () => {
      setPhase("query");
      setTyped(0);
      setStepsDone(0);
      setAnswerChars(0);

      for (let i = 1; i <= trace.query.length; i++) {
        await wait(QUERY_CPS);
        if (cancelled) return;
        setTyped(i);
      }

      await wait(340);
      if (cancelled) return;
      setPhase("steps");

      for (let i = 0; i < trace.steps.length; i++) {
        await wait(trace.steps[i].ms + 160);
        if (cancelled) return;
        setStepsDone(i + 1);
      }

      await wait(260);
      if (cancelled) return;
      setPhase("answer");

      for (let i = 1; i <= trace.answer.length; i++) {
        await wait(ANSWER_CPS);
        if (cancelled) return;
        setAnswerChars(i);
      }

      setPhase("done");
      await wait(HOLD_MS);
      if (cancelled) return;
      setIndex((current) => (current + 1) % AGENT_TRACES.length);
    };

    void run();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [index, inView, reduced, trace]);

  // Reduced motion / not yet visible: show the completed run, no animation.
  const isStatic = reduced;
  const queryText = isStatic ? trace.query : trace.query.slice(0, typed);
  const answerText = isStatic ? trace.answer : trace.answer.slice(0, answerChars);
  const visibleSteps = isStatic ? trace.steps.length : stepsDone;
  const showAnswer = isStatic || phase === "answer" || phase === "done";
  const showCitations = isStatic || phase === "done";

  return (
    <div
      ref={hostRef}
      className={cn("panel panel-elevated conic-ring overflow-hidden", className)}
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-[var(--hairline)] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#2a2a2e]" />
          <span className="size-2.5 rounded-full bg-[#2a2a2e]" />
          <span className="size-2.5 rounded-full bg-brand-primary/40" />
        </div>
        <span className="mono-label">agent · {trace.label}</span>
        <span className="ml-auto rounded-full border border-[var(--hairline)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-brand-dim">
          illustrative trace
        </span>
      </div>

      <div className="space-y-4 px-4 py-5 sm:px-5">
        {/* query */}
        <div className="flex items-start gap-2.5">
          <CornerDownLeft className="mt-0.5 size-3.5 shrink-0 text-brand-primary" aria-hidden="true" />
          <p
            className={cn(
              "min-h-[1.4em] font-mono text-[13px] leading-relaxed text-[var(--brand-text)]",
              !isStatic && phase === "query" && "caret",
            )}
          >
            {queryText}
          </p>
        </div>

        {/* tool steps */}
        <ul className="space-y-2 border-l border-[var(--hairline)] pl-4">
          {trace.steps.map((step, i) => {
            const complete = i < visibleSteps;
            const running = !isStatic && phase === "steps" && i === visibleSteps;
            const revealed = complete || running;
            return (
              <li
                key={step.tool}
                className={cn(
                  "flex items-center gap-2.5 font-mono text-[11px] transition-all duration-500",
                  revealed ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                )}
              >
                {complete ? (
                  <Check className="size-3 shrink-0 text-brand-primary" aria-hidden="true" />
                ) : (
                  <Loader2 className="size-3 shrink-0 animate-spin text-brand-dim" aria-hidden="true" />
                )}
                <span className="text-brand-primary/90">{step.tool}</span>
                <span className="truncate text-brand-dim">{step.detail}</span>
                <span className="ml-auto shrink-0 tabular-nums text-brand-dim/70">
                  {complete ? `${step.ms}ms` : "—"}
                </span>
              </li>
            );
          })}
        </ul>

        {/* answer */}
        <div
          className={cn(
            "rounded-lg border border-[var(--hairline)] bg-[rgba(11,11,13,0.5)] p-3.5 transition-opacity duration-500",
            showAnswer ? "opacity-100" : "opacity-0",
          )}
        >
          <p
            className={cn(
              "min-h-[3em] text-[13px] leading-relaxed text-[var(--brand-text)]",
              !isStatic && phase === "answer" && "caret",
            )}
          >
            {answerText}
          </p>

          <div
            className={cn(
              "mt-3 flex flex-wrap gap-1.5 transition-opacity duration-500",
              showCitations ? "opacity-100" : "opacity-0",
            )}
          >
            {trace.citations.map((citation) => (
              <span
                key={citation}
                className="rounded border border-brand-primary/20 bg-brand-primary/[0.07] px-1.5 py-0.5 font-mono text-[10px] text-brand-primary/85"
              >
                {citation}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* trace switcher */}
      <div className="flex gap-1 border-t border-[var(--hairline)] p-2">
        {AGENT_TRACES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            className={cn(
              // min-h-11 keeps the tap target at 44px on touch devices; the
              // label itself is much smaller than that.
              "flex min-h-11 flex-1 items-center justify-center rounded-md px-2 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
              i === index
                ? "bg-brand-primary/10 text-brand-primary"
                : "text-brand-dim hover:bg-secondary hover:text-[var(--brand-text)]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
