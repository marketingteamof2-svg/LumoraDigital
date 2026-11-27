import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { PageHeader, PlaceholderBadge, SectionHeading } from "@/components/sections/shared";
import { CaseStudyCover, CaseStudyGrid } from "@/components/sections/case-study-cards";
import { CtaBand } from "@/components/sections/cta-band";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: `/case-studies/${c.slug}` });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const usedServices = services.filter((s) => study.services.includes(s.slug));
  const testimonial = testimonials.find((t) => t.id === study.testimonialId);
  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Case studies", path: "/case-studies" },
          { name: study.client.replace(/[[\]]/g, ""), path: `/case-studies/${study.slug}` },
        ]}
        eyebrow={`${study.industry} · ${study.location}`}
        title={study.title}
        description={study.summary}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {usedServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary hover:text-primary">
              {s.name}
            </Link>
          ))}
          {study.isPlaceholder && <PlaceholderBadge label="Sample case study — replace with real client work" />}
        </div>
      </PageHeader>

      <div className="container py-12">
        <CaseStudyCover study={study} priority className="aspect-[21/9]" />
      </div>

      {/* Before / after */}
      <section aria-labelledby="results-heading" className="container">
        <h2 id="results-heading" className="h2">
          The results
        </h2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {study.results.map((r) => (
            <div key={r.label} className="card-base p-6">
              <dt className="text-sm font-medium text-muted-foreground">{r.label}</dt>
              <dd className="mt-3 flex items-baseline gap-3">
                <span className="text-lg text-muted-foreground">
                  <span className="sr-only">from </span>
                  {r.before}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span className="font-display text-4xl font-bold text-primary">
                  <span className="sr-only">to </span>
                  {r.after}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <article className="container max-w-3xl py-16 sm:py-20">
        <h2 className="h2">The challenge</h2>
        {study.challenge.map((p, i) => (
          <p key={i} className="mt-5 text-fluid-lg leading-relaxed text-foreground/85">
            {p}
          </p>
        ))}

        <h2 className="h2 mt-14">Our approach</h2>
        <ol className="mt-6 space-y-6">
          {study.approach.map((a, i) => (
            <li key={a.heading} className="flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display font-bold text-primary">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{a.heading}</h3>
                <p className="mt-1.5 leading-relaxed text-foreground/85">{a.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="h2 mt-14">The outcome</h2>
        {study.outcome.map((p, i) => (
          <p key={i} className="mt-5 text-fluid-lg leading-relaxed text-foreground/85">
            {p}
          </p>
        ))}

        {testimonial && (
          <figure className="card-base mt-14 p-8">
            <blockquote className="text-fluid-lg font-medium">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <strong className="text-foreground">{testimonial.name}</strong> — {testimonial.role}, {testimonial.company}
              {testimonial.isPlaceholder && siteConfig.showPlaceholderNotices && <PlaceholderBadge label="Placeholder" />}
            </figcaption>
          </figure>
        )}
      </article>

      <section className="section border-t">
        <div className="container">
          <SectionHeading align="left" title="More case studies" />
          <div className="mt-10">
            <CaseStudyGrid studies={more} />
          </div>
        </div>
      </section>
      <CtaBand title="Let's write your success story next." />
    </>
  );
}
