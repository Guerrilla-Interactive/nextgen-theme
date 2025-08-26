import { imageQuery } from "@/features/unorganized-components/image-component/image.query";
import { groq } from "next-sanity";

// @sanity-typegen-ignore
const courseSliderBlockQuery = groq`
  _type == "course-slider-block" => {
    _type,
    title,
    sectionId,
    courses[]->{
      _id,
      title,
      "slug": slug.current,
      featuredImage{
        ${imageQuery}
      },
      excerpt,
    }
  }
`;

export default courseSliderBlockQuery;


export interface Course {
  _id: string;
  title: string;
  slug: string;
  image: string;
  excerpt: string;
}


export interface CourseSliderProps {
  _type: "course-slider-block";
  title: string;
  courses: Course[];
}

