/**
 * Centralized static asset paths.
 *
 * Note there is no OG image entry: the share card is generated at build time
 * by `app/opengraph-image.tsx` and injected via Next's file convention. The
 * previous `/og-image.png` constant pointed at a file that was never added, so
 * every share rendered without an image.
 */

export const ASSETS = {
  favicon: "/favicon.svg",
  appleIcon: "/apple-icon.svg",
} as const;
