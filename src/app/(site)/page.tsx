import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { homeFaqs } from "@/content/home";
import { testimonials } from "@/content/testimonials";
import { localBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Stats } from "@/components/sections/stats";
import { FeaturedWork, Pricing, Process, WhyUs } from "@/components/sections/home-sections";
import { TestimonialsCarousel } from "@/components/sections/testimonials";
import { SectionHeading } from "@/components/sections/shared";
import { Faq } from "@/components/sections/faq";
import { CtaBandWithForm } from "@/components/sections/cta-band";

export const metadata = buildMetadata({
  title: `${siteConfig.city} Digital Marketing Agency | ${siteConfig.name}`,
  description: `${siteConfig.name} is a ${siteConfig.city} digital marketing agency for content, social media, UI/UX and web development. Get your free growth plan today.`,
  path: "/",
  keywords: [
    `${siteConfig.city} digital marketing agency`,
    "social media management services",
    "content creation agency",
    "UI UX design agency",
    "web application development company",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero />
      <LogoStrip />
      <ServicesGrid />
      <Stats />
      <FeaturedWork />
      <Process />
      <WhyUs />
      <section className="section bg-muted/40">
        <div className="container">
          <SectionHeading
            eyebrow="Testimonials"
            title="What our clients say"
            description="Don't take our word for it — hear from the founders and marketers we work with."
          />
          <div className="mt-12">
            <TestimonialsCarousel testimonials={testimonials} showPlaceholderNotice={siteConfig.showPlaceholderNotices} />
          </div>
        </div>
      </section>
      <Pricing />
      <Faq faqs={homeFaqs} description="Everything you need to know before we talk. Can't find your answer? Just ask." />
      <CtaBandWithForm />
    </>
  );
}
