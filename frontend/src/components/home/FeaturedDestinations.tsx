import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Agency,
  getAgencyByDomain,
} from "@/services/agencyService";

const FeaturedDestinations = () => {
  const [agency, setAgency] =
    useState<Agency | null>(null);

  const shouldReduceMotion =
    useReducedMotion();

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
          "Unable to load featured destinations:",
          error
        );
      }
    };

    loadAgency();
  }, []);

  if (!agency) {
    return null;
  }

  const destinations =
    agency.featuredDestinations ?? [];

  if (destinations.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          className="mb-8 text-center md:mb-10"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
            duration: shouldReduceMotion
              ? 0
              : 0.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <h2
            className="text-2xl font-bold sm:text-3xl"
            style={{
              color:
                agency.primaryColor,
            }}
          >
            Popular Destinations in Odisha
          </h2>

          <motion.div
            className="mx-auto mt-3 h-1 w-16 rounded-full"
            style={{
              backgroundColor:
                agency.accentColor,
            }}
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
              duration: shouldReduceMotion
                ? 0
                : 0.6,

              delay: shouldReduceMotion
                ? 0
                : 0.15,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          />
        </motion.div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-4">
          {destinations.map(
            (
              destination,
              index
            ) => {
              const direction =
                index % 2 === 0
                  ? -28
                  : 28;

              return (
                <motion.div
                  key={`${destination.slug}-${index}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: direction,
                          y: 14,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
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
                        : 0.8,

                    delay:
                      shouldReduceMotion
                        ? 0
                        : index *
                          0.14,

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
                >
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="
                      group
                      block
                      overflow-hidden
                      rounded-xl
                      border
                      border-gray-100
                      bg-white
                      shadow-md
                      transition-shadow
                      duration-300
                      ease-out
                      hover:shadow-2xl
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                    "
                    style={
                      {
                        "--tw-ring-color":
                          agency.accentColor,
                      } as React.CSSProperties
                    }
                  >
                    {/* Image */}
                    <div className="relative aspect-3/2 w-full overflow-hidden bg-gray-100">
                      <motion.img
                        src={
                          destination.image
                        }
                        alt={
                          destination.name
                        }
                        className="size-full object-cover"
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                scale: 1.07,
                              }
                        }
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/0
                          transition-colors
                          duration-500
                          group-hover:bg-black/15
                        "
                      />
                    </div>

                    {/* Card Content */}
                    <div className="px-4 py-4 text-center">
                      <h3
                        className="
                          text-lg
                          font-bold
                          transition-colors
                          duration-300
                        "
                        style={{
                          color:
                            agency.primaryColor,
                        }}
                        onMouseEnter={(
                          event
                        ) => {
                          event.currentTarget.style.color =
                            agency.accentColor;
                        }}
                        onMouseLeave={(
                          event
                        ) => {
                          event.currentTarget.style.color =
                            agency.primaryColor;
                        }}
                      >
                        {
                          destination.name
                        }
                      </h3>

                      {destination.subtitle && (
                        <p
                          className="
                            mt-1
                            text-sm
                            leading-5
                            text-gray-500
                            transition-colors
                            duration-300
                            group-hover:text-gray-700
                          "
                        >
                          {
                            destination.subtitle
                          }
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;