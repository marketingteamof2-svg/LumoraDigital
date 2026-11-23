import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/sections/shared";

export const metadata = buildMetadata({
  title: `Terms of Service | ${siteConfig.name}`,
  description: `The terms and conditions for using the ${siteConfig.name} website and engaging our digital marketing services.`,
  path: "/terms",
});

/** REPLACE: Starting template only — have it reviewed by a lawyer before launch. */
export default function TermsPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Terms of Service", path: "/terms" }]} title="Terms of Service" description="Last updated: [DATE]" />
      <div className="container max-w-3xl py-16">
        <div className="prose max-w-none dark:prose-invert prose-headings:font-display">
          <p>
            These terms govern your use of this website operated by {siteConfig.legalName}. By using the site, you agree
            to them.
          </p>
          <h2>Use of the website</h2>
          <p>You agree not to misuse the site, attempt to gain unauthorised access, or submit false or spam enquiries.</p>
          <h2>Services</h2>
          <p>
            Information on this site is for general purposes and does not constitute an offer. Any engagement is governed
            by a separate written proposal or agreement, which takes precedence over these terms.
          </p>
          <h2>Intellectual property</h2>
          <p>All content on this site, unless stated otherwise, is owned by {siteConfig.legalName} and may not be reproduced without permission.</p>
          <h2>Results</h2>
          <p>Case studies describe results achieved for specific clients. Results vary and are not guaranteed.</p>
          <h2>Limitation of liability</h2>
          <p>To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India, with courts in {siteConfig.city} having jurisdiction.</p>
          <h2>Contact</h2>
          <p>
            Questions? Email <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>
        </div>
      </div>
    </>
  );
}
