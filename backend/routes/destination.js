import express from "express";

import {
  getDestinationBySlug,
  getDestinationsByDomain,
} from "../controllers/destination.js";

const router = express.Router();

router.get(
  "/",
  getDestinationsByDomain
);

router.get(
  "/:slug",
  getDestinationBySlug
);

export default router;