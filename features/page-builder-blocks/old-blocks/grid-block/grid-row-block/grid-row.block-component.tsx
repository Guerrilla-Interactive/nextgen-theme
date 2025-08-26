import { cn } from "@/features/unorganized-utils/utils";

import { stegaClean } from "next-sanity";
// Import feature components from their new locations

import PricingCard from "../pricing-card-block/pricing-card.block-component";
import GridPost from "../grid-post-block/grid-post.block-component";
import GridCard from "../grid-card-block/grid-card.block-component";
import SectionContainer from "@/features/unorganized-components/ui/section-container";


interface GridRowProps {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
  | "primary"
  | "secondary"
  | "card"
  | "accent"
  | "destructive"
  | "background"
  | "transparent";
  gridColumns: "grid-cols-2" | "grid-cols-3" | "grid-cols-4";
  columns: Sanity.Block[];
}

// Map all components you need by type
const componentMap: { [key: string]: React.ComponentType<any> } = {
  "grid-card-block": GridCard,
  "pricing-card-block": PricingCard,
  "grid-post-block": GridPost,
};

export default function GridRowBlockComponent({
  padding,
  colorVariant,
  gridColumns,
  columns,
}: Partial<GridRowProps>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {columns && columns?.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-1 gap-6",
            `lg:${stegaClean(gridColumns)}`
          )}
        >
          
          {columns.map((block: Sanity.Block) => {
            const Component = componentMap[block._type];
            if (!Component) {
              // Fallback for unknown block types to debug
              return <div data-type={block._type} key={block._key} />;
            }
            return <Component {...block} color={color} key={block._key} />;
          })}
        </div>
      )}
    </SectionContainer>
  );
} 