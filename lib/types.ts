export type IconName =
  | "brain"
  | "bot"
  | "database"
  | "mic"
  | "layers"
  | "workflow"
  | "lightbulb"
  | "zap"
  | "settings"
  | "chart-line"
  | "file-text"
  | "message-circle"
  | "mail"
  | "handshake";

export interface ServiceHighlight {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  href: string;
}

export interface ClaudeOffering {
  title: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  featured: boolean;
}

export interface ResourceCard {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: IconName;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface MissionValue {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceDetail {
  id: string;
  badge: string;
  icon: IconName;
  title: string;
  paragraphs: string[];
  features: string[];
  cta: string;
  reverse?: boolean;
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

/** One step in an illustrative agent run shown in the hero console. */
export interface AgentTraceStep {
  tool: string;
  detail: string;
  /** Displayed duration in ms — illustrative, not measured. */
  ms: number;
}

export interface AgentTrace {
  id: string;
  label: string;
  query: string;
  steps: AgentTraceStep[];
  answer: string;
  citations: string[];
}

/** A node in the workflow diagram. Position is a percentage of the viewBox. */
export interface WorkflowNode {
  id: string;
  label: string;
  sublabel: string;
  icon: IconName;
  x: number;
  y: number;
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

export interface ContactFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}
