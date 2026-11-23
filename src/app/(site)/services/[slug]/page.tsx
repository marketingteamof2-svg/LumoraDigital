import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getService, services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { serviceSchema } from "@/lib/schema";
import { getAllPosts } from "@/lib/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader, SectionHeading } from "@/components/sections/shared";
import { CaseStudyGrid } from "@/components/sections/case-study-cards";
import { Faq } from "@/components/sections/faq";
import { CtaBandWithForm } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { iconMap } from "@/components/ui/icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = caseStudies.filter((c) => service.relatedCaseStudies.includes(c.slug));
  const posts = getAllPosts().filter((p) => service.relatedPosts.includes(p.slug));
  const others = services.filter((s) => s.slug !== service.slug);
  const Icon = iconMap[service.icon];

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <PageHeader
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        eyebrow={service.name}
        title={service.h1}
        description={service.benefit}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#get-proposal">
              Get a free {service.shortName.toLowerCase()} proposal <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#results">See results</Link>
          </Button>
        </div>
      </PageHeader>

      {/* Intro + deliverables */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-fluid-lg leading-relaxed text-foreground/85 lg:col-span-7">
            {service.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className="lg:col-span-5">
            <div className="card-base p-6 sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-semibold">Ideal for</h2>
              <ul className="mt-4 space-y-3">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="What's included" title={`Our ${service.name.toLowerCase()} services`} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d) => (
              <li key={d.title} className="card-base p-6">
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-fluid-sm text-muted-foreground">{d.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Long-form content */}
      <section className="section">
        <div className="container max-w-3xl space-y-14">
          {service.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="h2">{sec.heading}</h2>
              <div className="mt-5 space-y-5 text-fluid-base leading-relaxed text-foreground/85">
                {sec.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Our process" title={`How a ${service.shortName.toLowerCase()} engagement works`} />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li key={step.title} className="card-base p-6">
                <span className="font-display text-4xl font-bold text-primary/25" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-fluid-sm text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="section" id="results">
          <div className="container">
            <SectionHeading eyebrow="Results" title={`${service.shortName} case studies`} />
            <div className="mt-12">
              <CaseStudyGrid studies={related} />
            </div>
          </div>
        </section>
      )}

      <Faq faqs={service.faqs} title={`${service.shortName} FAQs`} />

      {/* Internal linking: other services + related reading */}
      <section className="border-t py-16">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Explore other services</h2>
            <ul className="mt-4 space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="group inline-flex min-h-[44px] items-center gap-2 font-medium hover:text-primary">
                    {o.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {posts.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Related reading</h2>
              <ul className="mt-4 space-y-2">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group inline-flex min-h-[44px] items-center gap-2 font-medium hover:text-primary">
                      {p.title} <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CtaBandWithForm initialServices={[service.slug]} title={`Get your free ${service.shortName.toLowerCase()} proposal`} />
    </>
  );
}
