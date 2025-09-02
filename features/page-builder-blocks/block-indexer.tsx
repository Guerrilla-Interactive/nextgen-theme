import { groq } from "next-sanity";
import { Carousel1BlockComponent, carousel1BlockQuery, carousel1BlockSchema } from "./old-blocks/carousel-block/carousel-1-block";
import { Carousel2BlockComponent, carousel2BlockQuery, carousel2BlockSchema } from "./old-blocks/carousel-block/carousel-2-block";
import { Cta1BlockComponent, cta1BlockQuery, cta1BlockSchema } from "./old-blocks/cta-blocks/cta-1-block";
import { FAQsBlockComponent, faqsBlockQuery, faqsBlockSchema } from "./old-blocks/faqs-block";
import { FormNewsletterBlockComponent, formNewsletterBlockQuery, formNewsletterBlockSchema } from "./old-blocks/form-blocks/newsletter-block";
import { GridCardBlockComponent, gridCardBlockQuery, gridCardBlockSchema } from "./old-blocks/grid-block/grid-card-block";
import { GridPostBlockComponent, gridPostBlockQuery, gridPostBlockSchema } from "./old-blocks/grid-block/grid-post-block";
import { GridRowBlockComponent, gridRowBlockQuery, gridRowBlockSchema } from "./old-blocks/grid-block/grid-row-block";
import { PricingCardBlockComponent, pricingCardBlockQuery, pricingCardBlockSchema } from "./old-blocks/grid-block/pricing-card-block";
import { Hero1BlockComponent, hero1BlockQuery, hero1BlockSchema } from "./old-blocks/hero-1-block";
import { Hero2BlockComponent, hero2BlockQuery, hero2BlockSchema } from "./old-blocks/hero-2-block";
import { LogoCloud1BlockComponent, logoCloud1BlockQuery, logoCloud1BlockSchema } from "./old-blocks/logo-cloud-blocks/logo-cloud-1-block";
import { SectionHeaderBlockComponent, sectionHeaderBlockQuery, sectionHeaderBlockSchema } from "./old-blocks/section-header-block";
import { SplitCardsItemBlockComponent, splitCardsItemBlockSchema } from "./old-blocks/split-blocks/split-cards-item-block";
import { SplitCardsListBlockComponent, splitCardsListBlockQuery, splitCardsListBlockSchema } from "./old-blocks/split-blocks/split-cards-list-block";
import { SplitContentBlockComponent, splitContentBlockQuery, splitContentBlockSchema } from "./old-blocks/split-blocks/split-content-block";
import { SplitImageBlockComponent, splitImageBlockQuery, splitImageBlockSchema } from "./old-blocks/split-blocks/split-image-block";
import { SplitInfoItemBlockComponent, splitInfoItemBlockSchema } from "./old-blocks/split-blocks/split-info-item-block";
import { SplitInfoListBlockComponent, splitInfoListBlockQuery, splitInfoListBlockSchema } from "./old-blocks/split-blocks/split-info-list-block";
import { SplitRowBlockComponent, splitRowBlockQuery, splitRowBlockSchema } from "./old-blocks/split-blocks/split-row-block";
import { Timeline1BlockComponent, timeline1BlockSchema } from "./old-blocks/timeline-blocks/timeline-1-block";
import { TimelineRowBlockComponent, timelineRowBlockQuery, timelineRowBlockSchema } from "./old-blocks/timeline-blocks/timeline-row-block";
import { Hero3BlockComponent, hero3BlockQuery, hero3BlockSchema } from "./old-blocks/hero-3-block";

import { HeadingAndParagraphCenteredBlockComponent, headingAndParagraphCenteredBlockQuery, headingAndParagraphCenteredBlockSchema } from "./old-blocks/heading-and-paragraph-centered-block";
import { ServiceGridBlockComponent, serviceGridBlockQuery, serviceGridBlockSchema } from "./old-blocks/service-grid-block";
import { CoverMapBlockComponent, coverMapBlockQuery, coverMapBlockSchema } from "./old-blocks/cover-map-block";
import { ContactInfoAndFormBlockComponent, contactInfoAndFormBlockQuery, contactInfoAndFormBlockSchema } from "./old-blocks/contact-info-and-form-block";
import { OurValuesBlockComponent, ourValuesBlockQuery, ourValuesBlockSchema } from "./old-blocks/our-values-block";
import { CourseSliderBlockComponent, courseSliderBlockQuery, courseSliderBlockSchema } from "./old-blocks/course-slider-block";
import { Hero4BlockComponent, hero4BlockQuery, hero4BlockSchema } from "./old-blocks/hero-4-block";

