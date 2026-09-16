import mongoose from "mongoose";

import Tour from "../models/Tour.js";

/* =========================================
   CONSTANTS
========================================= */

const HISTORY_STATUSES = [
  "completed",
  "closed",
  "cancelled",
];

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

/* =========================================
   HELPERS
========================================= */

const escapeRegExp = (
  value = ""
) => {
  return String(value).replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
};

const parsePositiveInteger = (
  value,
  fallback
) => {
  const parsed = Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < 1
  ) {
    return fallback;
  }

  return parsed;
};

const parseDate = (
  value,
  endOfDay = false
) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  if (endOfDay) {
    date.setHours(
      23,
      59,
      59,
      999
    );
  } else {
    date.setHours(
      0,
      0,
      0,
      0
    );
  }

  return date;
};

/* =========================================
   GET TOUR HISTORY
========================================= */

export const getTourHistory =
  async (
    req,
    res
  ) => {
    try {
      /*
       * SECURITY:
       *
       * agencyId comes ONLY from the
       * authenticated admin account.
       *
       * Never accept agencyId from:
       * req.body
       * req.query
       * req.params
       */
      const agencyId =
        req.admin.agencyId;

      const page =
        parsePositiveInteger(
          req.query.page,
          1
        );

      const requestedLimit =
        parsePositiveInteger(
          req.query.limit,
          DEFAULT_LIMIT
        );

      const limit = Math.min(
        requestedLimit,
        MAX_LIMIT
      );

      const skip =
        (page - 1) * limit;

      const search =
        typeof req.query.search ===
        "string"
          ? req.query.search
              .trim()
              .slice(0, 100)
          : "";

      const status =
        typeof req.query.status ===
        "string"
          ? req.query.status
              .trim()
              .toLowerCase()
          : "";

      const fromDateRaw =
        typeof req.query.fromDate ===
        "string"
          ? req.query.fromDate.trim()
          : "";

      const toDateRaw =
        typeof req.query.toDate ===
        "string"
          ? req.query.toDate.trim()
          : "";

      /* =====================================
         STATUS VALIDATION
      ===================================== */

      if (
        status &&
        !HISTORY_STATUSES.includes(
          status
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid tour history status.",
          });
      }

      /* =====================================
         DATE VALIDATION
      ===================================== */

      const fromDate =
        fromDateRaw
          ? parseDate(
              fromDateRaw,
              false
            )
          : null;

      const toDate =
        toDateRaw
          ? parseDate(
              toDateRaw,
              true
            )
          : null;

      if (
        fromDateRaw &&
        !fromDate
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid from date.",
          });
      }

      if (
        toDateRaw &&
        !toDate
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid to date.",
          });
      }

      if (
        fromDate &&
        toDate &&
        fromDate > toDate
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "From date cannot be after to date.",
          });
      }

      /* =====================================
         TENANT-SCOPED FILTER
      ===================================== */

      const filter = {
        agencyId,

        status: status
          ? status
          : {
              $in:
                HISTORY_STATUSES,
            },
      };

      /* =====================================
         SEARCH
      ===================================== */

      if (search) {
        const safeSearch =
          escapeRegExp(search);

        const searchRegex =
          new RegExp(
            safeSearch,
            "i"
          );

        filter.$or = [
          {
            customerName:
              searchRegex,
          },
          {
            customerPhone:
              searchRegex,
          },
          {
            destination:
              searchRegex,
          },
          {
            vehicleName:
              searchRegex,
          },
          {
            vehicleNumber:
              searchRegex,
          },
          {
            driverName:
              searchRegex,
          },
          {
            driverPhone:
              searchRegex,
          },
        ];
      }

      /* =====================================
         DATE FILTER

         Tour history is filtered using
         endDateTime because it represents
         when the trip was scheduled to end.
      ===================================== */

      if (
        fromDate ||
        toDate
      ) {
        filter.endDateTime = {};

        if (fromDate) {
          filter.endDateTime.$gte =
            fromDate;
        }

        if (toDate) {
          filter.endDateTime.$lte =
            toDate;
        }
      }

      /* =====================================
         QUERY
      ===================================== */

      const [
        tours,
        totalTours,
        completedCount,
        closedCount,
        cancelledCount,
      ] = await Promise.all([
        Tour.find(filter)
          .select(
            [
              "_id",
              "customerName",
              "customerPhone",
              "destination",
              "pickupAddress",
              "dropLocation",
              "travellers",
              "startDateTime",
              "endDateTime",
              "agreedPrice",
              "advanceAmount",
              "advancePaid",
              "vehicleName",
              "vehicleNumber",
              "driverName",
              "driverPhone",
              "status",
              "completedAt",
              "closedAt",
              "cancelledAt",
              "cancellationReason",
              "createdAt",
              "updatedAt",
            ].join(" ")
          )
          .sort({
            endDateTime: -1,
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Tour.countDocuments(
          filter
        ),

        Tour.countDocuments({
          agencyId,
          status: "completed",
        }),

        Tour.countDocuments({
          agencyId,
          status: "closed",
        }),

        Tour.countDocuments({
          agencyId,
          status: "cancelled",
        }),
      ]);

      const totalPages =
        Math.ceil(
          totalTours / limit
        );

      return res
        .status(200)
        .json({
          success: true,

          tours,

          summary: {
            completed:
              completedCount,

            closed:
              closedCount,

            cancelled:
              cancelledCount,

            total:
              completedCount +
              closedCount +
              cancelledCount,
          },

          pagination: {
            page,
            limit,
            totalTours,
            totalPages,

            hasNextPage:
              page < totalPages,

            hasPreviousPage:
              page > 1,
          },
        });
    } catch (error) {
      console.error(
        "Get admin tour history error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to load tour history.",
        });
    }
  };

