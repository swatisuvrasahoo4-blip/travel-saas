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

import {
  getFeaturedReviews,
  Review,
} from "@/services/reviewService";

const TravellerReviews = () => {
  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    let isCancelled = false;

    const loadReviews = async () => {
      try {
        const hostname =
          window.location.hostname;

        const reviewData =
          await getFeaturedReviews(
            hostname
          );

        if (!isCancelled) {
          setReviews(reviewData);
        }
      } catch (error) {
        console.error(
          "Unable to load reviews:",
          error
        );
      }
    };

    loadReviews();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (reviews.length === 0) {
    return null;
  }

  const visibleReviews = Array.from(
    {
      length: Math.min(
        3,
        reviews.length
      ),
    },
    (_, index) =>
      reviews[
        (currentIndex + index) %
          reviews.length
      ]
  );

  const handlePrevious = () => {
    setCurrentIndex(
      (previousIndex) =>
        previousIndex === 0
          ? reviews.length - 1
          : previousIndex - 1
    );
  };

  const handleNext = () => {
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
            <h2 className="text-3xl font-bold text-[#06364a] md:text-4xl">
              What Our Travellers Say
            </h2>

            <motion.div
              className="mt-2 h-1 w-16 rounded-full bg-[#ea580c]"
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
                transformOrigin: "left",
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
              className="group hidden items-center gap-2 text-sm font-semibold text-[#06364a] transition hover:text-[#ea580c] sm:inline-flex"
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

        {/* Reviews */}
        <div className="relative px-0 md:px-12">

          {/* Previous Button */}
          <motion.button
            type="button"
            onClick={handlePrevious}
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
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a] shadow-sm transition-colors hover:border-[#ea580c] hover:text-[#ea580c] md:flex"
          >
            <ArrowLeft size={18} />
          </motion.button>

          <div className="grid gap-6 md:grid-cols-3">
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
                              index === 0
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
                            scale: 1.012,
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
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eef4f6] text-[#06364a]">
                          <UserRound
                            size={25}
                          />
                        </div>
                      )}

                      <div>
                        <h3 className="font-bold text-[#06364a]">
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
                      {review.review}
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
                        { length: 5 },
                        (_, starIndex) => (
                          <Star
                            key={
                              starIndex
                            }
                            size={17}
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
          <motion.button
            type="button"
            onClick={handleNext}
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
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a] shadow-sm transition-colors hover:border-[#ea580c] hover:text-[#ea580c] md:flex"
          >
            <ArrowRight size={18} />
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="mt-7 flex items-center justify-between md:hidden">
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
                      scale: 0.9,
                    }
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a]"
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
                      scale: 0.9,
                    }
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a]"
            >
              <ArrowRight
                size={18}
              />
            </motion.button>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#06364a]"
          >
            View All Reviews
            <ArrowRight
              size={16}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravellerReviews;