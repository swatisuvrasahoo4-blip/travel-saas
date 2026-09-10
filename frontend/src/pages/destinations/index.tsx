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

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import {
  Destination,
  getDestinations,
} from "@/services/destinationService";

const DestinationsPage = () => {
  const [
    destinations,
    setDestinations,
  ] = useState<Destination[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const loadDestinations =
      async () => {
        try {
          setLoading(true);
          setError("");

          const hostname =
            window.location.hostname;

          const data =
            await getDestinations(
              hostname
            );

          if (!cancelled) {
            setDestinations(data);
          }
        } catch (error) {
          console.error(
            "Unable to load destinations:",
            error
          );

          if (!cancelled) {
            setError(
              "Unable to load destinations."
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    loadDestinations();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white">
        {/* =========================================
            HERO
        ========================================== */}
        <section
          className="relative flex min-h-[360px] items-center overflow-hidden bg-cover bg-center md:min-h-[430px]"
          style={{
            backgroundImage:
              "url('/images/destinations/destinations-hero.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/90 via-[#06364a]/55 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-white">
              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
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
                className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4bc4ef] sm:text-sm"
              >
                Explore Odisha
              </motion.p>

              <motion.h1
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 34,
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
                className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
              >
                Our Destinations
              </motion.h1>

              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 22,
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
                      : 0.3,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="mt-4 max-w-xl text-sm leading-6 text-white/95 sm:text-base md:text-lg"
              >
                Discover temples, beaches,
                forests, hills and cultural
                experiences across Odisha.
              </motion.p>

              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        scaleX: 0,
                        opacity: 0,
                      }
                }
                animate={{
                  scaleX: 1,
                  opacity: 1,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 0.9,

                  delay:
                    shouldReduceMotion
                      ? 0
                      : 0.5,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                style={{
                  transformOrigin: "left",
                }}
                className="mt-5 h-1 w-20 rounded-full bg-[#ff681f]"
              />
            </div>
          </div>
        </section>

        {/* =========================================
            DESTINATIONS
        ========================================== */}
        <section className="bg-[#fffaf3] py-12 md:py-16">
          <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
            <motion.div
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
              className="text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff681f]">
                Explore
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#06364a] md:text-4xl">
                Discover Our Destinations
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
                Find the perfect place for
                your next journey.
              </p>

              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        scaleX: 0,
                      }
                }
                whileInView={{
                  scaleX: 1,
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
                      : 0.18,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                style={{
                  transformOrigin:
                    "center",
                }}
                className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#ff681f]"
              />
            </motion.div>

            {/* Loading */}
            {loading && (
              <div className="min-h-[300px]" />
            )}

            {/* Error */}
            {!loading && error && (
              <div className="py-16 text-center">
                <p className="text-sm text-red-500">
                  {error}
                </p>
              </div>
            )}

            {/* Destination Cards */}
            {!loading &&
              !error &&
              destinations.length > 0 && (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {destinations.map(
                    (
                      destination,
                      index
                    ) => (
                      <motion.article
                        key={
                          destination._id ||
                          destination.slug
                        }
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 32,
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
                                0.1,

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
                              }
                        }
                        className="group overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                      >
                        <Link
                          href={`/destinations/${destination.slug}`}
                          className="block"
                        >
                          <div className="aspect-4/3 overflow-hidden bg-gray-100">
                            <motion.img
                              src={
                                destination.cardImage ||
                                destination.heroImage
                              }
                              alt={
                                destination.name
                              }
                              className="size-full object-cover"
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

                          <div className="p-5">
                            <h3 className="text-xl font-bold text-[#06364a]">
                              {
                                destination.name
                              }
                            </h3>

                            {destination.subtitle && (
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                {
                                  destination.subtitle
                                }
                              </p>
                            )}

                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ff681f]">
                              Explore Destination
                              <ArrowRight
                                size={17}
                              />
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    )
                  )}
                </div>
              )}

            {!loading &&
              !error &&
              destinations.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-sm text-gray-500">
                    No destinations are
                    available yet.
                  </p>
                </div>
              )}
          </div>
        </section>

        {/* =========================================
            PLAN TRIP CTA
        ========================================== */}
        <section
          className="relative bg-cover bg-center py-14 md:py-16"
          style={{
            backgroundImage:
              "url('/images/why-choose-bg.png')",
          }}
        >
          <div className="absolute inset-0 bg-[#06364a]/80" />

          <div className="relative z-10 mx-auto max-w-[1700px] px-4 text-center text-white sm:px-6 lg:px-8">
            <motion.div
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4bc4ef]">
                Plan Your Journey
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
                Not Sure Where to Go?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/90 md:text-base">
                Tell us what kind of trip
                you&apos;re looking for and
                we&apos;ll help you plan the
                right journey.
              </p>

              <Link
                href="/plan-my-trip"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ff681f] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#e85b17]"
              >
                Plan My Trip
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DestinationsPage;