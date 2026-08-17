import type { Industry } from "@/lib/types";

/**
 * "Who We Work With" — breadth and recognition, not depth.
 *
 * One line of pain, one line of fix. The visitor should find their own
 * business in under three seconds; depth belongs in the stories section and
 * the voice-agent page. Resist letting these grow into paragraphs.
 */

export const INDUSTRIES_SECTION = {
  badge: "Who We Work With",
  titleLead: "It's the same job in",
  titleAccent: "every industry",
  subtitle:
    "Somebody has to answer the phone, reply to the message, and write the booking down. That job looks identical whether you fix cars or fill teeth — which is why one system handles all of it.",
  closing:
    "Your industry not listed? If your business takes calls, messages or bookings, it's a fit. The work is the same underneath.",
} as const;

export const INDUSTRIES: Industry[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: "handshake",
    pain: "Enquiries arrive while you're mid-viewing, and cold leads go quiet because nobody chased them.",
    fix: "Qualifies every enquiry on the spot, books viewings against your calendar, and calls old leads back so they don't rot in a spreadsheet.",
  },
  {
    id: "dental-medical",
    name: "Dental, Medical & Clinics",
    icon: "chart-line",
    pain: "Calls come in during procedures, no-shows eat the schedule, and after-hours callers get a voicemail.",
    fix: "Books and reschedules against the practice calendar, runs reminder calls and texts to cut no-shows, and routes urgent after-hours calls to a human.",
  },
  {
    id: "trades",
    name: "Trades & Home Services",
    icon: "settings",
    pain: "You're up a ladder or under a car. The phone rings out, and that job goes to whoever answered.",
    fix: "Answers on the first ring, captures the job details and quote request, and books the site visit — while your hands are still full.",
  },
  {
    id: "hospitality",
    name: "Hospitality, Salons & Gyms",
    icon: "message-circle",
    pain: "Bookings arrive by phone, DM, text and walk-in — which is how you end up double-booked.",
    fix: "One agent across every channel writing to one calendar, plus reminders that keep the chairs and tables full.",
  },
  {
    id: "professional",
    name: "Professional Services",
    icon: "file-text",
    pain: "Senior people burn billable hours on intake calls that turn out to be a poor fit.",
    fix: "Qualifies the enquiry, answers the standard questions, and only puts a properly-scoped meeting in your diary.",
  },
  {
    id: "everyone",
    name: "Every Other Business",
    icon: "zap",
    pain: "You're losing enquiries at the moment somebody has to be free to respond — and you can't always be free.",
    fix: "If it takes calls, messages or bookings, the same system works. We start with whichever one is costing you most.",
  },
];
