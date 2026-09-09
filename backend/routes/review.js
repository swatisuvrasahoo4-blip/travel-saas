import express from "express";

import {
  getFeaturedReviewsByDomain,
  getReviewsByDomain,
  submitWebsiteReview,
} from "../controllers/review.js";

const router = express.Router();

router.get(
  "/featured",
  getFeaturedReviewsByDomain
);

router.get(
  "/",
  getReviewsByDomain
);

router.post(
  "/",
  submitWebsiteReview
);

export default router;