import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found (404)" },
  robots: { index: false },
};

export default function NotFound() {
  const navServices = services.map(({ slug, name, benefit }) => ({ slug, name, benefit }));
  return (
    <>
      <Header services={navServices} />
      <main id="main" className="section">
        <div className="container max-w-2xl text-center">
          <p className="font-display text-7xl font-bold text-primary/30">404</p>
          <h1 className="mt-4 text-fluid-2xl font-bold">This page took a wrong turn</h1>
          <p className="lead-text mt-4">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Here are some good places to start instead.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Get a free proposal</Link>
            </Button>
          </div>
          <ul className="mt-12 grid gap-2 text-left sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="card-base block p-4 font-medium hover:border-primary/40">
                  {s.name} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
