import { stegaClean } from "next-sanity";

import SplitCardsItem from "../split-cards-item-block/split-cards-item.block-component";
import { ISectionContainer } from "@/features/unorganized-components/ui/section-container";




interface SplitCardsListProps {
  color: ISectionContainer["color"];
  list: {
    tagLine: string;
    title: any;
    body: any;
  }[];
}

export default function SplitCardsListBlockComponent({
  color,
  list,
}: Partial<SplitCardsListProps>) {
  const colorParent = stegaClean(color);

  return (
    <div className="flex flex-col justify-center gap-12">
      {list &&
        list.length > 0 &&
        list.map((item, index) => (
          <SplitCardsItem
            key={index}
            color={colorParent}
            tagLine={item.tagLine}
            title={item.title}
            body={item.body}
          />
        ))}
    </div>
  );
} 