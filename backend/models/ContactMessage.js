import mongoose from "mongoose";

const contactMessageSchema =
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
        default: "",
        trim: true,
        maxlength: 100,
      },

      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
        maxlength: 150,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
      },

      subject: {
        type: String,
        default: "",
        trim: true,
        maxlength: 200,
      },

      message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3000,
      },

      status: {
        type: String,
        enum: ["new", "read"],
        default: "new",
        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

/*
 * Optimizes admin queries such as:
 *
 * - messages for one agency
 * - unread/new messages
 * - newest messages first
 */
contactMessageSchema.index({
  agencyId: 1,
  status: 1,
  createdAt: -1,
});

/*
 * Useful for the normal message listing:
 *
 * ContactMessage.find({
 *   agencyId: req.admin.agencyId
 * }).sort({
 *   createdAt: -1
 * });
 */
contactMessageSchema.index({
  agencyId: 1,
  createdAt: -1,
});

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model(
    "ContactMessage",
    contactMessageSchema
  );

export default ContactMessage;