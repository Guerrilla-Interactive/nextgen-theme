import { Container, FlexCol, FlexRow, InnerSection, Section } from "@/features/unorganized-components/nextgen-core-ui";
import React from "react";

interface DividerProps {
  showLine?: boolean;
  spaceY?: number; // pixels
}

export default function DividerBlockComponent(props: Partial<DividerProps>) {
  const { showLine = true, spaceY = 48 } = props;

  return (
    <Section style={{ paddingTop: spaceY, paddingBottom: spaceY }}>
      <InnerSection>
        <Container>
          <FlexRow>
            <FlexCol>
              {showLine ? (
                <div className="w-full border-t border-border" />
              ) : null}
            </FlexCol>
          </FlexRow>
        </Container>
      </InnerSection>
    </Section>
  );
}
