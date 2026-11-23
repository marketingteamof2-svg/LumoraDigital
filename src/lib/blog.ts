import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-based MDX blog. Posts live in /content/blog/*.mdx.
 * To move to a CMS (Sanity, Contentful, Notion…), re-implement these two functions —
 * the page templates only depend on the PostMeta shape and the raw MDX/markdown body.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  relatedServices: string[];
  readingTime: number;
};

function readingTime(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 225));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => getPost(file.replace(/\.mdx$/, ""))!.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    meta: {
      slug,
      title: data.title,
      metaTitle: data.metaTitle || data.title,
      description: data.description,
      date: data.date,
      updated: data.updated,
      author: data.author || "Editorial Team",
      category: data.category || "Marketing",
      tags: data.tags || [],
      relatedServices: data.relatedServices || [],
      readingTime: readingTime(content),
    },
    content,
  };
}
