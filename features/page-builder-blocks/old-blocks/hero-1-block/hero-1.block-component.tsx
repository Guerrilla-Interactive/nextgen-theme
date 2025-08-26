"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { Button } from "@/features/unorganized-components/ui/button";
import { Hero1Block } from "@/sanity.types";
import { useGlobalContext } from "@/features/context/global-context";
import { useEffect } from "react";


export default function Hero1BlockComponent(props: Partial<Hero1Block>) {
  const { tagLine, title, body, links, image, imagePosition } = props;
  const { sessionStatus } = useGlobalContext();
  const { setIsTopDark } = sessionStatus;

  useEffect(() => {
    setIsTopDark(false);
  }, [setIsTopDark]);

  // setHeaderDark

  
  // Create content for text column
  const textContent = (
    <div className="flex flex-col justify-center">
      {tagLine && (
        <h1 className="leading-[0] font-sans">
          <span className="text-base font-semibold">{tagLine}</span>
        </h1>
      )}
      {title && <h2 className="mt-6 font-bold leading-[1.1]">{title}</h2>}
      {body && (
        <div className="text-lg mt-6">
          <PortableTextRenderer value={body} />
        </div>
      )}
      {links && links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-4">
          {links.map((link) => (
            <Button
              key={link.title}
              variant={stegaClean(link?.buttonVariant)}
              asChild
            >
              <Link
                href={link.href as string}
                target={link.target ? "_blank" : undefined}
                rel={link.target ? "noopener" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
  
  // Create content for image column
  const imageContent = (
    <div className="flex flex-col justify-center">
      {image?.asset?._id && (
        <Image
          className="rounded-xl"
          src={urlFor(image.asset).url()}
          alt={image.alt || ""}
          width={image.asset?.metadata?.dimensions?.width || 800}
          height={image.asset?.metadata?.dimensions?.height || 800}
          placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
          blurDataURL={image?.asset?.metadata?.lqip || ""}
          quality={100}
        />
      )}
    </div>
  );
  
  return (
    <div className="container dark:bg-background py-20 pt-32 lg:pt-40">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {imagePosition !== "right" ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </div>
  );
} 