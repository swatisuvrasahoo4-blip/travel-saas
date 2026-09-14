import crypto from "crypto";

import Agency from "../models/Agency.js";
import Review from "../models/Review.js";

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
   HASH DELETE TOKEN
========================================= */

const hashDeleteToken = (
  token
) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

/* =========================================
   GET ALL REVIEWS
========================================= */

export const getReviewsByDomain =
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

      const reviews =
        await Review.find({
          agencyId: agency._id,
          status: "approved",
        }).sort({
          featured: -1,
          featuredOrder: 1,
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      console.error(
        "Get reviews error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load reviews",
      });
    }
  };

/* =========================================
   GET FEATURED REVIEWS
========================================= */

export const getFeaturedReviewsByDomain =
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

      const reviews =
        await Review.find({
          agencyId: agency._id,
          status: "approved",
          featured: true,
        })
          .sort({
            featuredOrder: 1,
            createdAt: -1,
          })
          .limit(6);

      return res.status(200).json({
        success: true,
        reviews,
      });
    } catch (error) {
      console.error(
        "Get featured reviews error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load featured reviews",
      });
    }
  };

/* =========================================
   SUBMIT WEBSITE REVIEW
========================================= */

export const submitWebsiteReview =
  async (req, res) => {
    try {
      const {
        hostname,
        customerName,
        rating,
        review,
      } = req.body;

      const normalizedHostname =
        normalizeHostname(hostname);

      if (
        !normalizedHostname ||
        !customerName?.trim() ||
        !rating ||
        !review?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      const numericRating =
        Number(rating);

      if (
        !Number.isInteger(
          numericRating
        ) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Rating must be between 1 and 5",
        });
      }

      const agency =
        await Agency.findOne({
          domains:
            normalizedHostname,
          status: "active",
        });

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      /* =====================================
         CREATE PRIVATE DELETE TOKEN
      ===================================== */

      const deleteToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      const deleteTokenHash =
        hashDeleteToken(
          deleteToken
        );

      const newReview =
        await Review.create({
          agencyId:
            agency._id,

          customerName:
            customerName.trim(),

          rating:
            numericRating,

          review:
            review.trim(),

          source:
            "website",

          status:
            "pending",

          featured:
            false,

          deleteTokenHash,
        });

      return res.status(201).json({
        success: true,

        message:
          "Review submitted successfully and is awaiting approval",

        reviewId:
          newReview._id,

        /*
         * This is returned only once.
         * The frontend will keep it so
         * this reviewer can delete
         * their own review later.
         */
        deleteToken,
      });
    } catch (error) {
      console.error(
        "Submit review error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to submit review",
      });
    }
  };

/* =========================================
   DELETE OWN WEBSITE REVIEW
========================================= */

export const deleteOwnWebsiteReview =
  async (req, res) => {
    try {
      const {
        reviewId,
      } = req.params;

      const {
        hostname,
        deleteToken,
      } = req.body;

      const normalizedHostname =
        normalizeHostname(hostname);

      if (
        !reviewId ||
        !normalizedHostname ||
        !deleteToken?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Review information is required",
        });
      }

      const agency =
        await Agency.findOne({
          domains:
            normalizedHostname,
          status: "active",
        });

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      /*
       * deleteTokenHash has
       * select: false in the model,
       * so explicitly request it.
       */
      const review =
        await Review.findOne({
          _id: reviewId,
          agencyId:
            agency._id,
        }).select(
          "+deleteTokenHash"
        );

      if (!review) {
        return res.status(404).json({
          success: false,
          message:
            "Review not found",
        });
      }

      /*
       * Google reviews cannot be
       * deleted through the website.
       */
      if (
        review.source !==
        "website"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Google reviews cannot be deleted from the website",
        });
      }

      if (
        !review.deleteTokenHash
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to delete this review",
        });
      }

      const providedHash =
        hashDeleteToken(
          deleteToken.trim()
        );

      const storedBuffer =
        Buffer.from(
          review.deleteTokenHash,
          "hex"
        );

      const providedBuffer =
        Buffer.from(
          providedHash,
          "hex"
        );

      const tokenMatches =
        storedBuffer.length ===
          providedBuffer.length &&
        crypto.timingSafeEqual(
          storedBuffer,
          providedBuffer
        );

      if (!tokenMatches) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to delete this review",
        });
      }

      await Review.deleteOne({
        _id: review._id,
        agencyId:
          agency._id,
      });

      return res.status(200).json({
        success: true,
        message:
          "Review deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete own review error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete review",
      });
    }
  };