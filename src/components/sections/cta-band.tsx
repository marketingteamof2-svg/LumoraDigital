import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/config/site";

/** Big closing CTA with the full multi-step lead form. */
export function CtaBandWithForm({
  initialServices,
  title = "Ready to grow? Get your free growth plan.",
}: {
  initialServices?: string[];
  title?: string;
}) {
  return (
    <section id="get-proposal" className="section relative overflow-hidden bg-foreground text-background">
      <div
        className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-primary/40 blur-3xl"
        aria-hidden
      />
      <div className="container relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 className="h2">{title}</h2>
          <p className="mt-4 text-fluid-lg text-background/75">
            Tell us where you want to be in 6 months. We&apos;ll come back within one business day with a tailored plan
            — free, and with zero obligation.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Personalised audit of your current marketing",
              "Clear recommendations and a transparent quote",
              "A 30-minute strategy call with a senior strategist",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden /> {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-background/70">
            Prefer to talk?{" "}
            <a href={`tel:${siteConfig.contact.phoneHref}`} className="font-semibold text-background underline underline-offset-4">
              {siteConfig.contact.phone}
            </a>{" "}
            or{" "}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-background underline underline-offset-4">
              WhatsApp us
            </a>
          </p>
        </div>
        <div className="text-foreground lg:col-span-7">
          <LeadForm initialServices={initialServices} idPrefix="cta" />
        </div>
      </div>
    </section>
  );
}

/** Lightweight CTA band (no form) for inner pages. */
export function CtaBand({
  title = "Let's build something people remember.",
  description = "Book a free 30-minute strategy call and walk away with clear next steps — whether you work with us or not.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="container py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-[hsl(280_85%_50%)] px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" aria-hidden />
        <div className="relative max-w-2xl">
          <h2 className="h2">{title}</h2>
          <p className="mt-4 text-fluid-lg text-white/85">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-[hsl(240_24%_9%)] shadow-none hover:bg-white/90">
              <Link href="/contact">
                Get a Free Proposal <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/15">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
