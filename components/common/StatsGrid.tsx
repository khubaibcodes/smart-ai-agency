"use client";

import AnimatedStat from "@/components/ui/animated-stat";
import type { Stat } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function StatsGrid({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {stats.map((stat, index) => (
        <div key={stat.label} className="glass-card p-6">
          <AnimatedStat {...stat} index={index} variant="card" />
        </div>
      ))}
    </div>
  );
}
