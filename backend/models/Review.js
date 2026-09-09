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

reviewSchema.index({
  agencyId: 1,
  status: 1,
});

const Review =
  mongoose.model(
    "Review",
    reviewSchema
  );

export default Review;