"use client";

import { Container, FlexCol, FlexRow, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { Hero5BlockComponent } from "@/features/page-builder-blocks/old-blocks/hero-5-block";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { GET_SERVICE_PAGE_BY_ROUTE_QUERYResult, Hero5Block, FaqsBlock } from "@/sanity.types";
import { useGlobalContext } from "@/features/context/global-context";
import { useEffect } from "react";
import { CustomContactFormBlockComponent } from "@/features/page-builder-blocks/old-blocks/custom-contact-form-block";

import FaqsBlockComponent from "@/features/page-builder-blocks/old-blocks/faqs-block/faqs.block-component";

export default function ServiceSlugPageComponent(page: Partial<GET_SERVICE_PAGE_BY_ROUTE_QUERYResult>) {
  const { sessionStatus } = useGlobalContext();
  const { setIsTopDark } = sessionStatus;
  const layout = (page.layout as string | undefined) || 'side-by-side';

  useEffect(() => {
    setIsTopDark(false);
  }, [setIsTopDark]);

  const featuredImageProps = page.featuredImage ? { ...page.featuredImage, _type: 'image' } as Partial<Hero5Block['image']> : undefined;
  const customContactFormProps = page.customContactForm;
  const faqsProps = page.faqs as Partial<FaqsBlock> | undefined;

  return (
    <>
      <Hero5BlockComponent image={featuredImageProps} />

      {layout === 'side-by-side' && (
        <Section className="mb-12 mt-12">
          <Container>
            <FlexRow className="justify-between gap-8 md:gap-12 lg:gap-16">
              <FlexCol className="w-full lg:w-7/12 xl:w-8/12">
                <div className="max-w-xl">
                  <h1 className="opacity-0 text-3xl md:text-4xl font-bold mb-4 animate-[fade-in-left-blur_1s_ease-out_0.2s_forwards]">
                    {page.customTitle || page.title}
                  </h1>
                  <div className="opacity-0 animate-[fade-in-left-blur_1s_ease-out_0.5s_forwards]">
                    {page.body && <PortableTextRenderer value={page.body} />}
                  </div>
                </div>
              </FlexCol>
              <FlexCol className="opacity-0 w-full lg:w-5/12 xl:w-4/12 border border-gray-200 rounded-lg p-6 mt-6 md:mt-0 animate-[fade-in-right-blur_1s_ease-out_0.8s_forwards] self-start">
                {customContactFormProps && <CustomContactFormBlockComponent {...customContactFormProps} />}
              </FlexCol>
            </FlexRow>
          </Container>
        </Section>
      )}

      {layout === 'form-below' && (
        <>
          <Section className="mb-12 mt-12">
            <Container className="w-full">
              <FlexRow className="justify-between gap-8 md:gap-12 lg:gap-16">
                <FlexCol className="w-full lg:w-7/12 xl:w-8/12">
                  <div className="max-w-xl">
                    <h1 className="opacity-0 text-3xl md:text-4xl font-bold mb-4 animate-[fade-in-left-blur_1s_ease-out_0.2s_forwards]">
                      {page.customTitle || page.title}
                    </h1>
                    <div className="opacity-0 animate-[fade-in-left-blur_1s_ease-out_0.5s_forwards]">
                      {page.body && <PortableTextRenderer value={page.body} />}
                    </div>
                  </div>
                </FlexCol>
                <FlexCol className="opacity-0 w-full lg:w-5/12 xl:w-4/12 mt-6 md:mt-0 animate-[fade-in-right-blur_1s_ease-out_0.8s_forwards] self-start">
                  {faqsProps && <FaqsBlockComponent noPadding={true} {...faqsProps} />}
                </FlexCol>
              </FlexRow>
            </Container>
          </Section>

          <Section className="mb-12 mt-6">
            <Container>
              <FlexCol className="w-full">
                <FlexCol className="opacity-0 w-full border border-gray-200 rounded-lg p-6 animate-[fade-in-up-blur_1s_ease-out_0.8s_forwards]">
                  {customContactFormProps && <CustomContactFormBlockComponent {...customContactFormProps} />}
                </FlexCol>
              </FlexCol>
            </Container>
          </Section>
        </>
      )}

      {page.faqs && (
        <Section className="mb-12 mt-12">
          <Container>
            <FaqsBlockComponent {...page.faqs} />
          </Container>
        </Section>
      )}
    </>
  );
}
