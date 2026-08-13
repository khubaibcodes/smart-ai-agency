import { WORKFLOW_EDGES, WORKFLOW_NODES } from "@/lib/constants";
import AnimateOnScroll from "@/components/ui/animate-on-scroll";
import SectionBadge from "@/components/ui/section-badge";
import SectionHeader from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Workflow } from "lucide-react";

/**
 * The pipeline every agent we ship actually runs.
 *
 * Two renderings of the same data: a connected graph from `lg` up, and a
 * vertical rail below it. The connectors are pure CSS-animated SVG dashes —
 * no JS, no canvas, and they stop dead under reduced-motion.
 */

const VB_W = 1000;
const VB_H = 400;

const toX = (x: number) => (x / 100) * VB_W;
const toY = (y: number) => (y / 100) * VB_H;

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
  const byId = new Map(WORKFLOW_NODES.map((node) => [node.id, node]));

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
        <AnimateOnScroll className="mx-auto hidden max-w-6xl lg:block">
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
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    {/* static rail */}
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(232,228,220,0.10)"
                      strokeWidth={1.5}
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* travelling packet */}
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(217,161,91,0.75)"
                      strokeWidth={1.5}
                      vectorEffect="non-scaling-stroke"
                      className="flow-dash"
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
                <div className="panel panel-elevated flex w-40 flex-col items-center gap-2 px-3 py-4 text-center">
                  <div className="flex size-9 items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-primary/[0.08] text-brand-primary">
                    <ServiceIcon name={node.icon} className="size-4" />
                  </div>
                  <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold leading-none">{node.label}</span>
                  <span className="font-mono text-[10px] leading-tight text-brand-dim">
                    {node.sublabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ---------- rail (below lg) ---------- */}
        <div className="mx-auto max-w-md space-y-3 lg:hidden">
          {WORKFLOW_NODES.map((node, index) => (
            <AnimateOnScroll key={node.id} delay={index * 70}>
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
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
