"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

/**
 * Accessible testimonial carousel: scroll-snap on touch, arrow buttons, no auto-advance
 * (auto-rotating content fails WCAG 2.2.2 without a pause control and hurts readability).
 * Data is passed in from a server component.
 */
export function TestimonialsCarousel({
  testimonials,
  showPlaceholderNotice,
}: {
  testimonials: Testimonial[];
  showPlaceholderNotice: boolean;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    const item = track?.children[i] as HTMLElement | undefined;
    if (track && item) track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            setActive(Array.from(track.children).indexOf(e.target));
          }
        });
      },
      { root: track, threshold: [0.6] }
    );
    Array.from(track.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <ul
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        aria-label="Client testimonials"
      >
        {testimonials.map((t, i) => (
          <li
            key={t.id}
            className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
          >
            <figure className="card-base flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-amber-500" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} viewBox="0 0 20 20" className={cn("h-4 w-4", s >= t.rating && "opacity-25")} fill="currentColor" aria-hidden>
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.9l-5.25 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                    </svg>
                  ))}
                </div>
                <Quote className="h-6 w-6 text-primary/30" aria-hidden />
              </div>
              <blockquote className="mt-4 flex-1 text-foreground/90">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {t.photo ? (
                  <Image src={t.photo} alt={`Photo of ${t.name}`} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary" aria-hidden>
                    {t.name.replace(/[^A-Za-z ]/g, "").split(" ").map((w) => w[0]).join("").slice(0, 2) || "C"}
                  </span>
                )}
                <span className="text-sm">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-muted-foreground">
                    {t.role}, {t.company}
                  </span>
                </span>
                {t.isPlaceholder && showPlaceholderNotice && (
                  <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-400/15 dark:text-amber-200">
                    Placeholder
                  </span>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollTo(Math.max(0, active - 1))}
          disabled={active === 0}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted disabled:opacity-40"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={active === i}
              className="flex h-11 w-6 items-center justify-center"
            >
              <span className={cn("h-2 rounded-full transition-all", active === i ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30")} />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollTo(Math.min(testimonials.length - 1, active + 1))}
          disabled={active === testimonials.length - 1}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted disabled:opacity-40"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