import { Hero5BlockComponent, hero5BlockQuery, hero5BlockSchema } from "./old-blocks/hero-5-block";
import { CustomContactFormBlockComponent, customContactFormBlockQuery, customContactFormBlockSchema } from "./old-blocks/custom-contact-form-block";
import { TwoColumnBlockComponent, twoColumnBlockQuery, twoColumnBlockSchema } from "./old-blocks/two-column-block";
import { SeperatorBlockComponent, seperatorBlockQuery, seperatorBlockSchema } from "./old-blocks/seperator-block";
import { HeroBlockComponent, heroBlockQuery, heroBlockSchema } from "./blocks/hero-block";
import { FeaturesBlockComponent, featuresBlockQuery, featuresBlockSchema } from "./blocks/features-block";
import { StatsSectionBlockComponent, statsSectionBlockQuery, statsSectionBlockSchema } from "./blocks/stats-section-block";
import { NewsletterSectionBlockComponent, newsletterSectionBlockQuery, newsletterSectionBlockSchema } from "./blocks/newsletter-section-block";
import { TestimonialsBlockComponent, testimonialsBlockQuery, testimonialsBlockSchema } from "./blocks/testimonials-block";
import { PricingBlockComponent, pricingBlockQuery, pricingBlockSchema } from "./blocks/pricing-block";
import { PostsBlockComponent, postsBlockQuery, postsBlockSchema } from "./blocks/posts-block";
import { CallToActionBlockComponent, callToActionBlockQuery, callToActionBlockSchema } from "./blocks/call-to-action-block";
import { FaqBlockComponent, faqBlockQuery, faqBlockSchema } from "./blocks/faq-block";
import { VideoSectionBlockComponent, videoSectionBlockQuery, videoSectionBlockSchema } from "./blocks/video-section-block";
import { MasterBlockComponent, masterBlockQuery, masterBlockSchema } from "./blocks/master-block";
import { AboutUsBlockComponent, aboutUsBlockQuery, aboutUsBlockSchema } from "./blocks/about-us-block";
import { ContactFormBlockComponent, contactFormBlockQuery, contactFormBlockSchema } from "./blocks/contact-form-block";

import { NarrowPortableTextSectionBlockComponent, narrowPortableTextSectionBlockQuery, narrowPortableTextSectionBlockSchema } from "./blocks/narrow-portable-text-section-block";
import { DividerBlockComponent, dividerBlockQuery, dividerBlockSchema } from "./blocks/divider-block";
// ADD VALUE 1 ABOVE

