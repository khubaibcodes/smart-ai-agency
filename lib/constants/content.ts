import type {
  ClaudeOffering,
  IconName,
  MissionValue,
  ResourceCard,
  ServiceHighlight,
  TeamMember,
  Testimonial,
  FaqItem,
} from "@/lib/types";
import { SERVICES } from "./services";

/**
 * Which services lead the homepage. Voice, messaging and email first —
 * they're what prospective clients ask for by name. The bento grid sizes
 * tiles by position, so the order here is a layout decision as well as an
 * editorial one, and the count should stay at six.
 */
const HOME_SERVICE_IDS = [
  "voice",
  "whatsapp",
  "email",
  "rag",
  "managed",
  "automation",
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

/**
 * Homepage hero copy.
 *
 * Written for a business owner scanning for ten seconds, not an engineer. The
 * headline names three concrete outcomes; mechanism ("RAG", "vector search")
 * is deliberately absent and appears later as supporting proof.
 */
export const HOME_HERO = {
  eyebrow: "AI Automation Studio · Available worldwide",
  /** Each line animates in separately. Last line renders in the amber gradient. */
  headline: ["Answer every call.", "Clear every inbox.", "Automatically."],
  subtitle:
    "AI agents that answer your phones, reply to your messages, and take care of the repetitive admin — around the clock, in any language. Your team gets their week back.",
  primaryCta: { label: "Book a Free Call", href: "/contact" },
  secondaryCta: { label: "See What We Automate", href: "/services" },
} as const;

/**
 * Header copy for the Claude section. Lives here rather than inline in the
 * component so model-name policy is enforced in one place — the previous
 * version hardcoded two model version strings directly in the JSX.
 */
export const CLAUDE_SECTION = {
  titleLead: "Built with",
  /** Rendered in the amber gradient. */
  titleAccent: "Claude API",
  titleTail: "— Anthropic's Most Advanced AI",
  subtitle:
    "We build on Anthropic's most advanced AI models, and keep every deployment current as new versions ship. Agents that cite their sources, admit what they don't know, and hand over to a person when the situation calls for it.",
} as const;

/**
 * No model version numbers here. Anthropic ships new models often enough that
 * any hardcoded name reads as dated within months — and a stale model name on
 * an AI agency's site is the first thing a technical buyer notices.
 */
export const CLAUDE_OFFERINGS: ClaudeOffering[] = [
  {
    title: "Chat Agents That Know Your Business",
    description:
      "Customer-facing and internal chat that actually understands context — holds a real conversation, remembers what was said, and hands over to a person the moment it should.",
    tags: ["Multi-turn", "Human handoff", "Slack / Teams"],
  },
  {
    title: "Document Intelligence",
    description:
      "Reads, summarises and reasons over contracts, reports and manuals, returning structured answers with the source attached — so nobody has to take the AI's word for it.",
    tags: ["PDF / Word / Excel", "Source citations", "Long documents"],
  },
  {
    title: "Agents That Take Action",
    description:
      "Not just answers. Agents that call your APIs, update records, chain multi-step work, and stop for human approval where the stakes justify it.",
    tags: ["Tool calling", "Multi-step", "API integration"],
  },
  {
    title: "Safety You Can Defend",
    description:
      "Anthropic builds Claude with safety as the product. We add the rest: guardrails, system prompts, data-handling policy, and an escalation path to a human.",
    tags: ["Guardrails", "GDPR ready", "Private deploy"],
  },
  {
    title: "Speaks Your Customers' Language",
    description:
      "Support agents, document processors and chatbots that switch language mid-conversation without losing the thread — useful whether you serve Auckland or Abu Dhabi.",
    tags: ["Multilingual", "Auto-detect", "Cultural context"],
  },
  {
    title: "Fits Your Existing Stack",
    description:
      "We integrate with the tools you already run — Slack, Teams, Notion, your CRM or a custom platform — with proper error handling and retries, not a demo script.",
    tags: ["SDK integration", "Slack / Teams", "Webhook ready"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ayesha",
    role: "Operations Director, UK",
    quote:
      "The document agent Smart AI built cut our search time from hours to seconds. Our team can't imagine working without it.",
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
    title: "Where to Start With AI",
    description:
      "The five jobs most businesses automate first, why they pay back fastest, and how to tell which one applies to you.",
    href: "/contact?topic=guide",
    cta: "Get the Guide",
    icon: "file-text",
  },
  {
    title: "Case Study: 80% Time Savings",
    description:
      "How a mid-market company handed 40 manual processes to AI agents. What it cost, what it saved, and what we'd do differently.",
    href: "/contact?topic=casestudy",
    cta: "Read Case Study",
    icon: "chart-line",
  },
  {
    title: "Is Your Workflow Ready?",
    description:
      "A short audit checklist to run before you automate anything — the security, data and process questions worth answering first.",
    href: "/contact?topic=checklist",
    cta: "Get Checklist",
    icon: "lightbulb",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Khubab",
    role: "Founder & AI Architect",
    bio: "AI systems designer specializing in document agents, voice agents, and enterprise integrations.",
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
      "Most projects run 2 to 8 weeks depending on complexity. A focused document agent can be live in 2 weeks. A full workflow automation across several systems might take 6–8 weeks including testing and integration.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every engagement is scoped individually, because a single automation and a company-wide rollout are not the same job. After a free discovery call we send a fixed quote for the work, with no obligation. We'll also tell you honestly if what you need is smaller than you think.",
  },
  {
    question: "Do you work with small businesses or only enterprises?",
    answer:
      "Both. We take focused single-workflow projects for small teams and multi-system rollouts for larger organisations. We'll always tell you upfront what's realistic for your situation.",
  },
  {
    question: "Do I need someone technical on my side?",
    answer:
      "No. Our fully-managed option covers design, build, hosting, monitoring and ongoing changes — you tell us what needs adjusting and we handle it. If you do have a technical team, we'll document everything and hand it over cleanly instead.",
  },
  {
    question: "Is my data safe with your AI systems?",
    answer:
      "We build with data privacy as the default. Where it matters, we deploy entirely within your own cloud environment (AWS, Azure, GCP) or on-premise, so your data never leaves your control.",
  },
  {
    question: "Do you provide ongoing support after delivery?",
    answer:
      "Yes. We offer monthly retainer packages for maintenance, updates, and iterative improvements. Many clients start with a project and move to a retainer once they see results.",
  },
];
