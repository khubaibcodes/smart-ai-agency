/** Centralized static asset paths. */

export const ASSETS = {
  favicon: "/favicon.svg",
  appleIcon: "/apple-icon.svg",
  ogImage: "/og-image.png",
} as const;

export const OG_IMAGE = {
  url: ASSETS.ogImage,
  width: 1200,
  height: 630,
} as const;
