"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, PhoneCall, PhoneOff, RotateCcw, Check, AlertCircle } from "lucide-react";
import { CALL_SCRIPTS, DEMO_AGENT_NAME } from "@/lib/constants";
import { LIVE_CALL_ENABLED, startLiveCall, type LiveCall } from "@/lib/voice-call";
import type { CallScript } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The interactive call demo — the page's centrepiece.
 *
 * The site sells a receptionist that answers the phone, so the most convincing
 * thing it can do is answer the phone. This plays a scripted call end to end:
 * the caller asks for a time, the agent offers real slots, books one, takes a
 * name, and the panel shows what got written where once the call ends.
 *
 * Two hard rules:
 *
 * 1. It is labelled a scripted demo, in the UI, always. It replays fixed
 *    dialogue from lib/constants/voice.ts and makes no model call. An agency
 *    that tells clients not to overclaim cannot stage a fake live call.
 * 2. The fallback is the product. A real Vapi call only happens when keys are
 *    configured; without them — or if the SDK fails to load, or the visitor
 *    denies microphone access — the scripted demo is what everyone sees, so it
 *    has to be the polished path rather than the consolation one.
 */

type Phase = "idle" | "connecting" | "in-call" | "ended";

/** Per-turn dwell, scaled to how long the line takes to say aloud. */
function dwellFor(text: string, speaker: "caller" | "agent"): number {
  const spoken = text.length * (speaker === "agent" ? 42 : 36);
  return Math.min(Math.max(spoken, 1100), 4200);
}

const CONNECT_MS = 1150;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** mm:ss call timer, ticking only while the call is up. */
function useCallTimer(running: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const reset = useCallback(() => setSeconds(0), []);
  const label = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return { label, reset };
}

function Waveform({ active }: { active: boolean }) {
  return (
    <span className="voice-wave" data-active={active || undefined} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((bar) => (
        <span key={bar} className="voice-wave-bar" />
      ))}
    </span>
  );
}