/* =========================================
   GET TOUR HISTORY DETAILS
========================================= */

export const getTourHistoryById =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        tourId,
      } = req.params;

      /* =====================================
         VALIDATE ID
      ===================================== */

      if (
        !mongoose.isValidObjectId(
          tourId
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid tour ID.",
          });
      }

      /* =====================================
         SECURE TENANT QUERY

         The tour ID AND authenticated
         agencyId must match.
      ===================================== */

      const tour =
        await Tour.findOne({
          _id: tourId,

          agencyId,

          status: {
            $in:
              HISTORY_STATUSES,
          },
        })
          .select(
            [
              "_id",
              "enquiryId",
              "customerName",
              "customerPhone",
              "destination",
              "pickupAddress",
              "dropLocation",
              "travellers",
              "startDateTime",
              "endDateTime",
              "agreedPrice",
              "advanceAmount",
              "advancePaid",
              "advancePaidAt",
              "vehicleName",
              "vehicleNumber",
              "driverName",
              "driverPhone",
              "status",
              "notes",
              "completedAt",
              "closedAt",
              "cancelledAt",
              "cancellationReason",
              "createdAt",
              "updatedAt",
            ].join(" ")
          )
          .lean();

      /*
       * Same response when:
       *
       * 1. Tour does not exist
       * 2. Tour belongs to another agency
       * 3. Tour is not yet a history record
       *
       * This prevents information leakage
       * between agencies.
       */
      if (!tour) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Tour history record not found.",
          });
      }

      /* =====================================
         CALCULATE REMAINING PAYMENT
      ===================================== */

      const remainingAmount =
        Math.max(
          Number(
            tour.agreedPrice ||
              0
          ) -
            Number(
              tour.advanceAmount ||
                0
            ),
          0
        );

      return res
        .status(200)
        .json({
          success: true,

          tour: {
            ...tour,

            remainingAmount,
          },
        });
    } catch (error) {
      console.error(
        "Get admin tour history details error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to load tour history details.",
        });
    }
  };