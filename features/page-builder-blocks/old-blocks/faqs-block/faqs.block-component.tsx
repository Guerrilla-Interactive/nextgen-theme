import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/unorganized-components/ui/accordion";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { faqsBlockComponentTranslations as t } from "./faq.block-translation";

type DerefFaq = { _id: string; title?: string; body?: any };
type DerefFaqCategory = { _id: string; title?: string; faqs: DerefFaq[] };

export default function FAQsBlockComponent(
  props: Partial<{ faqs: DerefFaq[]; faqsByCategory: DerefFaqCategory[]; noPadding?: boolean }>
) {
  const { faqs, faqsByCategory, noPadding } = props;


  return (
    <Section className="mt-12 w-full">
      <Container className={noPadding ? "!p-0" : ""}>
        <h3 className="text-2xl font-bold mb-4">{t("faqs.title", "Frequently Asked Questions")}</h3>
        {(faqs || faqsByCategory) && (
          <Accordion className="space-y-4" type="multiple">
            {faqs && faqs.map((faq) => (
              <AccordionItem key={faq._id} value={`item-${faq._id}`}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>
                  <PortableTextRenderer value={faq.body} />
                </AccordionContent>
              </AccordionItem>
            ))}
            {/* Find the faqsByCategory and map over the faqs - only show the faq items that are in the faqsByCategory */}
            {faqsByCategory && faqsByCategory.map((faqCategory) =>
              faqCategory.faqs.map((faq) => (

                <AccordionItem key={faq._id + 2} value={`item-${faq._id + 2}`}>
                  <AccordionTrigger>{faq.title}</AccordionTrigger>
                  <AccordionContent>
                    <PortableTextRenderer value={faq.body} />
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        )}
      </Container>
    </Section>
  );
} 