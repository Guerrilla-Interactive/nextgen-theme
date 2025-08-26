import SplitInfoItem from "../split-info-item-block/split-info-item.block-component";


interface SplitInfoListProps {
  list: {
    image: Sanity.Image;
    title: any;
    body: any;
    tags: string[];
    _key?: string;
  }[];
}

export default function SplitInfoListBlockComponent({ list }: Partial<SplitInfoListProps>) {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1">
        {list &&
          list.length > 0 &&
          list.map((item, index) => (
            // Use a unique key from the item (such as _key or title) if available
            <SplitInfoItem key={item._key || item.title || index} {...item} />
          ))}
      </div>
    </div>
  );
} 