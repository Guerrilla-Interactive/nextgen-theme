"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/features/unorganized-components/ui/accordion";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

type Item = { question?: string; answer?: any };

export default function FaqBlockComponent(props: Partial<{ heading: string; items: Item[] }>) {
  const { heading, items } = props;

  return (
    <section>
      {heading && <h2 className="mb-4">{heading}</h2>}
      {items && items.length > 0 && (
        <Accordion type="single" collapsible defaultValue={items[0]?.question ? `q0` : undefined}>
          {items.map((it, idx) => (
            <AccordionItem key={idx} value={`q${idx}`}>
              <AccordionTrigger>{it.question}</AccordionTrigger>
              <AccordionContent>
                {it.answer && <PortableTextRenderer value={it.answer} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
}
