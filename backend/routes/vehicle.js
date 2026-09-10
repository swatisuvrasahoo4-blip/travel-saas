import express from "express";

import {
  getVehiclesByDomain,
} from "../controllers/vehicle.js";

const router = express.Router();

router.get(
  "/domain/:domain",
  getVehiclesByDomain
);

export default router;