"use client";


import { cn } from "@/features/unorganized-utils/utils";

import { stegaClean } from "@sanity/client/stega";
import type { SanityImageCrop, SanityImageHotspot } from "@sanity/image-url/lib/types/types";
import { type CropData,  SanityImage } from "sanity-image";


type ImageSize = "half" | "full" | "third";


export type ImageQuery = {
  crop?: SanityImageCrop | null;
  hotspot?: SanityImageHotspot | null;
  darkScore?: number | null;
  asset?: {
    _id: string;
    title: string | null;
    altText: string | null;
    description: string | null;
    metadata: {
      lqip: string | null;
      dimensions: {
        aspectRatio: number | null;
        width: number | null;
        height: number | null;
      } | null;
      palette: {
        dominant: {
          background: string | null;
          foreground: string | null;
          population: number | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

type ImgProps = ImageQuery & {
  width?: number;
  height?: number;
  sizes: {
    md: ImageSize;
    xl?: ImageSize;
  };
  eager?: boolean;
  className?: string;
  showCaption?: boolean;
  cover?: boolean;
  topImage?: boolean;
};


export const Img = (props: ImgProps) => {
  const { asset, showCaption, className, width, height, crop, hotspot, cover, darkScore, topImage = undefined } = props;
  const { description } = asset ?? {};

  if (!asset?._id) return null;

  const { width: w, height: h } = calculateDimensions(asset, width, height, crop);

  return (
    <figure
      className={cn(className, cover && "h-full w-full")}
      data-palette={darkScore}
      data-top-image={topImage == undefined ? "potentially" : topImage ? "true" : "false"}
      data-cover={cover ? "true" : "false"}
      style={
        {
          "--inherent-aspect-ratio": `${w} / ${h}`,
          ...(hotspot
            ? {
                "--hotspot-position": `${(hotspot.x as number) * 100}% ${(hotspot?.y as number) * 100}%`,
              }
            : {}),
        } as React.CSSProperties
      }
    >
      <ImgInner {...props} />

      {showCaption && description && <figcaption>{stegaClean(description)}</figcaption>}
    </figure>
  );
};

const ImgInner = (props: ImgProps) => {
  const { asset, sizes, width, height, eager, cover, hotspot, crop } = props;

  if (!asset?._id) return null;

  const { _id, altText, metadata } = asset;

  return (
    <SanityImage
      id={_id}
      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      width={width ?? undefined}
      height={height ?? undefined}
      mode="cover"
      
      hotspot={(hotspot) ?? undefined}
      crop={(crop as CropData) ?? undefined}
      preview={eager ? undefined : (metadata?.lqip ?? undefined)}
      alt={stegaClean(altText) ?? ""}
      sizes={getSizes(sizes)}
      loading={eager ? "eager" : "lazy"}
      queryParams={{ q: 100 }}
      
      className={cn("sanity-image h-full", cover && "object-cover w-full")}
      style={{
        objectFit: "cover",
        height: "100%",
        ...(hotspot
          ? {
              objectPosition: `${(hotspot.x as number) * 100}% ${(hotspot.y as number) * 100}%`,
            }
          : { objectPosition: "center" }),
      }}
    />
  );
};

const getSizes = (sizes: ImgProps["sizes"]) => {
  let size = "calc(100vw - 3rem)";

  if (sizes.md) {
    size += `, (min-width: 768px) ${getSize(sizes.md)}`;
  }

  if (sizes.xl) {
    size += `, (min-width: 1280px) ${getSize(sizes.xl)}`;
  }

  return size;
};

const getSize = (size: ImageSize) => {
  switch (size) {
    case "half":
      return "calc((100vw - 4.5rem) / 2)";
    case "third":
      return "calc((100vw - 4.5rem) / 3)";
    default:
      return "calc(100vw - 4.5rem)";
  }
};

function calculateDimensions(
  asset: NonNullable<ImageQuery["asset"]>,
  width?: number,
  height?: number,
  crop?: SanityImageCrop | null,
) {
  const { dimensions } = asset.metadata ?? {};

  if (width && !height) {
    return { width: width, height: width / (dimensions?.aspectRatio ?? 1) };
  }

  if (height && !width) {
    return { width: height * (dimensions?.aspectRatio ?? 1), height: height };
  }

  if (height && width) {
    return { width: width, height: height };
  }

  let w = width ?? dimensions?.width ?? 1;
  let h = height ?? dimensions?.height ?? 1;

  // If no width or height is provided, use the original dimensions
  if (!w && !h) {
    w = dimensions?.width ?? 1;
    h = dimensions?.height ?? 1;
  }

  // Calculate aspect ratio considering the crop
  let aspectRatio = dimensions?.aspectRatio ?? 1;
  if (crop) {
    const cropWidth = 1 - (crop.left ?? 0) - (crop.right ?? 0);
    const cropHeight = 1 - (crop.top ?? 0) - (crop.bottom ?? 0);
    aspectRatio = (aspectRatio * cropWidth) / cropHeight;
  }

  // Adjust dimensions based on the new aspect ratio
  if (h && !w) {
    w = h * aspectRatio;
  } else if (w && !h) {
    h = w / aspectRatio;
  }

  // Apply crop to the dimensions
  if (crop) {
    w *= 1 - (crop.left ?? 0) - (crop.right ?? 0);
    h *= 1 - (crop.top ?? 0) - (crop.bottom ?? 0);

    // Ensure the cropped image maintains the desired width or height
    if (width) {
      const scale = width / w;
      w = width;
      h *= scale;
    } else if (height) {
      const scale = height / h;
      h = height;
      w *= scale;
    }
  }

  return { width: Math.round(w), height: Math.round(h) };
}
