import Enquiry from "../models/Enquiry.js";

/* =========================================
   CHECK IF ENQUIRY SHOULD EXPIRE
========================================= */

const getEnquiryStartDate = (
  enquiry
) => {
  if (
    enquiry.source === "trip" ||
    enquiry.source === "package"
  ) {
    return enquiry.fromDate || "";
  }

  return enquiry.travelDate || "";
};

const isPastDate = (
  dateString
) => {
  if (!dateString) {
    return false;
  }

  const enquiryDate =
    new Date(
      `${dateString}T23:59:59`
    );

  if (
    Number.isNaN(
      enquiryDate.getTime()
    )
  ) {
    return false;
  }

  return (
    enquiryDate < new Date()
  );
};

const expireEnquiryIfNeeded =
  async (enquiry) => {
    if (
      enquiry.status === "closed" ||
      enquiry.status === "expired"
    ) {
      return enquiry;
    }

    const startDate =
      getEnquiryStartDate(
        enquiry
      );

    if (
      !isPastDate(
        startDate
      )
    ) {
      return enquiry;
    }

    enquiry.status =
      "expired";

    await enquiry.save();

    return enquiry;
  };

/* =========================================
   PACKAGE HELPERS
========================================= */

const getPackageId = (
  packageData
) => {
  if (!packageData) {
    return null;
  }

  if (
    packageData._id
  ) {
    return packageData._id.toString();
  }

  return packageData.toString();
};

const getPackageDestination = (
  packageData
) => {
  if (
    !packageData ||
    !Array.isArray(
      packageData.destinations
    )
  ) {
    return "";
  }

  return packageData.destinations
    .map(
      (destination) =>
        destination.name?.trim()
    )
    .filter(Boolean)
    .join(", ");
};

const getPackageName = (
  enquiry
) => {
  if (
    enquiry.packageName
  ) {
    return enquiry.packageName;
  }

  if (
    enquiry.packageId &&
    enquiry.packageId.name
  ) {
    return enquiry.packageId.name;
  }

  return "";
};

/* =========================================
   FORMAT ENQUIRY FOR ADMIN
========================================= */

const formatAdminEnquiry = (
  enquiry
) => {
  let destination =
    enquiry.destination || "";

  /*
    Old package enquiries were saved
    without a destination.

    If destination is missing, use the
    destinations from the linked package.
  */

  if (
    enquiry.source === "package" &&
    !destination.trim()
  ) {
    destination =
      getPackageDestination(
        enquiry.packageId
      );
  }

  return {
    id:
      enquiry._id.toString(),

    source:
      enquiry.source,

    packageId:
      getPackageId(
        enquiry.packageId
      ),

    packageName:
      getPackageName(
        enquiry
      ),

    name:
      enquiry.name,

    phone:
      enquiry.phone,

    email:
      enquiry.email || "",

    destination,

    travelDate:
      enquiry.travelDate || "",

    fromDate:
      enquiry.fromDate || "",

    toDate:
      enquiry.toDate || "",

    travellers:
      enquiry.travellers || "",

    vehicleType:
      enquiry.vehicleType || "",

    tripType:
      enquiry.tripType || "",

    message:
      enquiry.message || "",

    status:
      enquiry.status,

    createdAt:
      enquiry.createdAt,

    updatedAt:
      enquiry.updatedAt,
  };
};

/* =========================================
   GET ALL ENQUIRIES FOR LOGGED-IN AGENCY
========================================= */

export const getAdminEnquiries =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const enquiries =
        await Enquiry.find({
          agencyId,
        })
          .populate({
            path: "packageId",
            select:
              "name destinations",
          })
          .sort({
            createdAt: -1,
          });

      const processedEnquiries =
        [];

      for (
        const enquiry of enquiries
      ) {
        const processed =
          await expireEnquiryIfNeeded(
            enquiry
          );

        processedEnquiries.push(
          formatAdminEnquiry(
            processed
          )
        );
      }

      return res
        .status(200)
        .json({
          success: true,

          enquiries:
            processedEnquiries,
        });
    } catch (error) {
      console.error(
        "Admin enquiries error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to load enquiries.",
        });
    }
  };

/* =========================================
   GET SINGLE ENQUIRY
========================================= */

export const getAdminEnquiryById =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        enquiryId,
      } = req.params;

      let enquiry =
        await Enquiry.findOne({
          _id: enquiryId,
          agencyId,
        }).populate({
          path: "packageId",
          select:
            "name destinations",
        });

      if (!enquiry) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Enquiry not found.",
          });
      }

      enquiry =
        await expireEnquiryIfNeeded(
          enquiry
        );

      return res
        .status(200)
        .json({
          success: true,

          enquiry:
            formatAdminEnquiry(
              enquiry
            ),
        });
    } catch (error) {
      console.error(
        "Admin enquiry detail error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to load enquiry.",
        });
    }
  };

/* =========================================
   UPDATE ENQUIRY STATUS
========================================= */

export const updateAdminEnquiryStatus =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        enquiryId,
      } = req.params;

      const {
        status,
      } = req.body;

      const allowedStatuses = [
        "new",
        "contacted",
        "closed",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid enquiry status.",
          });
      }

      let enquiry =
        await Enquiry.findOne({
          _id: enquiryId,
          agencyId,
        });

      if (!enquiry) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Enquiry not found.",
          });
      }

      enquiry =
        await expireEnquiryIfNeeded(
          enquiry
        );

      if (
        enquiry.status ===
        "expired"
      ) {
        return res
          .status(409)
          .json({
            success: false,

            message:
              "Expired enquiries cannot be updated.",
          });
      }

      const validTransitions = {
        new: [
          "contacted",
          "closed",
        ],

        contacted: [
          "closed",
        ],

        expired: [],

        closed: [],
      };

      const nextStatuses =
        validTransitions[
          enquiry.status
        ] || [];

      if (
        !nextStatuses.includes(
          status
        )
      ) {
        return res
          .status(409)
          .json({
            success: false,

            message:
              `Cannot change enquiry status from "${enquiry.status}" to "${status}".`,
          });
      }

      enquiry.status =
        status;

      await enquiry.save();

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Enquiry status updated successfully.",

          enquiry: {
            id:
              enquiry._id.toString(),

            status:
              enquiry.status,

            updatedAt:
              enquiry.updatedAt,
          },
        });
    } catch (error) {
      console.error(
        "Update enquiry status error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to update enquiry status.",
        });
    }
  };