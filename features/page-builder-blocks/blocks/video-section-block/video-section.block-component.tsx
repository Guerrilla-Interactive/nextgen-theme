"use client";

import React from "react";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { stegaClean } from "next-sanity";

type VideoSectionProps = Partial<{
  title: string;
  highlight?: string;
  description: any;
  bullets?: string[];
  tags?: string[];
  listType?: "bullets" | "tags" | "none";
  videoDescription?: string;
  videoPosition?: "left" | "right" | "bottom" | "top";
  videoSize?: "md" | "lg" | "xl";
  videoFile?: { asset?: { url?: string; mimeType?: string } };
  videoUrl?: string;
  posterImage?: { asset?: { url?: string; metadata?: { dimensions?: { width?: number; height?: number } } } };
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}>;

function getSizeClasses(size: "md" | "lg" | "xl") {
  return size === "xl" ? "h-[28rem]" : size === "lg" ? "h-[24rem]" : "h-80";
}

function VideoPlaceholder({ description, className, size = "md" }: { description?: string; className?: string; size?: "md" | "lg" | "xl" }) {
  const sizeClasses = size === "xl" ? "h-[28rem]" : size === "lg" ? "h-[24rem]" : "h-80";
  return (
    <div className={`bg-muted rounded-lg border border-border p-8 ${sizeClasses} flex items-center justify-center ${className || ""}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-xs text-muted-foreground">{description || "A simple workflow you'll use every day."}</p>
      </div>
    </div>
  );
}

function VideoPlayer({
  src,
  mimeType,
  poster,
  posterWidth,
  posterHeight,
  className,
  size = "md",
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  playsInline = true,
}: {
  src?: string;
  mimeType?: string;
  poster?: string;
  posterWidth?: number;
  posterHeight?: number;
  className?: string;
  size?: "md" | "lg" | "xl";
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}) {
  const initialAspectRatio = posterWidth && posterHeight && posterWidth > 0 && posterHeight > 0 ? posterWidth / posterHeight : undefined;
  const [aspectRatio, setAspectRatio] = React.useState<number | undefined>(initialAspectRatio);
  if (!src) {
    return <VideoPlaceholder description={undefined} className={className} size={size} />;
  }
  return (
    <div
      className={`rounded-lg border border-border overflow-hidden bg-black ${className || ""}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <video
        className="w-full h-auto"
        src={src}
        poster={poster}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const v = e.currentTarget as HTMLVideoElement;
          if (v && v.videoWidth && v.videoHeight) {
            setAspectRatio(v.videoWidth / v.videoHeight);
          }
        }}
        {...(autoplay ? { autoPlay: true } as any : {})}
        {...(loop ? { loop: true } as any : {})}
        {...(muted ? { muted: true } as any : {})}
        {...(controls ? { controls: true } as any : {})}
        {...(playsInline ? { playsInline: true } as any : {})}
      >
        {mimeType ? <source src={src} type={mimeType} /> : null}
      </video>
    </div>
  );
}

