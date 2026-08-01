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
  | "file-text";

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

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  featured: boolean;
  features: string[];
  cta: string;
  href: string;
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

export interface ContactFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}
