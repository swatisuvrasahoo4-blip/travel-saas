import express from "express";
import {
  createAgency,
  getAgencyByDomain,
} from "../controllers/agency.js";

const router = express.Router();

router.post("/", createAgency);

router.get("/domain", getAgencyByDomain);

export default router;