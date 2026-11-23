"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { trackEvent } from "@/lib/analytics";

/** Floating WhatsApp button (desktop + mobile) and sticky bottom CTA bar (mobile only). */
export function FloatingCtas() {
  const pathname = usePathname();
  const hideBar = pathname === "/contact" || pathname === "/thank-you";

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() => trackEvent("click_whatsapp", { location: "floating" })}
        className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {!hideBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
          <div className="flex gap-3">
            <a
              href={`tel:${siteConfig.contact.phoneHref}`}
              onClick={() => trackEvent("click_call", { location: "mobile_bar" })}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border bg-card text-sm font-semibold"
            >
              <Phone className="h-4 w-4" aria-hidden /> Call now
            </a>
            <Link
              href="/contact"
              onClick={() => trackEvent("cta_click", { location: "mobile_bar" })}
              className="inline-flex h-12 flex-[1.6] items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            >
              Get a Free Proposal
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
