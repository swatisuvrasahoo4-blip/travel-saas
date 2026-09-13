import express from "express";

import {
  createTourFromEnquiry,
  checkVehicleAvailability,
  cancelTour,
} from "../controllers/adminTour.js";

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

router.post(
  "/check-vehicle-availability",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  checkVehicleAvailability
);

router.post(
  "/from-enquiry/:enquiryId",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  createTourFromEnquiry
);

router.patch(
  "/:tourId/cancel",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  cancelTour
);

export default router;