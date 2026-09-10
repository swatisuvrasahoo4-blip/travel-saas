import mongoose from "mongoose";

const contactMessageSchema =
  new mongoose.Schema(
    {
      agencyId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "Agency",
        required: true,
      },

      name: {
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

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      subject: {
        type: String,
        default: "",
        trim: true,
      },

      message: {
        type: String,
        default: "",
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "new",
          "read",
        ],
        default: "new",
      },
    },
    {
      timestamps: true,
    }
  );

const ContactMessage =
  mongoose.model(
    "ContactMessage",
    contactMessageSchema
  );

export default ContactMessage;