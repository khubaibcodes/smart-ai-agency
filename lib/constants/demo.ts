import type { AgentTrace, WorkflowEdge, WorkflowNode } from "@/lib/types";

/**
 * Illustrative agent traces for the hero console.
 *
 * These are scripted examples of the shape of work our agents do — they are
 * labelled as illustrative in the UI and are not a live model call. Keep the
 * timings plausible and the answers honest: no claim here should be one we
 * could not stand behind in a real deployment.
 */
export const AGENT_TRACES: AgentTrace[] = [
  {
    id: "rag",
    label: "RAG Agent",
    query: "What's our refund window for enterprise contracts?",
    steps: [
      { tool: "retrieve", detail: "vector search · 12,480 chunks", ms: 180 },
      { tool: "rerank", detail: "top-5 by relevance", ms: 90 },
      { tool: "synthesize", detail: "grounded answer + citations", ms: 620 },
    ],
    answer:
      "Enterprise contracts carry a 30-day refund window from invoice date, extended to 60 days where an onboarding SLA was missed.",
    citations: ["MSA_2026.pdf · §7.2", "Onboarding_SLA.docx · p4"],
  },
  {
    id: "voice",
    label: "Voice Agent",
    query: "Caller: \"I need to move my Thursday appointment.\"",
    steps: [
      { tool: "transcribe", detail: "streaming STT · en-NZ", ms: 210 },
      { tool: "lookup", detail: "calendar · matched 1 booking", ms: 140 },
      { tool: "act", detail: "reschedule + SMS confirmation", ms: 380 },
    ],
    answer:
      "Moved your Thursday 2pm to Friday 10am and texted you a confirmation. Anything else I can change?",
    citations: ["calendar.write", "sms.send"],
  },
  {
    id: "n8n",
    label: "n8n Workflow",
    query: "New lead landed in the contact form.",
    steps: [
      { tool: "trigger", detail: "webhook · /contact", ms: 40 },
      { tool: "enrich", detail: "company lookup + scoring", ms: 260 },
      { tool: "route", detail: "CRM record + Slack alert", ms: 150 },
    ],
    answer:
      "Lead scored 82/100, written to the CRM, and posted to #sales with the enrichment summary attached.",
    citations: ["crm.upsert", "slack.postMessage"],
  },
];

/** Nodes for the automation pipeline diagram. x/y are viewBox percentages. */
export const WORKFLOW_NODES: WorkflowNode[] = [
  { id: "trigger", label: "Trigger", sublabel: "webhook · cron · event", icon: "zap", x: 8, y: 50 },
  { id: "retrieve", label: "Retrieve", sublabel: "vector + SQL + Graph API", icon: "database", x: 33, y: 22 },
  { id: "reason", label: "Reason", sublabel: "Claude · tool use", icon: "brain", x: 33, y: 78 },
  { id: "act", label: "Act", sublabel: "CRM · email · SharePoint", icon: "workflow", x: 62, y: 50 },
  { id: "verify", label: "Verify", sublabel: "citations · retries · alerts", icon: "chart-line", x: 88, y: 50 },
];

export const WORKFLOW_EDGES: WorkflowEdge[] = [
  { from: "trigger", to: "retrieve" },
  { from: "trigger", to: "reason" },
  { from: "retrieve", to: "act" },
  { from: "reason", to: "act" },
  { from: "act", to: "verify" },
];