export const BlockDataMap: {
  [key: string]: {
    component?: React.ComponentType<any>;
    schema?: any;
    query?: string;
  };
} = {
  "hero-1-block": { component: Hero1BlockComponent, schema: hero1BlockSchema, query: hero1BlockQuery },
  "hero-2-block": { component: Hero2BlockComponent, schema: hero2BlockSchema, query: hero2BlockQuery },
  "hero-3-block": { component: Hero3BlockComponent, schema: hero3BlockSchema, query: hero3BlockQuery },
  "section-header-block": { component: SectionHeaderBlockComponent, schema: sectionHeaderBlockSchema, query: sectionHeaderBlockQuery },
  "split-row-block": { component: SplitRowBlockComponent, schema: splitRowBlockSchema, query: splitRowBlockQuery },
  "carousel-1-block":{ component: Carousel1BlockComponent, schema: carousel1BlockSchema, query: carousel1BlockQuery },
  "carousel-2-block": { component: Carousel2BlockComponent, schema: carousel2BlockSchema, query: carousel2BlockQuery },
  "timeline-row-block": { component: TimelineRowBlockComponent, schema: timelineRowBlockSchema, query: timelineRowBlockQuery },
  "cta-1-block": { component: Cta1BlockComponent, schema: cta1BlockSchema, query: cta1BlockQuery },
  "logo-cloud-1-block": { component: LogoCloud1BlockComponent, schema: logoCloud1BlockSchema, query: logoCloud1BlockQuery },
  "faqs-block": { component: FAQsBlockComponent, schema: faqsBlockSchema, query: faqsBlockQuery },
  "form-newsletter-block": { component: FormNewsletterBlockComponent, schema: formNewsletterBlockSchema, query: formNewsletterBlockQuery },
  "split-content-block": { component: SplitContentBlockComponent, schema: splitContentBlockSchema, query: splitContentBlockQuery },
  "split-cards-list-block": { component: SplitCardsListBlockComponent, schema: splitCardsListBlockSchema, query: splitCardsListBlockQuery },
  "split-image-block": { component: SplitImageBlockComponent, schema: splitImageBlockSchema, query: splitImageBlockQuery },
  "split-info-list-block": { component: SplitInfoListBlockComponent, schema: splitInfoListBlockSchema, query: splitInfoListBlockQuery },
  "split-cards-item-block": { component: SplitCardsItemBlockComponent, schema: splitCardsItemBlockSchema  },
  "split-info-item-block": { component: SplitInfoItemBlockComponent, schema: splitInfoItemBlockSchema },
  "grid-card-block": { component: GridCardBlockComponent, schema: gridCardBlockSchema, query: gridCardBlockQuery },
  "grid-post-block": { component: GridPostBlockComponent, schema: gridPostBlockSchema, query: gridPostBlockQuery },
  "grid-row-block":{ component: GridRowBlockComponent, schema: gridRowBlockSchema, query: gridRowBlockQuery },
  "pricing-card-block": { component: PricingCardBlockComponent, schema: pricingCardBlockSchema, query: pricingCardBlockQuery },
  "timeline-1-block": { component: Timeline1BlockComponent, schema: timeline1BlockSchema },
  "heading-and-paragraph-centered-block": { component: HeadingAndParagraphCenteredBlockComponent, schema: headingAndParagraphCenteredBlockSchema, query: headingAndParagraphCenteredBlockQuery },
  "service-grid-block": { component: ServiceGridBlockComponent, schema: serviceGridBlockSchema, query: serviceGridBlockQuery },
  "cover-map-block": { component: CoverMapBlockComponent, schema: coverMapBlockSchema, query: coverMapBlockQuery },
  "contact-info-and-form-block": { component: ContactInfoAndFormBlockComponent, schema: contactInfoAndFormBlockSchema, query: contactInfoAndFormBlockQuery },
  "our-values-block": { component: OurValuesBlockComponent, schema: ourValuesBlockSchema, query: ourValuesBlockQuery },
  "course-slider-block": { component: CourseSliderBlockComponent, schema: courseSliderBlockSchema, query: courseSliderBlockQuery },
  "hero-4-block": { component: Hero4BlockComponent, schema: hero4BlockSchema, query: hero4BlockQuery },
  "hero-5-block": { component: Hero5BlockComponent, schema: hero5BlockSchema, query: hero5BlockQuery },
  "custom-contact-form-block": { component: CustomContactFormBlockComponent, schema: customContactFormBlockSchema, query: customContactFormBlockQuery },
  "two-column-block": { component: TwoColumnBlockComponent, schema: twoColumnBlockSchema, query: twoColumnBlockQuery },
  "seperator-block": { component: SeperatorBlockComponent, schema: seperatorBlockSchema, query: seperatorBlockQuery },
  "hero-block": { component: HeroBlockComponent, schema: heroBlockSchema, query: heroBlockQuery },
"features-block": { component: FeaturesBlockComponent, schema: featuresBlockSchema, query: featuresBlockQuery },
"stats-section-block": { component: StatsSectionBlockComponent, schema: statsSectionBlockSchema, query: statsSectionBlockQuery },
"newsletter-section-block": { component: NewsletterSectionBlockComponent, schema: newsletterSectionBlockSchema, query: newsletterSectionBlockQuery },
"testimonials-block": { component: TestimonialsBlockComponent, schema: testimonialsBlockSchema, query: testimonialsBlockQuery },
"pricing-block": { component: PricingBlockComponent, schema: pricingBlockSchema, query: pricingBlockQuery },
"posts-block": { component: PostsBlockComponent, schema: postsBlockSchema, query: postsBlockQuery },
"call-to-action-block": { component: CallToActionBlockComponent, schema: callToActionBlockSchema, query: callToActionBlockQuery },
"faq-block": { component: FaqBlockComponent, schema: faqBlockSchema, query: faqBlockQuery },
"video-section-block": { component: VideoSectionBlockComponent, schema: videoSectionBlockSchema, query: videoSectionBlockQuery },
"master-block": { component: MasterBlockComponent, schema: masterBlockSchema, query: masterBlockQuery },
"about-us-block": { component: AboutUsBlockComponent, schema: aboutUsBlockSchema, query: aboutUsBlockQuery },
"contact-form-block": { component: ContactFormBlockComponent, schema: contactFormBlockSchema, query: contactFormBlockQuery },
"narrow-portable-text-section-block": { component: NarrowPortableTextSectionBlockComponent, schema: narrowPortableTextSectionBlockSchema, query: narrowPortableTextSectionBlockQuery },
"divider-block": { component: DividerBlockComponent, schema: dividerBlockSchema, query: dividerBlockQuery },
  // ADD VALUE 2 ABOVE
};

