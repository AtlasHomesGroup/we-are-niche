import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface BuildMetadataInput {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}

export function buildMetadata({
  title,
  description = siteConfig.defaultDescription,
  path = "/",
  keywords,
  ogImage = siteConfig.ogImage,
}: BuildMetadataInput): Metadata {
  const isHome = path === "/";
  const fullTitle = isHome ? siteConfig.name : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
