import {
  ArrowLeft,
  ArrowRight,
  Star,
  UserRound,
} from "lucide-react";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import {
  getReviews,
  Review,
} from "@/services/reviewService";

const TravellerReviews = () => {
  const {
    agency,
    loading: agencyLoading,
  } = useAgency();

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [
    reviewsLoading,
    setReviewsLoading,
  ] = useState(true);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const shouldReduceMotion =
    useReducedMotion();

  /* =========================================
     LOAD APPROVED REVIEWS
  ========================================= */

  useEffect(() => {
    if (
      agencyLoading ||
      !agency
    ) {
      return;
    }

    let isCancelled = false;

    const loadReviews =
      async () => {
        try {
          const hostname =
            window.location.hostname;

          const reviewData =
            await getReviews(
              hostname
            );

          if (!isCancelled) {
            setReviews(
              reviewData
            );

            setCurrentIndex(0);
          }
        } catch (error) {
          console.error(
            "Unable to load reviews:",
            error
          );

          if (!isCancelled) {
            setReviews([]);
          }
        } finally {
          if (!isCancelled) {
            setReviewsLoading(
              false
            );
          }
        }
      };

    loadReviews();

    return () => {
      isCancelled = true;
    };
  }, [
    agency,
    agencyLoading,
  ]);

  if (
    agencyLoading ||
    reviewsLoading
  ) {
    return null;
  }

  if (!agency) {
    return null;
  }

  /* =========================================
     REVIEWS TO DISPLAY
  ========================================= */

  const visibleReviews =
    reviews.length > 0
      ? Array.from(
          {
            length:
              Math.min(
                3,
                reviews.length
              ),
          },
          (_, index) =>
            reviews[
              (currentIndex +
                index) %
                reviews.length
            ]
        )
      : [];

  /* =========================================
     NAVIGATION
  ========================================= */

  const handlePrevious = () => {
    if (
      reviews.length <= 1
    ) {
      return;
    }

    setCurrentIndex(
      (previousIndex) =>
        previousIndex === 0
          ? reviews.length - 1
          : previousIndex - 1
    );
  };

  const handleNext = () => {
    if (
      reviews.length <= 1
    ) {
      return;
    }

    setCurrentIndex(
      (previousIndex) =>
        (previousIndex + 1) %
        reviews.length
    );
  };

  return (
    <section className="bg-white pb-16 pt-8 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-8 flex items-end justify-between gap-5 md:mb-10">
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
              What Our Travellers Say
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
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 22,
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
              href="/reviews"
              className="group hidden items-center gap-2 text-sm font-semibold transition sm:inline-flex"
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
              View All Reviews

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
                  size={17}
                />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* =====================================
            NO REVIEWS
        ===================================== */}

        {reviews.length === 0 ? (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 15,
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
                  : 0.5,
            }}
            className="rounded-2xl border border-gray-100 bg-[#fffaf3] px-6 py-12 text-center"
          >
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  `${agency.primaryColor}10`,
                color:
                  agency.primaryColor,
              }}
            >
              <Star
                size={25}
              />
            </div>

            <h3
              className="mt-4 text-lg font-bold"
              style={{
                color:
                  agency.primaryColor,
              }}
            >
              No reviews yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Be the first traveller
              to share your
              experience with{" "}
              {agency.name}.
            </p>

            <Link
              href="/reviews"
              className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{
                backgroundColor:
                  agency.accentColor,
              }}
            >
              Write a Review

              <ArrowRight
                size={16}
              />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* =====================================
                REVIEWS
            ===================================== */}

            <div className="relative px-0 md:px-12">
              {/* Previous Button */}

              {reviews.length > 1 && (
                <motion.button
                  type="button"
                  onClick={
                    handlePrevious
                  }
                  aria-label="Previous reviews"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.08,
                          x: -2,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.92,
                        }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors md:flex"
                  style={{
                    color:
                      agency.primaryColor,
                  }}
                >
                  <ArrowLeft
                    size={18}
                  />
                </motion.button>
              )}

              <div
                className={`grid gap-6 ${
                  visibleReviews.length ===
                  1
                    ? "md:grid-cols-1"
                    : visibleReviews.length ===
                        2
                      ? "md:grid-cols-2"
                      : "md:grid-cols-3"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {visibleReviews.map(
                    (
                      review,
                      index
                    ) => (
                      <motion.article
                        key={`${review._id}-${currentIndex}`}
                        layout
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x:
                                  index ===
                                  0
                                    ? -24
                                    : index ===
                                        2
                                      ? 24
                                      : 0,
                                y: 18,
                              }
                        }
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                        }}
                        exit={
                          shouldReduceMotion
                            ? undefined
                            : {
                                opacity: 0,
                                y: -10,
                              }
                        }
                        transition={{
                          duration:
                            shouldReduceMotion
                              ? 0
                              : 0.65,
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
                                scale:
                                  1.012,
                              }
                        }
                        className="flex min-h-[260px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                      >
                        {/* Customer */}

                        <div className="flex items-center gap-4">
                          {review.customerImage ? (
                            <motion.img
                              src={
                                review.customerImage
                              }
                              alt={
                                review.customerName
                              }
                              className="h-14 w-14 rounded-full object-cover"
                              whileHover={
                                shouldReduceMotion
                                  ? undefined
                                  : {
                                      scale:
                                        1.06,
                                    }
                              }
                              transition={{
                                duration:
                                  0.3,
                              }}
                            />
                          ) : (
                            <div
                              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef4f6]"
                              style={{
                                color:
                                  agency.primaryColor,
                              }}
                            >
                              <UserRound
                                size={
                                  25
                                }
                              />
                            </div>
                          )}

                          <div>
                            <h3
                              className="font-bold"
                              style={{
                                color:
                                  agency.primaryColor,
                              }}
                            >
                              {
                                review.customerName
                              }
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              {review.source ===
                              "google"
                                ? "Google Review"
                                : "Website Review"}
                            </p>
                          </div>
                        </div>

                        {/* Review Text */}

                        <p className="mt-5 flex-1 text-sm leading-7 text-gray-600">
                          &ldquo;
                          {
                            review.review
                          }
                          &rdquo;
                        </p>

                        {/* Stars */}

                        <motion.div
                          className="mt-5 flex items-center gap-1"
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 8,
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
                                : 0.4,
                            delay:
                              shouldReduceMotion
                                ? 0
                                : 0.3 +
                                  index *
                                    0.08,
                          }}
                        >
                          {Array.from(
                            {
                              length: 5,
                            },
                            (
                              _,
                              starIndex
                            ) => (
                              <Star
                                key={
                                  starIndex
                                }
                                size={
                                  17
                                }
                                className={
                                  starIndex <
                                  review.rating
                                    ? "fill-[#f59e0b] text-[#f59e0b]"
                                    : "text-gray-300"
                                }
                              />
                            )
                          )}
                        </motion.div>
                      </motion.article>
                    )
                  )}
                </AnimatePresence>
              </div>

              {/* Next Button */}

              {reviews.length > 1 && (
                <motion.button
                  type="button"
                  onClick={
                    handleNext
                  }
                  aria-label="Next reviews"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.08,
                          x: 2,
                        }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 0.92,
                        }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors md:flex"
                  style={{
                    color:
                      agency.primaryColor,
                  }}
                >
                  <ArrowRight
                    size={18}
                  />
                </motion.button>
              )}
            </div>

            {/* Mobile Controls */}

            <div className="mt-7 flex items-center justify-between md:hidden">
              {reviews.length >
              1 ? (
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={
                      handlePrevious
                    }
                    aria-label="Previous reviews"
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale:
                              0.9,
                          }
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white"
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                  >
                    <ArrowLeft
                      size={18}
                    />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={
                      handleNext
                    }
                    aria-label="Next reviews"
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale:
                              0.9,
                          }
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white"
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                  >
                    <ArrowRight
                      size={18}
                    />
                  </motion.button>
                </div>
              ) : (
                <div />
              )}

              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                View All Reviews

                <ArrowRight
                  size={16}
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TravellerReviews;