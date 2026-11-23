import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { differentiators, pricingPlans, processSteps } from "@/content/home";
import { caseStudies } from "@/content/case-studies";
import { iconMap } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/shared";
import { CaseStudyGrid } from "@/components/sections/case-study-cards";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured work"
            title="Real problems. Measurable results."
            description="A look at how we've helped brands grow reach, conversion and revenue."
          />
          <Button asChild variant="secondary">
            <Link href="/case-studies">
              All case studies <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="mt-12">
          <CaseStudyGrid studies={caseStudies.slice(0, 3)} />
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section bg-muted/40">
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          title="A simple process built for momentum"
          description="From first call to compounding growth in four clear steps — no black boxes."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
              <div className="card-base h-full p-6">
                <span className="font-display text-5xl font-bold text-primary/20" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-fluid-sm text-muted-foreground">{step.description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground lg:block" aria-hidden />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="section">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            align="left"
            eyebrow="Why choose us"
            title="An agency that acts like part of your team"
            description="We're built for brands that want a partner, not a vendor."
          />
          <Button asChild className="mt-8">
            <Link href="/about">Meet the team</Link>
          </Button>
        </div>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {differentiators.map((d, i) => {
            const Icon = iconMap[d.icon];
            return (
              <Reveal as="li" key={d.title} delay={i * 0.05} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent/15 text-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-1.5 text-fluid-sm text-muted-foreground">{d.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="section bg-muted/40" id="pricing">
      <div className="container">
        <SectionHeading
          eyebrow="Packages"
          title="Flexible plans that grow with you"
          description="Transparent starting points. Every plan is tailored after a free discovery call."
        />
        <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {pricingPlans.map((p) => (
            <li
              key={p.name}
              className={cn(
                "card-base relative flex flex-col p-8",
                p.highlighted && "border-primary shadow-glow lg:-my-4 lg:py-12"
              )}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 text-fluid-sm text-muted-foreground">{p.description}</p>
              <p className="mt-6 font-display text-3xl font-bold">{p.price}</p>
              <p className="text-sm text-muted-foreground">{p.priceNote}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8" variant={p.highlighted ? "default" : "secondary"}>
                <Link href="/contact">{p.cta}</Link>
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-muted-foreground">
          Need a website or one-off project?{" "}
          <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
            Get a custom quote
          </Link>
        </p>
      </div>
    </section>
  );
}
