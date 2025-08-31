"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { Course } from "../course-slider.block-query";
import Link from "next/link";
import { ImageQuery, Img } from "@/features/unorganized-components/image-component/image.component";


interface CourseCardProps {
  course: Course;
  index: number;
  isRecalcDone: boolean;
  image: ImageQuery;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index, isRecalcDone }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const shouldAnimate = isRecalcDone && isVisible;

  return (
    <Link className="group" href={`/kurs/${course.slug}`}>
      <div
        ref={cardRef}
        className={`w-80 md:w-96 flex-shrink-0 border rounded-lg overflow-hidden hover:border-primary active:scale-[0.99] transition-all border-border opacity-0 cursor-pointer ${shouldAnimate && "animate-[fade-in-up-blur_1s_ease-out_0.2s_forwards]"}`}
        style={shouldAnimate ? { animationDelay: `${index * 150}ms` } : {}}
      >
        <div className="relative h-72 w-full overflow-hidden duration-100">
          {course.featuredImage ? (
            <Img
              {...course.featuredImage}
              sizes={{ md: "full" }}
              className="h-full w-full"
              cover
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-gray-600">No Image</span>
            </div>
          )}
        </div>
        <div className="mt-4 p-8">
          <h3 className="text-xl font-sans font-semibold">{course.title}</h3>
          <p className="mt-2 text-muted-foreground">{course.excerpt}</p>
          <span className="mt-4 inline-block border group-hover:border-primary group-active:scale-95 transition-all duration-100 text-dark py-2 px-4 rounded">
            Les mer
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
