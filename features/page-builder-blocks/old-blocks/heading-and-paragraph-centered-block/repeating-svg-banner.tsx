import React from "react";

export default function RepeatingSvgBanner() {
  return (
    <svg
      width="100%"
      height="30"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="bannerPattern" patternUnits="userSpaceOnUse" width="100" height="79">
          <rect width="100" height="79" fill="#D76B01" />
          <path d="M68.9949 0L0 79H8.54271H30.9786L100 0H68.9949Z" fill="black" />
        </pattern>
      </defs>
      <rect width="100%" height="79" fill="url(#bannerPattern)" />
    </svg>
  );
} 