import express from "express";

import {
  getAdminTourCalendar,
} from "../controllers/adminTourCalendar.js";

import {
  requireAdmin,
} from "../middleware/adminAuth.js";

const router =
  express.Router();

router.get(
  "/",
  requireAdmin,
  getAdminTourCalendar
);

export default router;