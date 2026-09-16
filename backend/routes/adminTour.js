import express from "express";

import {
  createTourFromEnquiry,
  checkVehicleAvailability,
  cancelTour,
  completeTour,
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

/* =========================================
   CHECK VEHICLE AVAILABILITY
========================================= */

router.post(
  "/check-vehicle-availability",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  checkVehicleAvailability
);

/* =========================================
   CREATE TOUR FROM ENQUIRY
========================================= */

router.post(
  "/from-enquiry/:enquiryId",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  createTourFromEnquiry
);

/* =========================================
   COMPLETE TOUR
========================================= */

router.patch(
  "/:tourId/complete",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  completeTour
);

/* =========================================
   CANCEL TOUR
========================================= */

router.patch(
  "/:tourId/cancel",
  requireAdmin,
  requireAllowedAdminOrigin,
  requireAdminCsrf,
  cancelTour
);

export default router;