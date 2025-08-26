"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/features/unorganized-components/ui/card";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { cn } from "@/features/unorganized-utils/utils";
import { Icon } from "@iconify/react";


type FeatureCard = {
  title?: string;
  body?: string;
  stat?: string;
  icon?: { _type?: string; name?: string } | null;
  color?: "primary" | "green" | "purple" | string;
};

type FeatureCardsProps = Partial<{
  layoutVariant: "cards" | "simple" | string;
  title: string;
  description: any;
  cards: FeatureCard[];
}>;

export default function FeaturesBlockComponent(props: FeatureCardsProps) {
  const { layoutVariant = "cards", title, description, cards } = props;

  const colorToClasses: Record<string, { iconBg: string; iconText: string; dot: string }> = {
    primary: { iconBg: "bg-primary/10", iconText: "text-primary", dot: "bg-primary" },
    green: { iconBg: "bg-green-500/10", iconText: "text-green-600", dot: "bg-green-500" },
    purple: { iconBg: "bg-purple-500/10", iconText: "text-purple-600", dot: "bg-purple-600" },
  };

  const iconFor: Record<string, React.ReactNode> = {
    zap: <div className="w-6 h-6" />,
    shield: <div className="w-6 h-6" />,
    settings: <div className="w-6 h-6" />,
  };

  return (
    <section className="py-16">
      {(title || description) && (
        <div className="text-center mb-16">
          {title && <h2 className="font-bold mb-6">{title}</h2>}
          {description && (
            <div className="text-muted-foreground max-w-3xl mx-auto">
              <PortableTextRenderer value={description} />
            </div>
          )}
        </div>
      )}

      {cards && cards.length > 0 && (
        layoutVariant === "simple" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10">
                  <Icon icon={card.icon?.name || "mdi:flash"} width="32" height="32" className="text-primary" />
                </div>
                {card.title && <h3 className="mb-3">{card.title}</h3>}
                {card.body && (
                  <p className="text-muted-foreground leading-relaxed">{card.body}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => {
              const palette = colorToClasses[card.color || "primary"];
              return (
                <Card key={idx} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow" data-slot="card">
                  <IconCell iconName={card.icon?.name} palette={palette} />
                  {card.title && <h3 className="font-semibold mb-4">{card.title}</h3>}
                  {card.body && (
                    <p className="text-muted-foreground leading-relaxed mb-6">{card.body}</p>
                  )}
                  {card.stat && (
                    <div className="flex items-center space-x-2">
                      <div className={cn("w-2 h-2 rounded-full", palette.dot)} />
                      <span className="text-muted-foreground text-sm">{card.stat}</span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )
      )}
    </section>
  );
}

function IconCell({ iconName, palette }: { iconName?: string; palette: { iconBg: string; iconText: string; dot: string } }) {
  const [iconLoaded, setIconLoaded] = useState(false);
  return (
    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-6", palette.iconBg, iconLoaded ? "animate-fade-in" : "opacity-0")}> 
      {iconName ? (
        <Icon icon={iconName} width="24" height="24" className={cn(palette.iconText)} onLoad={() => setIconLoaded(true)} />
      ) : (
        <div className={cn("w-6 h-6", palette.iconText)} />
      )}
    </div>
  );
}
