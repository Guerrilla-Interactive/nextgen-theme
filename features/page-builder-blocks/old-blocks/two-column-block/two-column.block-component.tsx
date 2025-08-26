import { Container, FlexCol, FlexRow, Section } from "@/features/unorganized-components/nextgen-core-ui";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { TwoColumnBlock } from "@/sanity.types";



export default async function TwoColumnBlockComponent(props:
Partial<TwoColumnBlock>) {
  

  return (
    <Section>
      <Container>
      <FlexRow className="gap-10 justify-between">
        {props.firstColumn && (
          <FlexCol className="w-full">
            <PortableTextRenderer value={props.firstColumn.blockContent} />
          </FlexCol>
        )}
        {props.secondColumn && (  
          <FlexCol className="w-full">
            <PortableTextRenderer value={props.secondColumn.blockContent} />
          </FlexCol>
        )}
      </FlexRow>
      </Container>
    </Section>
  );
}
