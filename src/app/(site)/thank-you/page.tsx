import Link from "next/link";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/button";

export const metadata = buildMetadata({
  title: `Thank You | ${siteConfig.name}`,
  description: "Thanks for getting in touch. Book your free discovery call now.",
  path: "/thank-you",
  noIndex: true,
});

type Props = { searchParams: Promise<{ name?: string }> };

function bookingEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("calendly.com")) {
      u.searchParams.set("embed_type", "Inline");
      u.searchParams.set("hide_gdpr_banner", "1");
      u.searchParams.set("embed_domain", new URL(siteConfig.url).hostname);
    } else if (u.hostname.includes("cal.com")) {
      u.searchParams.set("embed", "true");
    }
    return u.toString();
  } catch {
    return null;
  }
}

export default async function ThankYouPage({ searchParams }: Props) {
  const { name } = await searchParams;
  const firstName = name?.replace(/[^\p{L}\s'-]/gu, "").slice(0, 40);
  const embed = siteConfig.bookingUrl ? bookingEmbedUrl(siteConfig.bookingUrl) : null;

  return (
    <section className="section">
      <div className="container max-w-4xl">
        <div className="text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-8 w-8" aria-hidden />
          </span>
          <h1 className="mt-6 text-fluid-3xl font-bold">
            {firstName ? `Thanks, ${firstName}! ` : "Thank you! "}We&apos;ve got your request.
          </h1>
          <p className="lead-text mx-auto mt-5 max-w-2xl">
            A confirmation is on its way to your inbox. A strategist will reach out within one business day — or skip
            the wait and pick a time for your free 30-minute discovery call below.
          </p>
        </div>

        <div className="card-base mt-12 overflow-hidden">
          <div className="flex items-center gap-3 border-b px-6 py-4">
            <CalendarCheck className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="font-sans text-base font-semibold">Book your discovery call</h2>
          </div>
          {embed ? (
            <iframe
              src={embed}
              title="Book a discovery call"
              className="h-[720px] w-full bg-card"
              loading="lazy"
            />
          ) : (
            <div className="p-10 text-center text-muted-foreground">
              {/* Set NEXT_PUBLIC_BOOKING_URL to your Cal.com or Calendly link to show the calendar here. */}
              <p>Our calendar will appear here.</p>
              <Button asChild className="mt-6">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Message us on WhatsApp instead
                </a>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link href="/case-studies" className="card-base p-6 transition-colors hover:border-primary/40">
            <span className="block font-semibold">See our work while you wait</span>
            <span className="mt-1 block text-sm text-muted-foreground">Browse case studies with real numbers →</span>
          </Link>
          <Link href="/blog" className="card-base p-6 transition-colors hover:border-primary/40">
            <span className="block font-semibold">Read our latest playbooks</span>
            <span className="mt-1 block text-sm text-muted-foreground">Practical growth advice from our team →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
