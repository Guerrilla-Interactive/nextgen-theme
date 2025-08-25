import { cn } from "@/features/unorganized-utils/utils";
import { Container, Section } from "../nextgen-core-ui";

export const DEFAULT_PADDING = {
  top: true,
  bottom: true,
};

export interface ISectionPadding {
  top: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  bottom: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface ISectionContainer {
  children: React.ReactNode;
  sectionClassName?: string;
  containerClassName?: string;
  padding?: ISectionPadding | null | undefined;
}

export default function SectionContainer({
  padding,
  children,
  sectionClassName,
  containerClassName,
}: ISectionContainer) {
  return (
    <Section
      className={cn(sectionClassName)}
      style={{
        paddingTop: padding?.top ? `${padding.top * 4}px` : undefined,
        paddingBottom: padding?.bottom ? `${padding.bottom * 4}px` : undefined,
      }}
    >
      <Container className={containerClassName}>{children}</Container>
    </Section>
  );
}
