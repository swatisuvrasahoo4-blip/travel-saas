import express from "express";

import {
  createContactMessage,
} from "../controllers/contactMessage.js";

const router = express.Router();

router.post(
  "/",
  createContactMessage
);

export default router;