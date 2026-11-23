import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>}
      <h2 className="h2">{title}</h2>
      {description && <p className="lead-text mt-4">{description}</p>}
    </div>
  );
}

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="inline-flex min-h-[32px] items-center hover:text-foreground">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Standard top-of-page hero for inner pages: breadcrumbs + the page's single H1. */
export function PageHeader({
  crumbs,
  title,
  description,
  eyebrow,
  children,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
      <div className="container py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>}
        <h1 className={cn("max-w-4xl text-fluid-3xl font-bold", eyebrow ? "mt-3" : "mt-8")}>{title}</h1>
        {description && <p className="lead-text mt-5 max-w-2xl">{description}</p>}
        {children}
      </div>
    </section>
  );
}

export function PlaceholderBadge({ label = "Sample — replace" }: { label?: string }) {
  if (!siteConfig.showPlaceholderNotices) return null;
  return <Badge variant="warning">{label}</Badge>;
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-amber-500" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("h-4 w-4", i >= rating && "opacity-25")} fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.9l-5.25 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}
