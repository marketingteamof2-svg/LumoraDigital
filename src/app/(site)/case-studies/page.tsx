import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/content/case-studies";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/sections/shared";
import { CaseStudyGrid } from "@/components/sections/case-study-cards";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = buildMetadata({
  title: "Case Studies & Portfolio | Marketing Results",
  description: `See how ${siteConfig.name} helps startups, D2C brands and SaaS companies grow with content, social media, UI/UX design and web development.`,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Case studies", path: "/case-studies" }]}
        eyebrow="Our work"
        title="Case studies with numbers, not adjectives"
        description="Every project starts with a business goal. Here's how we hit them — the challenge, the approach and the measurable outcome."
      />
      <section className="section">
        <div className="container">
          <h2 className="sr-only">All case studies</h2>
          <CaseStudyGrid studies={caseStudies} showFeedback />
        </div>
      </section>
      <CtaBand title="Want results like these?" />
    </>
  );
}
