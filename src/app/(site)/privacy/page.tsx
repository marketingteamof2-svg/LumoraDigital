import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/sections/shared";

export const metadata = buildMetadata({
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `How ${siteConfig.name} collects, uses and protects your personal information when you use our website and services.`,
  path: "/privacy",
});

/**
 * REPLACE: This is a starting template, not legal advice. Have it reviewed by a lawyer
 * for your jurisdictions (e.g. India's DPDP Act 2023, US state privacy laws, GDPR if relevant).
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Privacy Policy", path: "/privacy" }]} title="Privacy Policy" description="Last updated: [DATE]" />
      <div className="container max-w-3xl py-16">
        <div className="prose max-w-none dark:prose-invert prose-headings:font-display">
          <p>
            {siteConfig.legalName} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
            personal information we collect through {siteConfig.url.replace(/^https?:\/\//, "")}, how we use it and the
            choices you have.
          </p>
          <h2>Information we collect</h2>
          <ul>
            <li><strong>Information you give us:</strong> name, email, phone/WhatsApp number, company, website, budget, timeline and any message you send through our forms or newsletter.</li>
            <li><strong>Usage data:</strong> pages visited, referring source and campaign parameters, device and browser information, collected via cookies and analytics tools (Google Analytics, Meta Pixel) where enabled.</li>
          </ul>
          <h2>How we use it</h2>
          <ul>
            <li>To respond to enquiries, prepare proposals and schedule calls.</li>
            <li>To send newsletters you subscribe to (you can unsubscribe at any time).</li>
            <li>To measure and improve our website and marketing.</li>
          </ul>
          <h2>Sharing</h2>
          <p>
            We do not sell your personal information. We share it only with service providers that help us operate
            (e.g. hosting, database, email delivery, scheduling and analytics providers), under appropriate agreements,
            or where required by law.
          </p>
          <h2>Retention</h2>
          <p>We keep enquiry data for as long as needed to respond and maintain a business relationship, and then delete or anonymise it.</p>
          <h2>Your rights</h2>
          <p>
            You can request access, correction or deletion of your personal data, or withdraw consent, by emailing{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>
          <h2>Cookies</h2>
          <p>We use essential cookies to run the site and, where enabled, analytics and advertising cookies. You can control cookies in your browser settings.</p>
          <h2>Contact</h2>
          <p>
            {siteConfig.legalName}, {siteConfig.contact.address.street}, {siteConfig.contact.address.city}.{" "}
            Email: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </p>
        </div>
      </div>
    </>
  );
}
