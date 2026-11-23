import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/** Hero is intentionally NOT animated on load so it's the fastest possible LCP. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-fuchsia-400/20 to-accent/25 blur-3xl"
        aria-hidden
      />
      <div className="container grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-12 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-7">
          <p className="eyebrow">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            Digital marketing agency in {siteConfig.city} · Serving {siteConfig.markets}
          </p>
          <h1 className="mt-6 text-fluid-3xl font-bold">
            Turn your brand into a <span className="text-gradient">lead-generating machine</span>
          </h1>
          <p className="lead-text mt-6 max-w-xl">
            Content, social media, UI/UX and web development from one senior team — built around one goal: more
            qualified customers for {siteConfig.targetClients.split(",")[0]} and growing brands like yours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#get-proposal">
                Get Your Free Growth Plan <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/case-studies">
                View Our Work <ArrowUpRight aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2" aria-hidden>
              {["bg-primary", "bg-accent", "bg-emerald-500", "bg-sky-500"].map((c) => (
                <span key={c} className={`h-8 w-8 rounded-full border-2 border-background ${c}`} />
              ))}
            </div>
            {/* REPLACE: use your real number of clients */}
            <p>
              <strong className="text-foreground">Trusted by 50+ brands</strong> across {siteConfig.markets}
            </p>
            <p className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden /> Free audit · No lock-in contracts
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="card-base relative p-6 sm:p-8">
            <p className="text-sm font-semibold text-muted-foreground">Free growth plan includes</p>
            <ul className="mt-4 space-y-4">
              {[
                ["Audit", "A teardown of your social, content and website performance"],
                ["Quick wins", "5 changes you can make this month to lift leads"],
                ["90-day roadmap", "Channels, content pillars and the metrics that matter"],
              ].map(([title, desc], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{title}</span>
                    <span className="block text-sm text-muted-foreground">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 w-full" variant="dark">
              <Link href="#get-proposal">Start in 60 seconds</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Takes 3 quick steps · Reply within 1 business day</p>
          </div>
        </div>
      </div>
    </section>
  );
}
