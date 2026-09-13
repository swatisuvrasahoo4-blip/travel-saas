import express from "express";

import {
  getAdminEnquiries,
  getAdminEnquiryById,
  updateAdminEnquiryStatus,
} from "../controllers/adminEnquiry.js";

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
   GET ALL ENQUIRIES
========================================= */

router.get(
  "/",
  requireAdmin,
  getAdminEnquiries
);

/* =========================================
   GET SINGLE ENQUIRY
========================================= */

router.get(
  "/:enquiryId",
  requireAdmin,
  getAdminEnquiryById
);

/* =========================================
   UPDATE ENQUIRY STATUS
========================================= */

router.patch(
  "/:enquiryId/status",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  updateAdminEnquiryStatus
);

export default router;