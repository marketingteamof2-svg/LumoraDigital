import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { iconMap } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/shared";

export function ServicesGrid({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h3" : "h4";
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title="Everything you need to grow, under one roof"
          description="Four specialist services, one strategy. No juggling freelancers or agencies that don't talk to each other."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal as="li" key={s.slug} delay={i * 0.06}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card-base group flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 sm:p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <H className="mt-6 text-fluid-xl font-semibold">{s.name}</H>
                  <p className="mt-3 flex-1 text-muted-foreground">{s.benefit}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn more <span className="sr-only">about {s.name}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
