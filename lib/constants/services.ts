import type { ServiceDetail } from "@/lib/types";

/**
 * Service catalogue — the single source of truth for every service surface
 * (services page, home bento, footer links, sitemap).
 *
 * Copy rule: the first sentence of every service answers the question a
 * business owner actually has — what does this save me, and what does it cost
 * me to keep doing it by hand. Mechanism (vector search, tool calling, STT)
 * appears afterwards as supporting proof, never as the headline. No model
 * version numbers anywhere: they go stale within months.
 *
 * Order is deliberate. Voice, WhatsApp and email lead because they are what
 * prospective clients ask for by name.
 */
export const SERVICES: ServiceDetail[] = [
  {
    id: "voice",
    badge: "Never Miss a Call",
    icon: "mic",
    title: "Voice AI Agents",
    paragraphs: [
      "Every missed call is a customer who phoned someone else. A voice agent answers on the first ring — at 2am, during lunch, and on the twelfth simultaneous call — booking appointments, rescheduling, answering the same five questions your staff answer forty times a day, and qualifying leads before they reach you.",
      "It sounds natural, remembers what was said earlier in the call, and hands over to a real person the moment a caller asks or the conversation needs judgement. Your team stops being a switchboard and goes back to the work only they can do.",
    ],
    features: [
      "Answers inbound calls 24/7 — no hold queue, no voicemail",
      "Books, reschedules and cancels straight into your calendar",
      "Qualifies leads and routes the good ones to a human",
      "Outbound follow-ups, reminders and confirmations",
      "Live transfer to a person whenever the caller wants one",
      "20+ languages with automatic detection",
      "Under 500ms perceived response — no awkward silences",
    ],
    cta: "Get a Voice Agent",
  },
  {
    id: "websites",
    badge: "Built by Our In-House Team",
    icon: "globe",
    title: "AI-Integrated Websites",
    reverse: true,
    paragraphs: [
      "A website that doesn't just describe your business — it runs the front end of it. Books appointments, answers questions, and captures leads, built in.",
      "This is a full design and build by our in-house full-stack team, not a template with a chat widget bolted on. The AI booking and chat agent works inside the site from day one, connected to your calendar, CRM and messaging channels.",
    ],
    features: [
      "Full site design + build, not a template",
      "AI booking/chat agent working inside the site from day one",
      "Connects to your calendar, CRM and messaging channels",
      "Built and deployed by our in-house full-stack team",
    ],
    cta: "Get an AI-Integrated Website",
  },
  {
    id: "whatsapp",
    badge: "Where Customers Already Are",
    icon: "message-circle",
    title: "WhatsApp & Messaging Agents",
    paragraphs: [
      "Customers message rather than phone, and they expect an answer now — not on Monday. A messaging agent handles questions, bookings and order status over WhatsApp and SMS around the clock, in whatever language the customer writes in.",
      "It runs on the number your customers already have saved, so nothing changes for them. Conversations that used to sit unread until morning get resolved while the customer is still interested.",
    ],
    features: [
      "WhatsApp Business and SMS on your existing number",
      "Answers product, pricing and availability questions instantly",
      "Takes bookings and orders without a human in the loop",
      "Order and delivery status on demand",
      "Replies in the customer's own language",
      "Escalates to your team with the full conversation attached",
    ],
    cta: "Automate My Messages",
  },
  {
    id: "email",
    badge: "Clear the Inbox",
    icon: "mail",
    title: "Email Automation Agents",
    reverse: true,
    paragraphs: [
      "A shared inbox quietly eats hours every day — reading, sorting, chasing, forwarding. An email agent reads what comes in, works out what it's actually about, and either drafts a reply for approval or sends it outright for the routine cases.",
      "It follows up when nobody responds, keeps threads labelled and routed to the right person, and summarises long chains so your team reads one paragraph instead of thirty messages.",
    ],
    features: [
      "Reads and classifies incoming mail by intent",
      "Drafts replies for approval — or sends the routine ones",
      "Automatic follow-up sequences when nobody replies",
      "Routes and labels to the right person or queue",
      "Summarises long threads down to what matters",
      "Extracts orders, invoices and details into your systems",
    ],
    cta: "Automate My Inbox",
  },
  {
    id: "rag",
    badge: "Answers, Not Folder Hunts",
    icon: "database",
    title: "Ask Your Documents Anything",
    paragraphs: [
      "Stop digging through folders. Ask your business a question in plain English — \"what's our refund window for enterprise contracts?\" — and get the answer in seconds, with a link to the exact page it came from.",
      "Contracts, policies, manuals, price lists, years of email: whatever your team currently searches by hand becomes something they can simply ask. Every answer is traceable to a source document, so nobody has to take the AI's word for it.",
    ],
    features: [
      "Plain-English questions across every document you own",
      "Answers cite the exact file and page — verifiable, not guesswork",
      "Works with PDFs, Word, Excel and SharePoint",
      "Searches thousands of documents at once",
      "Lives in Slack, Teams or a web chat — wherever your team is",
      "Private deployment — your documents stay yours",
    ],
    cta: "Get Instant Answers",
  },
  {
    id: "managed",
    badge: "Done For You",
    icon: "handshake",
    title: "Fully-Managed Automation",
    reverse: true,
    paragraphs: [
      "Some businesses don't want a system to run — they want the result. We design, build, deploy and maintain the whole thing, then keep it running. You get calls answered, leads booked and admin cleared, without touching a dashboard.",
      "When something needs changing, you tell us in a sentence and we handle it. No internal technical owner required, no half-finished automation quietly breaking six months from now.",
    ],
    features: [
      "We build, host, monitor and maintain everything",
      "Ongoing changes handled by us, not your team",
      "Proactive monitoring — we find failures before you do",
      "Monthly report of what ran and what it saved",
      "One point of contact for the whole stack",
      "No internal technical owner needed",
    ],
    cta: "Hand It All Over",
  },
  {
    id: "automation",
    badge: "Time Back, Every Week",
    icon: "zap",
    title: "Workflow Automation",
    paragraphs: [
      "Copying data between systems, chasing approvals, re-typing the same details into a third tool — these jobs are invisible on a balance sheet and enormous in practice. We connect your apps so the work happens without anyone doing it.",
      "Our clients typically reclaim 20–60 hours a week this way. The tools you already pay for start talking to each other, and the manual middle step disappears.",
    ],
    features: [
      "End-to-end business process automation",
      "CRM, email, calendar and accounting integrations",
      "Data extraction, transformation and reporting",
      "Trigger-based notifications and actions",
      "Built on n8n, Make, Zapier or custom pipelines",
      "Error handling and retries so failures don't go unnoticed",
    ],
    cta: "Automate My Workflows",
  },
  {
    id: "sharepoint",
    badge: "Microsoft 365",
    icon: "layers",
    title: "SharePoint Integration",
    reverse: true,
    paragraphs: [
      "If your company runs on Microsoft 365, the documents are already there — the problem is finding anything and moving it through approvals. We put AI directly inside SharePoint so search actually works and routine paperwork moves itself.",
      "Onboarding packs, approvals, document tagging and cross-team requests stop being somebody's Tuesday and become something that just happens.",
    ],
    features: [
      "AI search across every site and library",
      "Automated approval and review routing",
      "A Teams bot that answers SharePoint questions",
      "Automatic tagging and content classification",
      "Onboarding and HR document automation",
      "Microsoft Graph API with secure OAuth 2.0 access",
    ],
    cta: "Automate SharePoint",
  },
  {
    id: "custom",
    badge: "Built Around You",
    icon: "bot",
    title: "Custom AI Agents",
    paragraphs: [
      "Sometimes the off-the-shelf tool doesn't fit the way your business actually works. We build agents around your process, your data and your industry — from legal research assistants to manufacturing quality checks.",
      "You describe the job you'd hire someone to do. We work out whether an agent can do it, tell you honestly if it can't, and build it if it can.",
    ],
    features: [
      "Designed around your industry and workflow",
      "Multiple agents coordinating on larger jobs",
      "Agents that call your existing APIs and tools",
      "Long-running autonomous tasks",
      "Trained on your own data and terminology",
    ],
    cta: "Build My Agent",
  },
  {
    id: "claude",
    badge: "Anthropic Claude",
    icon: "brain",
    title: "Claude AI Agents",
    reverse: true,
    paragraphs: [
      "We build on Anthropic's Claude — the models we trust most for work where a wrong answer has consequences. Claude handles long documents, multi-step tasks and nuanced instructions better than anything else we've deployed, and it's built by a company that treats safety as the product rather than the press release.",
      "In practice that means agents that cite their sources, say \"I don't know\" instead of inventing an answer, and escalate to a person when the situation calls for one. We keep every deployment on Anthropic's current models as new versions ship.",
    ],
    features: [
      "Always running Anthropic's latest available models",
      "Reads entire contracts and codebases in a single pass",
      "Calls your tools and chains multi-step work autonomously",
      "Customer chat agents with human escalation built in",
      "Answers backed by source citations",
      "GDPR-conscious handling with private deployment options",
      "Slack, Teams and web widget integration",
    ],
    cta: "Build with Claude",
  },
  {
    id: "n8n",
    badge: "Self-Hosted Automation",
    icon: "settings",
    title: "n8n Workflows",
    paragraphs: [
      "n8n lets us automate your business without your data leaving it. It's the most capable self-hosted automation platform available, connecting 400+ apps into pipelines you own outright — no per-task pricing, no vendor holding your process hostage.",
      "From a simple email-to-CRM flow to a multi-step AI pipeline with error branches and retries, we build it, document it, and hand it over so you're never locked in.",
    ],
    features: [
      "Self-hosted or n8n Cloud deployment",
      "400+ native integrations (Slack, HubSpot, Gmail…)",
      "AI nodes built in",
      "Webhook triggers, schedules and real-time events",
      "Error branches, retry logic and failure alerts",
      "Custom code nodes (Python / JavaScript)",
      "Full workflow documentation and handover",
    ],
    cta: "Build n8n Workflows",
  },
  {
    id: "consulting",
    badge: "Start in the Right Place",
    icon: "chart-line",
    title: "AI Consulting",
    reverse: true,
    paragraphs: [
      "Not sure where AI would actually help? Most businesses guess wrong and automate the interesting problem rather than the expensive one. We audit how work really flows through your business and tell you where the money is going.",
      "You get a ranked list of what's worth automating, what it would save, and what it would cost — whether you build it with us or hand the plan to your own team.",
    ],
    features: [
      "Workflow and process audit",
      "AI readiness assessment",
      "ROI modelling and prioritisation",
      "Tool and vendor selection guidance",
      "Implementation roadmap and timeline",
    ],
    cta: "Book a Consultation",
  },
];
