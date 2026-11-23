import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, getPost } from "@/lib/blog";
import { articleSchema } from "@/lib/schema";
import { services } from "@/content/services";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/sections/shared";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.meta.metaTitle,
    description: post.meta.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.meta.date,
    // OG image comes from ./opengraph-image.tsx (file-based metadata overrides config)
    keywords: post.meta.tags,
  });
}

const mdxComponents = {
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} target="_blank" rel="noopener noreferrer" {...props} />,
  // Demote any accidental H1 in MDX so each page keeps a single H1
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content } = post;

  const relatedServices = services.filter((s) => meta.relatedServices.includes(s.slug));
  const morePosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(meta)} />
      <article>
        <header className="border-b">
          <div className="container max-w-3xl py-12 sm:py-16">
            <Breadcrumbs
              items={[
                { name: "Blog", path: "/blog" },
                { name: meta.title, path: `/blog/${slug}` },
              ]}
            />
            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-primary">{meta.category}</p>
            <h1 className="mt-3 text-fluid-3xl font-bold">{meta.title}</h1>
            <p className="lead-text mt-5">{meta.description}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              By <span className="font-medium text-foreground">{meta.author}</span> ·{" "}
              <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {meta.readingTime} min read
            </p>
          </div>
        </header>

        <div className="container max-w-3xl py-12 sm:py-16">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <MDXRemote source={content} components={mdxComponents} />
          </div>

          {relatedServices.length > 0 && (
            <aside className="card-base mt-14 p-8" aria-labelledby="related-services">
              <h2 id="related-services" className="text-xl font-semibold">
                Need help putting this into practice?
              </h2>
              <p className="mt-2 text-muted-foreground">Our team does this every day for brands like yours.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedServices.map((s) => (
                  <Button key={s.slug} asChild variant="secondary" size="sm">
                    <Link href={`/services/${s.slug}`}>
                      {s.name} <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                ))}
                <Button asChild size="sm">
                  <Link href="/contact">Get a free proposal</Link>
                </Button>
              </div>
            </aside>
          )}

          {morePosts.length > 0 && (
            <nav aria-labelledby="more-articles" className="mt-14 border-t pt-10">
              <h2 id="more-articles" className="text-xl font-semibold">
                Keep reading
              </h2>
              <ul className="mt-4 space-y-2">
                {morePosts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="inline-flex min-h-[44px] items-center gap-2 font-medium hover:text-primary">
                      {p.title} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
      <CtaBand />
    </>
  );
}
