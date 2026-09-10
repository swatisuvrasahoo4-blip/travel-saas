import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import {
  getPackageBySlug,
  TourPackage,
} from "@/services/packageService";

const PackageDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [tourPackage, setTourPackage] =
    useState<TourPackage | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof slug !== "string") {
      return;
    }

    let cancelled = false;

    const loadPackage = async () => {
      try {
        setLoading(true);
        setError("");

        const hostname =
          window.location.hostname;

        const data =
          await getPackageBySlug(
            hostname,
            slug
          );

        if (!cancelled) {
          setTourPackage(data);
        }
      } catch (error) {
        console.error(
          "Unable to load package:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load this tour package."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPackage();

    return () => {
      cancelled = true;
    };
  }, [router.isReady, slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white" />
        <Footer />
      </>
    );
  }

  if (error || !tourPackage) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#06364a]">
              Tour Package Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              {error ||
                "This tour package is not available."}
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-[#ff681f] px-6 py-3 font-semibold text-white"
            >
              Back to Home
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const hasMultipleDays =
    tourPackage.itinerary.length > 1;

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white">
        {/* =====================================================
            HERO
        ====================================================== */}
        <section
          className="relative min-h-[420px] bg-cover bg-[center_30%] md:min-h-[430px]"
          style={{
            backgroundImage: `url('${tourPackage.heroImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/95 via-[#06364a]/60 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1700px] items-center px-4 py-12 sm:px-6 md:min-h-[430px] lg:px-8">
            <div className="max-w-3xl text-white">
              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 0.9,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="text-xs font-medium uppercase tracking-wide text-[#4bc4ef] md:text-sm"
              >
                Odisha Tour Package
              </motion.p>

              <motion.h1
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 1.1,

                  delay:
                    shouldReduceMotion
                      ? 0
                      : 0.12,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
              >
                {tourPackage.name}
              </motion.h1>

              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 1.1,

                  delay:
                    shouldReduceMotion
                      ? 0
                      : 0.28,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="mt-2 font-serif text-2xl font-bold md:text-3xl"
              >
                {tourPackage.duration}
              </motion.p>

              {tourPackage.subtitle && (
                <motion.p
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration:
                      shouldReduceMotion
                        ? 0
                        : 1.1,

                    delay:
                      shouldReduceMotion
                        ? 0
                        : 0.42,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="mt-5 text-sm text-white/95 md:text-base"
                >
                  {tourPackage.subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK INFORMATION
        ====================================================== */}
        <section className="bg-[#f1f9fd] py-4 md:py-5">
          <div className="mx-auto grid max-w-[1700px] items-center gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_1.1fr_1.1fr_1.2fr_1.4fr] lg:px-8">
            <QuickInfo
              icon={Clock3}
              title="Duration"
              value={tourPackage.duration}
              index={0}
              shouldReduceMotion={
                shouldReduceMotion
              }
            />

            <QuickInfo
              icon={MapPin}
              title="Destinations"
              value={tourPackage.destinations
                .map(
                  (item) => item.name
                )
                .join(", ")}
              index={1}
              shouldReduceMotion={
                shouldReduceMotion
              }
            />

            <QuickInfo
              icon={UsersRound}
              title="Tour Type"
              value={
                tourPackage.tourTypes.length
                  ? tourPackage.tourTypes.join(
                      " / "
                    )
                  : "Custom Tour"
              }
              index={2}
              shouldReduceMotion={
                shouldReduceMotion
              }
            />

            <QuickInfo
              icon={Bus}
              title="Vehicle Options"
              value={
                tourPackage.vehicleOptions.length
                  ? tourPackage.vehicleOptions.join(
                      " / "
                    )
                  : "On Request"
              }
              index={3}
              shouldReduceMotion={
                shouldReduceMotion
              }
            />

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 25,
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
                    : 1,

                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.4,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="flex flex-col gap-2"
            >
              <Link
                href={`/enquiry?package=${encodeURIComponent(
                  tourPackage.slug
                )}`}
                className="flex items-center justify-center gap-2 rounded-md bg-[#ff681f] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Enquire Now
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/plan-my-trip"
                className="flex items-center justify-center rounded-md border border-[#06364a]/40 bg-white px-5 py-3 text-sm font-semibold text-[#06364a]"
              >
                Plan a Custom Trip
              </Link>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            ABOUT
        ====================================================== */}
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
                <SectionHeading>
                  About This Tour
                </SectionHeading>

                <p className="mt-4 max-w-5xl text-sm leading-6 text-[#1e3546] md:text-base md:leading-7">
                  {
                    tourPackage.description
                  }
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
                className="flex min-h-[145px] flex-col items-center justify-center rounded-lg bg-[#edf8fd] px-8 py-5 text-center"
              >
                <div className="self-start font-serif text-4xl font-bold leading-none text-[#06364a]">
                  “
                </div>

                <p className="text-sm leading-6 text-[#06364a] md:text-base">
                  Travel is not just about
                  places,
                  <br />
                  but also about
                  experiences.
                </p>

                <div className="mt-4 h-[3px] w-8 bg-[#ff681f]" />
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

                    <h3 className="mt-2 text-base font-bold text-[#06364a]">
                      {
                        destination.name
                      }
                    </h3>

                    {destination.subtitle && (
                      <p className="mt-0.5 text-sm text-[#334a5b]">
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

        {/* =====================================================
            ITINERARY + RIGHT COLUMN
        ====================================================== */}
        <section className="py-8 md:py-10">
          <div className="mx-auto grid max-w-[1700px] items-start gap-6 px-4 sm:px-6 lg:grid-cols-[1.28fr_1fr] lg:px-8">

            {/* Left - Itinerary */}
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
              <SectionHeading>
                Detailed Itinerary
              </SectionHeading>

              <div className="relative mt-6">
                {/* 
                  IMPORTANT:
                  If there is only Day 1,
                  show the circle but NO line.
                */}
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
                      transformOrigin:
                        "top",
                    }}
                    className="absolute bottom-5 left-[105px] top-5 hidden w-px -translate-x-1/2 bg-[#b9d4e2] sm:block"
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
                              : index *
                                0.14,

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
                          <div className="inline-flex rounded-md bg-[#e7f5fc] px-3 py-2 text-sm font-bold text-[#06364a]">
                            Day {day.day}
                          </div>
                        </div>

                        {/* Timeline Circle */}
                        <div className="relative hidden sm:flex sm:justify-center">
                          <div className="relative z-10 mt-1 h-5 w-5 rounded-full border-2 border-[#28739a] bg-[#28739a]" />
                        </div>

                        {/* Day Content */}
                        <div>
                          <h3 className="text-base font-bold text-[#06364a] md:text-lg">
                            {day.title}
                          </h3>

                          <ul className="mt-2 space-y-0.5 pl-5 text-sm leading-6 text-[#213a4b] md:text-base">
                            {day.activities.map(
                              (
                                activity
                              ) => (
                                <li
                                  key={
                                    activity
                                  }
                                  className="list-disc"
                                >
                                  {
                                    activity
                                  }
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

            {/* Right Column */}
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
                amount: 0.15,
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
              className="space-y-4"
            >
              {/* Tour Highlights */}
              <ReferenceCard title="Tour Highlights">
                <div className="space-y-1.5">
                  {tourPackage.highlights.map(
                    (highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-[#213a4b]"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-[#149566]"
                        />

                        <span>
                          {highlight}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </ReferenceCard>

              {/* Suitable For */}
              <ReferenceCard title="Suitable For">
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                  {tourPackage.suitableFor.map(
                    (item) => (
                      <div
                        key={item}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#06364a]">
                          <UsersRound
                            size={25}
                            strokeWidth={
                              1.7
                            }
                          />
                        </div>

                        <p className="mt-2 max-w-[85px] text-xs font-medium leading-4 text-[#06364a]">
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </ReferenceCard>

              {/* Vehicle Options */}
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                transition={{
                  duration: 0.25,
                }}
                className="overflow-hidden rounded-lg"
              >
                <img
                  src="/images/packages/vehicle-options.png"
                  alt="Innova 7 seater, Urbania 17 seater, Tempo Traveller 25 seater and SML Bus 33 seater"
                  className="block h-auto w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            CUSTOMIZE TOUR CTA
        ====================================================== */}
        <section
          className="relative bg-cover bg-center py-8 md:py-10"
          style={{
            backgroundImage: `url('${tourPackage.heroImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-[#06364a]/80" />

          <div className="relative z-10 mx-auto max-w-[1700px] px-4 text-white sm:px-6 lg:px-8">
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
              className="max-w-3xl"
            >
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                Want to Customize This
                Tour?
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/95 md:text-base">
                Add more destinations,
                change the duration or plan
                a group tour.
                <br className="hidden sm:block" />
                We&apos;ll create a
                personalized itinerary for
                you.
              </p>

              <Link
                href="/plan-my-trip"
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#06364a]"
              >
                Plan a Custom Trip
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

/* =========================================================
   QUICK INFORMATION
========================================================= */

interface QuickInfoProps {
  icon: typeof Clock3;
  title: string;
  value: string;
  index: number;
  shouldReduceMotion:
    | boolean
    | null;
}

const QuickInfo = ({
  icon: Icon,
  title,
  value,
  index,
  shouldReduceMotion,
}: QuickInfoProps) => {
  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 0.9,

        delay:
          shouldReduceMotion
            ? 0
            : index * 0.1,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#06364a] shadow-sm">
        <Icon
          size={23}
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold text-[#06364a]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#213a4b]">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

/* =========================================================
   SECTION HEADING
========================================================= */

interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading = ({
  children,
}: SectionHeadingProps) => {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-[#06364a] md:text-3xl">
        {children}
      </h2>

      <div className="mt-1.5 h-[3px] w-14 bg-[#ff681f]" />
    </div>
  );
};

/* =========================================================
   INFORMATION CARD
========================================================= */

interface ReferenceCardProps {
  title: string;
  children: React.ReactNode;
}

const ReferenceCard = ({
  title,
  children,
}: ReferenceCardProps) => {
  return (
    <div className="rounded-lg bg-[#edf8fd] px-5 py-4">
      <h3 className="font-serif text-xl font-bold text-[#06364a]">
        {title}
      </h3>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
};

export default PackageDetailPage;