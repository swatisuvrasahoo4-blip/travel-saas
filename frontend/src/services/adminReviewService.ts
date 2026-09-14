import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export type AdminReviewSource =
  | "website"
  | "google";

export type AdminReviewStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface AdminReview {
  id: string;

  customerName: string;
  customerImage: string;

  rating: number;
  review: string;

  source: AdminReviewSource;

  googleReviewId: string;
  googleReviewUrl: string;

  status: AdminReviewStatus;

  featured: boolean;
  featuredOrder: number;

  createdAt: string;
  updatedAt: string;
}

export interface AdminReviewsResponse {
  success: boolean;
  reviews: AdminReview[];
}

export interface AdminReviewResponse {
  success: boolean;
  review: AdminReview;
}

export interface UpdateAdminReviewResponse {
  success: boolean;
  message: string;
  review: AdminReview;
}

export interface DeleteAdminReviewResponse {
  success: boolean;
  message: string;
}

/* =========================================
   GET ALL REVIEWS
========================================= */

export const getAdminReviews =
  async (): Promise<AdminReviewsResponse> => {
    const response =
      await axios.get<AdminReviewsResponse>(
        `${API_URL}/admin-reviews`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

/* =========================================
   GET SINGLE REVIEW
========================================= */

export const getAdminReviewById =
  async (
    reviewId: string
  ): Promise<AdminReviewResponse> => {
    const response =
      await axios.get<AdminReviewResponse>(
        `${API_URL}/admin-reviews/${reviewId}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

/* =========================================
   UPDATE REVIEW STATUS
========================================= */

export const updateAdminReviewStatus =
  async (
    reviewId: string,
    status: AdminReviewStatus,
    csrfToken: string
  ): Promise<UpdateAdminReviewResponse> => {
    const response =
      await axios.patch<UpdateAdminReviewResponse>(
        `${API_URL}/admin-reviews/${reviewId}/status`,
        {
          status,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "application/json",

            "X-CSRF-Token":
              csrfToken,
          },
        }
      );

    return response.data;
  };

/* =========================================
   UPDATE FEATURED REVIEW
========================================= */

export const updateAdminReviewFeatured =
  async (
    reviewId: string,
    featured: boolean,
    featuredOrder: number,
    csrfToken: string
  ): Promise<UpdateAdminReviewResponse> => {
    const response =
      await axios.patch<UpdateAdminReviewResponse>(
        `${API_URL}/admin-reviews/${reviewId}/featured`,
        {
          featured,
          featuredOrder,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "application/json",

            "X-CSRF-Token":
              csrfToken,
          },
        }
      );

    return response.data;
  };

/* =========================================
   DELETE REVIEW
========================================= */

export const deleteAdminReview =
  async (
    reviewId: string,
    csrfToken: string
  ): Promise<DeleteAdminReviewResponse> => {
    const response =
      await axios.delete<DeleteAdminReviewResponse>(
        `${API_URL}/admin-reviews/${reviewId}`,
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token":
              csrfToken,
          },
        }
      );

    return response.data;
  };