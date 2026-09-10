import {
  motion,
  useReducedMotion,
} from "motion/react";

import type {
  Destination,
} from "@/services/destinationService";

interface DestinationAttractionsProps {
  destination: Destination;
}

const DestinationAttractions = ({
  destination,
}: DestinationAttractionsProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  if (
    !destination.attractions ||
    destination.attractions.length === 0
  ) {
    return null;
  }

  return (
    <section className="w-full bg-[#fffaf3] py-12 md:py-16">
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
            amount: 0.4,
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
            Places to Explore in{" "}
            {destination.name}
          </h2>

          {/* Accent Line */}
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
        </motion.div>

        {/* Attraction Cards */}
        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destination.attractions.map(
            (attraction, index) => (
              <motion.article
                key={`${attraction.title}-${index}`}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 34,
                        scale: 0.97,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 1,

                  delay:
                    shouldReduceMotion
                      ? 0
                      : index * 0.15,

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
                        y: -7,
                        scale: 1.012,
                      }
                }
                className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Attraction Image */}
                <div className="aspect-4/3 w-full overflow-hidden bg-gray-100">
                  <motion.img
                    src={attraction.image}
                    alt={attraction.title}
                    className="size-full object-cover"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.07,
                          }
                    }
                    transition={{
                      duration: 0.65,
                      ease: "easeOut",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#06364a]">
                    {attraction.title}
                  </h3>

                  {attraction.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {
                        attraction.description
                      }
                    </p>
                  )}
                </div>
              </motion.article>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationAttractions;