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
  getFeaturedReviews,
  Review,
} from "@/services/reviewService";

const TravellerReviews = () => {
  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

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
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl font-bold text-[#06364a] md:text-4xl">
              What Our Travellers Say
            </h2>

            <div className="mt-2 h-1 w-16 rounded-full bg-[#ea580c]" />
          </div>

          <Link
            href="/reviews"
            className="hidden items-center gap-2 text-sm font-semibold text-[#06364a] transition hover:text-[#ea580c] sm:inline-flex"
          >
            View All Reviews

            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Reviews */}
        <div className="relative px-0 md:px-12">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a] shadow-sm transition hover:border-[#ea580c] hover:text-[#ea580c] md:flex"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="grid gap-6 md:grid-cols-3">
            {visibleReviews.map(
              (review) => (
                <article
                  key={review._id}
                  className="flex min-h-[260px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  {/* Customer */}
                  <div className="flex items-center gap-4">
                    {review.customerImage ? (
                      <img
                        src={
                          review.customerImage
                        }
                        alt={
                          review.customerName
                        }
                        className="h-14 w-14 rounded-full object-cover"
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
                  <div className="mt-5 flex items-center gap-1">
                    {Array.from(
                      { length: 5 },
                      (_, index) => (
                        <Star
                          key={index}
                          size={17}
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
                </article>
              )
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a] shadow-sm transition hover:border-[#ea580c] hover:text-[#ea580c] md:flex"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="mt-7 flex items-center justify-between md:hidden">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a]"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#06364a]"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#06364a]"
          >
            View All Reviews

            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TravellerReviews;