"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "exit-intent-shown";
const EXCLUDED = ["/contact", "/thank-you", "/privacy", "/terms"];

/**
 * Desktop exit-intent popup offering a free audit.
 * Shows at most once per session, only after 10s on site, and never on conversion pages.
 */
export function ExitIntentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (EXCLUDED.includes(pathname)) return;
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    let armed = false;
    const armTimer = window.setTimeout(() => (armed = true), 10_000);

    const onLeave = (e: MouseEvent) => {
      if (!armed || e.clientY > 0 || e.relatedTarget) return;
      setOpen(true);
      trackEvent("exit_intent_shown");
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      document.removeEventListener("mouseout", onLeave);
    };

    document.addEventListener("mouseout", onLeave);
    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border bg-card shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          <div className="bg-gradient-to-br from-primary to-[hsl(280_90%_55%)] px-8 py-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Before you go</p>
            <Dialog.Title className="mt-1 font-display text-2xl font-bold">
              Get a free marketing audit — worth ₹15,000
            </Dialog.Title>
          </div>
          <div className="p-8">
            <Dialog.Description className="text-muted-foreground">
              We&apos;ll review your social channels, website and content, then send you a short video walkthrough with
              the 5 quickest wins we&apos;d tackle first. No obligation.
            </Dialog.Description>
            <ul className="mt-5 space-y-2 text-sm">
              {["Social & content performance review", "Website speed + conversion check", "Competitor snapshot"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" aria-hidden /> {item}
                  </li>
                )
              )}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1">
                <Link
                  href="/contact?offer=free-audit"
                  onClick={() => {
                    trackEvent("exit_intent_click");
                    setOpen(false);
                  }}
                >
                  Claim my free audit
                </Link>
              </Button>
              <Dialog.Close asChild>
                <Button variant="ghost">No thanks</Button>
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Close
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/90 hover:bg-white/15"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
