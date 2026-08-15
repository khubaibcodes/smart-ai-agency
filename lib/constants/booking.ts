import type { BookingStep, CitedStat } from "@/lib/types";

/**
 * "AI Websites, Fully Booked" — NZ market section.
 *
 * Sourcing policy for this file: every number carries its source, and `kind`
 * separates published research from industry estimates. The two are presented
 * differently in the UI — estimates are labelled as such rather than dressed up
 * as findings. Nothing here is presented as this agency's own research.
 */

export const BOOKING_SECTION = {
  badge: "AI Websites, Fully Booked",
  titleLead: "A website that doesn't just sit there —",
  titleAccent: "it books the job",
  subtitle:
    "Most small-business sites are a brochure with a phone number. We build the site and the AI that works inside it: it answers the question, checks your actual calendar, and books the appointment — while you're with a customer, or asleep.",
  sourceNote:
    "Figures below are from published New Zealand research and industry estimates, attributed individually. They are not our own findings.",
} as const;

/**
 * The opening argument: NZ businesses have adopted AI broadly but shallowly.
 * Each stat is followed in the UI by the specific thing we build about it —
 * never left sitting unexplained.
 */
export const ADOPTION_STATS: CitedStat[] = [
  {
    value: "82%",
    label: "of NZ businesses now use AI in some form — yet national labour productivity fell 0.7% over the same period.",
    source: "Deloitte Access Economics for 2degrees, 2026",
    kind: "research",
  },
  {
    value: "30%",
    label: "of businesses with 1–5 staff are proactively using AI, against 64% of those with 20+ staff. The gap is depth, not awareness.",
    source: "MYOB Business Monitor, 2026",
    kind: "research",
  },
  {
    value: "$8.6B",
    label: "in untapped NZ GDP sits behind low adoption of digital tools by small businesses.",
    source: "Xero / NZIER",
    kind: "research",
  },
];

/** The booking-specific cost of staying on the phone. */
export const BOOKING_STATS: CitedStat[] = [
  {
    value: "6–8 hrs",
    label: "a week spent on phone bookings and schedule admin by the average service-business owner — a full working day that isn't billable.",
    source: "Industry estimate",
    kind: "estimate",
  },
  {
    value: "20–30%",
    label: "more appointments captured by businesses that let customers book online, simply by being reachable while the customer is still browsing.",
    source: "Booking-software industry analysis",
    kind: "estimate",
  },
  {
    value: "61%",
    label: "of NZ SMEs already use AI tools, and 45% call it the biggest opportunity since the internet — but cite no clear starting point as the blocker.",
    source: "Xero SME research, 2026",
    kind: "research",
  },
];

/** What "AI-integrated booking" actually means, in plain language. */
export const BOOKING_STEPS: BookingStep[] = [
  {
    title: "They ask, on your site",
    description:
      "A visitor asks a question or picks a service right where they landed. No separate booking app to download, no phone tag, no waiting on a DM reply.",
    icon: "message-circle",
  },
  {
    title: "It checks your real calendar",
    description:
      "Not a form that emails you. The agent reads live availability from the calendar your business actually runs on, so what it offers is genuinely free.",
    icon: "database",
  },
  {
    title: "It books and confirms",
    description:
      "Takes their details, locks the slot, and sends confirmation by SMS, email or WhatsApp — through the same messaging agents that handle the rest of your channels.",
    icon: "zap",
  },
  {
    title: "It handles the changes too",
    description:
      "Reschedules and cancellations run the same way, without anyone touching them. Your calendar stays accurate instead of drifting out of date by Tuesday.",
    icon: "workflow",
  },
  {
    title: "It knows when to step aside",
    description:
      "Anything ambiguous, high-value or awkward goes to a real person with the full conversation attached. Nobody gets stuck talking to a wall.",
    icon: "handshake",
  },
];

/**
 * Why this beats a booking plugin bolted onto a template site.
 * Framed as a comparison rather than a claim about named competitors.
 */
export const BOOKING_COMPARISON = {
  title: "Why not just add a booking plugin?",
  bolted: {
    heading: "A widget bolted on",
    points: [
      "A third-party booking tool that knows nothing about your business",
      "Separate from your phone line, your Instagram DMs and your inbox",
      "Answers no questions — it only shows a calendar grid",
      "Customers who need to ask something first still end up phoning",
      "Three tools, three logins, three places for a booking to go missing",
    ],
  },
  built: {
    heading: "One system, built together",
    points: [
      "Trained on your services, prices, hours and policies from day one",
      "Same agent handles the website, WhatsApp, SMS and the phone",
      "Answers the question that was blocking the booking, then books it",
      "One calendar, one source of truth, no double-bookings",
      "We build, host and maintain it — you just see the bookings",
    ],
  },
} as const;

/**
 * Named examples keep the pitch concrete, but the framing is deliberately
 * universal: this applies to any appointment-based business.
 */
export const BOOKING_INDUSTRIES = [
  "Salons & barbers",
  "Trades & garages",
  "Clinics & physio",
  "Gyms & studios",
  "Consultants",
  "Restaurants",
  "Dentists",
  "Veterinary",
] as const;

export const BOOKING_CTA = {
  headline: "Find out what your phone is costing you",
  body: "We'll look at how bookings reach you today — phone, DMs, walk-ins — and show you what an AI-run site would take off your plate. Free, no obligation, no pitch deck.",
  primary: { label: "Book Your Free Site Audit", href: "/contact" },
  secondary: { label: "See the Booking Flow", href: "#booking-demo" },
} as const;
