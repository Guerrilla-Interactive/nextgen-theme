import { defineField, defineType } from "sanity";
import { BookOpen } from "lucide-react";
import { courseSlugVariables } from "@/app/(main)/course/[slug]/_course-slug-core-utilities/course-slug.translations-and-variables";

export default defineType({
  name: "course-slider-block",
  type: "object",
  title: "Course Slider",
  description: "A list of courses displayed in a slider format",
  icon: BookOpen,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID",
    }),
    defineField({
      name: "courses",
      type: "array",
      title: "Courses",
      of: [{ type: "reference", to: [{ type: courseSlugVariables("DOCUMENT_TYPE") }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      courses: 'courses',
    },
    prepare({ title, courses }) {
      const count = courses?.length || 0;
      return {
        title: "Course Slider",
        subtitle: title ? `${title} (${count} course${count !== 1 ? 's' : ''})` : `${count} course${count !== 1 ? 's' : ''}`,
        media: BookOpen,
      };
    },
  },
});
