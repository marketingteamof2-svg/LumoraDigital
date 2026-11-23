import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";
import { iconMap } from "@/components/ui/icons";
import { PageHeader } from "@/components/sections/shared";
import { Process } from "@/components/sections/home-sections";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "Digital Marketing Services | Content, Social, UX & Web",
  description: `Explore ${siteConfig.name}'s digital marketing services: content creation, social media management, UI/UX design and web development for growing brands.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title="Digital marketing services that work together"
        description="Strategy, content, design and development from one integrated team — so every channel pulls in the same direction and every rupee is accountable."
      />
      <section className="section">
        <div className="container space-y-8">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.slug}>
                <article className="card-base grid gap-8 p-6 sm:p-10 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <p className="mt-6 text-sm font-semibold text-muted-foreground">0{i + 1}</p>
                    <h2 className="mt-1 text-fluid-xl font-semibold">{s.name}</h2>
                    <p className="mt-3 text-muted-foreground">{s.benefit}</p>
                    <Button asChild className="mt-6">
                      <Link href={`/services/${s.slug}`}>
                        Explore {s.shortName} <ArrowRight aria-hidden />
                      </Link>
                    </Button>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                    {s.deliverables.map((d) => (
                      <li key={d.title} className="flex gap-3">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span>
                          <span className="block font-semibold">{d.title}</span>
                          <span className="block text-sm text-muted-foreground">{d.description}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
          <p className="text-center text-muted-foreground">
            Also available as add-ons: SEO, performance marketing (paid ads) and branding.{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              Ask us about them
            </Link>
            .
          </p>
        </div>
      </section>
      <Process />
      <CtaBand />
    </>
  );
}
