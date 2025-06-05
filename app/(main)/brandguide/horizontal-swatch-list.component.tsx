import { useBrand, type EnrichedColorToken, type EnrichedShade } from "./BrandContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Role, type ColorToken as BaseColorToken } from "./brand-utils";
import { getContainerOffsetPlusPadding } from "@/features/unorganized-utils/get-container-offset-plus-padding.t";
import { useRef } from "react";
import { Container } from "@/features/unorganized-components/nextgen-core-ui";

// Use EnrichedColorToken from BrandContext directly or a compatible type
// For simplicity, let's assume ProcessedColorToken from page.tsx will be passed.
// The key is that the object received by onSelectColor must match what page.tsx expects for selectedColorForPicker state.

// Let's redefine the props to expect a structure compatible with ProcessedColorToken from page.tsx
// This means it expects EnrichedColorToken with the additional fields from ProcessedColorToken.
// We can use EnrichedColorToken here and assume the parent (page.tsx) passes the correct extended object.
export interface HorizontalSwatchListColor extends EnrichedColorToken {
    // These fields are from ProcessedColorToken in page.tsx
    effectiveInfluence: number;
    importanceSummary: string;
    topRoles: Role[];
    // 'shades' within EnrichedColorToken is already Record<string, EnrichedShade>
    // oklchLight is part of ColorToken, which EnrichedColorToken extends
}

export const HorizontalSwatchList = ({ colors, onSelectColor, currentlySelectedColorName }: { colors: HorizontalSwatchListColor[]; onSelectColor: (colorName: string | null) => void; currentlySelectedColorName: string | null; }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [sliderLeft, setSliderLeft] = useState(0);
    const [isRecalcDone, setIsRecalcDone] = useState(false);

    useEffect(() => {
        /**
         * Recalculates the offset + padding on the container.
         */
        const recalcOffset = () => {
            if (!sliderRef.current) return;
            const offsetPlusPadding = getContainerOffsetPlusPadding(sliderRef.current);
            setSliderLeft(offsetPlusPadding);
            setIsRecalcDone(true);
        };
        recalcOffset();
        let observer: ResizeObserver | null = null;
        const elementToObserve = sliderRef.current;
        if (typeof ResizeObserver !== "undefined" && elementToObserve) {
            observer = new ResizeObserver(recalcOffset);
            observer.observe(elementToObserve);
        }
        return () => {
            if (observer && elementToObserve) {
                observer.unobserve(elementToObserve);
            }
        };
    }, []);

    // Automatically select the first color if none is selected or if the selected one is not in the current list.
    useEffect(() => {
      if (colors && colors.length > 0) {
        if (!currentlySelectedColorName) {
          onSelectColor(colors[0].name);
        } else {
          const isSelectedColorInList = colors.some(c => c.name === currentlySelectedColorName);
          if (!isSelectedColorInList) {
            onSelectColor(colors[0].name);
          }
        }
      }
      // If colors array is empty, and a color was selected, it should be deselected.
      // However, onSelectColor(null) here could cause loops if parent isn't careful.
      // For now, we'll rely on the parent (page.tsx) to manage nullification if the colors list becomes empty.
    }, [colors, currentlySelectedColorName, onSelectColor]);

    const handleSwatchInteraction = (color: HorizontalSwatchListColor) => {
      // Only select if it's not already the active color. Do not deselect on re-click.
      if (currentlySelectedColorName !== color.name) {
        onSelectColor(color.name);
      }
    };

    return (
        <>
        <div  className="max-w-screen overflow-x-scroll py-10">
       <div
        ref={sliderRef}
        style={{ paddingLeft: isRecalcDone ? sliderLeft : 0, paddingRight: isRecalcDone ? sliderLeft : 0 }}
        className="flex gap-4 scrollbar-hide   "
       >
        {colors.map((color) => {
            const isActive = currentlySelectedColorName === color.name;
            return (
                <div key={color.name} className="snap-center flex-shrink-0  relative">
                    <div 
                        data-swatch-name={color.name}
                        className="w-44 h-80 cursor-pointer border transition-all duration-150 ease-in-out relative flex flex-col justify-between p-1.5"
                        style={{
                            borderColor: isActive ? 'var(--ring)' : 'var(--border)', 
                            borderWidth: isActive ? '2px' : '1px',
                            boxShadow: isActive ? '0 0 0 2px var(--ring-offset), 0 0 0 4px var(--ring)' : 'none',
                        }}
                        onClick={() => handleSwatchInteraction(color)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSwatchInteraction(color);
                            }
                        }}
                        role="button"
                        aria-label={`Select color for ${color.name}`}
                        aria-pressed={isActive}
                        tabIndex={0}
                    >
                        <div
                            className="absolute inset-0"
                            style={{ 
                                backgroundColor: color.oklchLight,
                                transform: isActive ? 'scale(0.90)' : 'scale(1)',
                                transition: 'transform 0.1s ease-in-out'
                            }}
                        />

                        <div className="w-full relative z-10">
                            <div 
                                className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md shadow-md max-w-full truncate mb-1"
                                title={color.name}
                            >
                                {color.name}
                            </div>
                        </div>

                        <div className="w-full flex flex-wrap gap-1 self-start relative z-10">
                            {Array.from(color.roles).map((role) => (
                                <div 
                                    key={role}
                                    className="bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded shadow-md truncate"
                                    title={role}
                                >
                                    {role}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        })}
       </div>
       </div>


</>
    )
}

export default HorizontalSwatchList;
