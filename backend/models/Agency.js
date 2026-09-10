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

/* =========================================
   ABOUT HERO
========================================= */

const aboutHeroSchema =
  new mongoose.Schema(
    {
      label: {
        type: String,
        default: "",
        trim: true,
      },

      title: {
        type: String,
        default: "",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
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

/* =========================================
   ABOUT STORY
========================================= */

const aboutStorySchema =
  new mongoose.Schema(
    {
      label: {
        type: String,
        default: "",
        trim: true,
      },

      title: {
        type: String,
        default: "",
        trim: true,
      },

      paragraphs: {
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

/* =========================================
   ABOUT REASON
========================================= */

const aboutReasonSchema =
  new mongoose.Schema(
    {
      icon: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },

      title: {
        type: String,
        default: "",
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

/* =========================================
   ABOUT STAT
========================================= */

const aboutStatSchema =
  new mongoose.Schema(
    {
      value: {
        type: String,
        default: "",
        trim: true,
      },

      label: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

/* =========================================
   MISSION / VISION
========================================= */

const aboutMissionVisionSchema =
  new mongoose.Schema(
    {
      heading: {
        type: String,
        default: "",
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

/* =========================================
   ABOUT CTA
========================================= */

const aboutCtaSchema =
  new mongoose.Schema(
    {
      label: {
        type: String,
        default: "",
        trim: true,
      },

      title: {
        type: String,
        default: "",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      buttonText: {
        type: String,
        default: "",
        trim: true,
      },

      buttonLink: {
        type: String,
        default: "",
        trim: true,
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

/* =========================================
   ABOUT PAGE
========================================= */

const aboutSchema =
  new mongoose.Schema(
    {
      hero: {
        type: aboutHeroSchema,
        default: () => ({}),
      },

      story: {
        type: aboutStorySchema,
        default: () => ({}),
      },

      reasonsLabel: {
        type: String,
        default: "",
        trim: true,
      },

      reasonsHeading: {
        type: String,
        default: "",
        trim: true,
      },

      reasonsDescription: {
        type: String,
        default: "",
        trim: true,
      },

      reasons: {
        type: [aboutReasonSchema],
        default: [],
      },

      statsBackgroundImage: {
        type: String,
        default: "",
        trim: true,
      },

      stats: {
        type: [aboutStatSchema],
        default: [],
      },

      missionVisionLabel: {
        type: String,
        default: "",
        trim: true,
      },

      missionVisionTitle: {
        type: String,
        default: "",
        trim: true,
      },

      missionVisionDescription: {
        type: String,
        default: "",
        trim: true,
      },

      mission: {
        type: aboutMissionVisionSchema,
        default: () => ({}),
      },

      vision: {
        type: aboutMissionVisionSchema,
        default: () => ({}),
      },

      cta: {
        type: aboutCtaSchema,
        default: () => ({}),
      },
    },
    {
      _id: false,
    }
  );

/* =========================================
   AGENCY
========================================= */

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

      about: {
        type: aboutSchema,
        default: () => ({}),
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