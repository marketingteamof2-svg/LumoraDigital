import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCtas } from "@/components/layout/floating-ctas";
import { ExitIntentPopup } from "@/components/layout/exit-intent";
import { UtmCapture } from "@/components/analytics/utm-capture";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { services } from "@/content/services";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const navServices = services.map(({ slug, name, benefit }) => ({ slug, name, benefit }));
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Header services={navServices} />
      <main id="main">{children}</main>
      <Footer />
      <FloatingCtas />
      <ExitIntentPopup />
      <UtmCapture />
    </>
  );
}
