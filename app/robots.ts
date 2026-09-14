import type { MetadataRoute } from "next";
import { AGENCY } from "@/lib/constants";

/**
 * AI answer engines are a channel we actively want, not one to tolerate: the
 * agency sells GEO/AEO work, so the site has to be legible to the crawlers it
 * tells clients to court. Each is named explicitly rather than left to the
 * `*` rule so the intent is unmistakable to an operator reading the file —
 * and so a future tightening of `*` doesn't silently lock them out.
 *
 * Crawl vs. train: GPTBot, ClaudeBot, PerplexityBot and Google-Extended govern
 * training and retrieval; OAI-SearchBot and Claude-User fetch pages to answer a
 * live question. Marketing copy is exactly what we want quoted, so all are
 * allowed the same access as any other agent.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "cohere-ai",
  "meta-externalagent",
];

/** Never useful in an answer, and noise in an index. */
const DISALLOW = ["/api/", "/admin"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${AGENCY.domain}/sitemap.xml`,
    host: AGENCY.domain,
  };
}
