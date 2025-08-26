"use client"

import { CoverMapBlock } from "@/sanity.types";
import MapboxMapCover, { MapboxMapCoverProps } from "./cover-map-block-components/mapbox-cover.component";


// make a fusion of CoverMapBlock and MapboxMapCoverProps as partial
interface CoverMapProps extends Partial<MapboxMapCoverProps & CoverMapBlock> {}


export default function CoverMapBlockComponent(props: CoverMapProps) {
  const {
    center = props.center ?? { lat: 40, lng: -74.5 },
    height = props.height ?? { type: "px", height: 500 },
    zoom = props.zoom ?? 7.5,
    animateIntro = {
      enabled: props.animateIntro?.enabled ?? false,
      initialZoom: props.animateIntro?.initialZoom ?? zoom + 4.5,
      initialPitch: props.animateIntro?.initialPitch ?? 120,
      duration: props.animateIntro?.duration ?? 3000,
    },
    bearingRotation = {
      enabled: props.bearingRotation?.enabled ?? true,
      speed: props.bearingRotation?.speed ?? 0.005,
      introDelay: props.bearingRotation?.introDelay ?? animateIntro.enabled ? animateIntro.duration : 0,
      },
    radiusAnimation = {
      enabled: props.radiusAnimation?.enabled ?? true,
      duration: props.radiusAnimation?.duration ?? 20000,
      spawnInterval: props.radiusAnimation?.spawnInterval ?? 8000,
      radius: props.radiusAnimation?.radius ?? 160,
      opacity: {
        startOpacity: props.radiusAnimation?.opacity?.startOpacity ?? 0.2,
        endOpacity: props.radiusAnimation?.opacity?.endOpacity ?? 0,
      },
      color: props.radiusAnimation?.color ?? "#FFA500",
      introDelay: animateIntro.enabled ? animateIntro.duration : 0,
    },  
  } = props;


  return (
    <>
    {/* make it non interactive */}
      <div style={{ height: height?.type === "px" ? `${height.height}px` : "100%" }} className="w-full pointer-events-none">
        <MapboxMapCover center={center} zoom={zoom} animateIntro={animateIntro} bearingRotation={bearingRotation} radiusAnimation={radiusAnimation} />
      </div>
      </>
  );
}
