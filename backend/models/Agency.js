import mongoose from "mongoose";

const travelTypeSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      subtitle: {
        type: String,
        default: "",
        trim: true,
      },
      icon: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
    {
      _id: false,
    }
  );

const featuredDestinationSchema =
  new mongoose.Schema(
    {
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
      image: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const agencySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },

      domain: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      tagline: {
        type: String,
        default:
          "Your Journey • Our Care",
        trim: true,
      },

      logo: {
        type: String,
        default: "",
        trim: true,
      },

      favicon: {
        type: String,
        default: "",
        trim: true,
      },

      heroImage: {
        type: String,
        default: "",
        trim: true,
      },

      servicesBackgroundImage: {
        type: String,
        default: "",
        trim: true,
      },

      travelTypes: {
        type: [travelTypeSchema],
        default: [],
      },

      featuredDestinations: {
        type: [
          featuredDestinationSchema,
        ],
        default: [],
      },

      enquiryOptions: {
        destinations: {
          type: [String],
          default: [],
        },

        tripTypes: {
          type: [String],
          default: [],
        },
      },

      primaryColor: {
        type: String,
        default: "#06364a",
      },

      secondaryColor: {
        type: String,
        default: "#ffffff",
      },

      accentColor: {
        type: String,
        default: "#ea580c",
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

const Agency = mongoose.model(
  "Agency",
  agencySchema
);

export default Agency;