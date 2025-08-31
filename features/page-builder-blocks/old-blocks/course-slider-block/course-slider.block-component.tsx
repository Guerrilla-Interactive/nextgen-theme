"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Container, Section, InnerSection } from "@/features/unorganized-components/nextgen-core-ui";
import { getContainerOffsetPlusPadding } from "@/features/unorganized-utils/get-container-offset-plus-padding.t";
import CourseCard from "./course-slider-block-components/course-card.component";
import { CourseSliderBlock } from "@/sanity.types";




const CourseSliderBlockComponent: React.FC<Partial<CourseSliderBlock>> = (props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [isRecalcDone, setIsRecalcDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

    // Run once on mount
    recalcOffset();

    // If ResizeObserver is available in the environment, observe the element
    let observer: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined" && sliderRef.current) {
      observer = new ResizeObserver(() => {
        // Each time the container is resized, recalculate
        recalcOffset();
      });
      observer.observe(sliderRef.current);
    }

    // Clean up on unmount
    return () => {
      if (observer && sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  // Calculate total pages based on courses length
  useEffect(() => {
    if (props.courses?.length) {
      // On mobile, we show one course at a time
      setTotalPages(props.courses.length);
    }
  }, [props.courses]);

  // Handle pagination
  const handlePaginationClick = (index: number) => {
    setCurrentPage(index);
    if (sliderRef.current) {
      // Scroll to the selected card
      const cardWidth = sliderRef.current.scrollWidth / (props.courses?.length || 1);
      sliderRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    }
  };

  // Track scroll position to update active page
  useEffect(() => {
    const handleScroll = () => {
      if (!sliderRef.current || !props.courses?.length) return;
      
      const scrollPosition = sliderRef.current.scrollLeft;
      const cardWidth = sliderRef.current.scrollWidth / props.courses.length;
      const newPage = Math.round(scrollPosition / cardWidth);
      
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    };

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentPage, props.courses?.length]);

  return (
    <Section id={props.sectionId} className="scrollbar-hide pt-12">
      <Container>
        <h2 className="font-sans text-3xl">{props.title}</h2>
      </Container>

      <InnerSection className="py-8 overflow-x-auto scrollbar-hide relative">
        <div
          ref={sliderRef}
          style={{ paddingLeft: sliderLeft, paddingRight: sliderLeft }}
          className="flex gap-8 scrollbar-hide overflow-x-scroll snap-x snap-mandatory"
        >
          {props.courses?.map((course, index) => (
            <div key={course._id} className="snap-center">
              <CourseCard
                course={course}
                index={index}
                isRecalcDone={isRecalcDone}
              />
            </div>
          ))}
        </div>
        
        {/* Pagination - only visible on mobile */}
        {props.courses && props.courses.length > 1 && (
          <div className="md:hidden absolute  bottom-0 left-0 pl-4 md:pl-0" style={{ paddingLeft: sliderLeft }}>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePaginationClick(index)}
                  aria-label={`Go to page ${index + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPage === index ? 'bg-primary scale-110' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </InnerSection>
    </Section>
  );
};

export default CourseSliderBlockComponent;
