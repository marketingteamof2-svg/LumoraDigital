"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a generic event to GA4 (and Meta Pixel as a custom event). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  try {
    window.gtag?.("event", name, params);
    window.fbq?.("trackCustom", name, params);
  } catch {
    /* analytics must never break the UI */
  }
}

/** Conversion event for a submitted lead form. */
export function trackLeadConversion(params: { services: string[]; budget: string }) {
  try {
    window.gtag?.("event", "generate_lead", {
      services: params.services.join(","),
      budget: params.budget,
      transport_type: "beacon",
    });
    window.fbq?.("track", "Lead", { content_category: params.services.join(",") });
  } catch {
    /* noop */
  }
}
