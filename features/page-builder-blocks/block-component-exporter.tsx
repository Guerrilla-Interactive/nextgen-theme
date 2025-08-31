"use client";

import { BlockComponentMap } from "./block-component-map";

export function Blocks({ blocks }: { blocks?: Sanity.Block[] }) {
    if (!blocks) return null;
    return (
      <>
        {blocks.map((block, index) => {
          const key = block._key || index;
          const Component = BlockComponentMap[block._type];
          if (!Component) return <div data-type={block._type} key={key} />;
          return <Component {...block} key={key} />;
        })}
      </>
    );
  }