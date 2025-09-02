import { Container, FlexCol, FlexRow, InnerSection, Section } from "@/features/unorganized-components/nextgen-core-ui";
import React from "react";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";

interface NarrowPortableTextSectionProps {
  title?: string;
  body?: any;
}

export default function NarrowPortableTextSectionBlockComponent(props: Partial<NarrowPortableTextSectionProps>) {
  const { title, body } = props;

  return (
    <Section className="my-12">
      <InnerSection>
        <Container className="">
          <FlexRow>
            <FlexCol>
              {title && (
                <h1 className="text-3xl font-semibold tracking-tight text-center mb-6">
                  {title}
                </h1>
              )}
              {body && (
                <div className="max-w-3xl mx-auto text-base leading-7">
                  <PortableTextRenderer value={body} />
                </div>
              )}
            </FlexCol>
          </FlexRow>
        </Container>
      </InnerSection>
    </Section>
  );
}
