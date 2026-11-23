import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/case-studies", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ].map((p) => ({ url: `${base}${p.path}`, lastModified: now, priority: p.priority }));

  return [
    ...staticPages,
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now, priority: 0.9 })),
    ...caseStudies.map((c) => ({ url: `${base}/case-studies/${c.slug}`, lastModified: new Date(c.publishedAt), priority: 0.7 })),
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.updated || p.date), priority: 0.6 })),
  ];
}
