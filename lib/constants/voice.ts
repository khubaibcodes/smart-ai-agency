import type { AgentTrace, CallScript, FaqItem, VoiceCapability } from "@/lib/types";

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
  // Rendered below the demo, so it's the step after watching one — not
  // another invitation to hear it. The old label promised audio the page
  // couldn't play; the demo above now does that job.
  primaryCta: { label: "Talk to Us About Your Calls", href: "/contact" },
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

/** The agent's name in the demo. One place, so the UI and copy can't disagree. */
export const DEMO_AGENT_NAME = "Sara";

/**
 * Scripted calls for the interactive demo, one per industry.
 *
 * These are the calls these businesses actually get: someone wants a time this
 * week. Each script stays short enough to play out while a visitor watches —
 * four to six turns — and ends with the agent doing the thing it claims to do
 * rather than promising a callback.
 *
 * No business names, no invented customers, no figures. The panel labels them
 * as a scripted demo, and if the copy here ever drifts into implying a real
 * recording, that label stops being true.
 */
export const CALL_SCRIPTS: CallScript[] = [
  {
    id: "dental",
    vertical: "Dental",
    context: "Dental practice · Tuesday, 7:42pm",
    turns: [
      { speaker: "caller", text: "Hi, do you have anything this week?" },
      { speaker: "agent", text: "I do — Tuesday 2pm or Thursday 10am. Which suits?" },
      { speaker: "caller", text: "Thursday." },
      { speaker: "agent", text: "Booked for Thursday 10am. Can I grab your name and number?" },
      { speaker: "caller", text: "Sam Patel, 021 555 0142." },
      {
        speaker: "agent",
        text: "Thanks Sam — you're in for Thursday at 10. I've texted you the confirmation and the address.",
      },
    ],
    outcome: [
      "Appointment written to the practice calendar",
      "Patient record created with name and mobile",
      "Confirmation SMS sent before the caller hung up",
    ],
  },
  {
    id: "physio",
    vertical: "Physio",
    context: "Physiotherapy clinic · Saturday, 9:15am",
    turns: [
      { speaker: "caller", text: "I've done something to my shoulder. How soon can someone see me?" },
      {
        speaker: "agent",
        text: "Sorry to hear that. Earliest is Monday 8:30am, or there's a cancellation slot today at 2pm.",
      },
      { speaker: "caller", text: "Today, please. Do I need a referral?" },
      {
        speaker: "agent",
        text: "Not for this — you can book directly. Is it an ACC claim, or a private appointment?",
      },
      { speaker: "caller", text: "It happened at work." },
      {
        speaker: "agent",
        text: "Then we'll set it up as an ACC claim and the clinic will lodge it. You're booked for 2pm — bring photo ID.",
      },
    ],
    outcome: [
      "Cancellation slot filled instead of going unused",
      "Appointment flagged as an ACC claim for reception",
      "Confirmation and intake form sent by text",
    ],
  },
  {
    id: "garage",
    vertical: "Garage",
    context: "Auto workshop · Thursday, 11:20am · hands under a bonnet",
    turns: [
      { speaker: "caller", text: "Do you do warrants of fitness? Could I get in this week?" },
      {
        speaker: "agent",
        text: "We do — it's about 45 minutes. I've got Thursday 11am or Friday 8am.",
      },
      { speaker: "caller", text: "Friday morning works." },
      {
        speaker: "agent",
        text: "Done. What's the rego? I'll put it against the booking so they know what's coming in.",
      },
      { speaker: "caller", text: "MJT418." },
      {
        speaker: "agent",
        text: "Got it — Friday at 8. I've texted you the details. Bring the registration papers if they're handy.",
      },
    ],
    outcome: [
      "45-minute WOF slot held on the workshop calendar",
      "Registration recorded against the job",
      "Confirmation SMS sent — no one put down a tool",
    ],
  },
  {
    id: "salon",
    vertical: "Salon",
    context: "Hair salon · Friday, 4:50pm · mid-appointment",
    turns: [
      { speaker: "caller", text: "Hi — can I book a cut and colour with Nadia?" },
      {
        speaker: "agent",
        text: "I can do that. With Nadia, cut and colour runs about two and a half hours. She's free Wednesday 1pm or Saturday 9am.",
      },
      { speaker: "caller", text: "Saturday, if that's the 9am." },
      {
        speaker: "agent",
        text: "It is. There's a $40 deposit on colour appointments — I can text you a payment link now.",
      },
      { speaker: "caller", text: "Yep, that's fine." },
      {
        speaker: "agent",
        text: "Sent. Once that's paid you're locked in for Saturday at 9 with Nadia.",
      },
    ],
    outcome: [
      "Two-and-a-half-hour slot booked with the right stylist",
      "Deposit link sent, so the slot isn't held for free",
      "Call handled without interrupting the client in the chair",
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

/**
 * Voice-specific FAQ.
 *
 * These are the four questions people actually type before they buy, and the
 * ones answer engines quote back. Deliberately distinct from the general
 * FAQ_ITEMS set so the two FAQPage blocks never compete for the same query.
 *
 * Answers follow the site's rules: no fixed price (cost is scoped per
 * engagement), no promise of legal compliance we can't guarantee on a client's
 * behalf, and no unqualified absolutes. Each one is written to be quotable as
 * a standalone paragraph, because that is how it will be surfaced.
 */
export const VOICE_FAQ_ITEMS: FaqItem[] = [
  {
    question: "How much does an AI voice agent cost?",
    answer:
      "There are two parts: a one-off build, and a monthly cost to run it. The build is quoted per engagement, because a single-line agent that answers questions and takes messages is a very different job from one booking against a live calendar across several locations. The running cost scales with call minutes, since the speech and language services bill that way. After a free 30-minute discovery call we send a fixed quote with both numbers in it, and we'll tell you if your call volume is too low for it to be worth doing.",
  },
  {
    question: "How long does it take to build a voice agent?",
    answer:
      "Most voice agents are answering real calls within two to four weeks. The first week is mapping what your callers actually ask and what the agent is allowed to do; the rest is build, calendar and CRM integration, and testing against real call recordings. Simple message-taking agents can be live sooner. Multi-location setups, or ones that need to write into an unusual booking system, take longer — we'll say which you are before you commit.",
  },
  {
    question: "What systems can it integrate with?",
    answer:
      "The calendar and customer records you already use, in most cases — Google Calendar, Microsoft 365 and Outlook, and the common booking and practice-management systems. Beyond that, anything with an API can be connected, and we use n8n and Make for the ones without a direct integration. If a system genuinely can't be written to, we'll tell you at the scoping stage rather than discovering it halfway through the build.",
  },
  {
    question: "Is it GDPR-safe, and what happens to call recordings?",
    answer:
      "We build for privacy by default: call data is processed only to handle the call, we don't use your customers' data to train models, and we sign a data processing agreement covering how it's handled. Where residency matters we deploy inside your own cloud tenancy or in-region so the data doesn't leave that jurisdiction, and we set retention so recordings and transcripts are deleted on your schedule rather than kept indefinitely. GDPR and the NZ Privacy Act put obligations on you as the data controller too — including telling callers that the call is handled by an automated system — so we set the agent up to make that disclosure and hand you the documentation your own compliance review will ask for.",
  },
];

export const VOICE_HANDOFF = {
  title: "It knows when to stop talking",
  body: "The fastest way to lose a customer is to trap them with something that can't help. When a caller asks for a person, sounds unhappy, or raises something outside what it handles, the agent hands over — with the transcript and the context already attached, so nobody has to start again.",
} as const;
