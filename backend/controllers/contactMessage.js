import ContactMessage from "../models/ContactMessage.js";
import Agency from "../models/Agency.js";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 150;
const MAX_PHONE_LENGTH = 30;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 3000;

const normalizeHostname = (value = "") => {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0]
    .replace(/^www\./, "");
};

const cleanText = (value = "", maxLength) => {
  return String(value)
    .trim()
    .slice(0, maxLength);
};

const isValidEmail = (email) => {
  if (!email) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

const isValidPhone = (phone) => {
  return /^[0-9+\-\s()]{7,30}$/.test(
    phone
  );
};

export const createContactMessage =
  async (req, res) => {
    try {
      const {
        hostname,
        name,
        email,
        phone,
        subject,
        message,
      } = req.body ?? {};

      /*
       * We accept hostname only as tenant context.
       * It is NEVER used as authorization.
       */
      const normalizedHostname =
        normalizeHostname(hostname);

      if (!normalizedHostname) {
        return res.status(400).json({
          success: false,
          message:
            "Website information is required.",
        });
      }

      const cleanedName = cleanText(
        name,
        MAX_NAME_LENGTH
      );

      const cleanedEmail = cleanText(
        email,
        MAX_EMAIL_LENGTH
      ).toLowerCase();

      const cleanedPhone = cleanText(
        phone,
        MAX_PHONE_LENGTH
      );

      const cleanedSubject = cleanText(
        subject,
        MAX_SUBJECT_LENGTH
      );

      const cleanedMessage = cleanText(
        message,
        MAX_MESSAGE_LENGTH
      );

      if (!cleanedPhone) {
        return res.status(400).json({
          success: false,
          message:
            "Phone number is required.",
        });
      }

      if (!isValidPhone(cleanedPhone)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid phone number.",
        });
      }

      if (
        cleanedEmail &&
        !isValidEmail(cleanedEmail)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address.",
        });
      }

      if (!cleanedMessage) {
        return res.status(400).json({
          success: false,
          message:
            "Message is required.",
        });
      }

      /*
       * Resolve agency dynamically.
       *
       * Never accept agencyId directly
       * from the public frontend.
       */
      const agency = await Agency.findOne({
        domains: normalizedHostname,
        status: "active",
      })
        .select("_id")
        .lean();

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found.",
        });
      }

      const contactMessage =
        await ContactMessage.create({
          agencyId: agency._id,

          name: cleanedName,

          email: cleanedEmail,

          phone: cleanedPhone,

          subject: cleanedSubject,

          message: cleanedMessage,
        });

      return res.status(201).json({
        success: true,
        message:
          "Your message has been sent successfully.",

        contactMessage: {
          _id: contactMessage._id,
        },
      });
    } catch (error) {
      console.error(
        "Create contact message error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to send your message.",
      });
    }
  };