/** Single source of truth for agency contact & business info. */

import type { Stat } from "@/lib/types";
import { SERVICES } from "./services";

export const AGENCY = {
  name: "Smart AI Solutions",
  shortName: "Smart AI",
  tagline: "Intelligent AI Automation",
  domain: "https://genzai.agency",
  email: "smrtaisolutions@gmail.com",
  phone: "",
  phoneTel: "",
  location: {
    city: "Palmerston North",
    region: "Manawatū-Whanganui",
    country: "New Zealand",
    full: "Palmerston North, New Zealand",
  },
  availability: "Available Worldwide",
  linkedin: {
    url: "https://www.linkedin.com/in/khubaib-haider-a00347378/",
    label: "LinkedIn",
  },
  responseTime: "within 24 hours",
  discoveryCall: "free 30-minute discovery call",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Homepage section ids observed by navbar scroll-spy. */
export const HOME_SCROLL_SECTIONS = ["home", "services", "contact"] as const;
export type HomeScrollSection = (typeof HOME_SCROLL_SECTIONS)[number];

export const FOOTER_SERVICE_LINKS = SERVICES.map((service) => ({
  label: service.title,
  href: `/services#${service.id}`,
}));

export const FOOTER_COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

/**
 * Platform names only — never model version strings. Versions go stale within
 * months and a dated model name on an AI agency's site undermines everything
 * else on the page.
 */
export const TECH_STACK = [
  "Claude API",
  "OpenAI",
  "n8n",
  "Make",
  "SharePoint",
  "WhatsApp Business",
  "Twilio",
  "Deepgram",
  "ElevenLabs",
  "Pinecone",
  "LangChain",
  "AWS",
  "Supabase",
] as const;

export const HERO_STATS: Stat[] = [
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "International Clients" },
  { value: 80, suffix: "%", label: "Average Time Saved" },
];

export const ABOUT_STATS: Stat[] = [
  { value: 30, suffix: "+", label: "Projects" },
  { value: 5, suffix: "+", label: "Countries" },
  { value: 80, suffix: "%", label: "Avg. Time Saved" },
  { value: 24, suffix: "h", label: "Response Time" },
];

export const SERVICE_OPTIONS = [
  { value: "rag", label: "RAG Agents" },
  { value: "voice", label: "Voice AI Agents" },
  { value: "sharepoint", label: "SharePoint Integration" },
  { value: "automation", label: "Workflow Automation" },
  { value: "custom", label: "Custom AI Agent" },
  { value: "consulting", label: "AI Consulting" },
  { value: "claude", label: "Claude AI Agents" },
  { value: "other", label: "Not Sure / Other" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "500-5k", label: "$500 – $5,000" },
  { value: "5-15k", label: "$5,000 – $15,000" },
  { value: "15k-plus", label: "$15,000+" },
  { value: "unsure", label: "Not sure yet" },
] as const;
