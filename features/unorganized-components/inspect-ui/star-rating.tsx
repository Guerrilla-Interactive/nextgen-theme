import { Star, StarHalf } from "lucide-react";
import { cn } from "@/features/unorganized-utils/utils";
import { TokenElement } from "@/app/(main)/blueprint/components/token-targeting";

export function StarRating({
  size = "sm",
  rating,
}: {
  size?: "sm" | "lg";
  rating: number;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <TokenElement colorRoles={["accent"]}>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                className={cn("w-4 h-4", size === "lg" && "w-8 h-8")}
                style={{ color: "hsl(var(--accent))", fill: "hsl(var(--accent))" }}
              />
            );
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <StarHalf
                key={i}
                className={cn("w-4 h-4", size === "lg" && "w-8 h-8")}
                style={{ color: "hsl(var(--accent))", fill: "hsl(var(--accent))" }}
              />
            );
          }
          return <Star key={i} className="w-4 h-4 text-gray-300" />;
        })}
      </div>
    </TokenElement>
  );
}
