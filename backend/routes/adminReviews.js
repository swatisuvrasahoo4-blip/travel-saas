import express from "express";

import {
  deleteAdminReview,
  getAdminReviewById,
  getAdminReviews,
  updateAdminReviewFeatured,
  updateAdminReviewStatus,
} from "../controllers/adminReview.js";

import {
  requireAdmin,
} from "../middleware/adminAuth.js";

import {
  requireAllowedAdminOrigin,
} from "../middleware/adminOriginGuard.js";

import {
  requireAdminCsrf,
} from "../middleware/adminCsrf.js";

const router =
  express.Router();

/* =========================================
   GET ALL REVIEWS
========================================= */

router.get(
  "/",
  requireAdmin,
  getAdminReviews
);

/* =========================================
   GET SINGLE REVIEW
========================================= */

router.get(
  "/:reviewId",
  requireAdmin,
  getAdminReviewById
);

/* =========================================
   UPDATE REVIEW STATUS
========================================= */

router.patch(
  "/:reviewId/status",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  updateAdminReviewStatus
);

/* =========================================
   UPDATE FEATURED STATUS
========================================= */

router.patch(
  "/:reviewId/featured",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  updateAdminReviewFeatured
);

/* =========================================
   DELETE REVIEW
========================================= */

router.delete(
  "/:reviewId",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  deleteAdminReview
);

export default router;