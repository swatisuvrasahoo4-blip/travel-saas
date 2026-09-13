import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import Agency from "../models/Agency.js";

export const requireAdmin = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies?.admin_token;

    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Authentication required.",
        });
    }

    if (
      !process.env
        .ADMIN_JWT_SECRET
    ) {
      console.error(
        "ADMIN_JWT_SECRET is missing."
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Authentication configuration error.",
        });
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env
          .ADMIN_JWT_SECRET
      );
    } catch {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Invalid or expired session.",
        });
    }

    const admin =
      await Admin.findOne({
        _id: decoded.adminId,
        status: "active",
      });

    if (!admin) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Admin account is unavailable.",
        });
    }

    const agency =
      await Agency.findOne({
        _id: admin.agencyId,
        status: "active",
      });

    if (!agency) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Agency is unavailable.",
        });
    }

    /*
     * IMPORTANT:
     * We derive agencyId from the
     * authenticated admin account.
     *
     * We do NOT trust agencyId sent
     * by the frontend.
     */
    req.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      agencyId: admin.agencyId,
    };

    req.agency = agency;

    next();
  } catch (error) {
    console.error(
      "Admin auth middleware error:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to authenticate request.",
      });
  }
};