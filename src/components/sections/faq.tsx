import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { SectionHeading } from "@/components/sections/shared";

export function Faq({
  faqs,
  title = "Frequently asked questions",
  description,
  withSchema = true,
}: {
  faqs: { question: string; answer: string }[];
  title?: string;
  description?: string;
  withSchema?: boolean;
}) {
  return (
    <section className="section" id="faq">
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="container grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading align="left" eyebrow="FAQ" title={title} description={description} />
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="card-base px-6 sm:px-8">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`}>
                {/* Radix renders the trigger inside an <h3>, keeping heading structure valid */}
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
