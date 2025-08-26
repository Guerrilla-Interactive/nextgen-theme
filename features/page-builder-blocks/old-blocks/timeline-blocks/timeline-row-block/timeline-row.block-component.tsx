import { stegaClean } from "next-sanity";

import type { Timeline1Props } from "../timeline-1-block/timeline-1.block-component";
import Timeline1 from "../timeline-1-block/timeline-1.block-component";
import SectionContainer, { type ISectionContainer, type ISectionPadding } from "@/features/unorganized-components/ui/section-container";




export default function TimelineRowBlockComponent({
  padding,
  colorVariant,
  timelines,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  timelines: Timeline1Props[];
}>) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      {timelines && timelines.length > 0 && (
        <div className="max-w-[48rem] mx-auto">
          {timelines.map((timeline, index) => (
            <Timeline1
              key={index}
              color={color}
              tagLine={timeline.tagLine}
              title={timeline.title}
              body={timeline.body}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
} 