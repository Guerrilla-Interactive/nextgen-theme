import React, { useRef, useEffect, useState } from "react";
import anime, { AnimeTimelineAnimParams, EasingOptions, DirectionOptions } from "animejs";


type TargetKeyframe = number | "first" | "last";



/**
 * Props for the DefaultLogo component.
 */
interface DefaultLogoProps {
  className?: string;
  hoverFrame?: TargetKeyframe;
  clickFrame?: TargetKeyframe;
  keyframes: Keyframe[] | string | any;
  /**
   * It will freeze at this keyframe.
   * - ActiveKeyframe will cancel the loop.
   * - If ActiveKeyframe is changed, it will seek to the new keyframe automatically.
   * - ActiveKeyframe will animate to the new keyframe in the speed of the duration.
   *
   * @default "first"
   * @example
   * <DefaultLogo activeKeyframe="first" />
   * <DefaultLogo duration={100} activeKeyframe={darkMode ? "first" : "last"} />
   * <DefaultLogo activeKeyframe={0} />
   */
  activeKeyframe?: TargetKeyframe;
  loop?: boolean;
  /**
   * The duration of the animation.
   * @default 1000
   * @example
   * <DefaultLogo duration={100} activeKeyframe={darkMode ? "first" : "last"} />
   */
  duration?: number;
  ease?: EasingOptions;
  direction?: DirectionOptions;
}

