import type {
  ClaudeOffering,
  IconName,
  MissionValue,
  PricingTier,
  ResourceCard,
  ServiceHighlight,
  TeamMember,
  Testimonial,
  FaqItem,
} from "@/lib/types";
import { SERVICES } from "./services";

const HOME_SERVICE_IDS = [
  "rag",
  "voice",
  "sharepoint",
  "automation",
  "custom",
  "consulting",
] as const;

export const HOME_SERVICE_HIGHLIGHTS: ServiceHighlight[] = HOME_SERVICE_IDS.map((id) => {
  const service = SERVICES.find((item) => item.id === id)!;
  return {
    id: service.id,
    icon: service.icon as IconName,
    title: service.title,
    description: service.paragraphs[0],
    href: `/services#${service.id}`,
  };
});

export const CLAUDE_OFFERINGS: ClaudeOffering[] = [
  {
    title: "Claude Chat Agents",
    description:
      "Customer-facing and internal chat agents powered by Claude. Understands context deeply, maintains multi-turn conversations, and escalates to humans when needed.",
    tags: ["Claude Sonnet 4.6", "Multi-turn", "Human handoff"],
  },
  {
    title: "Document Intelligence",
    description:
      "Claude reads, summarizes, extracts, and reasons over large documents — contracts, reports, manuals — returning structured answers with source citations.",
    tags: ["PDF / Word / Excel", "Citations", "200K context"],
  },
  {
    title: "Agentic Tool Use",
    description:
      "Claude agents that call APIs, browse web pages, write and run code, and chain multi-step tasks autonomously — all with safety and human oversight built in.",
    tags: ["Tool calling", "Multi-step", "API integration"],
  },
  {
    title: "Safe Enterprise AI",
    description:
      "Anthropic's Constitutional AI makes Claude the safest choice for enterprise. We configure system prompts, guardrails, and data handling policies for full compliance.",
    tags: ["Constitutional AI", "GDPR ready", "Private deploy"],
  },
  {
    title: "Multilingual AI",
    description:
      "Claude speaks 95+ languages fluently. Deploy support agents, document processors, or chatbots that seamlessly switch languages mid-conversation.",
    tags: ["95+ languages", "Auto-detect", "Cultural context"],
  },
  {
    title: "Claude + Your Stack",
    description:
      "We integrate Claude into your existing tools — Slack, Teams, Notion, CRM, or custom platforms — via REST API or SDK with full error handling and retries.",
    tags: ["SDK integration", "Slack / Teams", "Webhook ready"],
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$2,500",
    period: "/project",
    description: "Focused automation for a single workflow",
    featured: false,
    features: [
      "Single workflow or RAG agent",
      "2–3 week delivery",
      "Email support for 30 days",
      "Documentation & handover",
      "One revision round",
    ],
    cta: "Get Started",
    href: "/contact",
  },
  {
    name: "Professional",
    price: "$7,500",
    period: "/project",
    description: "Multi-system integration with AI agents",
    featured: true,
    features: [
      "Multi-agent or voice + automation stack",
      "4–6 week delivery",
      "Slack/Teams integration included",
      "90 days priority support",
      "Two revision rounds",
    ],
    cta: "Book Discovery Call",
    href: "/contact",
  },
  {
    name: "Enterprise",
    price: "$15k",
    period: "+/project",
    description: "Full-scale enterprise automation",
    featured: false,
    features: [
      "SharePoint + MS365 integration",
      "8–12 weeks delivery",
      "Dedicated account manager",
      "1 year support & retainer",
      "Custom security & compliance",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ayesha",
    role: "Operations Director, UK",
    quote:
      "The RAG agent Smart AI built cut our document search time from hours to seconds. Our team can't imagine working without it.",
    featured: false,
  },
  {
    name: "Abdul Samad",
    role: "CEO, Lagos Tech Hub",
    quote:
      "Their Voice AI integration with our call center saved us 40 hours per week. Professional team, outstanding delivery, highly recommend.",
    featured: true,
  },
  {
    name: "Khansa",
    role: "HR Manager, Sweden",
    quote:
      "SharePoint automation completely transformed how we handle onboarding. What took 3 days now takes 20 minutes. Incredible ROI.",
    featured: false,
  },
];

export const RESOURCE_CARDS: ResourceCard[] = [
  {
    title: "RAG Agent Implementation Guide",
    description:
      "Step-by-step guide to building retrieval-augmented generation systems. Includes architecture, best practices, and common pitfalls.",
    href: "/contact?topic=guide",
    cta: "Download Guide",
    icon: "file-text",
  },
  {
    title: "Case Study: 80% Time Savings",
    description:
      "How a mid-market company automated 40 manual processes using AI agents. ROI analysis and lessons learned included.",
    href: "/contact?topic=casestudy",
    cta: "Read Case Study",
    icon: "chart-line",
  },
  {
    title: "AI Automation Checklist",
    description:
      "Pre-project audit checklist: Is your workflow ready for automation? Security, compliance, and technical requirements.",
    href: "/contact?topic=checklist",
    cta: "Get Checklist",
    icon: "lightbulb",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Khubab",
    role: "Founder & AI Architect",
    bio: "AI systems designer specializing in RAG pipelines, voice agents, and enterprise integrations.",
    initials: "K",
  },
  {
    name: "Automation Lead",
    role: "Workflow Engineer",
    bio: "Expert in n8n, Make, and custom automation — connecting tools so humans don't have to.",
    initials: "A",
  },
  {
    name: "SharePoint Specialist",
    role: "Microsoft 365 Engineer",
    bio: "Deep expertise in SharePoint, Teams, and Power Platform integrations with AI layers.",
    initials: "S",
  },
  {
    name: "Voice AI Engineer",
    role: "Speech & NLP Specialist",
    bio: "Builds real-time voice agents with multilingual support and low-latency response systems.",
    initials: "V",
  },
];

export const MISSION_VALUES: MissionValue[] = [
  {
    title: "Results Over Hype",
    description: "We build AI that saves measurable time — not demos that impress in a meeting and fail in production.",
  },
  {
    title: "Your Data, Your Control",
    description: "Private deployment by default. Your documents and workflows stay in your cloud or on-premise environment.",
  },
  {
    title: "Transparent Communication",
    description: "No jargon, no surprises. We explain what we're building, why, and how it works.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How long does a project typically take?",
    answer:
      "Most projects range from 2 to 8 weeks depending on complexity. A focused RAG agent can be live in 2 weeks. A full enterprise workflow automation might take 6–8 weeks including testing and integration.",
  },
  {
    question: "Do you work with small businesses or only enterprises?",
    answer:
      "Both. We have projects starting from $500 for focused automations, up to six-figure enterprise deployments. We'll always tell you upfront what's realistic for your budget.",
  },
  {
    question: "Is my data safe with your AI systems?",
    answer:
      "Absolutely. We build all solutions with data privacy as a default. We can deploy entirely within your cloud environment (AWS, Azure, GCP) or on-premise, so your data never leaves your control.",
  },
  {
    question: "Do you provide ongoing support after delivery?",
    answer:
      "Yes. We offer monthly retainer packages for maintenance, updates, and iterative improvements. Many clients start with a project and move to a retainer once they see results.",
  },
];
