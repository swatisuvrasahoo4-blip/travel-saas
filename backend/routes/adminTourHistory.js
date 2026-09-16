import express from "express";

import {
  getTourHistory,
  getTourHistoryById,
} from "../controllers/adminTourHistory.js";

import {
  requireAdmin,
} from "../middleware/adminAuth.js";

import {
  requireAllowedAdminOrigin,
} from "../middleware/adminOriginGuard.js";

const router = express.Router();

/* =========================================
   PROTECT ALL TOUR HISTORY ROUTES
========================================= */

router.use(requireAdmin);

router.use(
  requireAllowedAdminOrigin
);

/* =========================================
   GET TOUR HISTORY LIST
========================================= */

router.get(
  "/",
  getTourHistory
);

/* =========================================
   GET SINGLE TOUR HISTORY RECORD
========================================= */

router.get(
  "/:tourId",
  getTourHistoryById
);

export default router;