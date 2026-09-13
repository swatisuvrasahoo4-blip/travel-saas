import express from "express";
import rateLimit from "express-rate-limit";

import {
  adminLogin,
  adminLogout,
  getCurrentAdmin,
} from "../controllers/adminAuth.js";

import {
  requireAdmin,
} from "../middleware/adminAuth.js";

const router = express.Router();

/* =========================================
   LOGIN RATE LIMIT
========================================= */

const adminLoginLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    limit: 10,

    standardHeaders:
      "draft-8",

    legacyHeaders: false,

    message: {
      success: false,
      message:
        "Too many login attempts. Please try again later.",
    },
  });

/* =========================================
   ADMIN LOGIN
========================================= */

router.post(
  "/login",
  adminLoginLimiter,
  adminLogin
);

/* =========================================
   CURRENT ADMIN
========================================= */

router.get(
  "/me",
  requireAdmin,
  getCurrentAdmin
);

/* =========================================
   ADMIN LOGOUT
========================================= */

router.post(
  "/logout",
  requireAdmin,
  adminLogout
);

export default router;