import ContactMessage from "../models/ContactMessage.js";
import Agency from "../models/Agency.js";

export const createContactMessage = async (
  req,
  res
) => {
  try {
    const {
      hostname,
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (!hostname) {
      return res.status(400).json({
        success: false,
        message: "Hostname is required.",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    const agency =
      await Agency.findOne({
        domains: hostname
          .trim()
          .toLowerCase(),
        status: "active",
      });

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency not found.",
      });
    }

    const contactMessage =
      await ContactMessage.create({
        agencyId: agency._id,
        name: name?.trim() || "",
        email:
          email?.trim().toLowerCase() ||
          "",
        phone: phone.trim(),
        subject:
          subject?.trim() || "",
        message:
          message?.trim() || "",
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