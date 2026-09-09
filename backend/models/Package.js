import mongoose from "mongoose";

const itineraryDaySchema =
  new mongoose.Schema(
    {
      day: {
        type: Number,
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      activities: {
        type: [String],
        default: [],
      },

      image: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const packageDestinationSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
        default: "",
        trim: true,
      },

      subtitle: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const packageSchema =
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

      duration: {
        type: String,
        required: true,
        trim: true,
      },

      destinations: {
        type: [packageDestinationSchema],
        default: [],
      },

      tourTypes: {
        type: [String],
        default: [],
      },

      vehicleOptions: {
        type: [String],
        default: [],
      },

      highlights: {
        type: [String],
        default: [],
      },

      suitableFor: {
        type: [String],
        default: [],
      },

      itinerary: {
        type: [itineraryDaySchema],
        default: [],
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

packageSchema.index(
  {
    agencyId: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

const Package =
  mongoose.model(
    "Package",
    packageSchema
  );

export default Package;