/**
 * Keyframe structure.
 */
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
  keyframeFilter?: Record<string, any>;
}
const keyframes: Keyframe[] = [
  {
    "id": "keyframe-1746533367527",
    "viewBox": "0 0 164 22",
    "paths": [
      {
        "d": "M98.1919 0.0739593H69.3509C66.9799 0.0739593 64.6308 0.887512 62.7307 2.3667L55.3876 8.09001L48.0446 2.3667C46.1445 0.887512 43.7954 0.0739593 41.4244 0.0739593H8.87626L24.4604 11.2361C25.8512 12.2317 27.4775 12.7608 29.1695 12.7608H40.6742C41.282 12.7608 41.8789 12.5503 42.3662 12.1748L44.2773 10.6843L42.3662 9.19371C41.8789 8.81822 41.282 8.60772 40.6742 8.60772H29.5857C28.4851 8.60772 27.4282 8.26637 26.5247 7.61781L21.7882 4.22706H41.0575C42.8043 4.22706 44.5401 4.82442 45.9364 5.91674L52.0529 10.6843L45.9364 15.4518C44.5401 16.5441 42.8043 17.1415 41.0575 17.1415H27.0395C25.4186 17.1415 23.8526 16.6465 22.5055 15.7078L0 0V21.2946H3.99733V7.71452L20.4357 19.3148C22.27 20.6119 24.4166 21.2946 26.6343 21.2946H41.4189C43.7899 21.2946 46.139 20.481 48.0391 19.0019L55.3822 13.2785L65.6657 21.2946H72.3352L58.7169 10.6843L64.8334 5.91674C66.2297 4.82442 67.9655 4.22706 69.7123 4.22706H75.2921V21.2946H79.2895V4.22706H92.8585L98.1919 0.0739593Z",
        "stroke": "rgba(0, 0, 0, 0)",
        "strokeWidth": 1,
        "fill": "rgba(0, 0, 0, 1)",
        "strokeLinecap": "inherit",
        "strokeLinejoin": "inherit",
        "transform": "",
        "fillRule": "nonzero",
        "id": "",
        "originalStroke": "rgba(0, 0, 0, 0)",
        "originalFill": "rgba(0, 0, 0, 1)"
      },
      {
        "d": "M159.975 0.0738854V13.9498L138.198 0.0852637L138.072 0.00561523V17.1414H118.524V12.7608H134.184V8.60767H114.526V21.2945H142.069V7.47553L163.973 21.3628V0.0738854H159.975Z",
        "stroke": "rgba(0, 0, 0, 0)",
        "strokeWidth": 1,
        "fill": "rgba(255, 54, 0, 1)",
        "strokeLinecap": "inherit",
        "strokeLinejoin": "inherit",
        "transform": "",
        "fillRule": "nonzero",
        "id": "",
        "originalStroke": "rgba(0, 0, 0, 0)",
        "originalFill": "rgba(255, 54, 0, 1)"
      },
      {
        "d": "M105.606 9.19374L101.028 12.7608H106.86V17.1415H88.3514L102.759 5.91677C104.155 4.82444 105.891 4.22707 107.638 4.22707H134.184V4.14174C134.184 1.9002 132.427 0.0739746 130.269 0.0739746H107.271C104.9 0.0739746 102.551 0.887527 100.651 2.36671L83.1275 16.0207C82.1419 16.7888 81.7531 18.0745 82.1419 19.292C82.5307 20.5095 83.582 21.2946 84.8196 21.2946H110.857V8.60775H107.298C106.69 8.60775 106.094 8.81825 105.606 9.19374Z",
        "stroke": "rgba(0, 0, 0, 0)",
        "strokeWidth": 1,
        "fill": "rgba(255, 54, 0, 1)",
        "strokeLinecap": "inherit",
        "strokeLinejoin": "inherit",
        "transform": "",
        "fillRule": "nonzero",
        "id": "",
        "originalStroke": "rgba(0, 0, 0, 0)",
        "originalFill": "rgba(255, 54, 0, 1)"
      }
    ],
    "keyframeFilter": {}
  },
  {
    "id": "keyframe-1746533370456",
    "viewBox": "0 0 164 22",
    "paths": [
      {
        "d": "M98.1919 0.0739593H69.3509C66.9799 0.0739593 64.6308 0.887512 62.7307 2.3667L55.3876 8.09001L48.0446 2.3667C46.1445 0.887512 43.7954 0.0739593 41.4244 0.0739593H8.87626L24.4604 11.2361C25.8512 12.2317 27.4775 12.7608 29.1695 12.7608H40.6742C41.282 12.7608 41.8789 12.5503 42.3662 12.1748L44.2773 10.6843L42.3662 9.19371C41.8789 8.81822 41.282 8.60772 40.6742 8.60772H29.5857C28.4851 8.60772 27.4282 8.26637 26.5247 7.61781L21.7882 4.22706H41.0575C42.8043 4.22706 44.5401 4.82442 45.9364 5.91674L52.0529 10.6843L45.9364 15.4518C44.5401 16.5441 42.8043 17.1415 41.0575 17.1415H27.0395C25.4186 17.1415 23.8526 16.6465 22.5055 15.7078L0 0V21.2946H3.99733V7.71452L20.4357 19.3148C22.27 20.6119 24.4166 21.2946 26.6343 21.2946H41.4189C43.7899 21.2946 46.139 20.481 48.0391 19.0019L55.3822 13.2785L65.6657 21.2946H72.3352L58.7169 10.6843L64.8334 5.91674C66.2297 4.82442 67.9655 4.22706 69.7123 4.22706H75.2921V21.2946H79.2895V4.22706H92.8585L98.1919 0.0739593Z",
        "stroke": "rgba(0, 0, 0, 0)",
        "strokeWidth": 1,
        "fill": "rgba(255, 255, 255, 1)",
        "strokeLinecap": "inherit",
        "strokeLinejoin": "inherit",
        "transform": "",
        "fillRule": "nonzero",
        "id": "",
        "originalStroke": "rgba(0, 0, 0, 0)",
        "originalFill": "rgba(255, 255, 255, 1)"
      },
      {
        "d": "M159.975 0.0738854V13.9498L138.198 0.0852637L138.072 0.00561523V17.1414H118.524V12.7608H134.184V8.60767H114.526V21.2945H142.069V7.47553L163.973 21.3628V0.0738854H159.975Z",
        "stroke": "rgba(0, 0, 0, 0)",
        "strokeWidth": 1,
        "fill": "rgba(255, 54, 0, 1)",
        "strokeLinecap": "inherit",
        "strokeLinejoin": "inherit",
        "transform": "",
        "fillRule": "nonzero",
        "id": "",
        "originalStroke": "rgba(0, 0, 0, 0)",
        "originalFill": "rgba(255, 54, 0, 1)"
      },
      {
        "d": "M105.606 9.19374L101.028 12.7608H106.86V17.1415H88.3514L102.759 5.91677C104.155 4.82444 105.891 4.22707 107.638 4.22707H134.184V4.14174C134.184 1.9002 132.427 0.0739746 130.269 0.0739746H107.271C104.9 0.0739746 102.551 0.887527 100.651 2.36671L83.1275 16.0207C82.1419 16.7888 81.7531 18.0745 82.1419 19.292C82.5307 20.5095 83.582 21.2946 84.8196 21.2946H110.857V8.60775H107.298C106.69 8.60775 106.094 8.81825 105.606 9.19374Z",
        "stroke": "rgba(0, 0, 0, 0)",
        "strokeWidth": 1,
        "fill": "rgba(255, 54, 0, 1)",
        "strokeLinecap": "inherit",
        "strokeLinejoin": "inherit",
        "transform": "",
        "fillRule": "nonzero",
        "id": "",
        "originalStroke": "rgba(0, 0, 0, 0)",
        "originalFill": "rgba(255, 54, 0, 1)"
      }
    ],
    "keyframeFilter": {}
  },
];

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
  const svgRef = useRef<SVGSVGElement>(null)
  const [isSVGHovered, setIsSVGHovered] = useState(false);
  const [isSVGClicked, setIsSVGClicked] = useState(false);

  // Parse keyframes if input is a string
  const keyframes: Keyframe[] = typeof keyframesInput === 'string' 
    ? JSON.parse(keyframesInput) 
    : keyframesInput;

  useEffect(() => {
    if (isSVGHovered) {
      setIsSVGHovered(true);
    } else {
      setIsSVGHovered(false);
    }
    if (isSVGClicked) {
      setIsSVGClicked(true);
    } else {
      setIsSVGClicked(false);
    }
  }, [isSVGHovered, isSVGClicked]);
  // We'll store the timeline instance so we can later update its progress.
  const timelineRef = useRef<AnimeTimelineAnimParams | null>(null);

  // Convert activeKeyframe to a numeric index.
  const activeKeyframeNumber =
    activeKeyframe === "first"
      ? 0
      : activeKeyframe === "last"
      ? keyframes.length - 1
      : activeKeyframe;

  // Create the timeline once.
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) {
      console.error("SVG element not found.");
      return;
    }
    const paths = svgElement.querySelectorAll("path");
    if (keyframes.length < 2 || paths.length === 0) {
      console.error("Insufficient keyframes or no paths found in SVG.");
      return;
    }
  
    const timelineInstance = anime.timeline({
      easing: ease,
      duration: duration,
      loop: activeKeyframe === undefined ? loop : false,
      direction: direction,
      autoplay: true,
    }) as AnimeTimelineAnimParams;
  
    keyframes.forEach((keyframe, index) => {
      if (index === keyframes.length - 1) return;
      keyframe.paths.forEach((path, pathIndex) => {
        const nextFrame = keyframes[index + 1];
        const nextPath = nextFrame.paths[pathIndex];
        timelineInstance.add(
          {
            targets: paths[pathIndex],
            d: { value: nextPath.d },
            fill: { value: nextPath.fill },
          },
          index * duration
        );
      });
    });
  
    // If an activeKeyframe is provided at mount, seek to it and pause.
    if (activeKeyframe !== undefined) {
      const initialTime = activeKeyframe === "first" ? 0 : (keyframes.length - 1) * duration;
      timelineInstance.seek(initialTime);
      timelineInstance.pause();
    }
  
    timelineRef.current = timelineInstance;
  
    // Cleanup: pause the timeline when the component unmounts.
    return () => {
      timelineInstance.pause();
    };
  }, [ease, duration, loop, direction]);
  
  // When activeKeyframe changes, animate the timeline to the new state.
  useEffect(() => {
    if (timelineRef.current && activeKeyframe !== undefined) {
      const targetTime = activeKeyframeNumber * duration;
      const currentTime = timelineRef.current.currentTime || 0;
      // Animate a dummy object and update the timeline's seek in the update callback.
      anime({
        targets: { progress: currentTime },
        progress: targetTime,
        duration: duration,
        easing: ease,
        update(anim) {
          if (timelineRef.current) {
            timelineRef.current.seek(anim.animations[0].currentValue);
          }
        },
        complete: () => {
          timelineRef.current?.pause();
        }
      });
    }
  }, [activeKeyframe, activeKeyframeNumber, duration, ease]);


    // Helper: animate the timeline to a target frame.
    const animateToFrame = (frame: TargetKeyframe) => {
      if (!timelineRef.current) return;
      const frameNumber =
        frame === "first"
          ? 0
          : frame === "last"
          ? keyframes.length - 1
          : frame;
      const targetTime = frameNumber * duration;
      const currentTime = timelineRef.current.currentTime || 0;
      anime({
        targets: { progress: currentTime },
        progress: targetTime,
        duration: duration,
        easing: ease,
        update(anim) {
          if (timelineRef.current) {
            timelineRef.current.seek(anim.animations[0].currentValue);
          }
        },
        complete: () => {
          timelineRef.current?.pause();
        }
      });
    };


    // Effect for interaction states (hover or click take precedence).
    useEffect(() => {
      if (timelineRef.current) {
        if (isSVGClicked && clickFrame !== undefined) {
          animateToFrame(clickFrame);
        } else if (isSVGHovered && hoverFrame !== undefined) {
          animateToFrame(hoverFrame);
        }
      }
    }, [isSVGHovered, isSVGClicked, clickFrame, hoverFrame, duration, ease]);
  
    // Effect for activeKeyframe changes (when not interacting).
    useEffect(() => {
      if (!isSVGHovered && !isSVGClicked && timelineRef.current && activeKeyframe !== undefined) {
        animateToFrame(activeKeyframe);
      }
    }, [activeKeyframe, isSVGHovered, isSVGClicked, duration, ease]);

    // Return to default activeKeyframe after active or hover state ends.
    useEffect(() => {
      if (!isSVGHovered && !isSVGClicked && timelineRef.current && activeKeyframe !== undefined) {
        animateToFrame(activeKeyframe);
      }
    }, [activeKeyframe, isSVGHovered, isSVGClicked, duration, ease]);
  

  return (
    <svg className={className} ref={svgRef} viewBox={keyframes[0].viewBox}   onMouseEnter={() => setIsSVGHovered(true)}
    onMouseLeave={() => {
      setIsSVGHovered(false);
      setIsSVGClicked(false);
    }}
    onMouseDown={() => setIsSVGClicked(true)}
    onMouseUp={() => setIsSVGClicked(false)}
  >
      {keyframes[0].paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          stroke={path.stroke}
          strokeWidth={path.strokeWidth}
          fill={path.fill}
          strokeLinecap={path.strokeLinecap as "inherit" | "round" | "butt" | "square"}
          strokeLinejoin={path.strokeLinejoin as "inherit" | "round" | "bevel" | "miter"}
        />
      ))}
    </svg>
  );
};

export default SVGLoopLogo;
