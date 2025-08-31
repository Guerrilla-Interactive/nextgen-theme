import { groq } from "next-sanity";

import heroBlockQuery from "./blocks/hero-block/hero.block-query";
import featuresBlockQuery from "./blocks/features-block/features.block-query";
import statsSectionBlockQuery from "./blocks/stats-section-block/stats-section.block-query";
import newsletterSectionBlockQuery from "./blocks/newsletter-section-block/newsletter-section.block-query";
import testimonialsBlockQuery from "./blocks/testimonials-block/testimonials.block-query";
import pricingBlockQuery from "./blocks/pricing-block/pricing.block-query";
import postsBlockQuery from "./blocks/posts-block/posts.block-query";
import callToActionBlockQuery from "./blocks/call-to-action-block/call-to-action.block-query";
import faqBlockQuery from "./blocks/faq-block/faq.block-query";
import videoSectionBlockQuery from "./blocks/video-section-block/video-section.block-query";
import masterBlockQuery from "./blocks/master-block/master.block-query";
import aboutUsBlockQuery from "./blocks/about-us-block/about-us.block-query";
import contactFormBlockQuery from "./blocks/contact-form-block/contact-form.block-query";

// ADD VALUE 1 ABOVE

import carousel1BlockQuery from "./old-blocks/carousel-block/carousel-1-block/carousel-1.block-query";
import carousel2BlockQuery from "./old-blocks/carousel-block/carousel-2-block/carousel-2.block-query";
import cta1BlockQuery from "./old-blocks/cta-blocks/cta-1-block/cta-1.block-query";
import faqsBlockQuery from "./old-blocks/faqs-block/faqs.block-query";
import formNewsletterBlockQuery from "./old-blocks/form-blocks/newsletter-block/newsletter.block-query";
import gridCardBlockQuery from "./old-blocks/grid-block/grid-card-block/grid-card.block-query";
import gridPostBlockQuery from "./old-blocks/grid-block/grid-post-block/grid-post.block-query";
import gridRowBlockQuery from "./old-blocks/grid-block/grid-row-block/grid-row.block-query";
import pricingCardBlockQuery from "./old-blocks/grid-block/pricing-card-block/pricing-card.block-query";
import hero1BlockQuery from "./old-blocks/hero-1-block/hero-1.block-query";
import hero2BlockQuery from "./old-blocks/hero-2-block/hero-2.block-query";
import logoCloud1BlockQuery from "./old-blocks/logo-cloud-blocks/logo-cloud-1-block/logo-cloud-1.block-query";
import sectionHeaderBlockQuery from "./old-blocks/section-header-block/section-header.block-query";
import splitCardsListBlockQuery from "./old-blocks/split-blocks/split-cards-list-block/split-cards-list.block-query";
import splitContentBlockQuery from "./old-blocks/split-blocks/split-content-block/split-content.block-query";
import splitImageBlockQuery from "./old-blocks/split-blocks/split-image-block/split-image.block-query";
import splitInfoListBlockQuery from "./old-blocks/split-blocks/split-info-list-block/split-info-list.block-query";
import splitRowBlockQuery from "./old-blocks/split-blocks/split-row-block/split-row.block-query";
import timelineRowBlockQuery from "./old-blocks/timeline-blocks/timeline-row-block/timeline-row.block-query";
import hero3BlockQuery from "./old-blocks/hero-3-block/hero-3.block-query";
import headingAndParagraphCenteredBlockQuery from "./old-blocks/heading-and-paragraph-centered-block/heading-and-paragraph-centered.block-query";
import serviceGridBlockQuery from "./old-blocks/service-grid-block/service-grid.block-query";
import coverMapBlockQuery from "./old-blocks/cover-map-block/cover-map.block-query";
import contactInfoAndFormBlockQuery from "./old-blocks/contact-info-and-form-block/contact-info-and-form.block-query";
import ourValuesBlockQuery from "./old-blocks/our-values-block/our-values.block-query";
import courseSliderBlockQuery from "./old-blocks/course-slider-block/course-slider.block-query";
import hero4BlockQuery from "./old-blocks/hero-4-block/hero-4.block-query";
import hero5BlockQuery from "./old-blocks/hero-5-block/hero-5.block-query";
import twoColumnBlockQuery from "./old-blocks/two-column-block/two-column.block-query";
import seperatorBlockQuery from "./old-blocks/seperator-block/seperator.block-query";

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
  ${ contactFormBlockQuery  },

  // ADD VALUE 2 ABOVE
}
`;


