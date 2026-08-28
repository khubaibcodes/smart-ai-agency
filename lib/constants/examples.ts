import type { IllustrativeExample } from "@/lib/types";

/**
 * Illustrative scenarios — NOT client stories.
 *
 * ⚠️ SOURCING RULE — read before editing.
 *
 * These replaced the previous three client stories, which were removed because
 * no verified, signed-off client write-up exists yet. Each card here shows the
 * mechanism, not a persona: no invented company name, no fabricated person, no
 * made-up "hours saved" figure, no quote. The UI must always render a visible
 * "Illustrative example" tag on every card — the same labelling convention the
 * AgentConsole uses for its "illustrative trace".
 *
 * When a real client story becomes available (Before / After / "What we
 * built" / the client's own quote, disclosed as their own unaudited figures),
 * it renders through the `Story` shape in lib/types.ts and replaces or sits
 * alongside this section as verified proof, clearly distinguished from these
 * cards.
 */
export const EXAMPLES_SECTION = {
  badge: "How It Works",
  titleLead: "What this looks like",
  titleAccent: "in practice",
  subtitle:
    "Four illustrative scenarios — the kinds of jobs these agents handle end-to-end. Not client case studies: real client stories will appear here once they're verified and signed off.",
  tag: "Illustrative example",
} as const;

export const ILLUSTRATIVE_EXAMPLES: IllustrativeExample[] = [
  {
    id: "voice-missed-calls",
    channel: "Voice Agent",
    icon: "mic",
    title: "Missed-call recovery",
    before:
      "A service business that loses calls during busy hours — whoever could answer the phone is already with a customer, and the caller rings the next business on the list.",
    steps: [
      "Caller rings — the agent answers on the first ring",
      "It checks the real calendar for availability",
      "It books or reschedules the appointment in the conversation",
      "Anything unusual is handed to a person, with the context attached",
    ],
    outcome:
      "This is the kind of call an agent like this handles end-to-end — the routine bookings stop depending on somebody being free to pick up.",
  },
  {
    id: "email-triage",
    channel: "Email Automation",
    icon: "mail",
    title: "Inbox triage",
    before:
      "A shared inbox where someone has to read and sort every message before any of them get answered — and the sorting alone eats the morning.",
    steps: [
      "Email arrives in the shared inbox",
      "The agent classifies what it's actually about",
      "Routine cases get a drafted or sent reply",
      "Anything ambiguous is flagged for a human, already labelled",
    ],
    outcome:
      "The inbox stops being a queue somebody owns — people only see the messages that genuinely need their judgement.",
  },
  {
    id: "whatsapp-after-hours",
    channel: "WhatsApp Automation",
    icon: "message-circle",
    title: "24/7 customer replies",
    before:
      "A business getting booking and order questions on WhatsApp outside working hours — by morning, the customer who messaged at 9pm has already bought elsewhere.",
    steps: [
      "Message arrives — at any hour, in any language",
      "The agent answers the question or checks availability",
      "It confirms the booking or order in the chat",
      "A human is notified only when the conversation needs one",
    ],
    outcome:
      "Conversations resolve while the customer is still interested, instead of sitting unread until opening time.",
  },
  {
    id: "slack-updates",
    channel: "Workflow Automation",
    icon: "workflow",
    title: "Slack updates without the copy-paste",
    before:
      "A team that manually updates a channel or spreadsheet every time something changes — a new lead, a completed task, a status change — and sometimes forgets.",
    steps: [
      "A trigger event fires — new lead, task done, status change",
      "The agent formats the update automatically",
      "It posts to the right Slack channel immediately",
      "The team sees it in real time — no manual copy-paste",
    ],
    outcome:
      "The channel stays current on its own, and nobody's job includes re-typing what another system already knows.",
  },
];
