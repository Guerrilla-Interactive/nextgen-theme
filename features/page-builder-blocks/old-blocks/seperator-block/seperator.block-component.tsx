import Link from "next/link";
import { stegaClean } from "next-sanity";
import SectionContainer from "@/features/unorganized-components/ui/section-container";
import RepeatingSvgBanner from "../heading-and-paragraph-centered-block/repeating-svg-banner";



export default async function SeperatorBlockComponent(props:
Partial<SeperatorProps>) {
  

  return (
    <RepeatingSvgBanner />
  );
}
