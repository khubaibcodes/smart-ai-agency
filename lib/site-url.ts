/**
 * The site's canonical origin, resolved once and reused everywhere.
 *
 * This value feeds `metadataBase`, every canonical URL, `og:url`, the OG image
 * URL, the sitemap, robots.txt, llms.txt and the JSON-LD graph — so it has to
 * be correct in production and harmless in preview.
 *
 * Only `NEXT_PUBLIC_`-prefixed variables are read here on purpose. `AGENCY` is
 * imported by client components as well as server ones, and Next inlines
 * `NEXT_PUBLIC_*` identically into both bundles. A server-only variable would
 * resolve to the real domain during SSR and to the fallback in the browser,
 * which is a hydration mismatch that only shows up in production.
 *
 * Resolution order:
 *  1. `NEXT_PUBLIC_SITE_URL` — set this to the live domain once DNS is live.
 *  2. `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` — injected by Vercel, and
 *     always the *production* host even when a preview build is rendering, so
 *     previews don't emit canonicals pointing at themselves.
 *  3. The current Vercel deployment host.
 */
const FALLBACK_ORIGIN = "https://smart-ai-agency.vercel.app";

function normalize(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const normalized = candidate ? normalize(candidate) : "";
    if (normalized) return normalized;
  }

  return FALLBACK_ORIGIN;
}

export const SITE_URL = resolveSiteUrl();

/** Absolute URL for a site-relative path. `/` collapses to the bare origin. */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
