import type { Story } from "@/lib/types";

/**
 * Client stories.
 *
 * ⚠️ SOURCING RULE — read before editing.
 *
 * Every story here is derived from a testimonial that was already published on
 * the site before this rewrite. Nothing has been invented: the `before` and
 * `after` lines only restate what the client's own quote already claims, and
 * any number stays inside the quoted words rather than being asserted as our
 * editorial finding. This file is now the single home for those quotes.
 *
 * `verified: false` means the client has not confirmed this write-up for
 * public use and the figures are unaudited. The UI renders a visible marker
 * for those. When a client signs off, flip the flag — do not silently drop it.
 *
 * Never add a story with a number we cannot evidence. If the outcome isn't
 * measured yet, keep `after` qualitative. A fabricated case study is the one
 * mistake on this site that no redesign can undo.
 */
export const STORIES_SECTION = {
  badge: "Stories",
  titleLead: "What it looks like",
  titleAccent: "afterwards",
  subtitle:
    "Three businesses that stopped losing work at the moment somebody had to be free to answer. Their words, lightly edited for length.",
  unverifiedNote:
    "Marked stories are awaiting client sign-off for public use; figures are the client's own and unaudited.",
} as const;

export const STORIES: Story[] = [
  {
    id: "ops-uk",
    who: "Operations Director",
    sector: "Professional services · United Kingdom",
    initials: "A",
    before:
      "Finding anything meant opening folder after folder. Answering a straightforward policy question could take most of a morning, and it always landed on the same few people.",
    built:
      "A document agent trained on their own files — staff ask a question in plain English and get the answer with a link to the page it came from.",
    after:
      "Searching stopped being a job somebody had to do. The questions that used to be escalated now get answered by whoever asked them.",
    quote:
      "The document agent Smart AI built cut our search time from hours to seconds. Our team can't imagine working without it.",
    verified: false,
  },
  {
    id: "callcentre-ng",
    who: "CEO",
    sector: "Technology · Lagos, Nigeria",
    initials: "AS",
    before:
      "The call centre was the bottleneck. Volume spiked without warning, the same handful of questions came up all day, and callers waited on hold for answers a script could have given them.",
    built:
      "A voice agent in front of the queue — handling routine calls end to end, and passing anything that needed judgement to a person with the context already attached.",
    after:
      "The team stopped spending its day on repeat questions and got back to the calls that actually needed a human.",
    quote:
      "Their Voice AI integration with our call center saved us 40 hours per week. Professional team, outstanding delivery, highly recommend.",
    verified: false,
  },
  {
    id: "hr-se",
    who: "HR Manager",
    sector: "Enterprise · Sweden",
    initials: "K",
    before:
      "Onboarding ran on manual document handling — chasing approvals, copying details between systems, and waiting on whoever was next in the chain.",
    built:
      "SharePoint automation across the onboarding pack: documents routed, tagged and approved without anyone shepherding them through.",
    after:
      "Onboarding went from something scheduled around people's availability to something that simply completes.",
    quote:
      "SharePoint automation completely transformed how we handle onboarding. What took 3 days now takes 20 minutes. Incredible ROI.",
    verified: false,
  },
];
