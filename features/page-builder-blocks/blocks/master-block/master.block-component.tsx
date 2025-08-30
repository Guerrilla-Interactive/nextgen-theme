import { Container, FlexCol, FlexRow, InnerSection, Section } from "@/features/unorganized-components/nextgen-core-ui";
import React from "react";

interface MasterProps {
  title: string
}

export default async function MasterBlockComponent(props:
Partial<MasterProps>) {
const { title } = props;

  return (
    <Section className="my-12">
      <InnerSection>
      <Container className="">
        <FlexRow>
          <FlexCol>
            <h3>
              Example pretitle
            </h3>
            <h2>
                 Example {title}
            </h2>
          </FlexCol>
          <FlexCol>
            <p>
              Example description
            </p>
          </FlexCol>
        </FlexRow>
      </Container>
      </InnerSection>
    </Section>
  );
}
