import axios from "axios";

export interface Review {
  _id: string;
  agencyId: string;

  customerName: string;
  customerImage: string;

  rating: number;
  review: string;

  source: "website" | "google";

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

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

const getBackendUrl = () => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  return BACKEND_URL;
};

/* =========================================
   GET FEATURED REVIEWS
========================================= */

export const getFeaturedReviews = async (
  hostname: string
): Promise<Review[]> => {
  const backendUrl =
    getBackendUrl();

  const response =
    await axios.get<ReviewsResponse>(
      `${backendUrl}/review/featured`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.reviews;
};

/* =========================================
   GET ALL REVIEWS
========================================= */

export const getReviews = async (
  hostname: string
): Promise<Review[]> => {
  const backendUrl =
    getBackendUrl();

  const response =
    await axios.get<ReviewsResponse>(
      `${backendUrl}/review`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.reviews;
};