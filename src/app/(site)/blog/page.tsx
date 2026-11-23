import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/sections/shared";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({
  title: "Marketing Blog | Content, Social, UX & Web Growth Tips",
  description: `Practical guides on content creation, social media, UI/UX and web development from the ${siteConfig.name} team. No fluff — just what works.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Blog", path: "/blog" }]}
        eyebrow="Insights"
        title="Growth playbooks from the people doing the work"
        description="Practical, tested advice on content, social, design and web — written by our strategists and makers."
      />
      <section className="section">
        <div className="container">
          <h2 className="sr-only">Latest articles</h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="card-base group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-primary/40 sm:p-8"
                >
                  <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">{p.category}</span>
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
                  <p className="mt-3 flex-1 text-fluid-sm text-muted-foreground">{p.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
                    Read article · {p.readingTime} min <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
