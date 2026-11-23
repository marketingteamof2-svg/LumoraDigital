"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/config/site";

function Counter({ value, decimals = 0, suffix }: { value: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  // Render the final value on the server so crawlers/no-JS users see real numbers
  const [display, setDisplay] = useState(value.toFixed(decimals));
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="bg-foreground py-16 text-background sm:py-20">
      <div className="container">
        <h2 id="stats-heading" className="sr-only">
          Our results in numbers
        </h2>
        {/* REPLACE: stats live in src/config/site.ts */}
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse text-center lg:text-left">
              <dt className="mt-2 text-sm text-background/70 sm:text-base">{s.label}</dt>
              <dd className="font-display text-fluid-3xl font-bold">
                <Counter value={s.value} decimals={"decimals" in s ? s.decimals : 0} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
