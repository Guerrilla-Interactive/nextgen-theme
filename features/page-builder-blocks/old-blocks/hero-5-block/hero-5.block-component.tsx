"use client"

import {  Section } from "@/features/unorganized-components/nextgen-core-ui";
import { Img } from "@/features/unorganized-components/image-component/image.component";
import { Hero5Block } from "@/sanity.types"; // You'll need to add this to your Sanity types


export default function Hero5BlockComponent(props: Partial<Hero5Block>) {
  const { image } = props;



  return (
    <Section className="mt-24 ">
              {image && (
          <div className="w-full aspect-video mx-auto max-w-[1320px] max-h-[480px] px-4 md:px-0 mb-8 rounded-lg overflow-hidden">
            <Img
              {...image}
              topImage={false}
              cover
              className="w-full h-full "
              sizes={{ md: "full" }}
              eager
            />
          </div>
        )}

    </Section>
  );
}
