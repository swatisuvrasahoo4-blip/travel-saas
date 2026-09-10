import mongoose from "mongoose";

/* =========================================
   TRAVEL TYPE
========================================= */

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

/* =========================================
   FEATURED DESTINATION
========================================= */

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
   WHY CHOOSE US BENEFIT
========================================= */

const whyChooseBenefitSchema =
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
   WHY CHOOSE US
========================================= */

const whyChooseUsSchema =
  new mongoose.Schema(
    {
      label: {
        type: String,
        default: "",
        trim: true,
      },

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

      backgroundImage: {
        type: String,
        default: "",
        trim: true,
      },

      benefits: {
        type: [whyChooseBenefitSchema],
        default: [],
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
   PACKAGES PAGE CTA
========================================= */

const packagesPageCtaSchema =
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
   PACKAGES PAGE
========================================= */

const packagesPageSchema =
  new mongoose.Schema(
    {
      heroImage: {
        type: String,
        default: "",
        trim: true,
      },

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

      cta: {
        type: packagesPageCtaSchema,
        default: () => ({}),
      },
    },
    {
      _id: false,
    }
  );

/* =========================================
   PACKAGE DETAIL CTA
========================================= */

const packageDetailCtaSchema =
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
   PACKAGE DETAIL PAGE
========================================= */

const packageDetailSchema =
  new mongoose.Schema(
    {
      label: {
        type: String,
        default: "",
        trim: true,
      },

      vehicleOptionsImage: {
        type: String,
        default: "",
        trim: true,
      },

      quote: {
        type: String,
        default: "",
        trim: true,
      },

      cta: {
        type: packageDetailCtaSchema,
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

      domains: {
        type: [String],
        default: [],
        set: (domains) =>
          domains.map((domain) =>
            domain
              .trim()
              .toLowerCase()
          ),
      },

      /* =====================================
         CONTACT
      ===================================== */

      phones: {
        type: [String],
        default: [],
        set: (phones) =>
          phones
            .map((phone) =>
              phone.trim()
            )
            .filter(Boolean),
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

      /* =====================================
         WHY CHOOSE US
      ===================================== */

      whyChooseUs: {
        type: whyChooseUsSchema,
        default: () => ({}),
      },

      /* =====================================
         ABOUT
      ===================================== */

      about: {
        type: aboutSchema,
        default: () => ({}),
      },

      /* =====================================
         PACKAGES PAGE
      ===================================== */

      packagesPage: {
        type: packagesPageSchema,
        default: () => ({}),
      },

      /* =====================================
         PACKAGE DETAIL PAGE
      ===================================== */

      packageDetail: {
        type: packageDetailSchema,
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

const Agency =
  mongoose.model(
    "Agency",
    agencySchema
  );

export default Agency;