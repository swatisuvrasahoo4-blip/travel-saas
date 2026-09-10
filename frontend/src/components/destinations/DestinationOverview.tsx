import {
  Clock3,
  Compass,
  MapPin,
  Sun,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import type {
  Destination,
} from "@/services/destinationService";

interface DestinationOverviewProps {
  destination: Destination;
}

const DestinationOverview = ({
  destination,
}: DestinationOverviewProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  const information = [
    {
      label: "Location",
      value: destination.location,
      icon: MapPin,
    },
    {
      label: "Best Time to Visit",
      value: destination.bestTimeToVisit,
      icon: Sun,
    },
    {
      label: "Ideal Duration",
      value: destination.idealDuration,
      icon: Clock3,
    },
    {
      label: "Type",
      value: destination.type,
      icon: Compass,
    },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          className="text-center"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 1.1,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <h2 className="text-2xl font-bold text-[#06364a] sm:text-3xl">
            Discover {destination.name}
          </h2>

          <motion.div
            className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-600"
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                    opacity: 0,
                  }
            }
            whileInView={{
              scaleX: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.9,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.2,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              transformOrigin: "center",
            }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-gray-600 sm:text-base"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 1.05,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.3,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            {destination.description}
          </motion.p>
        </motion.div>

        {/* Information Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {information.map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 30,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration:
                      shouldReduceMotion
                        ? 0
                        : 1,

                    delay:
                      shouldReduceMotion
                        ? 0
                        : index * 0.14,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -6,
                          scale: 1.015,
                        }
                  }
                  className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Icon */}
                  <motion.div
                    className="mx-auto flex size-12 items-center justify-center rounded-full bg-orange-50"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.08,
                          }
                    }
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <Icon
                      size={22}
                      className="text-orange-600"
                    />
                  </motion.div>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#06364a]">
                    {item.value}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationOverview;