import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildMetadataInput = {
  /** ≤ 60 characters. The brand is NOT appended automatically — write the full title. */
  title: string;
  /** ≤ 155 characters. */
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex,
  keywords,
}: BuildMetadataInput): Metadata {
  if (process.env.NODE_ENV === "development") {
    if (title.length > 60) console.warn(`[seo] Title > 60 chars (${title.length}) on ${path}: ${title}`);
    if (description.length > 155)
      console.warn(`[seo] Description > 155 chars (${description.length}) on ${path}`);
  }

  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/opengraph-image`;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.social.twitterHandle,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