export default function VideoSectionBlockComponent(props: VideoSectionProps) {
  const {
    title,
    highlight,
    description,
    bullets,
    tags,
    listType = "bullets",
    videoDescription,
    videoPosition = "right",
    videoSize = "md",
    videoFile,
    videoUrl,
    posterImage,
    autoplay,
    loop,
    muted,
    controls,
    playsInline,
  } = props;

  // Clean annotated values from live-edit/stega to ensure logic branches work correctly
  const normalizedListType = (stegaClean(listType) as typeof listType) || "bullets";
  const normalizedVideoPosition = (stegaClean(videoPosition) as typeof videoPosition) || "right";
  const normalizedVideoSize = (stegaClean(videoSize) as typeof videoSize) || "md";
  const normalizedAutoplay = (stegaClean(autoplay) as boolean | undefined) ?? true;
  const normalizedLoop = (stegaClean(loop) as boolean | undefined) ?? true;
  const normalizedMuted = (stegaClean(muted) as boolean | undefined) ?? true;
  const normalizedControls = (stegaClean(controls) as boolean | undefined) ?? false;
  const normalizedPlaysInline = (stegaClean(playsInline) as boolean | undefined) ?? true;

  const videoSrc = (videoFile && videoFile.asset && videoFile.asset.url) || videoUrl;
  const videoMime = videoFile && videoFile.asset && videoFile.asset.mimeType ? videoFile.asset.mimeType : undefined;
  const posterUrl = posterImage && posterImage.asset && posterImage.asset.url ? posterImage.asset.url : undefined;
  const posterDims = posterImage && posterImage.asset && posterImage.asset.metadata && posterImage.asset.metadata.dimensions ? posterImage.asset.metadata.dimensions : undefined;

  const isBottom = normalizedVideoPosition === "bottom";
  const isCentered = isBottom || normalizedVideoPosition === "top";

  const Content = (
    <div>
      {(title || highlight) && (
        <h2 className={` font-display  text-foreground mb-6 ${isCentered ? "text-center" : ""}`}>
          {title} {highlight && <span className="text-primary">{" "}{highlight}</span>}
        </h2>
      )}

      {description && (
        <div className={`text-muted-foreground mb-8 leading-relaxed ${isCentered ? "text-center" : ""}`}>
          <PortableTextRenderer value={description} />
        </div>
      )}

      {normalizedListType === "bullets" && bullets && bullets.length > 0 && (
        <ul className={`space-y-4 font-sans mb-6 ${isCentered ? "mx-auto max-w-2xl" : ""}`}>
          {bullets.map((text, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>
      )}

      {normalizedListType === "tags" && tags && tags.length > 0 && (
        <div className={`flex flex-wrap gap-6 text-sm font-sans text-muted-foreground ${isCentered ? "justify-center" : ""}`}>
          {tags
            .map((tag, index) => <span key={index}>{tag}</span>)
            .reduce((prev, curr, index) => (index === 0 ? [curr] : [...prev, <span key={`sep-${index}`}>·</span>, curr]), [] as React.ReactNode[])}
        </div>
      )}
    </div>
  );

  if (isBottom || normalizedVideoPosition === "top") {
    return (
      <section className="relative z-10 py-16 ">
        <div className="container">
          {normalizedVideoPosition === "top" && (
            <div className="mb-10 mx-auto max-w-4xl">
              <VideoPlayer
                src={videoSrc}
                mimeType={videoMime}
                poster={posterUrl}
                posterWidth={posterDims && posterDims.width ? posterDims.width : undefined}
                posterHeight={posterDims && posterDims.height ? posterDims.height : undefined}
                size={normalizedVideoSize}
                autoplay={normalizedAutoplay}
                loop={normalizedLoop}
                muted={normalizedMuted}
                controls={normalizedControls}
                playsInline={normalizedPlaysInline}
              />
            </div>
          )}
          {Content}
          {isBottom && (
            <div className="mt-10 mx-auto max-w-4xl">
              <VideoPlayer
                src={videoSrc}
                mimeType={videoMime}
                poster={posterUrl}
                posterWidth={posterDims && posterDims.width ? posterDims.width : undefined}
                posterHeight={posterDims && posterDims.height ? posterDims.height : undefined}
                size={normalizedVideoSize}
                autoplay={normalizedAutoplay}
                loop={normalizedLoop}
                muted={normalizedMuted}
                controls={normalizedControls}
                playsInline={normalizedPlaysInline}
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  const isLeft = normalizedVideoPosition === "left";

  return (
    <section className="relative z-10 py-16">
      <div className="container mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isLeft ? "lg:grid-flow-col-dense" : ""}`}>
          <div className={`${isLeft ? "lg:col-start-2" : ""} order-2 lg:order-none`}>{Content}</div>
          <VideoPlayer
            src={videoSrc}
            mimeType={videoMime}
            poster={posterUrl}
            posterWidth={posterDims && posterDims.width ? posterDims.width : undefined}
            posterHeight={posterDims && posterDims.height ? posterDims.height : undefined}
            className={`${isLeft ? "lg:col-start-1" : ""} order-1 lg:order-none`}
            size={normalizedVideoSize}
            autoplay={normalizedAutoplay}
            loop={normalizedLoop}
            muted={normalizedMuted}
            controls={normalizedControls}
            playsInline={normalizedPlaysInline}
          />
        </div>
      </div>
    </section>
  );
}
