import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/motion/reveal";
import { PlaceholderBadge } from "@/components/sections/shared";
import { cn } from "@/lib/utils";

export function CaseStudyCover({ study, priority, className }: { study: CaseStudy; priority?: boolean; className?: string }) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-md bg-gradient-to-br", study.coverGradient, className)}>
      {study.coverImage ? (
        <Image
          src={study.coverImage}
          alt={`${study.client} — ${study.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-5" aria-hidden>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {study.industry}
          </span>
        </div>
      )}
    </div>
  );
}

export function CaseStudyCard({
  study,
  index = 0,
  headingTag: H = "h3",
  showFeedback = false,
}: {
  study: CaseStudy;
  index?: number;
  headingTag?: "h2" | "h3";
  showFeedback?: boolean;
}) {
  const headline = study.results[0];
  const feedback = showFeedback ? testimonials.find((t) => t.id === study.testimonialId) : undefined;
  return (
    <Reveal as="li" delay={index * 0.06}>
      <Link
        href={`/case-studies/${study.slug}`}
        className="card-base group flex h-full flex-col overflow-hidden p-3 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40"
      >
        <CaseStudyCover study={study} />
        <div className="flex flex-1 flex-col p-4">
          <p className="font-display text-base font-bold text-foreground">{study.client}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>{study.industry}</span>
            <span aria-hidden>·</span>
            <span>{study.location}</span>
            {study.isPlaceholder && <PlaceholderBadge label="Sample case study" />}
          </div>
          <H className="mt-3 text-lg font-semibold leading-snug">{study.title}</H>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground line-through">{headline.before}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="font-display text-2xl font-bold text-primary">{headline.after}</span>
            <span className="text-sm text-muted-foreground">{headline.label.toLowerCase()}</span>
          </div>
          {feedback && (
            <figure className="mt-5 border-l-2 border-primary/40 pl-4">
              <blockquote className="line-clamp-4 text-sm italic leading-relaxed text-foreground/85">“{feedback.quote}”</blockquote>
              <figcaption className="mt-2 text-xs text-muted-foreground">
                <strong className="font-semibold text-foreground">{feedback.name}</strong>, {feedback.role}
              </figcaption>
            </figure>
          )}
          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold">
            Read case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function CaseStudyGrid({
  studies,
  headingTag,
  showFeedback,
}: {
  studies: CaseStudy[];
  headingTag?: "h2" | "h3";
  showFeedback?: boolean;
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studies.map((s, i) => (
        <CaseStudyCard key={s.slug} study={s} index={i} headingTag={headingTag} showFeedback={showFeedback} />
      ))}
    </ul>
  );
}
