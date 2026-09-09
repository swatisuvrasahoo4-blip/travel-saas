import {
  Binoculars,
  Bus,
  Car,
  Compass,
  Heart,
  Landmark,
  Map,
  Mountain,
  Palmtree,
  Ship,
  TentTree,
  TreePine,
  Umbrella,
  Users,
  Waves,
} from "lucide-react";
import type {
  LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import {
  Agency,
  getAgencyByDomain,
} from "@/services/agencyService";

const iconMap: Record<
  string,
  LucideIcon
> = {
  temple: Landmark,
  umbrella: Umbrella,
  mountain: Mountain,
  users: Users,
  car: Car,
  bus: Bus,
  waves: Waves,
  tree: TreePine,
  palm: Palmtree,
  compass: Compass,
  map: Map,
  landmark: Landmark,
  binoculars: Binoculars,
  ship: Ship,
  tent: TentTree,
  heart: Heart,
};

const getDesktopGridClass = (
  count: number
) => {
  if (count === 1) {
    return "md:grid-cols-1";
  }

  if (count === 2) {
    return "md:grid-cols-2";
  }

  if (count === 3) {
    return "md:grid-cols-3";
  }

  if (count === 4) {
    return "md:grid-cols-4";
  }

  if (count === 5) {
    return "md:grid-cols-5";
  }

  return "md:grid-cols-6";
};

const TravelTypes = () => {
  const [agency, setAgency] =
    useState<Agency | null>(null);

  useEffect(() => {
    const loadAgency = async () => {
      try {
        const hostname =
          window.location.hostname;

        const agencyData =
          await getAgencyByDomain(
            hostname
          );

        setAgency(agencyData);
      } catch (error) {
        console.error(
          "Unable to load travel types agency:",
          error
        );
      }
    };

    loadAgency();
  }, []);

  if (!agency) {
    return null;
  }

  const travelTypes =
    agency.travelTypes ?? [];

  if (travelTypes.length === 0) {
    return null;
  }

  const backgroundImage =
    agency.servicesBackgroundImage ||
    "/images/services-bg.png";

  const desktopGridClass =
    getDesktopGridClass(
      Math.min(
        travelTypes.length,
        6
      )
    );

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#fff8eb]
        bg-[length:100%_175%]
        bg-center
        bg-no-repeat
        md:bg-cover
      "
      style={{
        backgroundImage: `url("${backgroundImage}")`,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-9 lg:px-8">
        <div
          className={`grid grid-cols-2 gap-x-4 gap-y-10 ${desktopGridClass} md:gap-4`}
        >
          {travelTypes.map(
            (item, index) => {
              const Icon =
                iconMap[
                  item.icon.toLowerCase()
                ] || Compass;

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  <div className="flex size-16 items-center justify-center rounded-full bg-orange-100/80 sm:size-18">
                    <Icon
                      size={30}
                      strokeWidth={2}
                      style={{
                        color:
                          agency.accentColor,
                      }}
                    />
                  </div>

                  <h3
                    className="mt-3 text-base font-bold leading-tight sm:text-lg"
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                  >
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="mt-1.5 text-xs leading-5 text-gray-600 sm:text-sm">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default TravelTypes;