import Agency from "../models/Agency.js";
import Destination from "../models/Destination.js";

export const getDestinationsByDomain =
  async (req, res) => {
    try {
      const { hostname } = req.query;

      if (!hostname) {
        return res.status(400).json({
          success: false,
          message:
            "Hostname is required",
        });
      }

      const normalizedHostname =
        hostname
          .toString()
          .toLowerCase()
          .trim()
          .replace(/^www\./, "")
          .split(":")[0];

      const agency =
        await Agency.findOne({
          domain: normalizedHostname,
          status: "active",
        }).select("_id");

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      const destinations =
        await Destination.find({
          agencyId: agency._id,
          status: "active",
        }).sort({
          createdAt: 1,
        });

      return res.status(200).json({
        success: true,
        destinations,
      });
    } catch (error) {
      console.error(
        "Get destinations error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to get destinations",
      });
    }
  };

export const getDestinationBySlug =
  async (req, res) => {
    try {
      const { hostname } = req.query;
      const { slug } = req.params;

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
            "Destination slug is required",
        });
      }

      const normalizedHostname =
        hostname
          .toString()
          .toLowerCase()
          .trim()
          .replace(/^www\./, "")
          .split(":")[0];

      const normalizedSlug =
        slug
          .toString()
          .toLowerCase()
          .trim();

      const agency =
        await Agency.findOne({
          domain: normalizedHostname,
          status: "active",
        }).select("_id");

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      const destination =
        await Destination.findOne({
          agencyId: agency._id,
          slug: normalizedSlug,
          status: "active",
        });

      if (!destination) {
        return res.status(404).json({
          success: false,
          message:
            "Destination not found",
        });
      }

      return res.status(200).json({
        success: true,
        destination,
      });
    } catch (error) {
      console.error(
        "Get destination error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to get destination",
      });
    }
  };