import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** REPLACE: swap the mark + wordmark for your real logo (SVG recommended). */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex min-h-[44px] items-center gap-2 font-display text-lg font-bold tracking-tight", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(246 100% 61%)" />
            <stop offset="1" stopColor="hsl(12 100% 64%)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
        <path d="M10 8v16h12" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="21.5" cy="11.5" r="2.5" fill="#fff" />
      </svg>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
