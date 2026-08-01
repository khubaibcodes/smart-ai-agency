import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationSchema, ProfessionalServiceSchema, WebSiteSchema } from "@/components/ui/json-ld";
import PageLoader from "@/components/ui/page-loader";
import { rootMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <ProfessionalServiceSchema />
      </head>
      <body className="min-h-screen bg-brand-bg font-sans antialiased">
        <PageLoader />
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
