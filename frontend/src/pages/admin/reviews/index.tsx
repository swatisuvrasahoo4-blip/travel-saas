import Head from "next/head";

import {
  Star,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";
import AdminLayout from "@/components/admin/layout/AdminLayout";

import { useAdminAuth } from "@/context/AdminAuthContext";

import {
  AdminReview,
  AdminReviewSource,
  AdminReviewStatus,
  deleteAdminReview,
  getAdminReviews,
  updateAdminReviewFeatured,
  updateAdminReviewStatus,
} from "@/services/adminReviewService";

type StatusFilter =
  | "all"
  | AdminReviewStatus;

type SourceFilter =
  | "all"
  | AdminReviewSource;

const AdminReviewsPage = () => {
  const {
    csrfToken,
  } = useAdminAuth();

  const [
    reviews,
    setReviews,
  ] = useState<AdminReview[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>(
    "all"
  );

  const [
    sourceFilter,
    setSourceFilter,
  ] = useState<SourceFilter>(
    "all"
  );

  const [
    updatingReviewId,
    setUpdatingReviewId,
  ] = useState<string | null>(
    null
  );

  const [
    deletingReviewId,
    setDeletingReviewId,
  ] = useState<string | null>(
    null
  );

  /* =========================================
     LOAD REVIEWS
  ========================================= */

  useEffect(() => {
    const loadReviews =
      async () => {
        try {
          setIsLoading(true);
          setError("");

          const response =
            await getAdminReviews();

          setReviews(
            response.reviews
          );
        } catch {
          setError(
            "Unable to load reviews."
          );
        } finally {
          setIsLoading(false);
        }
      };

    void loadReviews();
  }, []);

  /* =========================================
     FILTERED REVIEWS
  ========================================= */

  const filteredReviews =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return reviews.filter(
        (review) => {
          const matchesSearch =
            !query ||
            review.customerName
              .toLowerCase()
              .includes(query) ||
            review.review
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "all" ||
            review.status ===
              statusFilter;

          const matchesSource =
            sourceFilter ===
              "all" ||
            review.source ===
              sourceFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesSource
          );
        }
      );
    }, [
      reviews,
      search,
      statusFilter,
      sourceFilter,
    ]);

  /* =========================================
     HELPERS
  ========================================= */

  const formatDate = (
    value: string
  ) => {
    if (!value) {
      return "Not specified";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return value;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusClasses = (
    status: AdminReviewStatus
  ) => {
    switch (status) {
      case "pending":
        return "bg-orange-50 text-orange-600";

      case "approved":
        return "bg-green-50 text-green-600";

      case "rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  /* =========================================
     UPDATE STATUS
  ========================================= */

  const handleStatusChange =
    async (
      reviewId: string,
      status: AdminReviewStatus
    ) => {
      if (!csrfToken) {
        setError(
          "Security token is unavailable. Please refresh the page."
        );

        return;
      }

      try {
        setUpdatingReviewId(
          reviewId
        );

        setError("");

        const response =
          await updateAdminReviewStatus(
            reviewId,
            status,
            csrfToken
          );

        setReviews(
          (currentReviews) =>
            currentReviews.map(
              (review) =>
                review.id ===
                reviewId
                  ? response.review
                  : review
            )
        );
      } catch {
        setError(
          "Unable to update review status."
        );
      } finally {
        setUpdatingReviewId(
          null
        );
      }
    };

  /* =========================================
     UPDATE FEATURED
  ========================================= */

  const handleFeaturedChange =
    async (
      review: AdminReview
    ) => {
      if (!csrfToken) {
        setError(
          "Security token is unavailable. Please refresh the page."
        );

        return;
      }

      try {
        setUpdatingReviewId(
          review.id
        );

        setError("");

        const response =
          await updateAdminReviewFeatured(
            review.id,
            !review.featured,
            review.featuredOrder,
            csrfToken
          );

        setReviews(
          (currentReviews) =>
            currentReviews.map(
              (currentReview) =>
                currentReview.id ===
                review.id
                  ? response.review
                  : currentReview
            )
        );
      } catch {
        setError(
          "Unable to update featured review."
        );
      } finally {
        setUpdatingReviewId(
          null
        );
      }
    };

  /* =========================================
     DELETE REVIEW
  ========================================= */

  const handleDelete =
    async (
      reviewId: string
    ) => {
      if (!csrfToken) {
        setError(
          "Security token is unavailable. Please refresh the page."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this review?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingReviewId(
          reviewId
        );

        setError("");

        await deleteAdminReview(
          reviewId,
          csrfToken
        );

        setReviews(
          (currentReviews) =>
            currentReviews.filter(
              (review) =>
                review.id !==
                reviewId
            )
        );
      } catch {
        setError(
          "Unable to delete review."
        );
      } finally {
        setDeletingReviewId(
          null
        );
      }
    };

  return (
    <>
      <Head>
        <title>
          Reviews | Admin
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <ProtectedAdminRoute>
        <AdminLayout
          title="Reviews"
          subtitle="Manage traveller reviews."
        >
          <section>
            <div className="mb-6">
              <h2 className="font-serif text-3xl text-[#06364a]">
                Traveller Reviews
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Approve, reject,
                feature and manage
                traveller reviews.
              </p>
            </div>

            {/* Filters */}

            <div className="mb-6 grid gap-3 rounded-2xl border border-[#e1eaee] bg-white p-4 md:grid-cols-[1fr_180px_180px]">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by customer name or review..."
                className="h-11 rounded-xl border border-[#dbe7eb] px-4 text-sm outline-none transition focus:border-[#06364a]"
              />

              <select
                value={
                  statusFilter
                }
                onChange={(event) =>
                  setStatusFilter(
                    event.target
                      .value as StatusFilter
                  )
                }
                className="h-11 rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a]"
              >
                <option value="all">
                  All Status
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="approved">
                  Approved
                </option>

                <option value="rejected">
                  Rejected
                </option>
              </select>

              <select
                value={
                  sourceFilter
                }
                onChange={(event) =>
                  setSourceFilter(
                    event.target
                      .value as SourceFilter
                  )
                }
                className="h-11 rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a]"
              >
                <option value="all">
                  All Sources
                </option>

                <option value="website">
                  Website
                </option>

                <option value="google">
                  Google
                </option>
              </select>
            </div>

            {/* Content */}

            {isLoading ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d7e7ed] border-t-[#06364a]" />

                  <p className="text-sm font-medium text-[#52727f]">
                    Loading reviews...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                {error}
              </div>
            ) : filteredReviews.length ===
              0 ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <p className="text-sm text-slate-500">
                  No reviews found.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#e1eaee] bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-[#f4f9fb]">
                      <tr className="text-left text-xs font-semibold uppercase tracking-wide text-[#52727f]">
                        <th className="px-5 py-4">
                          Traveller
                        </th>

                        <th className="px-5 py-4">
                          Rating
                        </th>

                        <th className="px-5 py-4">
                          Review
                        </th>

                        <th className="px-5 py-4">
                          Source
                        </th>

                        <th className="px-5 py-4">
                          Status
                        </th>

                        <th className="px-5 py-4">
                          Featured
                        </th>

                        <th className="px-5 py-4">
                          Submitted
                        </th>

                        <th className="px-5 py-4 text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#edf2f4]">
                      {filteredReviews.map(
                        (
                          review
                        ) => (
                          <tr
                            key={
                              review.id
                            }
                            className="align-top transition hover:bg-[#fbfdfe]"
                          >
                            {/* Traveller */}

                            <td className="px-5 py-4">
                              <p className="font-semibold text-[#06364a]">
                                {
                                  review.customerName
                                }
                              </p>
                            </td>

                            {/* Rating */}

                            <td className="px-5 py-4">
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
                                        15
                                      }
                                      className={
                                        index <
                                        review.rating
                                          ? "fill-[#f59e0b] text-[#f59e0b]"
                                          : "text-slate-300"
                                      }
                                    />
                                  )
                                )}
                              </div>
                            </td>

                            {/* Review */}

                            <td className="max-w-[320px] px-5 py-4">
                              <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                                {
                                  review.review
                                }
                              </p>
                            </td>

                            {/* Source */}

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                                  review.source ===
                                  "google"
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-[#eef8fc] text-[#176b87]"
                                }`}
                              >
                                {review.source ===
                                "google"
                                  ? "Google"
                                  : "Website"}
                              </span>
                            </td>

                            {/* Status */}

                            <td className="px-5 py-4">
                              <select
                                value={
                                  review.status
                                }
                                disabled={
                                  updatingReviewId ===
                                  review.id
                                }
                                onChange={(event) =>
                                  void handleStatusChange(
                                    review.id,
                                    event
                                      .target
                                      .value as AdminReviewStatus
                                  )
                                }
                                className={`h-9 rounded-lg border-0 px-3 text-xs font-semibold capitalize outline-none ${getStatusClasses(
                                  review.status
                                )}`}
                              >
                                <option value="pending">
                                  Pending
                                </option>

                                <option value="approved">
                                  Approved
                                </option>

                                <option value="rejected">
                                  Rejected
                                </option>
                              </select>
                            </td>

                            {/* Featured */}

                            <td className="px-5 py-4">
                              <button
                                type="button"
                                disabled={
                                  updatingReviewId ===
                                    review.id ||
                                  review.status !==
                                    "approved"
                                }
                                onClick={() =>
                                  void handleFeaturedChange(
                                    review
                                  )
                                }
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                                  review.featured
                                    ? "bg-yellow-50 text-yellow-700"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {review.featured
                                  ? "Featured"
                                  : "Not Featured"}
                              </button>
                            </td>

                            {/* Submitted */}

                            <td className="px-5 py-4 text-sm text-slate-500">
                              <span className="whitespace-nowrap">
                                {formatDate(
                                  review.createdAt
                                )}
                              </span>
                            </td>

                            {/* Actions */}

                            <td className="px-5 py-4 text-right">
                              <button
                                type="button"
                                disabled={
                                  deletingReviewId ===
                                  review.id
                                }
                                onClick={() =>
                                  void handleDelete(
                                    review.id
                                  )
                                }
                                aria-label="Delete review"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Trash2
                                  size={16}
                                />
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </AdminLayout>
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminReviewsPage;