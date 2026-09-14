import {
  ArrowLeft,
  CheckCircle2,
  Star,
  Trash2,
  UserRound,
} from "lucide-react";

import Head from "next/head";
import Link from "next/link";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import { useAgency } from "@/context/AgencyContext";

import {
  canDeleteReview,
  deleteOwnWebsiteReview,
  getReviews,
  Review,
  submitWebsiteReview,
} from "@/services/reviewService";

const ReviewsPage = () => {
  const {
    agency,
    loading: agencyLoading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [
    reviewsLoading,
    setReviewsLoading,
  ] = useState(true);

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [rating, setRating] =
    useState(0);

  const [
    hoveredRating,
    setHoveredRating,
  ] = useState(0);

  const [
    reviewText,
    setReviewText,
  ] = useState("");

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    submitMessage,
    setSubmitMessage,
  ] = useState("");

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const [
    deletingReviewId,
    setDeletingReviewId,
  ] = useState<string | null>(
    null
  );

  const hostname =
    typeof window !==
    "undefined"
      ? window.location.hostname
      : "";

  /* =========================================
     LOAD REVIEWS
  ========================================= */

  useEffect(() => {
    if (
      agencyLoading ||
      !agency
    ) {
      return;
    }

    let cancelled = false;

    const loadReviews =
      async () => {
        try {
          const data =
            await getReviews(
              window.location.hostname
            );

          if (!cancelled) {
            setReviews(
              data
            );
          }
        } catch (error) {
          console.error(
            "Unable to load reviews:",
            error
          );

          if (!cancelled) {
            setReviews([]);
          }
        } finally {
          if (!cancelled) {
            setReviewsLoading(
              false
            );
          }
        }
      };

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, [
    agency,
    agencyLoading,
  ]);

  /* =========================================
     REVIEW STATS
  ========================================= */

  const averageRating =
    useMemo(() => {
      if (
        reviews.length ===
        0
      ) {
        return 0;
      }

      const total =
        reviews.reduce(
          (
            sum,
            review
          ) =>
            sum +
            review.rating,
          0
        );

      return (
        total /
        reviews.length
      );
    }, [reviews]);

  /* =========================================
     SUBMIT REVIEW
  ========================================= */

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setSubmitMessage("");
      setSubmitError("");

      if (
        !customerName.trim() ||
        !reviewText.trim() ||
        rating < 1
      ) {
        setSubmitError(
          "Please enter your name, select a star rating and write your review."
        );

        return;
      }

      try {
        setSubmitting(true);

        const response =
          await submitWebsiteReview({
            hostname:
              window.location.hostname,
            customerName:
              customerName.trim(),
            rating,
            review:
              reviewText.trim(),
          });

        setSubmitMessage(
          response.message ||
            "Review submitted successfully."
        );

        setCustomerName("");
        setRating(0);
        setHoveredRating(0);
        setReviewText("");
      } catch (error) {
        console.error(
          "Unable to submit review:",
          error
        );

        setSubmitError(
          "Unable to submit your review. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    };

  /* =========================================
     DELETE OWN REVIEW
  ========================================= */

  const handleDeleteReview =
    async (
      reviewId: string
    ) => {
      try {
        setDeletingReviewId(
          reviewId
        );

        await deleteOwnWebsiteReview(
          reviewId,
          hostname
        );

        setReviews(
          (
            currentReviews
          ) =>
            currentReviews.filter(
              (review) =>
                review._id !==
                reviewId
            )
        );
      } catch (error) {
        console.error(
          "Unable to delete review:",
          error
        );

        window.alert(
          "Unable to delete this review."
        );
      } finally {
        setDeletingReviewId(
          null
        );
      }
    };

  if (
    agencyLoading ||
    !agency
  ) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Reviews |{" "}
          {agency.name}
        </title>

        <meta
          name="description"
          content={`Read traveller reviews and share your experience with ${agency.name}.`}
        />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#fffaf3]">
        {/* =====================================
            HERO
        ===================================== */}

        <section className="relative overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 24,
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
                    : 0.6,
              }}
              className="max-w-3xl"
            >
              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                <ArrowLeft
                  size={17}
                />

                Back to Home
              </Link>

              <h1
                className="text-4xl font-bold leading-tight md:text-5xl"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                Traveller Reviews
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                Read real traveller
                experiences and share
                your own journey with{" "}
                {agency.name}.
              </p>

              {!reviewsLoading &&
                reviews.length >
                  0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from(
                        {
                          length: 5,
                        },
                        (
                          _,
                          index
                        ) => (
                          <Star
                            key={
                              index
                            }
                            size={
                              20
                            }
                            className={
                              index <
                              Math.round(
                                averageRating
                              )
                                ? "fill-[#f59e0b] text-[#f59e0b]"
                                : "text-gray-300"
                            }
                          />
                        )
                      )}
                    </div>

                    <span
                      className="font-bold"
                      style={{
                        color:
                          agency.primaryColor,
                      }}
                    >
                      {averageRating.toFixed(
                        1
                      )}
                    </span>

                    <span className="text-sm text-gray-500">
                      from{" "}
                      {
                        reviews.length
                      }{" "}
                      review
                      {reviews.length ===
                      1
                        ? ""
                        : "s"}
                    </span>
                  </div>
                )}
            </motion.div>
          </div>
        </section>

        {/* =====================================
            WRITE REVIEW
        ===================================== */}

        <section className="py-12 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -20,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.55,
              }}
            >
              <p
                className="text-sm font-bold uppercase tracking-[0.18em]"
                style={{
                  color:
                    agency.accentColor,
                }}
              >
                Share Your Experience
              </p>

              <h2
                className="mt-3 text-3xl font-bold"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                Write a Review
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-gray-600">
                Tell other travellers
                about your experience.
                Your review will be
                checked before it is
                published.
              </p>
            </motion.div>

            <motion.form
              onSubmit={
                handleSubmit
              }
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
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.55,
              }}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
            >
              <div>
                <label
                  htmlFor="review-name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Your Name
                </label>

                <input
                  id="review-name"
                  type="text"
                  value={
                    customerName
                  }
                  onChange={(
                    event
                  ) =>
                    setCustomerName(
                      event.target
                        .value
                    )
                  }
                  placeholder="Enter your name"
                  maxLength={80}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400"
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700">
                  Your Rating
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {Array.from(
                    {
                      length: 5,
                    },
                    (
                      _,
                      index
                    ) => {
                      const value =
                        index +
                        1;

                      const active =
                        value <=
                        (hoveredRating ||
                          rating);

                      return (
                        <button
                          key={
                            value
                          }
                          type="button"
                          aria-label={`${value} star rating`}
                          onMouseEnter={() =>
                            setHoveredRating(
                              value
                            )
                          }
                          onMouseLeave={() =>
                            setHoveredRating(
                              0
                            )
                          }
                          onClick={() =>
                            setRating(
                              value
                            )
                          }
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={
                              30
                            }
                            className={
                              active
                                ? "fill-[#f59e0b] text-[#f59e0b]"
                                : "text-gray-300"
                            }
                          />
                        </button>
                      );
                    }
                  )}

                  {rating >
                    0 && (
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="review-text"
                  className="text-sm font-semibold text-gray-700"
                >
                  Your Review
                </label>

                <textarea
                  id="review-text"
                  value={
                    reviewText
                  }
                  onChange={(
                    event
                  ) =>
                    setReviewText(
                      event.target
                        .value
                    )
                  }
                  placeholder="Share your travel experience..."
                  rows={5}
                  maxLength={1000}
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                />

                <p className="mt-2 text-right text-xs text-gray-400">
                  {
                    reviewText.length
                  }
                  /1000
                </p>
              </div>

              {submitError && (
                <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {
                    submitError
                  }
                </div>
              )}

              {submitMessage && (
                <div className="mt-5 flex gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {
                      submitMessage
                    }
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  submitting
                }
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor:
                    agency.accentColor,
                }}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Review"}
              </button>
            </motion.form>
          </div>
        </section>

        {/* =====================================
            ALL REVIEWS
        ===================================== */}

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2
                className="text-3xl font-bold"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                All Reviews
              </h2>

              <div
                className="mt-2 h-1 w-16 rounded-full"
                style={{
                  backgroundColor:
                    agency.accentColor,
                }}
              />
            </div>

            {reviewsLoading ? (
              <div className="rounded-2xl border border-gray-100 bg-[#fffaf3] px-6 py-12 text-center text-sm text-gray-500">
                Loading reviews...
              </div>
            ) : reviews.length ===
              0 ? (
              <div className="rounded-2xl border border-gray-100 bg-[#fffaf3] px-6 py-14 text-center">
                <Star
                  size={30}
                  className="mx-auto text-gray-300"
                />

                <h3
                  className="mt-4 text-lg font-bold"
                  style={{
                    color:
                      agency.primaryColor,
                  }}
                >
                  No reviews yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Be the first
                  traveller to share
                  your experience.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map(
                  (review) => {
                    const userCanDelete =
                      canDeleteReview(
                        review
                      );

                    return (
                      <motion.article
                        key={
                          review._id
                        }
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
                              : 0.45,
                        }}
                        className="flex min-h-[270px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {review.customerImage ? (
                              <img
                                src={
                                  review.customerImage
                                }
                                alt={
                                  review.customerName
                                }
                                className="h-12 w-12 rounded-full object-cover"
                              />
                            ) : (
                              <div
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eef4f6]"
                                style={{
                                  color:
                                    agency.primaryColor,
                                }}
                              >
                                <UserRound
                                  size={
                                    22
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

                          {userCanDelete && (
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteReview(
                                  review._id
                                )
                              }
                              disabled={
                                deletingReviewId ===
                                review._id
                              }
                              aria-label="Delete your review"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            >
                              <Trash2
                                size={
                                  17
                                }
                              />
                            </button>
                          )}
                        </div>

                        <div className="mt-5 flex items-center gap-1">
                          {Array.from(
                            {
                              length: 5,
                            },
                            (
                              _,
                              index
                            ) => (
                              <Star
                                key={
                                  index
                                }
                                size={
                                  17
                                }
                                className={
                                  index <
                                  review.rating
                                    ? "fill-[#f59e0b] text-[#f59e0b]"
                                    : "text-gray-300"
                                }
                              />
                            )
                          )}
                        </div>

                        <p className="mt-5 flex-1 text-sm leading-7 text-gray-600">
                          &ldquo;
                          {
                            review.review
                          }
                          &rdquo;
                        </p>

                        <p className="mt-5 text-xs text-gray-400">
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString(
                            undefined,
                            {
                              day: "numeric",
                              month:
                                "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </motion.article>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ReviewsPage;