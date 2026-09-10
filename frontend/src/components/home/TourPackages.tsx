import {
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import TourPackageCard from "@/components/packages/TourPackageCard";

import {
  getFeaturedPackages,
  TourPackage,
} from "@/services/packageService";

const TourPackages = () => {
  const {
    agency,
    loading: agencyLoading,
  } = useAgency();

  const [packages, setPackages] =
    useState<TourPackage[]>([]);

  const [
    packagesLoading,
    setPackagesLoading,
  ] = useState(true);

  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    if (
      agencyLoading ||
      !agency
    ) {
      return;
    }

    let isCancelled = false;

    const loadPackages = async () => {
      try {
        const hostname =
          window.location.hostname;

        const packageData =
          await getFeaturedPackages(
            hostname
          );

        if (!isCancelled) {
          setPackages(packageData);
        }
      } catch (error) {
        console.error(
          "Unable to load featured packages:",
          error
        );
      } finally {
        if (!isCancelled) {
          setPackagesLoading(false);
        }
      }
    };

    loadPackages();

    return () => {
      isCancelled = true;
    };
  }, [
    agency,
    agencyLoading,
  ]);

  if (
    agencyLoading ||
    packagesLoading
  ) {
    return null;
  }

  if (!agency) {
    return null;
  }

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f8fafb] pb-16 pt-8 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-[1700px] px-3 sm:px-4 lg:px-5">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
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
              duration:
                shouldReduceMotion
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
              className="text-3xl font-bold md:text-4xl"
              style={{
                color:
                  agency.primaryColor,
              }}
            >
              Our Tour Packages
            </h2>

            <motion.div
              className="mt-2 h-1 w-16 rounded-full"
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
                    : 0.55,
                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.15,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              style={{
                backgroundColor:
                  agency.accentColor,
                transformOrigin:
                  "left",
              }}
            />

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              Handpicked itineraries
              to help you explore the
              best of Odisha.
            </p>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 24,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.65,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.15,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <Link
              href="/packages"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold transition"
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
              View All Packages

              <motion.span
                className="inline-flex"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
              >
                <ArrowRight
                  size={18}
                />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Package Cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {packages.map(
            (
              tourPackage,
              index
            ) => (
              <TourPackageCard
                key={
                  tourPackage._id
                }
                tourPackage={
                  tourPackage
                }
                index={index}
                primaryColor={
                  agency.primaryColor
                }
                accentColor={
                  agency.accentColor
                }
              />
            )
          )}

          {/* Custom Tour Plan Card */}
          <motion.article
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 34,
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.22,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.85,
              delay:
                shouldReduceMotion
                  ? 0
                  : packages.length *
                    0.13,
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
            className="relative flex min-h-[390px] overflow-hidden rounded-2xl border border-orange-100 bg-cover bg-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
            style={{
              backgroundImage:
                "url('/images/packages/custom-tour-bg.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/76 to-transparent" />

            <div className="relative z-10 flex h-full max-w-[80%] flex-col justify-center p-6">
              <h3
                className="text-2xl font-bold leading-tight"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                Need a Custom
                <br />
                Tour Plan?
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-700">
                Tell us your
                preferences and
                we&apos;ll create a
                memorable itinerary
                for you.
              </p>

              <motion.div
                className="mt-7 w-fit"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.035,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
              >
                <Link
                  href="/plan-my-trip"
                  className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-lg px-5 py-3 text-sm font-bold transition hover:opacity-90"
                  style={{
                    backgroundColor:
                      agency.accentColor,
                    color:
                      agency.primaryColor,
                  }}
                >
                  Plan My Trip

                  <ArrowRight
                    size={17}
                  />
                </Link>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;