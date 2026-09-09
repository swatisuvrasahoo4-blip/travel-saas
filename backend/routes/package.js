import express from "express";

import {
  getFeaturedPackagesByDomain,
  getPackageBySlug,
  getPackagesByDomain,
} from "../controllers/package.js";

const router = express.Router();

router.get(
  "/featured",
  getFeaturedPackagesByDomain
);

router.get(
  "/:slug",
  getPackageBySlug
);

router.get(
  "/",
  getPackagesByDomain
);

export default router;