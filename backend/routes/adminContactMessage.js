import express from "express";

import {
  getContactMessages,
  getContactMessageById,
  markContactMessageAsRead,
  deleteContactMessage,
} from "../controllers/adminContactMessage.js";

import {
  requireAdmin,
} from "../middleware/adminAuth.js";

import {
  requireAllowedAdminOrigin,
} from "../middleware/adminOriginGuard.js";

import {
  requireAdminCsrf,
} from "../middleware/adminCsrf.js";

const router = express.Router();

router.use(requireAdmin);
router.use(
  requireAllowedAdminOrigin
);

router.get(
  "/",
  getContactMessages
);

router.get(
  "/:id",
  getContactMessageById
);

router.patch(
  "/:id/read",
  requireAdminCsrf,
  markContactMessageAsRead
);

router.delete(
  "/:id",
  requireAdminCsrf,
  deleteContactMessage
);

export default router;