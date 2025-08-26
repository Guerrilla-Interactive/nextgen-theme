import SectionContainer, { type ISectionContainer, type ISectionPadding } from "@/features/unorganized-components/ui/section-container";
import { cn } from "@/features/unorganized-utils/utils";

import { stegaClean } from "next-sanity";

export default function SectionHeaderBlockComponent({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  title,
  description,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  stackAlign: "left" | "center";
  sectionWidth: "default" | "narrow";
  tagLine: string;
  title: string;
  description: string;
}>) {
  const isNarrow = stegaClean(sectionWidth) === "narrow";
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          align === "center" ? "max-w-[48rem] text-center mx-auto" : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined
        )}
      >
        <div className={cn(color === "primary" ? "text-background" : undefined)}>
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          <h2 className="text-3xl md:text-5xl mb-4">{title}</h2>
        </div>
        <p>{description}</p>
      </div>
    </SectionContainer>
  );
} 