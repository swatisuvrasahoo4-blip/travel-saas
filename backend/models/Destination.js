import mongoose from "mongoose";

const attractionSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const destinationSchema =
  new mongoose.Schema(
    {
      agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
        index: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      subtitle: {
        type: String,
        default: "",
        trim: true,
      },

      heroImage: {
        type: String,
        default: "",
        trim: true,
      },

      cardImage: {
        type: String,
        default: "",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      attractions: {
        type: [attractionSchema],
        default: [],
      },

      bestTimeToVisit: {
        type: String,
        default: "",
        trim: true,
      },

      idealDuration: {
        type: String,
        default: "",
        trim: true,
      },

      location: {
        type: String,
        default: "",
        trim: true,
      },

      type: {
        type: String,
        default: "",
        trim: true,
      },

      ctaImage: {
        type: String,
        default: "",
        trim: true,
      },

      gallery: {
        type: [String],
        default: [],
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

destinationSchema.index(
  {
    agencyId: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

const Destination =
  mongoose.model(
    "Destination",
    destinationSchema
  );

export default Destination;