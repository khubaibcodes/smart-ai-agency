import type { MetadataRoute } from "next";
import { AGENCY } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${AGENCY.domain}/sitemap.xml`,
  };
}
