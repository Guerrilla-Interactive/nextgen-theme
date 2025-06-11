import React, { useRef, useEffect, useState } from "react";
import {
  createTimeline,
  animate,
  svg,
  Timeline as AnimeTimeline,
  EasingParam,
} from "animejs";

/**
 * Utility type for addressing a keyframe in an *array* of keyframes
 * either by numeric index or with the shorthands "first" / "last".
 */
type TargetKeyframe = number | "first" | "last";

/** -------------------------
 * Component-level types
 * ----------------------*/
interface Keyframe {
  id?: string;
  viewBox: string;
  paths: {
    d: string;
    stroke: string;
    strokeWidth: number;
    fill: string;
    strokeLinecap: string;
    strokeLinejoin: string;
    transform?: string;
    fillRule?: string;
    id?: string;
    originalStroke?: string;
    originalFill?: string;
  }[];
  keyframeFilter?: Record<string, unknown>;
}

interface DefaultLogoProps {
  className?: string;
  /** Frame to seek to when the SVG is hovered */
  hoverFrame?: TargetKeyframe;
  /** Frame to seek to when the SVG is pressed */
  clickFrame?: TargetKeyframe;
  /** An *array* of SVG keyframes or a JSON-serialised string of that array */
  keyframes: Keyframe[] | string;
  /**
   * Frame that should stay visible when the animation isn’t running.
   * If this prop is *defined* the timeline will **not** loop automatically; instead
   * it will *seek* to the requested frame and pause.
   *
   * @default "first" (index 0)
   */
  activeKeyframe?: TargetKeyframe;
  /** Whether the timeline should loop when *no* activeKeyframe is provided. */
  loop?: boolean;
  /** Duration (ms) of a *single* keyframe-to-keyframe transition. */
  duration?: number;
  /** Easing function / name understood by AnimeJS 4 */
  ease?: EasingParam;
  /** Playback direction for free-running timelines (ignored when `activeKeyframe` is set). */
  direction?: "normal" | "reverse" | "alternate";
}

/**
 * A React component that morphs between a sequence of SVG-path keyframes using
 * AnimeJS 4 (`createTimeline`, `svg.morphTo`, …).
 */
const SVGLoopLogo: React.FC<DefaultLogoProps> = ({
  keyframes: keyframesInput,
  className,
  activeKeyframe,
  hoverFrame,
  clickFrame,
  loop = true,
  duration = 1000,
  ease = "linear",
  direction = "alternate",
}) => {
  /* ---------------------------
   * Runtime state & references
   * ------------------------*/
  const svgRef = useRef<SVGSVGElement>(null);
  const [isSVGHovered, setIsSVGHovered] = useState(false);
  const [isSVGClicked, setIsSVGClicked] = useState(false);
  const timelineRef = useRef<AnimeTimeline | null>(null);

  // Normalise the keyframes prop into an *array*.
  const keyframes: Keyframe[] =
    typeof keyframesInput === "string" ? JSON.parse(keyframesInput) : keyframesInput;

  // Convenience: translate a TargetKeyframe into a numeric index.
  const keyframeToIndex = (frame: TargetKeyframe | undefined): number | undefined => {
    if (frame === undefined) return undefined;
    if (frame === "first") return 0;
    if (frame === "last") return keyframes.length - 1;
    return frame;
  };

  /* ------------------------------------------------------------------
   * Create the AnimeJS 4 timeline **once** when the component mounts.
   * ----------------------------------------------------------------*/
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const paths = svgEl.querySelectorAll("path");
    if (paths.length === 0 || keyframes.length < 2) return;

    const timeline = createTimeline({
      // Global playback settings
      ease,
      duration,
      autoplay: true,
      loop: activeKeyframe === undefined ? loop : false,
      alternate: direction === "alternate",
      reversed: direction === "reverse",
    });

    // Build the *morph* steps for each path across consecutive keyframes.
    keyframes.forEach((kf, i) => {
      if (i === keyframes.length - 1) return; // nothing to morph to
      const nextKF = keyframes[i + 1];

      kf.paths.forEach((path, pIndex) => {
        const nextPath = nextKF.paths[pIndex];

        timeline.add(
          paths[pIndex],
          {
            d: svg.morphTo(nextPath.d),
            fill: nextPath.fill,
          },
          i * duration // absolute position
        );
      });
    });

    // If an *active* frame is requested, jump there and pause.
    const initialIdx = keyframeToIndex(activeKeyframe);
    if (initialIdx !== undefined) {
      timeline.seek(initialIdx * duration);
      timeline.pause();
    }

    timelineRef.current = timeline;

    // Clean-up: pause the timeline when unmounting.
    return () => void timeline.pause();
    // We intentionally *exclude* most deps – this runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------------------------------------------
   * Helper – animate the timeline to a given frame.
   * ----------------------------------------------------------------*/
  const animateToFrame = (frame: TargetKeyframe) => {
    if (!timelineRef.current) return;

    const frameIdx = keyframeToIndex(frame)!;
    const targetTime = frameIdx * duration;
    const dummy = { progress: timelineRef.current.currentTime || 0 };

    animate(dummy, {
      progress: targetTime,
      duration,
      ease,
      onUpdate: () => {
        timelineRef.current!.seek(dummy.progress);
      },
      onComplete: () => timelineRef.current!.pause(),
    });
  };

  /* ------------------------------------------------------------------
   * React to *hover* / *click* state.
   * ----------------------------------------------------------------*/
  useEffect(() => {
    if (!timelineRef.current) return;

    if (isSVGClicked && clickFrame !== undefined) {
      animateToFrame(clickFrame);
    } else if (isSVGHovered && hoverFrame !== undefined) {
      animateToFrame(hoverFrame);
    } else if (!isSVGHovered && !isSVGClicked && activeKeyframe !== undefined) {
      animateToFrame(activeKeyframe);
    }
  }, [isSVGHovered, isSVGClicked, clickFrame, hoverFrame, activeKeyframe]);

  /* ---------------------------
   * Render the *static* SVG
   * ------------------------*/
  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={keyframes[0].viewBox}
      onMouseEnter={() => setIsSVGHovered(true)}
      onMouseLeave={() => {
        setIsSVGHovered(false);
        setIsSVGClicked(false);
      }}
      onMouseDown={() => setIsSVGClicked(true)}
      onMouseUp={() => setIsSVGClicked(false)}
    >
      {keyframes[0].paths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          stroke={path.stroke}
          strokeWidth={path.strokeWidth}
          fill={path.fill}
          strokeLinecap={path.strokeLinecap as any}
          strokeLinejoin={path.strokeLinejoin as any}
        />
      ))}
    </svg>
  );
};

export default SVGLoopLogo;
