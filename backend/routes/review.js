import express from "express";

import {
  deleteOwnWebsiteReview,
  getFeaturedReviewsByDomain,
  getReviewsByDomain,
  submitWebsiteReview,
} from "../controllers/review.js";

const router = express.Router();

/* =========================================
   GET FEATURED REVIEWS
========================================= */

router.get(
  "/featured",
  getFeaturedReviewsByDomain
);

/* =========================================
   GET ALL APPROVED REVIEWS
========================================= */

router.get(
  "/",
  getReviewsByDomain
);

/* =========================================
   SUBMIT WEBSITE REVIEW
========================================= */

router.post(
  "/",
  submitWebsiteReview
);

/* =========================================
   DELETE OWN WEBSITE REVIEW
========================================= */

router.delete(
  "/:reviewId",
  deleteOwnWebsiteReview
);

export default router;