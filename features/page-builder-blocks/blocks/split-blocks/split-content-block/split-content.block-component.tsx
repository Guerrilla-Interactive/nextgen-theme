import { cn } from "@/features/unorganized-utils/utils";

import Link from "next/link";

import { createElement } from "react";
import { stegaClean } from "next-sanity";
import { ISectionContainer } from "@/features/unorganized-components/ui/section-container";
import TagLine from "@/features/unorganized-components/ui/tag-line";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { Button } from "@/features/unorganized-components/ui/button";

interface SplitContentProps {
  sticky: boolean;
  color: ISectionContainer["color"];
  colorVariant: ISectionContainer["color"];
  padding: ISectionContainer["padding"];
  noGap: boolean;
  tagLine: string;
  title: string;
  body: any;
  link: {
    title: string;
    href: string;
    target?: boolean;
    buttonVariant:
    | "default"
    | "secondary"
    | "link"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
  };
}

export default function SplitContentBlockComponent({
  sticky,
  padding,
  noGap,
  tagLine,
  title,
  body,
  link,
}: Partial<SplitContentProps>) {
  return (
    <div
      className={cn(
        !sticky ? "flex flex-col justify-center" : undefined,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start",
          sticky ? "lg:sticky lg:top-56" : undefined,
          noGap ? "px-10" : undefined
        )}
      >
        {tagLine && <TagLine title={tagLine} element="h2" />}
        {title &&
          createElement(
            tagLine ? "h3" : "h2",
            {
              className: cn("my-4 font-semibold leading-[1.2]"),
            },
            title
          )}
        {body && <PortableTextRenderer value={body} />}
        {link?.href && (
          <div className="flex flex-col">
            <Button
              className="mt-2"
              variant={stegaClean(link?.buttonVariant)}
              size="lg"
              asChild
            >
              <Link
                href={link.href}
                target={link.target ? "_blank" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 