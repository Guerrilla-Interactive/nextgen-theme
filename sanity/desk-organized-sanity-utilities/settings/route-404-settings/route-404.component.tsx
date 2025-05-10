"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../../features/unorganized-components/ui/button";
import { useGlobalContext } from "../../../../features/context/global-context";
import { useEffect } from "react";
import { Blocks } from "@/features/page-builder-blocks/block-component-exporter";
import { Route404Settings } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";


export default function Route404({data}: {data: Route404Settings}) {
  const { sessionStatus } = useGlobalContext();

  

  return (
    <div className="relative z-20 min-h-[80vh] flex items-center justify-center">
      
      {data?.backgroundImage?.asset && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={urlFor(data.backgroundImage.asset).url()}
            alt="404 background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      )}
      
      <div className="relative z-10 px-8 md:px-0 py-[4rem] sm:py-[5rem] md:py-[6.25rem] mx-auto sm:max-w-[37.5rem] md:max-w-[40.625rem] lg:max-w-[53.125rem] xl:max-w-[70rem]">
        <h1 className="font-bold font-title text-[9.9vw] md:text-[4.5rem] sm:text-[3.4375rem] lg:text-[6rem] xl:text-[8rem] leading-[1.12] text-center">
          {data?.title || "Page not found"}
        </h1>
        
        {data?.subtitle && (
          <p className="mt-4 text-center text-lg md:text-xl">
            {data?.subtitle}
          </p>
        )}
        
        <div className="mt-8 text-center">
          <Button size="lg" asChild>
            <Link href={data?.buttonLink || "/"}>{data?.buttonText || "Back to home"}</Link>
          </Button>
        </div>
      </div>
      
      {data?.blocks && data?.blocks.length > 0 && (
        <div className="relative z-10 w-full">
          <Blocks blocks={data?.blocks} />
        </div>
      )}
    </div>
  );
}
