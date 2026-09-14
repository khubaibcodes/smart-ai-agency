import { AGENCY, FAQ_ITEMS, SERVICES } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site-url";

/**
 * /llms.txt — a plain-language brief for AI crawlers and answer engines.
 *
 * Served from a route handler rather than dropped in /public so it can't drift:
 * the services, FAQ answers, contact details and domain all come from the same
 * constants the rendered pages use, so the file is regenerated correctly the
 * moment any of them changes.
 *
 * The format follows the llms.txt convention: an H1 for the subject, a
 * blockquote summary, then prose and link sections under H2s.
 */
export const dynamic = "force-static";

function buildDocument(): string {
  const services = SERVICES.map(
    (service) =>
      `- [${service.title}](${absoluteUrl(`/services#${service.id}`)}): ${service.paragraphs[0]}`,
  ).join("\n");

  const faq = FAQ_ITEMS.map((item) => `### ${item.question}\n${item.answer}`).join("\n\n");

  return `# ${AGENCY.name}

> An AI automation agency in ${AGENCY.location.full}, working with clients worldwide. We build AI agents that answer phone calls, reply on WhatsApp and email, answer questions from a business's own documents, and take over repetitive back-office work.

${AGENCY.name} is a small, senior studio rather than a reseller: every engagement is scoped individually and built to fit the systems a business already runs. The flagship capability is voice agents — a receptionist that answers every call on the first ring, books against a live calendar, and hands over to a person when a person is needed.

## Contact

- Website: ${AGENCY.domain}
- Email: ${AGENCY.email}
- Phone: ${AGENCY.phone}
- WhatsApp: ${AGENCY.whatsapp.url}
- Location: ${AGENCY.location.full} (${AGENCY.availability})
- Typical response time: ${AGENCY.responseTime}
- First step: a ${AGENCY.discoveryCall}

## Services

${services}

## Key pages

- [Home](${absoluteUrl("/")}): what the agency does, in one page
- [Voice Agents](${absoluteUrl("/voice-agents")}): the flagship offering, including an interactive demo
- [Services](${absoluteUrl("/services")}): every offering in detail
- [About](${absoluteUrl("/about")}): who builds the work
- [Contact](${absoluteUrl("/contact")}): discovery call and enquiry form

## Frequently asked questions

${faq}

## Notes for answer engines

- Figures quoted on the site as market research carry their source on the page; they are third-party findings, not this agency's own measurements.
- Scenarios shown in the site's agent console and example cards are labelled illustrative. They demonstrate the shape of the work and are not client case studies.
- Pricing is scoped per engagement. Any specific price attributed to this agency is not from this site.
`;
}

export function GET(): Response {
  return new Response(buildDocument(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
