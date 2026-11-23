/**
 * REPLACE: swap these placeholder wordmarks for real client logos (with permission).
 * Recommended: monochrome SVGs in /public/logos, rendered with next/image, e.g.
 *   <Image src="/logos/acme.svg" alt="Acme" width={120} height={32} />
 */
const placeholderLogos = ["Client Logo", "Client Logo", "Client Logo", "Client Logo", "Client Logo", "Client Logo"];

export function LogoStrip() {
  const items = [...placeholderLogos, ...placeholderLogos];
  return (
    <section aria-label="Brands we've worked with" className="border-y bg-muted/30 py-10">
      <p className="container text-center text-sm font-medium text-muted-foreground">
        Growing brands across D2C, SaaS, hospitality and professional services
      </p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-12 motion-reduce:animate-none">
          {items.map((name, i) => (
            <li
              key={i}
              aria-hidden={i >= placeholderLogos.length}
              className="flex h-10 w-36 items-center justify-center rounded-md border border-dashed border-muted-foreground/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {name} {(i % placeholderLogos.length) + 1}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
