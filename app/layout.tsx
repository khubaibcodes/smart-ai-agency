import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationSchema, ProfessionalServiceSchema, WebSiteSchema } from "@/components/ui/json-ld";
import { rootMetadata } from "@/lib/seo";

/** Body / UI. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Display face for headings. A variable grotesque with enough character to
 * carry the brand without tipping into novelty — the previous single-font
 * setup was the main reason the site read as a template.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

/** Instrumentation: console output, metrics, micro-labels. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jetbrains.variable}`}
    >
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <ProfessionalServiceSchema />
      </head>
      <body className="min-h-screen bg-brand-bg font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
