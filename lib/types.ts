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
  | "handshake"
  | "globe";

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

export interface ResourceCard {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: IconName;
}

/** External profile links rendered as icon buttons on a team card. */
export interface TeamMemberLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  instagram?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  links?: TeamMemberLinks;
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

/**
 * A cited market statistic.
 *
 * `source` is required by design: no number appears on the site without one,
 * and `kind` distinguishes published research from industry estimates so the
 * copy can hedge honestly rather than presenting both as equally solid.
 */
export interface CitedStat {
  value: string;
  label: string;
  source: string;
  kind: "research" | "estimate";
}

/** One industry tile: recognition, not depth. One line of pain, one of fix. */
export interface Industry {
  id: string;
  name: string;
  icon: IconName;
  pain: string;
  fix: string;
}

/**
 * A client story.
 *
 * `verified` is deliberately required and has no default. An unverified story
 * renders with a visible marker and its `after` line must stay qualitative —
 * never attach a number to a real client's outcome we haven't confirmed.
 *
 * Currently unused: the Stories section was replaced by illustrative examples
 * (see IllustrativeExample) until a real, signed-off client story exists.
 * When one does, it renders through this shape — Before / After / "What we
 * built" / the client's own quote, disclosed as their own unaudited figures.
 */
export interface Story {
  id: string;
  who: string;
  sector: string;
  initials: string;
  before: string;
  built: string;
  after: string;
  quote?: string;
  verified: boolean;
}

/**
 * An illustrative scenario — explicitly NOT a client story.
 *
 * No invented company, no fabricated persona, no made-up numbers: each card
 * describes a general "before" situation and the mechanism an agent runs,
 * following the same labelling convention as the AgentConsole's
 * "illustrative trace" tag. The UI must always render a visible
 * "Illustrative example" marker for these.
 */
export interface IllustrativeExample {
  id: string;
  channel: string;
  icon: IconName;
  title: string;
  /** General situation, never attributed to a named business. */
  before: string;
  /** The mechanism, step by step — mirrors the numbered booking-step pattern. */
  steps: string[];
  /** Type of outcome in general terms — no figures, no quotes. */
  outcome: string;
}

export interface VoiceCapability {
  title: string;
  description: string;
  icon: IconName;
  points: string[];
}

export interface BookingStep {
  title: string;
  description: string;
  icon: IconName;
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
