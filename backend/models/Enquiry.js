import mongoose from "mongoose";

const enquirySchema =
  new mongoose.Schema(
    {
      agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
      },

      source: {
        type: String,
        enum: [
          "general",
          "trip",
          "destination",
          "package",
        ],
        default: "general",
      },

      packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        default: null,
      },

      packageName: {
        type: String,
        trim: true,
        default: "",
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        trim: true,
        default: "",
      },

      destination: {
        type: String,
        trim: true,
        default: "",
      },

      travelDate: {
        type: String,
        trim: true,
        default: "",
      },

      travellers: {
        type: String,
        trim: true,
        default: "",
      },

      tripType: {
        type: String,
        trim: true,
        default: "",
      },

      message: {
        type: String,
        trim: true,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "new",
          "contacted",
          "closed",
        ],
        default: "new",
      },
    },
    {
      timestamps: true,
    }
  );

/* =========================================
   ONE ENQUIRY PER PERSON PER PACKAGE
========================================= */

enquirySchema.index(
  {
    agencyId: 1,
    packageId: 1,
    phone: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      source: "package",

      packageId: {
        $type: "objectId",
      },
    },
  }
);

/* =========================================
   MODEL
========================================= */

const Enquiry =
  mongoose.models.Enquiry ||
  mongoose.model(
    "Enquiry",
    enquirySchema
  );

export default Enquiry;