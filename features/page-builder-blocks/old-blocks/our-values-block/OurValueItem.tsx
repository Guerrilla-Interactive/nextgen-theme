"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Define the types for the icon and value (matching your parent types)
interface OurValuesIcon {
  _type: string;
  name: string;
}

export interface OurValuesValue {
  icon: OurValuesIcon;
  title: string;
  description: string;
}

interface OurValueItemProps {
  value: OurValuesValue;
}

const OurValueItem: React.FC<OurValueItemProps> = ({ value }) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <div
      // The container is hidden until the icon is loaded, then uses Tailwind fade-in animation.
      className={`rounded-lg p-6 text-center ${
        iconLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="flex justify-center mb-4">
        <Icon
          icon={value.icon.name}
          width="48"
          height="48"
          onLoad={() => setIconLoaded(true)}
        />
      </div>
      <h3 className="text-2xl font-semibold font-sans text-black mb-2">
        {value.title}
      </h3>
      <p className="text-black">{value.description}</p>
    </div>
  );
};

export default OurValueItem; 