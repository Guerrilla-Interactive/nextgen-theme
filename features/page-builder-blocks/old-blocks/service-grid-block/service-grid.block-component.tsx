import { MultipleArrowSVGAnimated } from "@/features/unorganized-components/arrow-svg/multiple-arrow-svg-animated.component";
import { Img } from "@/features/unorganized-components/image-component/image.component";
import { Container, FlexCol, FlexRow, Section } from "@/features/unorganized-components/nextgen-core-ui";
import Link from "next/link";

interface ReferenceService {
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  featuredImage?: {
    asset: {
      url: string;
    };
  };
}

interface ManualService {
  title: string;
  link: string;
  featuredImage?: {
    asset: {
      url: string;
    };
  };
}

type Service = ReferenceService | ManualService;

interface ServiceGridProps {
  services?: Service[];
}

// A helper component for showing each service
const ServiceCard = ({ service }: { service: Service }) => {
  const url =
    "slug" in service
      ? `/tjenester/${service.slug.current}`
      : "link" in service
      ? service.link
      : "";

  const cardContent = (
    <div className="relative h-[20rem] group overflow-hidden rounded-lg  bg-gray-200">
      {service.featuredImage ? (
        <>
        <Img
          {...service.featuredImage}
          cover
          
          
          className="absolute group-hover:scale-105 transition-transform  duration-700  inset-0 w-full h-full object-cover"
          sizes={{ md: "third", xl: "third" }}
        />
        {/* overlay gradient from bottom shade of black subtle to increase text contrast only 50% up */}
        <div className="absolute group-hover:opacity-35 transition-opacity duration-700   inset-0 w-full h-1/2 mt-auto bg-gradient-to-b from-transparent to-black opacity-50" />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300">
          No Image
        </div>
      )}
      <div className="absolute w-full  bottom-0 left-0 text-2xl bg-opacity-50 text-white p-4 pb-2 ">
        <FlexRow notAuto className="justify-between items-center">
          <FlexCol>
        {service.title}
        </FlexCol>
        <FlexCol>
          <MultipleArrowSVGAnimated color="white" className=" h-6" />
        </FlexCol>
        </FlexRow>

      </div>
    </div>
  );

  return url ? (
    <Link href={url}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default async function ServiceGridBlockComponent(
  props: Partial<ServiceGridProps>
) {
  const services = props.services || [];

  if (services.length === 0) return null;

  // Special case: if there are exactly 4 services, show a 2-column grid for all rows
  // Now responsive: 1 column on mobile, 2 columns on larger screens
  if (services.length === 4) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            service={service}
            key={
              ("slug" in service ? service.slug.current : service.link) ||
              `${service.title}-${index}`
            }
          />
        ))}
      </div>
    );
  }

  // For 1 to 3 services: use the number of columns matching the count (or 3 if 3 services)
  // Now responsive: adjusts based on screen size
  if (services.length <= 3) {
    const gridCols =
      services.length === 1
        ? "grid-cols-1"
        : services.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    return (
      <div className={`grid ${gridCols} gap-4`}>
        {services.map((service, index) => (
          <ServiceCard
            service={service}
            key={
              ("slug" in service ? service.slug.current : service.link) ||
              `${service.title}-${index}`
            }
          />
        ))}
      </div>
    );
  }

  // For more than 3 services:
  // - Break / partition the services into full rows of 3
  // - The remaining row (if any) uses a grid with as many columns as items remain
  const fullRowsCount = Math.floor(services.length / 3) * 3; // number of items for full rows
  const firstRows = services.slice(0, fullRowsCount);
  const remainder = services.length - fullRowsCount; // remainder items for bottom row

  return (
    <>
    <Section>
      <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {firstRows.map((service, index) => (
          <ServiceCard
            service={service}
            key={
              ("slug" in service ? service.slug.current : service.link) ||
              `${service.title}-${index}`
            }
          />
        ))}
      </div>
      {remainder > 0 && (
        <div
          className={`grid gap-4 mt-4 ${
            remainder === 2 
              ? "grid-cols-1 sm:grid-cols-2" 
              : "grid-cols-1"
          }`}
        >
          {services.slice(fullRowsCount).map((service, index) => (
            <ServiceCard
              service={service}
              key={
                ("slug" in service ? service.slug.current : service.link) ||
                `${service.title}-${index}`
              }
            />
          ))}
        </div>
      )}
      </Container>
      </Section>
    </>
  );
}
