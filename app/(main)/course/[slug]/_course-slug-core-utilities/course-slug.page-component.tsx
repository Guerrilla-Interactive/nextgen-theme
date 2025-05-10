"use client"

import { GET_COURSE_PAGE_BY_ROUTE_QUERYResult } from "@/sanity.types";
import { useGlobalContext } from "@/features/context/global-context";
import { useEffect } from "react";

export default function CourseSlugPageComponent(page: Partial<GET_COURSE_PAGE_BY_ROUTE_QUERYResult>) {
  const { sessionStatus } = useGlobalContext();
  const { setIsTopDark, isTopDark } = sessionStatus;
  
  useEffect(() => {
    setIsTopDark(false);
  }, []);

  return (
    <>

    </>
  )
}

