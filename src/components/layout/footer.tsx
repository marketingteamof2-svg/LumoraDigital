import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialIcon, WhatsAppIcon } from "@/components/ui/icons";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Get a free quote", href: "/contact" },
];

const socials = [
  { name: "instagram", href: siteConfig.social.instagram, label: "Instagram" },
  { name: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn" },
  { name: "x", href: siteConfig.social.x, label: "X (Twitter)" },
  { name: "youtube", href: siteConfig.social.youtube, label: "YouTube" },
] as const;

export function Footer() {
  const a = siteConfig.contact.address;
  return (
    <footer className="border-t bg-muted/40 pb-28 pt-16 lg:pb-12">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-fluid-sm text-muted-foreground">
              {siteConfig.tagline} A {siteConfig.city}-based digital marketing agency helping {siteConfig.targetClients}{" "}
              across {siteConfig.markets}.
            </p>
            <div className="mt-6">
              <h2 className="mb-2 font-sans text-sm font-semibold">Get growth ideas in your inbox</h2>
              <NewsletterForm />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="font-sans text-sm font-semibold">Services</h2>
              <ul className="mt-4 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground hover:text-foreground sm:min-h-[36px]">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold">Company</h2>
              <ul className="mt-4 space-y-1">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground hover:text-foreground sm:min-h-[36px]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold">Contact</h2>
              <address className="mt-4 space-y-3 text-sm not-italic text-muted-foreground">
                <a href={`mailto:${siteConfig.contact.email}`} className="flex min-h-[36px] items-center gap-2 hover:text-foreground">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden /> {siteConfig.contact.email}
                </a>
                <a href={`tel:${siteConfig.contact.phoneHref}`} className="flex min-h-[36px] items-center gap-2 hover:text-foreground">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden /> {siteConfig.contact.phone}
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex min-h-[36px] items-center gap-2 hover:text-foreground">
                  <WhatsAppIcon className="h-4 w-4 shrink-0" /> WhatsApp us
                </a>
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    {a.street}, {a.city}, {a.region} {a.postalCode}
                  </span>
                </p>
              </address>
              <ul className="mt-4 flex gap-1" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} on ${s.label}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                    >
                      <SocialIcon name={s.name} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="hover:text-foreground">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
