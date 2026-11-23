"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { mainNav, siteConfig, whatsappLink } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export type NavService = { slug: string; name: string; benefit: string };

export function Header({ services }: { services: NavService[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled ? "border-b bg-background/85 backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex h-11 items-center gap-1 rounded-full px-4 text-sm font-medium transition-colors hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-80 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="card-base p-2">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="block rounded-md px-3 py-2.5 transition-colors hover:bg-muted"
                          >
                            <span className="block text-sm font-semibold">{s.name}</span>
                            <span className="block text-xs text-muted-foreground">{s.benefit}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
            aria-label={`Call ${siteConfig.name}`}
            onClick={() => trackEvent("click_call", { location: "header" })}
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact" onClick={() => trackEvent("cta_click", { location: "header" })}>
              Get a Free Proposal
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-background lg:hidden">
          <nav aria-label="Mobile" className="container flex flex-col gap-1 py-6">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-[52px] items-center rounded-md px-2 text-xl font-semibold hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t pt-4">
              <p className="px-2 pb-2 text-sm font-medium text-muted-foreground">Services</p>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex min-h-[44px] items-center rounded-md px-2 text-base hover:bg-muted"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <Button asChild size="lg">
                <Link href="/contact">Get a Free Proposal</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
