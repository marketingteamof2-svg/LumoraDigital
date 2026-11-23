import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader, SectionHeading } from "@/components/sections/shared";
import { Stats } from "@/components/sections/stats";
import { WhyUs } from "@/components/sections/home-sections";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({
  title: `About ${siteConfig.name} | Our Team & Story`,
  description: `Meet the strategists, creators, designers and developers behind ${siteConfig.name}, a ${siteConfig.city} digital marketing agency serving ${siteConfig.markets}.`,
  path: "/about",
});

const values = [
  {
    title: "Clarity over cleverness",
    body: "We'd rather tell you what's working in one plain sentence than hide behind jargon. Clear goals, clear reports, clear next steps.",
  },
  {
    title: "Craft that converts",
    body: "Beautiful work matters, but only if it moves the numbers. Every piece we make has a job to do.",
  },
  {
    title: "Ownership",
    body: "We treat your growth like our own. If something isn't working, we say so first and fix it fast.",
  },
];

/** REPLACE: add real team members and photos (store in /public/team and use next/image). */
const team = [
  { name: "[Founder Name]", role: "Founder & Strategy Lead" },
  { name: "[Team Member]", role: "Head of Content" },
  { name: "[Team Member]", role: "Design Lead" },
  { name: "[Team Member]", role: "Engineering Lead" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About us"
        title="We help ambitious brands get remembered — and chosen"
        description={`${siteConfig.name} started in ${siteConfig.foundingYear} with a simple idea: marketing should be measured by the customers it brings in, not the noise it makes.`}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h2">Our story</h2>
          </div>
          <div className="space-y-5 text-fluid-lg leading-relaxed text-foreground/85">
            {/* REPLACE: tell your real founding story */}
            <p>
              We kept meeting founders who were tired of juggling a content freelancer, a social media agency, a
              designer and a separate development shop — none of whom talked to each other, and all of whom reported
              on different numbers.
            </p>
            <p>
              So we built the team we wished they had: strategists, creators, designers and engineers working from one
              plan, toward one set of goals. Today we partner with {siteConfig.targetClients} across{" "}
              {siteConfig.markets}, from {siteConfig.city} and beyond.
            </p>
          </div>
        </div>
      </section>

      <Stats />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="What we believe" title="The values behind the work" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="card-base p-8">
                <h3 className="text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-muted-foreground">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Team" title="The people you'll work with" />
          <ul className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((m, i) => (
              <li key={i} className="text-center">
                <div
                  className="mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-card text-sm text-muted-foreground"
                  aria-hidden
                >
                  Photo
                </div>
                <h3 className="mt-4 font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhyUs />
      <CtaBand />
    </>
  );
}
