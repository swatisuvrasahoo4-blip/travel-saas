import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import type {
  TourPackage,
} from "@/services/packageService";

interface PackageItineraryProps {
  tourPackage: TourPackage;
}

const PackageItinerary = ({
  tourPackage,
}: PackageItineraryProps) => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  const hasMultipleDays =
    tourPackage.itinerary.length > 1;

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              x: -30,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
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
      <SectionHeading
        primaryColor={
          agency.primaryColor
        }
        accentColor={
          agency.accentColor
        }
      >
        Detailed Itinerary
      </SectionHeading>

      <div className="relative mt-6">
        {hasMultipleDays && (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleY: 0,
                  }
            }
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 1.2,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.25,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              transformOrigin: "top",
              backgroundColor: `${agency.primaryColor}33`,
            }}
            className="absolute bottom-5 left-[105px] top-5 hidden w-px -translate-x-1/2 sm:block"
          />
        )}

        <div className="space-y-8 md:space-y-10">
          {tourPackage.itinerary.map(
            (day, index) => (
              <motion.div
                key={day.day}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
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
                className="relative grid gap-4 sm:grid-cols-[75px_28px_1fr]"
              >
                {/* Day */}
                <div>
                  <div
                    className="inline-flex rounded-md px-3 py-2 text-sm font-bold"
                    style={{
                      backgroundColor: `${agency.primaryColor}12`,
                      color:
                        agency.primaryColor,
                    }}
                  >
                    Day {day.day}
                  </div>
                </div>

                {/* Timeline Circle */}
                <div className="relative hidden sm:flex sm:justify-center">
                  <div
                    className="relative z-10 mt-1 h-5 w-5 rounded-full border-2"
                    style={{
                      borderColor:
                        agency.primaryColor,
                      backgroundColor:
                        agency.primaryColor,
                    }}
                  />
                </div>

                {/* Day Content */}
                <div>
                  <h3
                    className="text-base font-bold md:text-lg"
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                  >
                    {day.title}
                  </h3>

                  <ul className="mt-2 space-y-0.5 pl-5 text-sm leading-6 text-slate-700 md:text-base">
                    {day.activities.map(
                      (activity) => (
                        <li
                          key={activity}
                          className="list-disc"
                        >
                          {activity}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================
   SECTION HEADING
========================================= */

interface SectionHeadingProps {
  children: React.ReactNode;
  primaryColor: string;
  accentColor: string;
}

const SectionHeading = ({
  children,
  primaryColor,
  accentColor,
}: SectionHeadingProps) => {
  return (
    <div>
      <h2
        className="font-serif text-2xl font-bold md:text-3xl"
        style={{
          color: primaryColor,
        }}
      >
        {children}
      </h2>

      <div
        className="mt-1.5 h-[3px] w-14"
        style={{
          backgroundColor:
            accentColor,
        }}
      />
    </div>
  );
};

export default PackageItinerary;