export default function VoiceDemo({ className }: { className?: string }) {
  const [scriptIndex, setScriptIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleTurns, setVisibleTurns] = useState(0);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [liveError, setLiveError] = useState("");
  const [liveStatus, setLiveStatus] = useState<"idle" | "starting" | "active">("idle");
  const liveCallRef = useRef<LiveCall | null>(null);

  const reduced = useReducedMotion();
  const script: CallScript = CALL_SCRIPTS[scriptIndex];
  const timer = useCallTimer(phase === "in-call");
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Every timeout the playback chain is waiting on, so a vertical change,
  // a hang-up or an unmount can cancel the whole call rather than leaving
  // turns arriving into a panel the visitor has already moved on from.
  const cancelledRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPlayback = useCallback(() => {
    cancelledRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => stopPlayback, [stopPlayback]);

  const wait = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutRef.current = setTimeout(resolve, ms);
      }),
    [],
  );

  const reset = useCallback(() => {
    stopPlayback();
    setPhase("idle");
    setVisibleTurns(0);
    setSpeakingIndex(null);
    setLiveError("");
    timer.reset();
  }, [stopPlayback, timer]);

  const startCall = useCallback(async () => {
    stopPlayback();
    cancelledRef.current = false;
    setLiveError("");
    timer.reset();

    // Reduced motion: the call still "happens", but as a finished transcript
    // rather than a sequence that animates itself in.
    if (reduced) {
      setVisibleTurns(script.turns.length);
      setSpeakingIndex(null);
      setPhase("ended");
      return;
    }

    setVisibleTurns(0);
    setSpeakingIndex(null);
    setPhase("connecting");

    await wait(CONNECT_MS);
    if (cancelledRef.current) return;
    setPhase("in-call");

    for (let i = 0; i < script.turns.length; i++) {
      const turn = script.turns[i];
      setVisibleTurns(i + 1);
      setSpeakingIndex(turn.speaker === "agent" ? i : null);

      await wait(dwellFor(turn.text, turn.speaker));
      if (cancelledRef.current) return;
    }

    setSpeakingIndex(null);
    await wait(400);
    if (cancelledRef.current) return;
    setPhase("ended");
  }, [reduced, script.turns, stopPlayback, timer, wait]);

  /**
   * The real call, when the site is configured for one. Any failure lands in
   * `liveError` and leaves the scripted demo exactly where it was — this
   * button is an addition to the demo, never a replacement for it.
   */
  const startReal = useCallback(async () => {
    setLiveError("");
    setLiveStatus("starting");
    try {
      const call = await startLiveCall();
      liveCallRef.current = call;
      setLiveStatus("active");
      call.on("call-end", () => {
        liveCallRef.current = null;
        setLiveStatus("idle");
      });
    } catch (error) {
      setLiveStatus("idle");
      setLiveError(
        error instanceof Error ? error.message : "Couldn't start the call just now.",
      );
    }
  }, []);

  const stopReal = useCallback(() => {
    liveCallRef.current?.stop();
    liveCallRef.current = null;
    setLiveStatus("idle");
  }, []);

  // A live call must not outlive the page that started it.
  useEffect(() => () => liveCallRef.current?.stop(), []);

  /** Switching industry abandons the call in progress and starts clean. */
  const selectScript = useCallback(
    (index: number) => {
      if (index === scriptIndex) return;
      reset();
      setScriptIndex(index);
    },
    [reset, scriptIndex],
  );

  /**
   * Follow the conversation as it arrives, but never hijack the page: only the
   * transcript box scrolls, and only while a call is running or has just
   * finished.
   *
   * "Ended" matters as much as "in-call" here. The summary of what the agent
   * actually wrote to the calendar and the CRM is appended after the last
   * turn, and it is the entire point of the demo — without this it renders
   * below the fold of the scroll box and most visitors never see it.
   */
  useEffect(() => {
    if (reduced) return;
    if (phase !== "in-call" && phase !== "ended") return;
    const box = transcriptRef.current;
    if (!box) return;
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [visibleTurns, phase, reduced]);

  const isLive = phase === "connecting" || phase === "in-call";
  const statusLabel =
    phase === "connecting"
      ? "Connecting…"
      : phase === "in-call"
        ? `In call · ${timer.label}`
        : phase === "ended"
          ? `Call ended · ${timer.label}`
          : "Ready to answer";

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-8", className)}>
      {/* ---- industry picker ----
          A stacked list on desktop so each industry reads as its own choice;
          a horizontal rail on mobile where vertical space is the scarce thing. */}
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        role="group"
        aria-label="Choose an industry"
      >
        <p className="mono-label hidden lg:mb-1 lg:block">The call it answers</p>
        {CALL_SCRIPTS.map((item, index) => {
          const active = index === scriptIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectScript(index)}
              aria-pressed={active}
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                active
                  ? "border-brand-primary/40 bg-brand-primary/[0.09] text-brand-primary"
                  : "border-[var(--hairline)] text-muted-foreground hover:border-[var(--hairline-strong)] hover:text-[var(--brand-text)]",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  active ? "bg-brand-primary" : "bg-brand-dim/50",
                )}
                aria-hidden="true"
              />
              {item.vertical}
            </button>
          );
        })}
      </div>

      {/* ---- the call ---- */}
      <div className="panel panel-elevated overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-[var(--hairline)] px-4 py-3.5 sm:px-5">
          <span
            className={cn(
              "relative flex size-9 items-center justify-center rounded-full border transition-colors",
              isLive
                ? "border-brand-primary/40 bg-brand-primary/10 text-brand-primary"
                : "border-[var(--hairline)] text-brand-dim",
            )}
          >
            <Phone className="size-4" aria-hidden="true" />
            {isLive && !reduced && (
              <span className="voice-pulse" aria-hidden="true" />
            )}
          </span>

          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">
              {DEMO_AGENT_NAME}
              <span className="font-normal text-muted-foreground"> · {script.context}</span>
            </p>
            <p className="mono-label mt-0.5" aria-live="polite">
              {statusLabel}
            </p>
          </div>

          <span className="ml-auto rounded-full border border-[var(--hairline)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-brand-dim">
            scripted demo
          </span>
        </div>

        {/* transcript */}
        <div
          ref={transcriptRef}
          className="flex h-[320px] flex-col gap-3 overflow-y-auto px-4 py-5 sm:h-[360px] sm:px-5"
        >
          {phase === "idle" ? (
            <div className="m-auto max-w-xs text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A caller rings after hours. Press call and watch {DEMO_AGENT_NAME} handle it
                start to finish.
              </p>
            </div>
          ) : null}

          {phase === "connecting" ? (
            <div className="m-auto flex items-center gap-2.5 text-sm text-muted-foreground">
              <span className="size-2 animate-pulse rounded-full bg-brand-primary" aria-hidden="true" />
              Ringing…
            </div>
          ) : null}

          {script.turns.slice(0, visibleTurns).map((turn, index) => {
            const fromAgent = turn.speaker === "agent";
            return (
              <div
                key={`${script.id}-${index}`}
                className={cn(
                  "flex w-full",
                  fromAgent ? "justify-start" : "justify-end",
                  !reduced && "voice-bubble-in",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed sm:text-sm",
                    fromAgent
                      ? "rounded-tl-sm border border-brand-primary/20 bg-brand-primary/[0.07]"
                      : "rounded-tr-sm border border-[var(--hairline)] bg-[var(--elev-2)]",
                  )}
                >
                  <span className="mono-label mb-1 block">
                    {fromAgent ? DEMO_AGENT_NAME : "Caller"}
                  </span>
                  {turn.text}
                  {speakingIndex === index && !reduced ? (
                    <Waveform active />
                  ) : null}
                </div>
              </div>
            );
          })}

          {phase === "ended" ? (
            <div className={cn("mt-2", !reduced && "voice-bubble-in")}>
              <p className="mono-label mb-2.5">What the agent did</p>
              <ul className="space-y-1.5">
                {script.outcome.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed">
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-brand-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* controls */}
        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--hairline)] p-3 sm:px-5 sm:py-4">
          {phase === "idle" || phase === "ended" ? (
            <button
              type="button"
              onClick={startCall}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-primary px-5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              {phase === "ended" ? (
                <>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Play it again
                </>
              ) : (
                <>
                  <PhoneCall className="size-4" aria-hidden="true" />
                  Talk to {DEMO_AGENT_NAME}
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-5 text-sm font-semibold transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
            >
              <PhoneOff className="size-4" aria-hidden="true" />
              End call
            </button>
          )}

          {LIVE_CALL_ENABLED ? (
            <button
              type="button"
              onClick={liveStatus === "active" ? stopReal : startReal}
              disabled={liveStatus === "starting"}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-primary/30 px-5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/[0.08] disabled:opacity-60"
            >
              <PhoneCall className="size-4" aria-hidden="true" />
              {liveStatus === "starting"
                ? "Connecting…"
                : liveStatus === "active"
                  ? "End real call"
                  : `Call ${DEMO_AGENT_NAME} for real`}
            </button>
          ) : null}

          <p className="text-xs leading-relaxed text-brand-dim">
            Scripted {script.vertical.toLowerCase()} call — no audio, no model call.
          </p>

          {liveError ? (
            <p className="flex w-full items-start gap-2 text-xs text-destructive">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              {liveError}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
