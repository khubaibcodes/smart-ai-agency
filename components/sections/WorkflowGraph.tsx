"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WORKFLOW_EDGES, WORKFLOW_NODES } from "@/lib/constants";
import { SPRING_ENTRANCE, StaggerGroup, StaggerItem } from "@/components/ui/motion-primitives";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Workflow } from "lucide-react";

/**
 * The pipeline every agent we ship actually runs.
 *
 * Two renderings of the same data: a connected graph from `lg` up, and a
 * vertical rail below it. The graph assembles itself as it scrolls into
 * view — nodes spring in left to right, each edge draws in via `pathLength`
 * once its source node has landed, and only then does the travelling packet
 * start flowing. Under reduced-motion everything renders fully assembled and
 * static, matching the ShaderField pattern.
 */

const VB_W = 1000;
const VB_H = 400;

const toX = (x: number) => (x / 100) * VB_W;
const toY = (y: number) => (y / 100) * VB_H;

/** Seconds between one node landing and the next starting. */
const NODE_STEP = 0.16;
/** How long each edge takes to draw. */
const EDGE_DRAW = 0.45;

function edgePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const x1 = toX(from.x);
  const y1 = toY(from.y);
  const x2 = toX(to.x);
  const y2 = toY(to.y);
  // Horizontal-tangent cubic: keeps the flow reading left-to-right.
  const dx = (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export default function WorkflowGraph() {
  const reduced = useReducedMotion();
  const byId = new Map(WORKFLOW_NODES.map((node) => [node.id, node]));
  const orderOf = new Map(WORKFLOW_NODES.map((node, index) => [node.id, index]));
  const assembled = WORKFLOW_NODES.length * NODE_STEP + EDGE_DRAW;

  return (
    <section className="noise-overlay relative overflow-hidden border-y border-border bg-brand-bg-2 section-padding">
      <div
        className="pointer-events-none absolute inset-0 hero-grid opacity-[0.35]"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <SectionHeader
          badge={
            <SectionBadge>
              <Workflow className="size-4" />
              How It Runs
            </SectionBadge>
          }
          title={
            <>
              One pipeline behind <span className="gradient-text">every agent</span>
            </>
          }
          subtitle="Retrieve, reason, act, verify. The same architecture whether it answers a document question, takes a phone call, or moves a record between systems."
        />

        {/* ---------- graph (lg and up) ---------- */}
        <motion.div
          className="mx-auto hidden max-w-6xl lg:block"
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <div className="panel relative aspect-[5/2] w-full p-2">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
              aria-hidden="true"
            >
              {WORKFLOW_EDGES.map((edge) => {
                const from = byId.get(edge.from);
                const to = byId.get(edge.to);
                if (!from || !to) return null;
                const d = edgePath(from, to);
                const drawDelay = ((orderOf.get(edge.from) ?? 0) + 1) * NODE_STEP;
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    {/* static rail — draws in once its source node lands */}
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="rgba(232,228,220,0.10)"
                      strokeWidth={1.5}
                      vectorEffect="non-scaling-stroke"
                      variants={
                        reduced
                          ? undefined
                          : {
                              visible: {
                                pathLength: [0, 1],
                                opacity: [0, 1],
                                transition: {
                                  duration: EDGE_DRAW,
                                  delay: drawDelay,
                                  ease: "easeInOut",
                                },
                              },
                            }
                      }
                      style={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                    />
                    {/* travelling packet — only flows once the rail exists */}
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="rgba(217,161,91,0.75)"
                      strokeWidth={1.5}
                      vectorEffect="non-scaling-stroke"
                      className="flow-dash"
                      variants={
                        reduced
                          ? undefined
                          : {
                              visible: {
                                opacity: [0, 1],
                                transition: { duration: 0.4, delay: assembled },
                              },
                            }
                      }
                      style={reduced ? undefined : { opacity: 0 }}
                    />
                  </g>
                );
              })}
            </svg>

            {WORKFLOW_NODES.map((node, index) => (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <motion.div
                  variants={
                    reduced
                      ? undefined
                      : {
                          visible: {
                            opacity: [0, 1],
                            scale: [0.85, 1],
                            y: [10, 0],
                            transition: { ...SPRING_ENTRANCE, delay: index * NODE_STEP },
                          },
                        }
                  }
                  style={reduced ? undefined : { opacity: 0 }}
                  className="panel panel-elevated flex w-40 flex-col items-center gap-2 px-3 py-4 text-center"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-primary/[0.08] text-brand-primary">
                    <ServiceIcon name={node.icon} className="size-4" />
                  </div>
                  <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold leading-none">{node.label}</span>
                  <span className="font-mono text-[10px] leading-tight text-brand-dim">
                    {node.sublabel}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---------- rail (below lg) ---------- */}
        <StaggerGroup className="mx-auto max-w-md space-y-3 lg:hidden">
          {WORKFLOW_NODES.map((node, index) => (
            <StaggerItem key={node.id}>
              <div className="panel flex items-center gap-4 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/[0.08] text-brand-primary">
                  <ServiceIcon name={node.icon} className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold">{node.label}</span>
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-brand-dim">
                    {node.sublabel}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
