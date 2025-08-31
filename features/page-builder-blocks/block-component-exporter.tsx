"use client";

import { BlockDataMap } from "./block-indexer";

export function Blocks({ blocks }: { blocks?: Sanity.Block[] }) {
    if (!blocks) return null;
    return (
      <>
        {blocks.map((block, index) => {
          const key = block._key || index;
          const Component = BlockDataMap[block._type]?.component;
          if (!Component) return <div data-type={block._type} key={key} />;
          return <Component {...block} key={key} />;
        })}
      </>
    );
  }