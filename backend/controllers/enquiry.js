import Agency from "../models/Agency.js";

import Enquiry from "../models/Enquiry.js";

import Package from "../models/Package.js";

/* =========================================
   CREATE PUBLIC ENQUIRY
========================================= */

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
      fromDate = "",
      toDate = "",
      travellers = "",
      vehicleType = "",
      tripType = "",
      message = "",
    } = req.body;

    /* =====================================
       BASIC VALIDATION
    ===================================== */

    if (
      !hostname ||
      !name?.trim() ||
      !phone?.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Name and phone number are required.",
        });
    }

    /* =====================================
       FIND AGENCY FROM HOSTNAME
    ===================================== */

    const agency =
      await Agency.findOne({
        domains: hostname,
        status: "active",
      });

    if (!agency) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Travel agency not found.",
        });
    }

    /* =====================================
       PACKAGE VALIDATION
    ===================================== */

    let selectedPackage = null;

    if (
      source === "package"
    ) {
      if (!packageId) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Package information is required.",
          });
      }

      selectedPackage =
        await Package.findOne({
          _id: packageId,
          agencyId:
            agency._id,
          status: "active",
        }).lean();

      if (!selectedPackage) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Selected package not found.",
          });
      }
    }

    /* =====================================
       FINAL PACKAGE DATA
    ===================================== */

    let finalDestination =
      destination.trim();

    let finalPackageName = "";

    if (
      source === "package" &&
      selectedPackage
    ) {
      finalPackageName =
        selectedPackage.name?.trim() ||
        packageName.trim();

      finalDestination =
        selectedPackage.destinations
          ?.map(
            (item) =>
              item.name?.trim()
          )
          .filter(Boolean)
          .join(", ") || "";
    }

    /* =====================================
       CREATE ENQUIRY
    ===================================== */

    const enquiry =
      await Enquiry.create({
        agencyId:
          agency._id,

        source,

        packageId:
          source === "package"
            ? selectedPackage?._id ||
              packageId
            : null,

        packageName:
          source === "package"
            ? finalPackageName
            : "",

        name:
          name.trim(),

        phone:
          phone.trim(),

        email:
          email.trim(),

        destination:
          finalDestination,

        travelDate,

        fromDate,

        toDate,

        travellers,

        vehicleType,

        tripType,

        message,
      });

    /* =====================================
       RESPONSE
    ===================================== */

    return res
      .status(201)
      .json({
        success: true,

        message:
          "Enquiry submitted successfully.",

        enquiry: {
          id:
            enquiry._id,

          source:
            enquiry.source,

          packageName:
            enquiry.packageName,

          destination:
            enquiry.destination,

          travelDate:
            enquiry.travelDate,

          fromDate:
            enquiry.fromDate,

          toDate:
            enquiry.toDate,

          travellers:
            enquiry.travellers,

          vehicleType:
            enquiry.vehicleType,

          status:
            enquiry.status,

          createdAt:
            enquiry.createdAt,
        },
      });
  } catch (error) {
    console.error(
      "Create enquiry error:",
      error
    );

    /* =====================================
       DUPLICATE PACKAGE ENQUIRY
    ===================================== */

    if (
      error?.code === 11000
    ) {
      return res
        .status(409)
        .json({
          success: false,
          message:
            "You have already submitted an enquiry for this package.",
        });
    }

    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to submit enquiry. Please try again.",
      });
  }
};