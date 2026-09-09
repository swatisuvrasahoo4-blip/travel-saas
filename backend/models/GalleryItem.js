import mongoose from "mongoose";

const galleryItemSchema =
  new mongoose.Schema(
    {
      agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
        index: true,
      },

      imageUrl: {
        type: String,
        required: true,
        trim: true,
      },

      caption: {
        type: String,
        default: "",
        trim: true,
      },

      category: {
        type: String,
        enum: [
          "customer-trip",
          "tour-moment",
          "vehicle",
          "group-tour",
          "special-moment",
        ],
        default: "tour-moment",
      },

      featured: {
        type: Boolean,
        default: false,
      },

      featuredOrder: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

galleryItemSchema.index({
  agencyId: 1,
  status: 1,
  featured: 1,
});

const GalleryItem =
  mongoose.model(
    "GalleryItem",
    galleryItemSchema
  );

export default GalleryItem;