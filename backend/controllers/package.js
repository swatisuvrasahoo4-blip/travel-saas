import Agency from "../models/Agency.js";
import Package from "../models/Package.js";

/* =========================================
   NORMALIZE HOSTNAME
========================================= */

const normalizeHostname = (
  hostname = ""
) => {
  return hostname
    .toString()
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];
};

/* =========================================
   GET ALL PACKAGES
========================================= */

export const getPackagesByDomain =
  async (req, res) => {
    try {
      const hostname =
        normalizeHostname(
          req.query.hostname
        );

      if (!hostname) {
        return res.status(400).json({
          success: false,
          message:
            "Hostname is required",
        });
      }

      const agency =
        await Agency.findOne({
          domains: hostname,
          status: "active",
        });

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      const packages =
        await Package.find({
          agencyId: agency._id,
          status: "active",
        }).sort({
          featured: -1,
          featuredOrder: 1,
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        packages,
      });
    } catch (error) {
      console.error(
        "Get packages error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load packages",
      });
    }
  };

/* =========================================
   GET FEATURED PACKAGES
========================================= */

export const getFeaturedPackagesByDomain =
  async (req, res) => {
    try {
      const hostname =
        normalizeHostname(
          req.query.hostname
        );

      if (!hostname) {
        return res.status(400).json({
          success: false,
          message:
            "Hostname is required",
        });
      }

      const agency =
        await Agency.findOne({
          domains: hostname,
          status: "active",
        });

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      const packages =
        await Package.find({
          agencyId: agency._id,
          status: "active",
          featured: true,
        })
          .sort({
            featuredOrder: 1,
            createdAt: -1,
          })
          .limit(4);

      return res.status(200).json({
        success: true,
        packages,
      });
    } catch (error) {
      console.error(
        "Get featured packages error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load featured packages",
      });
    }
  };

/* =========================================
   GET PACKAGE BY SLUG
========================================= */

export const getPackageBySlug =
  async (req, res) => {
    try {
      const hostname =
        normalizeHostname(
          req.query.hostname
        );

      const slug =
        req.params.slug
          ?.trim()
          .toLowerCase();

      if (!hostname) {
        return res.status(400).json({
          success: false,
          message:
            "Hostname is required",
        });
      }

      if (!slug) {
        return res.status(400).json({
          success: false,
          message:
            "Package slug is required",
        });
      }

      const agency =
        await Agency.findOne({
          domains: hostname,
          status: "active",
        });

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      const packageData =
        await Package.findOne({
          agencyId: agency._id,
          slug,
          status: "active",
        });

      if (!packageData) {
        return res.status(404).json({
          success: false,
          message:
            "Package not found",
        });
      }

      return res.status(200).json({
        success: true,
        package: packageData,
      });
    } catch (error) {
      console.error(
        "Get package error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load package",
      });
    }
  };