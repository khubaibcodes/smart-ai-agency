import type { IconName } from "@/lib/types";
import {
  Bot,
  Brain,
  ChartLine,
  Database,
  FileText,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Mail,
  MessageCircle,
  Mic,
  Settings2,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<IconName | "settings" | "brain", LucideIcon> = {
  brain: Brain,
  bot: Bot,
  database: Database,
  mic: Mic,
  layers: Layers,
  workflow: Workflow,
  lightbulb: Lightbulb,
  zap: Zap,
  settings: Settings2,
  "chart-line": ChartLine,
  "file-text": FileText,
  "message-circle": MessageCircle,
  mail: Mail,
  handshake: Handshake,
  globe: Globe,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: IconName | "settings" | "brain";
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Brain;
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />;
}
