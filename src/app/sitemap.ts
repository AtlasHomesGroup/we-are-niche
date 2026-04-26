import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map((p) => ({
    url: `${siteConfig.url}${p.route === "/" ? "" : p.route}`,
    lastModified: now,
    changeFrequency: p.category === "Home" ? "weekly" : "monthly",
    priority:
      p.category === "Home" ? 1 : p.category === "Legal" ? 0.3 : 0.7,
  }));
}
