import Agency from "../models/Agency.js";
import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (
  req,
  res
) => {
  try {
    const {
      hostname,
      source = "general",
      packageId = null,
      packageName = "",
      name,
      phone,
      email = "",
      destination = "",
      travelDate = "",
      travellers = "",
      tripType = "",
      message = "",
    } = req.body;

    /* =========================
       BASIC VALIDATION
    ========================= */

    if (
      !hostname ||
      !name ||
      !phone
    ) {
      return res.status(400).json({
        message:
          "Hostname, name and phone are required.",
      });
    }

    /* =========================
       FIND AGENCY
    ========================= */

    const agency =
      await Agency.findOne({
        domains: hostname,
        status: "active",
      });

    if (!agency) {
      return res.status(404).json({
        message:
          "Agency not found.",
      });
    }

    /* =========================
       PACKAGE VALIDATION
    ========================= */

    if (
      source === "package" &&
      !packageId
    ) {
      return res.status(400).json({
        message:
          "Package is required for package enquiry.",
      });
    }

    /* =========================
       CREATE ENQUIRY
    ========================= */

    const enquiry =
      await Enquiry.create({
        agencyId: agency._id,
        source,
        packageId:
          source === "package"
            ? packageId
            : null,
        packageName:
          source === "package"
            ? packageName
            : "",
        name,
        phone,
        email,
        destination:
          source === "package"
            ? ""
            : destination,
        travelDate,
        travellers,
        tripType,
        message,
      });

    return res.status(201).json({
      message:
        "Enquiry submitted successfully.",
      enquiry,
    });
  } catch (error) {
    /* =========================
       DUPLICATE PACKAGE ENQUIRY
    ========================= */

    if (
      error?.code === 11000
    ) {
      return res.status(409).json({
        message:
          "You have already submitted an enquiry for this package.",
      });
    }

    console.error(
      "Create enquiry error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to submit enquiry.",
    });
  }
};