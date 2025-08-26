import { Button } from "@/features/unorganized-components/ui/button";
import SectionContainer, { ISectionPadding, ISectionContainer } from "@/features/unorganized-components/ui/section-container";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { cn } from "@/features/unorganized-utils/utils";



import { stegaClean } from "next-sanity";
import Link from "next/link";


export default function Cta1BlockComponent({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  tagLine,
  title,
  body,
  links,
}: Partial<{
  padding: ISectionPadding;
  colorVariant: ISectionContainer["color"];
  stackAlign: "left" | "center";
  sectionWidth: "default" | "narrow";
  tagLine: string;
  title: string;
  body: any;
  links: {
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
  }[];
}>) {
  const isNarrow = stegaClean(sectionWidth) === "narrow";
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div
        className={cn(
          align === "center" ? "max-w-[48rem] text-center mx-auto" : undefined,
          isNarrow ? "max-w-[48rem] mx-auto" : undefined
        )}
      >
        <div className={cn(color === "primary" ? "text-background" : undefined)}>
          {tagLine && (
            <h1 className="leading-[0] mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          <h2 className="mb-4">{title}</h2>
          {body && <PortableTextRenderer value={body} />}
        </div>
        {links && links.length > 0 && (
          <div
            className={cn(
              "mt-10 flex flex-wrap gap-4",
              align === "center" ? "justify-center" : undefined
            )}
          >
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
    </SectionContainer>
  );
} 