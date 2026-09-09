import express from "express";

import {
  getFeaturedGalleryByDomain,
  getGalleryByDomain,
} from "../controllers/gallery.js";

const router = express.Router();

router.get(
  "/featured",
  getFeaturedGalleryByDomain
);

router.get(
  "/",
  getGalleryByDomain
);

export default router;