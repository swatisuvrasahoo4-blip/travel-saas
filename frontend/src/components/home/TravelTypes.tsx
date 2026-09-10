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
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

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
  const { agency, loading } =
    useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading) {
    return null;
  }

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren:
          shouldReduceMotion
            ? 0
            : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion
        ? 0
        : 28,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration:
          shouldReduceMotion
            ? 0
            : 0.55,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ] as [
          number,
          number,
          number,
          number,
        ],
      },
    },
  };

  return (
    <section
      className="
        relative
        hidden
        w-full
        overflow-hidden
        bg-[#fff8eb]
        bg-[length:100%_175%]
        bg-center
        bg-no-repeat
        md:block
        md:bg-cover
      "
      style={{
        backgroundImage: `url("${backgroundImage}")`,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-9 lg:px-8">
        <motion.div
          className={`grid grid-cols-2 gap-x-4 gap-y-10 ${desktopGridClass} md:gap-4`}
          variants={
            containerVariants
          }
          initial={
            shouldReduceMotion
              ? false
              : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          {travelTypes.map(
            (item, index) => {
              const Icon =
                iconMap[
                  item.icon.toLowerCase()
                ] || Compass;

              return (
                <motion.div
                  key={`${item.title}-${index}`}
                  variants={
                    cardVariants
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -6,
                        }
                  }
                  transition={{
                    duration: 0.25,
                  }}
                  className="flex min-w-0 flex-col items-center text-center"
                >
                  <motion.div
                    className="flex size-16 items-center justify-center rounded-full bg-orange-100/80 sm:size-18"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.08,
                          }
                    }
                    transition={{
                      duration:
                        0.25,
                    }}
                  >
                    <Icon
                      size={30}
                      strokeWidth={2}
                      style={{
                        color:
                          agency.accentColor,
                      }}
                    />
                  </motion.div>

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
                      {
                        item.subtitle
                      }
                    </p>
                  )}
                </motion.div>
              );
            }
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TravelTypes;