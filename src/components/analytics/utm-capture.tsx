"use client";

import { useEffect } from "react";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

/** Stores first-touch UTM params for the session so they can be attached to leads. */
export function UtmCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("utm")) return;
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      KEYS.forEach((k) => {
        const v = params.get(k);
        if (v) utm[k] = v.slice(0, 200);
      });
      if (document.referrer && !document.referrer.includes(window.location.host)) {
        utm.referrer = document.referrer.slice(0, 200);
      }
      if (Object.keys(utm).length) sessionStorage.setItem("utm", JSON.stringify(utm));
    } catch {}
  }, []);
  return null;
}
