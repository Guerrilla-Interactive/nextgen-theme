

import Link from "next/link";
import Logo from "../../../../../features/theme/logo";

import RepeatingSvgBanner from "../../../../../features/unorganized-components/repeating-svg-banner";
import { Facebook, LinkedIn, Instagram } from "@mui/icons-material";
import { Container, FlexCol, FlexRow, InnerSection, Section } from "@/features/unorganized-components/nextgen-core-ui";
import { MultipleArrowSVGAnimated } from "@/features/unorganized-components/arrow-svg/multiple-arrow-svg-animated.component";
import { MultipleArrowSVG } from "@/features/unorganized-components/arrow-svg/multiple-arrow-svg.component";
import { CoverMapBlockComponent } from "@/features/page-builder-blocks/blocks/cover-map-block";
import { FooterSettingsQueryResult } from "@/sanity.types";
import { Blocks } from "@/features/page-builder-blocks/block-component-exporter";
import Image from "next/image";

// startbank image png, arbeidstilsynet svg, dr.dropin logo from public images folder
import startbankLogo from "@/public/images/startbank-logo.svg";
import arbeidstilsynetLogo from "@/public/images/arbeidstilsynet-logo.svg";
import drDropinLogo from "@/public/images/dr-dropin-logo.svg";

const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
  },
  {
    label: "Blog",
    href: "/blog",
    target: false,
  },
  {
    label: "About",
    href: "/about",
    target: false,
  },
];

export default function Footer(props: FooterSettingsQueryResult) {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (

    <>
    <footer>
      <Blocks blocks={props.blocks} />      
      </footer>
    </>
  );
}


