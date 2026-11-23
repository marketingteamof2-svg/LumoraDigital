import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/config/site";
import { localBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/sections/shared";
import { LeadForm } from "@/components/forms/lead-form";
import { WhatsAppIcon } from "@/components/ui/icons";

export const metadata = buildMetadata({
  title: "Contact Us | Get a Free Marketing Proposal",
  description: `Tell us about your goals and get a free, tailored growth plan from ${siteConfig.name} within one business day. Call, WhatsApp or fill in the form.`,
  path: "/contact",
});

type Props = { searchParams: Promise<{ service?: string | string[]; offer?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const initial = ([] as string[]).concat(sp.service ?? []);
  const isAudit = sp.offer === "free-audit";
  const a = siteConfig.contact.address;

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow={isAudit ? "Free marketing audit" : "Get a free quote"}
        title={isAudit ? "Claim your free marketing audit" : "Let's talk about your growth goals"}
        description="Answer three quick questions and a senior strategist will get back to you within one business day with ideas, a plan and a transparent quote."
      />
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="sr-only">Request a proposal</h2>
            <LeadForm initialServices={initial} idPrefix="contact" />
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="card-base p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Prefer to reach out directly?</h2>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
                      <WhatsAppIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-muted-foreground">WhatsApp</span>
                      <span className="font-semibold group-hover:text-primary">Chat with us now</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteConfig.contact.phoneHref}`} className="group flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm text-muted-foreground">Phone</span>
                      <span className="font-semibold group-hover:text-primary">{siteConfig.contact.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm text-muted-foreground">Email</span>
                      <span className="font-semibold group-hover:text-primary">{siteConfig.contact.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <address className="not-italic">
                    <span className="block text-sm text-muted-foreground">Office</span>
                    <span className="font-semibold">
                      {a.street}, {a.city}, {a.region} {a.postalCode}
                    </span>
                  </address>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">Hours</span>
                    <span className="font-semibold">{siteConfig.contact.hours}</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="card-base p-6 sm:p-8">
              <h2 className="text-lg font-semibold">What happens next?</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li><strong className="text-foreground">1.</strong> We review your answers and current marketing.</li>
                <li><strong className="text-foreground">2.</strong> A strategist reaches out within one business day.</li>
                <li><strong className="text-foreground">3.</strong> You get a tailored plan and quote — no obligation.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
