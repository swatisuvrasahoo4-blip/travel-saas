import Review from "../models/Review.js";

/* =========================================
   FORMAT REVIEW FOR ADMIN
========================================= */

const formatAdminReview = (
  review
) => {
  return {
    id:
      review._id.toString(),

    customerName:
      review.customerName,

    customerImage:
      review.customerImage ||
      "",

    rating:
      review.rating,

    review:
      review.review,

    source:
      review.source,

    googleReviewId:
      review.googleReviewId ||
      "",

    googleReviewUrl:
      review.googleReviewUrl ||
      "",

    status:
      review.status,

    featured:
      review.featured,

    featuredOrder:
      review.featuredOrder,

    createdAt:
      review.createdAt,

    updatedAt:
      review.updatedAt,
  };
};

/* =========================================
   GET ALL REVIEWS FOR LOGGED-IN AGENCY
========================================= */

export const getAdminReviews =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const reviews =
        await Review.find({
          agencyId,
        }).sort({
          createdAt: -1,
        });

      return res
        .status(200)
        .json({
          success: true,

          reviews:
            reviews.map(
              formatAdminReview
            ),
        });
    } catch (error) {
      console.error(
        "Admin reviews error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to load reviews.",
        });
    }
  };

/* =========================================
   GET SINGLE REVIEW
========================================= */

export const getAdminReviewById =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        reviewId,
      } = req.params;

      const review =
        await Review.findOne({
          _id: reviewId,
          agencyId,
        });

      if (!review) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Review not found.",
          });
      }

      return res
        .status(200)
        .json({
          success: true,

          review:
            formatAdminReview(
              review
            ),
        });
    } catch (error) {
      console.error(
        "Admin review detail error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to load review.",
        });
    }
  };

/* =========================================
   UPDATE REVIEW STATUS
========================================= */

export const updateAdminReviewStatus =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        reviewId,
      } = req.params;

      const {
        status,
      } = req.body;

      const allowedStatuses = [
        "pending",
        "approved",
        "rejected",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid review status.",
          });
      }

      const review =
        await Review.findOne({
          _id: reviewId,
          agencyId,
        });

      if (!review) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Review not found.",
          });
      }

      review.status =
        status;

      /*
       * If a review is no longer
       * approved, remove it from
       * featured reviews too.
       */
      if (
        status !==
        "approved"
      ) {
        review.featured =
          false;

        review.featuredOrder =
          0;
      }

      await review.save();

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Review status updated successfully.",

          review:
            formatAdminReview(
              review
            ),
        });
    } catch (error) {
      console.error(
        "Update review status error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to update review status.",
        });
    }
  };

/* =========================================
   UPDATE FEATURED REVIEW
========================================= */

export const updateAdminReviewFeatured =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        reviewId,
      } = req.params;

      const {
        featured,
        featuredOrder,
      } = req.body;

      if (
        typeof featured !==
        "boolean"
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Featured must be true or false.",
          });
      }

      const review =
        await Review.findOne({
          _id: reviewId,
          agencyId,
        });

      if (!review) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Review not found.",
          });
      }

      if (
        featured &&
        review.status !==
          "approved"
      ) {
        return res
          .status(409)
          .json({
            success: false,

            message:
              "Only approved reviews can be featured.",
          });
      }

      review.featured =
        featured;

      if (featured) {
        const numericOrder =
          Number(
            featuredOrder
          );

        review.featuredOrder =
          Number.isFinite(
            numericOrder
          ) &&
          numericOrder >= 0
            ? numericOrder
            : 0;
      } else {
        review.featuredOrder =
          0;
      }

      await review.save();

      return res
        .status(200)
        .json({
          success: true,

          message:
            featured
              ? "Review added to featured reviews."
              : "Review removed from featured reviews.",

          review:
            formatAdminReview(
              review
            ),
        });
    } catch (error) {
      console.error(
        "Update featured review error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to update featured review.",
        });
    }
  };

/* =========================================
   DELETE REVIEW
========================================= */

export const deleteAdminReview =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        reviewId,
      } = req.params;

      const review =
        await Review.findOne({
          _id: reviewId,
          agencyId,
        });

      if (!review) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Review not found.",
          });
      }

      await Review.deleteOne({
        _id: review._id,
        agencyId,
      });

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Review deleted successfully.",
        });
    } catch (error) {
      console.error(
        "Delete admin review error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to delete review.",
        });
    }
  };