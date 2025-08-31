import { Carousel1BlockComponent } from "./old-blocks/carousel-block/carousel-1-block";
import { Carousel2BlockComponent } from "./old-blocks/carousel-block/carousel-2-block";
import { Cta1BlockComponent } from "./old-blocks/cta-blocks/cta-1-block";
import { FAQsBlockComponent } from "./old-blocks/faqs-block";
import { FormNewsletterBlockComponent } from "./old-blocks/form-blocks/newsletter-block";
import { GridCardBlockComponent } from "./old-blocks/grid-block/grid-card-block";
import { GridPostBlockComponent } from "./old-blocks/grid-block/grid-post-block";
import { GridRowBlockComponent } from "./old-blocks/grid-block/grid-row-block";
import { PricingCardBlockComponent } from "./old-blocks/grid-block/pricing-card-block";
import { Hero1BlockComponent } from "./old-blocks/hero-1-block";
import { Hero2BlockComponent } from "./old-blocks/hero-2-block";
import { LogoCloud1BlockComponent } from "./old-blocks/logo-cloud-blocks/logo-cloud-1-block";
import { SectionHeaderBlockComponent } from "./old-blocks/section-header-block";
import { SplitCardsItemBlockComponent } from "./old-blocks/split-blocks/split-cards-item-block";
import { SplitCardsListBlockComponent } from "./old-blocks/split-blocks/split-cards-list-block";
import { SplitContentBlockComponent } from "./old-blocks/split-blocks/split-content-block";
import { SplitImageBlockComponent } from "./old-blocks/split-blocks/split-image-block";
import { SplitInfoItemBlockComponent } from "./old-blocks/split-blocks/split-info-item-block";
import { SplitInfoListBlockComponent } from "./old-blocks/split-blocks/split-info-list-block";
import { SplitRowBlockComponent } from "./old-blocks/split-blocks/split-row-block";
import { Timeline1BlockComponent } from "./old-blocks/timeline-blocks/timeline-1-block";
import { TimelineRowBlockComponent } from "./old-blocks/timeline-blocks/timeline-row-block";
import { Hero3BlockComponent } from "./old-blocks/hero-3-block";
import { HeadingAndParagraphCenteredBlockComponent } from "./old-blocks/heading-and-paragraph-centered-block";
import { ServiceGridBlockComponent } from "./old-blocks/service-grid-block";
import { CoverMapBlockComponent } from "./old-blocks/cover-map-block";
import { ContactInfoAndFormBlockComponent } from "./old-blocks/contact-info-and-form-block";
import { OurValuesBlockComponent } from "./old-blocks/our-values-block";
import { CourseSliderBlockComponent } from "./old-blocks/course-slider-block";
import { Hero4BlockComponent } from "./old-blocks/hero-4-block";
import { Hero5BlockComponent } from "./old-blocks/hero-5-block";
import { CustomContactFormBlockComponent } from "./old-blocks/custom-contact-form-block";
import { TwoColumnBlockComponent } from "./old-blocks/two-column-block";
import { SeperatorBlockComponent } from "./old-blocks/seperator-block";
import { HeroBlockComponent } from "./blocks/hero-block";
import { FeaturesBlockComponent } from "./blocks/features-block";
import { StatsSectionBlockComponent } from "./blocks/stats-section-block";
import { NewsletterSectionBlockComponent } from "./blocks/newsletter-section-block";
import { TestimonialsBlockComponent } from "./blocks/testimonials-block";
import { PricingBlockComponent } from "./blocks/pricing-block";
import { PostsBlockComponent } from "./blocks/posts-block";
import { CallToActionBlockComponent } from "./blocks/call-to-action-block";
import { FaqBlockComponent } from "./blocks/faq-block";
import { VideoSectionBlockComponent } from "./blocks/video-section-block";
import { MasterBlockComponent } from "./blocks/master-block";
import { AboutUsBlockComponent } from "./blocks/about-us-block";
import { ContactFormBlockComponent } from "./blocks/contact-form-block";

export const BlockComponentMap: {
  [key: string]: React.ComponentType<any> | undefined;
} = {
  "hero-1-block": Hero1BlockComponent,
  "hero-2-block": Hero2BlockComponent,
  "hero-3-block": Hero3BlockComponent,
  "section-header-block": SectionHeaderBlockComponent,
  "split-row-block": SplitRowBlockComponent,
  "carousel-1-block": Carousel1BlockComponent,
  "carousel-2-block": Carousel2BlockComponent,
  "timeline-row-block": TimelineRowBlockComponent,
  "cta-1-block": Cta1BlockComponent,
  "logo-cloud-1-block": LogoCloud1BlockComponent,
  "faqs-block": FAQsBlockComponent,
  "form-newsletter-block": FormNewsletterBlockComponent,
  "split-content-block": SplitContentBlockComponent,
  "split-cards-list-block": SplitCardsListBlockComponent,
  "split-image-block": SplitImageBlockComponent,
  "split-info-list-block": SplitInfoListBlockComponent,
  "split-cards-item-block": SplitCardsItemBlockComponent,
  "split-info-item-block": SplitInfoItemBlockComponent,
  "grid-card-block": GridCardBlockComponent,
  "grid-post-block": GridPostBlockComponent,
  "grid-row-block": GridRowBlockComponent,
  "pricing-card-block": PricingCardBlockComponent,
  "timeline-1-block": Timeline1BlockComponent,
  "heading-and-paragraph-centered-block": HeadingAndParagraphCenteredBlockComponent,
  "service-grid-block": ServiceGridBlockComponent,
  "cover-map-block": CoverMapBlockComponent,
  "contact-info-and-form-block": ContactInfoAndFormBlockComponent,
  "our-values-block": OurValuesBlockComponent,
  "course-slider-block": CourseSliderBlockComponent,
  "hero-4-block": Hero4BlockComponent,
  "hero-5-block": Hero5BlockComponent,
  "custom-contact-form-block": CustomContactFormBlockComponent,
  "two-column-block": TwoColumnBlockComponent,
  "seperator-block": SeperatorBlockComponent,
  "hero-block": HeroBlockComponent,
  "features-block": FeaturesBlockComponent,
  "stats-section-block": StatsSectionBlockComponent,
  "newsletter-section-block": NewsletterSectionBlockComponent,
  "testimonials-block": TestimonialsBlockComponent,
  "pricing-block": PricingBlockComponent,
  "posts-block": PostsBlockComponent,
  "call-to-action-block": CallToActionBlockComponent,
  "faq-block": FaqBlockComponent,
  "video-section-block": VideoSectionBlockComponent,
  "master-block": MasterBlockComponent,
  "about-us-block": AboutUsBlockComponent,
  "contact-form-block": ContactFormBlockComponent,
};

export type BlockComponentKey = keyof typeof BlockComponentMap;

