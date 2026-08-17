import type { AgentTrace, VoiceCapability } from "@/lib/types";

/**
 * Voice agents — the flagship capability, given its own page.
 *
 * Framing rule (from the agency positioning): a business owner is hiring
 * help, not deploying software. Copy talks about the job getting done, not
 * the architecture doing it.
 */

export const VOICE_PAGE = {
  badge: "Voice Agents",
  titleLead: "The receptionist who",
  titleAccent: "never goes home",
  subtitle:
    "Answers every call on the first ring — at 7pm, on Sunday, during lunch, and on the fourth call that came in at once. Books the appointment, answers the question, and puts a real person on when a real person is needed.",
  primaryCta: { label: "Hear What It Can Do", href: "/contact" },
  secondaryCta: { label: "See the Call Flow", href: "#call-flow" },
} as const;

/**
 * The cost of voicemail, framed as the moments it actually happens.
 * No statistics here on purpose — these are situations, not claims.
 */
export const VOICE_MOMENTS = [
  { when: "After hours", detail: "The call that comes at 8pm goes to whoever answers at 8pm." },
  { when: "Mid-job", detail: "Hands full, phone ringing, customer already dialling the next number." },
  { when: "Lunch break", detail: "An hour a day where nobody is covering the front desk." },
  { when: "All at once", detail: "Three callers, one line. Two of them hang up." },
] as const;

export const VOICE_CAPABILITIES: VoiceCapability[] = [
  {
    title: "Inbound — every call answered",
    description:
      "Picks up on the first ring in a natural voice, works out what the caller needs, and deals with it end to end.",
    icon: "mic",
    points: [
      "Answers the questions your team answers forty times a day",
      "Checks live availability and books, reschedules or cancels",
      "Qualifies the enquiry so you only hear the real ones",
      "Transfers to a person the moment the caller asks, or the moment it should",
      "Takes a message with full context when nobody is free",
      "20+ languages, detected automatically",
    ],
  },
  {
    title: "Outbound — the follow-up nobody gets to",
    description:
      "The calls that never happen because they're always less urgent than the ones coming in.",
    icon: "workflow",
    points: [
      "Calls back leads who went quiet, weeks after they went quiet",
      "Appointment reminders that actually reduce no-shows",
      "Review requests, timed for just after a good experience",
      "Re-engagement for customers you haven't heard from in a year",
      "Confirmations before the van leaves the yard",
    ],
  },
  {
    title: "Connected to everything else",
    description:
      "This isn't call-answering in isolation. It's one system that also owns the inbox, the messages and the calendar.",
    icon: "layers",
    points: [
      "Writes to the calendar your business already runs on",
      "Updates the CRM record while still on the call",
      "Follows up by SMS, email or WhatsApp through the same agent",
      "A call today and a text tomorrow are one conversation, not two tools",
      "Full transcript and outcome logged for every call",
    ],
  },
];

/** Illustrative call trace for the voice page console. Scripted, not live. */
export const VOICE_TRACE: AgentTrace = {
  id: "call",
  label: "Inbound Call",
  query: "Caller: \"Do you do warrants of fitness? Could I get in this week?\"",
  steps: [
    { tool: "transcribe", detail: "streaming speech · en-NZ", ms: 190 },
    { tool: "lookup", detail: "services · WOF · 45 min slot", ms: 110 },
    { tool: "availability", detail: "live calendar · Thu 11am, Fri 8am", ms: 150 },
    { tool: "book", detail: "slot held · SMS confirmation sent", ms: 260 },
  ],
  answer:
    "We do — it's about 45 minutes. I've got Thursday 11am or Friday 8am. Thursday? Booked, and I've texted you the details. Bring your registration papers if you have them handy.",
  citations: ["calendar.write", "crm.upsert", "sms.send"],
};

export const VOICE_HANDOFF = {
  title: "It knows when to stop talking",
  body: "The fastest way to lose a customer is to trap them with something that can't help. When a caller asks for a person, sounds unhappy, or raises something outside what it handles, the agent hands over — with the transcript and the context already attached, so nobody has to start again.",
} as const;
