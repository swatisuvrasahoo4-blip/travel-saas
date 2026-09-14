import express from "express";

import {
  createAdminGalleryItem,
  deleteAdminGalleryItem,
  getAdminGallery,
  getAdminGalleryItemById,
  updateAdminGalleryItem,
} from "../controllers/adminGallery.js";

import {
  uploadAdminGalleryImages,
} from "../controllers/adminGalleryUpload.js";

import {
  requireAdmin,
} from "../middleware/adminAuth.js";

import {
  requireAllowedAdminOrigin,
} from "../middleware/adminOriginGuard.js";

import {
  requireAdminCsrf,
} from "../middleware/adminCsrf.js";

import galleryUpload from "../middleware/galleryUpload.js";

const router =
  express.Router();

/* =========================================
   GET ALL GALLERY ITEMS
========================================= */

router.get(
  "/",
  requireAdmin,
  getAdminGallery
);

/* =========================================
   UPLOAD IMAGES
========================================= */

router.post(
  "/upload",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  galleryUpload.array(
    "images",
    10
  ),
  uploadAdminGalleryImages
);

/* =========================================
   GET SINGLE GALLERY ITEM
========================================= */

router.get(
  "/:galleryItemId",
  requireAdmin,
  getAdminGalleryItemById
);

/* =========================================
   CREATE GALLERY ITEM
========================================= */

router.post(
  "/",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  createAdminGalleryItem
);

/* =========================================
   UPDATE GALLERY ITEM
========================================= */

router.patch(
  "/:galleryItemId",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  updateAdminGalleryItem
);

/* =========================================
   DELETE GALLERY ITEM
========================================= */

router.delete(
  "/:galleryItemId",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  deleteAdminGalleryItem
);

export default router;