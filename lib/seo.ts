import type { Metadata } from "next";
import { AGENCY } from "./constants/agency";
import { OG_IMAGE, ASSETS } from "./assets";

const siteName = AGENCY.name;
const defaultDescription =
  "RAG agents, Voice AI, Claude-powered automation, n8n workflows, and SharePoint integration for international clients.";

export const rootMetadata: Metadata = {
  metadataBase: new URL(AGENCY.domain),
  title: {
    default: `${siteName} | Intelligent AI Automation`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "AI automation",
    "RAG agents",
    "Voice AI",
    "n8n workflows",
    "SharePoint integration",
    "Claude AI",
    "enterprise automation",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: ASSETS.favicon, type: "image/svg+xml" }],
    shortcut: [ASSETS.favicon],
    apple: [{ url: ASSETS.appleIcon, type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: AGENCY.domain,
    siteName,
    title: `${siteName} | Intelligent AI Automation`,
    description: defaultDescription,
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Intelligent AI Automation`,
    description: defaultDescription,
    images: [OG_IMAGE.url],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${AGENCY.domain}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: siteName }],
    },
    twitter: {
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const SITEMAP_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
];
