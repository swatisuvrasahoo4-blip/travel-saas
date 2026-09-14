import axios from "axios";

export interface Review {
  _id: string;
  agencyId: string;

  customerName: string;
  customerImage: string;

  rating: number;
  review: string;

  source:
    | "website"
    | "google";

  googleReviewId: string;
  googleReviewUrl: string;

  status:
    | "pending"
    | "approved"
    | "rejected";

  featured: boolean;
  featuredOrder: number;

  createdAt: string;
  updatedAt: string;
}

interface ReviewsResponse {
  success: boolean;
  reviews: Review[];
}

interface SubmitWebsiteReviewPayload {
  hostname: string;
  customerName: string;
  rating: number;
  review: string;
}

interface SubmitWebsiteReviewResponse {
  success: boolean;
  message: string;
  reviewId: string;
  deleteToken: string;
}

interface DeleteReviewResponse {
  success: boolean;
  message: string;
}

/* =========================================
   BACKEND URL
========================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =========================================
   REVIEW DELETE TOKEN STORAGE
========================================= */

const REVIEW_TOKEN_KEY =
  "website_review_delete_tokens";

interface StoredReviewTokens {
  [reviewId: string]: string;
}

const getStoredReviewTokens =
  (): StoredReviewTokens => {
    if (
      typeof window ===
      "undefined"
    ) {
      return {};
    }

    try {
      const stored =
        window.localStorage.getItem(
          REVIEW_TOKEN_KEY
        );

      if (!stored) {
        return {};
      }

      const parsed =
        JSON.parse(stored);

      if (
        typeof parsed !==
          "object" ||
        parsed === null ||
        Array.isArray(parsed)
      ) {
        return {};
      }

      return parsed as StoredReviewTokens;
    } catch {
      return {};
    }
  };

export const saveReviewDeleteToken = (
  reviewId: string,
  deleteToken: string
) => {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  const tokens =
    getStoredReviewTokens();

  tokens[reviewId] =
    deleteToken;

  window.localStorage.setItem(
    REVIEW_TOKEN_KEY,
    JSON.stringify(tokens)
  );
};

export const getReviewDeleteToken = (
  reviewId: string
): string | null => {
  const tokens =
    getStoredReviewTokens();

  return (
    tokens[reviewId] ||
    null
  );
};

export const removeReviewDeleteToken = (
  reviewId: string
) => {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  const tokens =
    getStoredReviewTokens();

  delete tokens[reviewId];

  window.localStorage.setItem(
    REVIEW_TOKEN_KEY,
    JSON.stringify(tokens)
  );
};

/* =========================================
   GET FEATURED REVIEWS
========================================= */

export const getFeaturedReviews =
  async (
    hostname: string
  ): Promise<Review[]> => {
    const response =
      await axios.get<ReviewsResponse>(
        `${API_URL}/review/featured`,
        {
          params: {
            hostname,
          },
        }
      );

    return response.data.reviews;
  };

/* =========================================
   GET ALL APPROVED REVIEWS
========================================= */

export const getReviews =
  async (
    hostname: string
  ): Promise<Review[]> => {
    const response =
      await axios.get<ReviewsResponse>(
        `${API_URL}/review`,
        {
          params: {
            hostname,
          },
        }
      );

    return response.data.reviews;
  };

/* =========================================
   SUBMIT WEBSITE REVIEW
========================================= */

export const submitWebsiteReview =
  async (
    data: SubmitWebsiteReviewPayload
  ): Promise<SubmitWebsiteReviewResponse> => {
    const response =
      await axios.post<SubmitWebsiteReviewResponse>(
        `${API_URL}/review`,
        data
      );

    const {
      reviewId,
      deleteToken,
    } = response.data;

    /*
     * Keep the private token only
     * in the review author's browser.
     */
    if (
      reviewId &&
      deleteToken
    ) {
      saveReviewDeleteToken(
        reviewId,
        deleteToken
      );
    }

    return response.data;
  };

/* =========================================
   CHECK IF THIS BROWSER OWNS REVIEW
========================================= */

export const canDeleteReview = (
  review: Review
): boolean => {
  if (
    review.source !==
    "website"
  ) {
    return false;
  }

  return Boolean(
    getReviewDeleteToken(
      review._id
    )
  );
};

/* =========================================
   DELETE OWN WEBSITE REVIEW
========================================= */

export const deleteOwnWebsiteReview =
  async (
    reviewId: string,
    hostname: string
  ): Promise<DeleteReviewResponse> => {
    const deleteToken =
      getReviewDeleteToken(
        reviewId
      );

    if (!deleteToken) {
      throw new Error(
        "You do not have permission to delete this review"
      );
    }

    const response =
      await axios.delete<DeleteReviewResponse>(
        `${API_URL}/review/${reviewId}`,
        {
          data: {
            hostname,
            deleteToken,
          },
        }
      );

    if (
      response.data.success
    ) {
      removeReviewDeleteToken(
        reviewId
      );
    }

    return response.data;
  };