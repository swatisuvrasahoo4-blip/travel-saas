import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import type {
  TourPackage,
} from "@/services/packageService";

interface PackageAboutProps {
  tourPackage: TourPackage;
}

const PackageAbout = ({
  tourPackage,
}: PackageAboutProps) => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  return (
    <section className="pt-7 md:pt-8">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[2.15fr_0.9fr]">
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
              amount: 0.3,
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
              About This Tour
            </SectionHeading>

            <p
              className="mt-4 max-w-5xl text-sm leading-6 md:text-base md:leading-7"
              style={{
                color:
                  agency.primaryColor,
              }}
            >
              {tourPackage.description}
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 30,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 1.1,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.18,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="flex min-h-[145px] flex-col items-center justify-center rounded-lg px-8 py-5 text-center"
            style={{
              backgroundColor: `${agency.primaryColor}0d`,
            }}
          >
            <div
              className="self-start font-serif text-4xl font-bold leading-none"
              style={{
                color:
                  agency.primaryColor,
              }}
            >
              “
            </div>

           {agency.packageDetail?.quote && (
  <p
    className="text-sm leading-6 md:text-base"
    style={{
      color:
        agency.primaryColor,
    }}
  >
    {agency.packageDetail.quote}
  </p>
)}

            <div
              className="mt-4 h-[3px] w-8"
              style={{
                backgroundColor:
                  agency.accentColor,
              }}
            />
          </motion.div>
        </div>

        {/* Destination Cards */}
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {tourPackage.destinations.map(
            (
              destination,
              index
            ) => (
              <motion.article
                key={
                  destination.name
                }
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 30,
                        scale: 0.98,
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
                        y: -5,
                      }
                }
              >
                <div className="overflow-hidden rounded-md">
                  <motion.img
                    src={
                      destination.image
                    }
                    alt={
                      destination.name
                    }
                    className="h-[210px] w-full object-cover md:h-[220px]"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.06,
                          }
                    }
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />
                </div>

                <h3
                  className="mt-2 text-base font-bold"
                  style={{
                    color:
                      agency.primaryColor,
                  }}
                >
                  {destination.name}
                </h3>

                {destination.subtitle && (
                  <p className="mt-0.5 text-sm text-slate-600">
                    {
                      destination.subtitle
                    }
                  </p>
                )}
              </motion.article>
            )
          )}
        </div>
      </div>
    </section>
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

export default PackageAbout;