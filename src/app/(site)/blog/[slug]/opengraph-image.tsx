import { renderOgImage, ogSize } from "@/lib/og";
import { getAllPosts, getPost } from "@/lib/blog";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Blog article cover";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({ eyebrow: post?.meta.category ?? "Blog", title: post?.meta.title ?? "Insights" });
}