// Function to return allowed blocks for Sanity
export const getSanityPageBuilderBlocks = () =>
  Object.entries(BlockDataMap)
    .filter(([_, block]) => typeof block.query !== "undefined")
    .map(([blockType]) => ({ type: blockType }));

export const allBlockSchemasAutomatic = Object.values(BlockDataMap)
  .filter((block) => block.schema !== undefined)
  .map((block) => block.schema);

export const allBlockQueries: string = Object.values(BlockDataMap)
  .filter((block) => block.query !== undefined)
  .map((block) => block.query as string)
  .join(",\n");


export const pageBuilderQueryAutomatic = groq`
blocks[]{
  ${allBlockQueries}
}
`;

export const allBlockSchemas = Object.values(BlockDataMap)
.filter((block) => block.schema !== undefined)
.map((block) => block.schema);




export const pageBuilderQuery = groq`
blocks[]{
  // Hero Blocks
  ${hero1BlockQuery},
  ${hero2BlockQuery},
  ${hero3BlockQuery},
  ${hero4BlockQuery},

  // Section/Header Blocks
  ${sectionHeaderBlockQuery},
  ${headingAndParagraphCenteredBlockQuery},

  // Carousel Blocks
  ${carousel1BlockQuery},
  ${carousel2BlockQuery},

  // Timeline
  ${timelineRowBlockQuery},

  // Call to Action
  ${cta1BlockQuery},

  // Logo Cloud
  ${logoCloud1BlockQuery},

  // FAQs
  ${faqsBlockQuery},

  // Newsletter
  ${formNewsletterBlockQuery},

  // Split Blocks
  ${splitRowBlockQuery},
  ${splitContentBlockQuery},
  ${splitCardsListBlockQuery},
  ${splitImageBlockQuery},
  ${splitInfoListBlockQuery},

  // Grid Blocks
  ${gridCardBlockQuery},
  ${gridPostBlockQuery},
  ${gridRowBlockQuery},

  // Pricing
  ${pricingCardBlockQuery},

  // Service
  ${serviceGridBlockQuery},

  // Cover Map
  ${coverMapBlockQuery},

  // Contact Info
  ${contactInfoAndFormBlockQuery},

  // Our Values
  ${ourValuesBlockQuery},

  // Course Slider
  ${courseSliderBlockQuery},
  ${ hero5BlockQuery  },

  // Two Column
  ${twoColumnBlockQuery},

  // Seperator
  ${seperatorBlockQuery},
  ${ heroBlockQuery  },
  ${ featuresBlockQuery  },
  ${ statsSectionBlockQuery  },
  ${ newsletterSectionBlockQuery  },
  ${ testimonialsBlockQuery  },
  ${ pricingBlockQuery  },
  ${ postsBlockQuery  },
  ${ callToActionBlockQuery  },
  ${ faqBlockQuery  },
  ${ videoSectionBlockQuery  },
${ masterBlockQuery  },
${ aboutUsBlockQuery  },
${ contactFormBlockQuery  }
  // ADD VALUE 3 ABOVE
}
`;


