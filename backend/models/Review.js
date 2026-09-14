import mongoose from "mongoose";

const reviewSchema =
  new mongoose.Schema(
    {
      agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
        index: true,
      },

      customerName: {
        type: String,
        required: true,
        trim: true,
      },

      customerImage: {
        type: String,
        default: "",
        trim: true,
      },

      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },

      review: {
        type: String,
        required: true,
        trim: true,
      },

      source: {
        type: String,
        enum: [
          "website",
          "google",
        ],
        default: "website",
      },

      /* =========================================
         WEBSITE REVIEW AUTHOR DELETE TOKEN
      ========================================= */

      deleteTokenHash: {
        type: String,
        default: "",
        select: false,
      },

      /* =========================================
         GOOGLE REVIEW DATA
      ========================================= */

      googleReviewId: {
        type: String,
        default: "",
        trim: true,
      },

      googleReviewUrl: {
        type: String,
        default: "",
        trim: true,
      },

      /* =========================================
         REVIEW MODERATION
      ========================================= */

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "rejected",
        ],
        default: "pending",
      },

      featured: {
        type: Boolean,
        default: false,
      },

      featuredOrder: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

/* =========================================
   INDEXES
========================================= */

reviewSchema.index({
  agencyId: 1,
  status: 1,
});

reviewSchema.index({
  agencyId: 1,
  source: 1,
});

reviewSchema.index(
  {
    agencyId: 1,
    googleReviewId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      googleReviewId: {
        $type: "string",
        $gt: "",
      },
    },
  }
);

const Review =
  mongoose.model(
    "Review",
    reviewSchema
  );

export default Review;