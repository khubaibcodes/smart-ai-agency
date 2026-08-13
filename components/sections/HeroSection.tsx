"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HERO_STATS } from "@/lib/constants";
import AnimatedStat from "@/components/ui/animated-stat";
import KineticText from "@/components/ui/kinetic-text";
import ShaderField from "@/components/ui/shader-field";
import AgentConsole from "@/components/sections/AgentConsole";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="noise-overlay relative flex min-h-[calc(100vh-var(--navbar-h))] items-center overflow-hidden pt-[var(--navbar-h)]"
    >
      {/* atmosphere: shader light, grid, vignette */}
      <div className="pointer-events-none absolute inset-0">
        <ShaderField intensity={0.5} />
        <div className="hero-grid-mask absolute inset-0 opacity-25" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="container-site relative z-10 py-14 md:py-20">
        {/* Asymmetric split — copy carries the left, proof sits right.
            Deliberately not 50/50: the console should feel like an instrument
            panel beside the message, not a competing headline. */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center justify-center gap-2.5 lg:justify-start"
            >
              <span className="glow-dot" aria-hidden="true" />
              <span className="mono-label">AI Engineering Studio · Available worldwide</span>
            </motion.div>

            <h1 className="mt-7 text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[4.1rem]">
              <KineticText text="Automate." delay={0.1} />
              <br />
              <KineticText text="Integrate." delay={0.19} />
              <br />
              <KineticText text="Accelerate." highlight={["Accelerate."]} delay={0.28} />
            </h1>

            <motion.p
              custom={0.42}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-brand-muted md:text-lg md:leading-8 lg:mx-0"
            >
              Intelligent AI agents for modern teams — RAG systems, Voice AI, Claude bots, n8n
              workflows, and SharePoint automation that reclaim hours every week.
            </motion.p>

            <motion.div
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group min-w-[180px] rounded-full shadow-lg shadow-brand-primary/20"
              >
                <Link href="/contact">
                  Book a Free Call
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-w-[180px] rounded-full border-brand-primary/25 bg-transparent hover:border-brand-primary/45 hover:bg-brand-primary/[0.06]"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </motion.div>

            <motion.div
              custom={0.58}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-11"
            >
              <div className="hero-stats-bar mx-auto flex max-w-lg flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-0 lg:mx-0">
                {HERO_STATS.map((stat, index) => (
                  <div key={stat.label} className="flex items-center gap-6 sm:gap-0">
                    {index > 0 && (
                      <div
                        className="hidden h-10 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:block"
                        aria-hidden="true"
                      />
                    )}
                    <AnimatedStat {...stat} index={index} compact />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 28 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            {/* bronze bloom behind the panel gives it a seat in the scene */}
            <div
              className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-brand-primary/[0.07] blur-3xl"
              aria-hidden="true"
            />
            <AgentConsole className="relative" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="mono-label">Scroll</span>
        <ChevronDown className="size-4 animate-bounce text-brand-dim opacity-60" aria-hidden="true" />
      </div>
    </section>
  );
}
