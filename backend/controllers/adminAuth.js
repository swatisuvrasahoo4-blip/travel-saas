import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import Agency from "../models/Agency.js";

import {
  createAdminCsrfToken,
} from "../middleware/adminCsrf.js";

/* =========================================
   COOKIE CONFIG
========================================= */

const getCookieOptions = () => {
  const isProduction =
    process.env.NODE_ENV ===
    "production";

  return {
    httpOnly: true,

    secure: isProduction,

    /*
     * Production frontend/backend
     * may be on different domains.
     */
    sameSite: isProduction
      ? "none"
      : "lax",

    /*
     * Keep admin logged in
     * for 3 days.
     */
    maxAge:
      3 *
      24 *
      60 *
      60 *
      1000,
  };
};

/* =========================================
   ADMIN LOGIN
========================================= */

export const adminLogin = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
      hostname,
    } = req.body;

    if (
      !email ||
      !password ||
      !hostname
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Email, password and hostname are required.",
        });
    }

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();

    /*
     * Password has select:false
     * in Admin model.
     */
    const admin =
      await Admin.findOne({
        email:
          normalizedEmail,
      }).select("+password");

    /*
     * Generic response prevents
     * revealing whether an
     * email exists.
     */
    if (!admin) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Invalid email or password.",
        });
    }

    if (
      admin.status !==
      "active"
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Admin account is inactive.",
        });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!passwordMatches) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Invalid email or password.",
        });
    }

    /*
     * Find agency belonging
     * to this admin.
     */
    const agency =
      await Agency.findOne({
        _id:
          admin.agencyId,

        status:
          "active",
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
     * Normalize hostname
     * before checking tenant.
     */
    const normalizedHostname =
      hostname
        .trim()
        .toLowerCase();

    /*
     * Tenant protection:
     * admin can only log in
     * from their own agency domain.
     */
    const hostnameMatches =
      agency.domains.includes(
        normalizedHostname
      );

    if (!hostnameMatches) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "You are not authorized for this agency.",
        });
    }

    /*
     * JWT secret must exist.
     */
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

    /*
     * JWT contains only
     * necessary authentication data.
     */
    const token =
      jwt.sign(
        {
          adminId:
            admin._id.toString(),

          agencyId:
            admin.agencyId.toString(),

          role:
            admin.role,
        },

        process.env
          .ADMIN_JWT_SECRET,

        {
          expiresIn:
            "3d",
        }
      );

    /*
     * Update successful
     * login timestamp.
     */
    admin.lastLoginAt =
      new Date();

    await admin.save();

    /*
     * Store JWT securely.
     *
     * Frontend JavaScript
     * cannot access this cookie.
     */
    res.cookie(
      "admin_token",
      token,
      getCookieOptions()
    );

    /*
     * Create CSRF protection token.
     *
     * A copy is stored in the
     * CSRF cookie and the same
     * token is returned to the
     * authenticated frontend.
     */
    const csrfToken =
      createAdminCsrfToken(
        res
      );

    return res
      .status(200)
      .json({
        success: true,

        message:
          "Login successful.",

        csrfToken,

        admin: {
          id:
            admin._id,

          name:
            admin.name,

          email:
            admin.email,

          role:
            admin.role,
        },

        agency: {
          id:
            agency._id,

          name:
            agency.name,

          slug:
            agency.slug,
        },
      });
  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,

        message:
          "Unable to login.",
      });
  }
};

/* =========================================
   ADMIN LOGOUT
========================================= */

export const adminLogout = (
  req,
  res
) => {
  const isProduction =
    process.env.NODE_ENV ===
    "production";

  /*
   * Remove authentication
   * cookie.
   */
  res.clearCookie(
    "admin_token",
    {
      httpOnly: true,

      secure:
        isProduction,

      sameSite:
        isProduction
          ? "none"
          : "lax",
    }
  );

  /*
   * Remove CSRF cookie.
   */
  res.clearCookie(
    "admin_csrf",
    {
      httpOnly: false,

      secure:
        isProduction,

      sameSite:
        isProduction
          ? "none"
          : "lax",
    }
  );

  return res
    .status(200)
    .json({
      success: true,

      message:
        "Logout successful.",
    });
};

/* =========================================
   CURRENT ADMIN
========================================= */

export const getCurrentAdmin = async (
  req,
  res
) => {
  const csrfToken =
    req.cookies?.admin_csrf || "";

  return res
    .status(200)
    .json({
      success: true,

      csrfToken,

      admin: {
        id:
          req.admin.id,

        name:
          req.admin.name,

        email:
          req.admin.email,

        role:
          req.admin.role,
      },

      agency: {
        id:
          req.agency._id,

        name:
          req.agency.name,

        slug:
          req.agency.slug,
      },
    });
};