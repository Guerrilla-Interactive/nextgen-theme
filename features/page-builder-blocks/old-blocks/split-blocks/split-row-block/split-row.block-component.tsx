import { cn } from "@/features/unorganized-utils/utils";
import SplitContent from "../split-content-block/split-content.block-component";
import SplitCardsList from "../split-cards-list-block/split-cards-list.block-component";
import SplitImage from "../split-image-block/split-image.block-component";
import SplitInfoList from "../split-info-list-block/split-info-list.block-component";

import { stegaClean } from "next-sanity";
import SectionContainer, { type ISectionContainer, type ISectionPadding } from "@/features/unorganized-components/ui/section-container";


const componentMap: { [key: string]: React.ComponentType<any> } = {
  "split-content-block": SplitContent,
  "split-cards-list-block": SplitCardsList,
  "split-image-block": SplitImage,
  "split-info-list-block": SplitInfoList,
};

export default function SplitRowBlockComponent({
  padding,
  colorVariant,
  noGap,
  splitColumns,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  noGap: boolean;
  splitColumns: Sanity.Block[];
}>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {splitColumns && splitColumns?.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2",
            noGap ? "gap-0" : "gap-12 lg:gap-20"
          )}
        >
          {splitColumns?.map((block: Sanity.Block) => {
            const Component = componentMap[block._type];
            if (!Component) {
              // Fallback for unknown block types to debug
              return <div data-type={block._type} key={block._key} />;
            }
            return (
              <Component
                {...block}
                color={color}
                noGap={noGap}
                key={block._key}
              />
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
} 