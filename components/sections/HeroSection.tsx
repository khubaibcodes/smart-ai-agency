"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { HERO_STATS } from "@/lib/constants";
import SectionBadge from "@/components/ui/section-badge";
import AnimatedStat from "@/components/ui/animated-stat";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroSection() {
  return (
    <section id="home" className="hero-shell relative flex min-h-[calc(100vh-var(--navbar-h))] items-center overflow-hidden pt-[var(--navbar-h)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-spotlight absolute inset-0" />
        <div className="absolute -left-40 top-1/4 size-[420px] rounded-full bg-brand-primary/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-1/4 size-[380px] rounded-full bg-brand-accent/8 blur-[120px]" />
        <div className="hero-grid-mask absolute inset-0 opacity-20" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="container-site relative z-10 py-16 text-center md:py-24">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex justify-center">
            <SectionBadge className="border-brand-primary/25 bg-brand-primary/[0.08]">
              <Sparkles className="size-3.5" />
              AI Engineering Studio
            </SectionBadge>
          </div>
        </motion.div>

        <motion.h1
          custom={0.08}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-8 max-w-4xl text-4xl font-bold tracking-[-0.03em] md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
        >
          Automate. Integrate.
          <br />
          <span className="gradient-text">Accelerate.</span>
        </motion.h1>

        <motion.p
          custom={0.16}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-brand-muted md:text-lg md:leading-8"
        >
          Intelligent AI agents for modern teams — RAG systems, Voice AI, Claude bots, n8n
          workflows, and SharePoint automation that reclaim hours every week.
        </motion.p>

        <motion.div
          custom={0.24}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Button
            asChild
            size="lg"
            className="min-w-[180px] rounded-full shadow-lg shadow-brand-primary/20"
          >
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[180px] rounded-full border-brand-primary/25 bg-transparent hover:border-brand-primary/45 hover:bg-brand-primary/[0.06]"
          >
            <Link href="/contact">
              Talk to Us <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          custom={0.32}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mx-auto mt-14 max-w-2xl"
        >
          <div className="hero-stats-bar flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-0">
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

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-brand-text-dim md:flex">
        <span>Scroll</span>
        <ChevronDown className="size-4 animate-bounce opacity-60" />
      </div>
    </section>
  );
}
