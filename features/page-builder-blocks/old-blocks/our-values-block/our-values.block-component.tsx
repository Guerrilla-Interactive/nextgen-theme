import { Container, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { stegaClean } from "next-sanity";
import React from "react";
// Import the new client component
import OurValueItem, { OurValuesValue } from "./OurValueItem";
import RepeatingSvgBanner from "../heading-and-paragraph-centered-block/repeating-svg-banner";

// Update the interface to include the values array
interface OurValuesIcon {
  _type: string;
  name: string;
}

interface OurValuesValueLocal {
  icon: OurValuesIcon;
  title: string;
  description: string;
}

interface OurValuesProps {
  values?: OurValuesValueLocal[];
}

export default async function OurValuesBlockComponent(
  props: Partial<OurValuesProps>
) {
  const { values = [] } = props;

  return (
    <Section className="bg-[#efefef82] my-12 mt-24">
      <Container className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            // Use the client component to ensure fadeIn only after the icon loads
            <OurValueItem key={value.title} value={value as OurValuesValue} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
