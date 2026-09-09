import Agency from "../models/Agency.js";
import Review from "../models/Review.js";

const normalizeHostname = (
  hostname = ""
) => {
  return hostname
    .trim()
    .toLowerCase()
    .replace(/^www\./, "");
};

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
          domain: hostname,
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
          domain: hostname,
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
          domain:
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

      const newReview =
        await Review.create({
          agencyId: agency._id,
          customerName:
            customerName.trim(),
          rating: numericRating,
          review: review.trim(),
          source: "website",
          status: "pending",
          featured: false,
        });

      return res.status(201).json({
        success: true,
        message:
          "Review submitted successfully and is awaiting approval",
        reviewId: newReview._id,
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