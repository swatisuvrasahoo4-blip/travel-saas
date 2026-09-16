import mongoose from "mongoose";

import Enquiry from "../models/Enquiry.js";
import Tour from "../models/Tour.js";

/* =========================================
   HELPERS
========================================= */

const normalizeVehicleNumber = (
  value
) => {
  return String(value || "")
    .trim()
    .toUpperCase();
};

const parseBoolean = (
  value
) => {
  return (
    value === true ||
    value === "true"
  );
};

const parseNumber = (
  value
) => {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : null;
};

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

const isPastEnquiryDate = (
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

/* =========================================
   CREATE TOUR FROM ENQUIRY
========================================= */

export const createTourFromEnquiry =
  async (
    req,
    res
  ) => {
    const session =
      await mongoose.startSession();

    try {
      const agencyId =
        req.admin.agencyId;

      const {
        enquiryId,
      } = req.params;

      const {
        customerName,
        customerPhone,
        destination,
        pickupAddress,
        dropLocation,
        travellers,
        startDateTime,
        endDateTime,
        agreedPrice,
        advanceAmount = 0,
        advancePaid = false,
        advancePaidAt = null,
        vehicleName = "",
        vehicleNumber,
        driverName = "",
        driverPhone = "",
        notes = "",
      } = req.body;

      /* =====================================
         BASIC REQUIRED VALIDATION
      ===================================== */

      if (
        !customerName?.trim() ||
        !customerPhone?.trim() ||
        !destination?.trim() ||
        !pickupAddress?.trim() ||
        !dropLocation?.trim() ||
        !startDateTime ||
        !endDateTime ||
        !vehicleNumber?.trim()
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Please provide all required tour details.",
          });
      }

      /* =====================================
         DATE VALIDATION
      ===================================== */

      const start =
        new Date(
          startDateTime
        );

      const end =
        new Date(
          endDateTime
        );

      if (
        Number.isNaN(
          start.getTime()
        ) ||
        Number.isNaN(
          end.getTime()
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid tour date or time.",
          });
      }

      if (
        end <= start
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Tour end date and time must be after the start date and time.",
          });
      }

      /* =====================================
         NUMBER VALIDATION
      ===================================== */

      const parsedTravellers =
        parseNumber(
          travellers
        );

      const parsedPrice =
        parseNumber(
          agreedPrice
        );

      const parsedAdvance =
        parseNumber(
          advanceAmount
        );

      if (
        parsedTravellers === null ||
        !Number.isInteger(
          parsedTravellers
        ) ||
        parsedTravellers < 1
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Travellers must be at least 1.",
          });
      }

      if (
        parsedPrice === null ||
        parsedPrice < 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Agreed price is invalid.",
          });
      }

      if (
        parsedAdvance === null ||
        parsedAdvance < 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Advance amount is invalid.",
          });
      }

      if (
        parsedAdvance >
        parsedPrice
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Advance amount cannot be greater than the agreed price.",
          });
      }

      /* =====================================
         ADVANCE PAYMENT VALIDATION
      ===================================== */

      const isAdvancePaid =
        parseBoolean(
          advancePaid
        );

      let parsedAdvancePaidAt =
        null;

      if (
        isAdvancePaid
      ) {
        if (
          advancePaidAt
        ) {
          const paymentDate =
            new Date(
              advancePaidAt
            );

          if (
            Number.isNaN(
              paymentDate.getTime()
            )
          ) {
            return res
              .status(400)
              .json({
                success: false,
                message:
                  "Invalid advance payment date.",
              });
          }

          parsedAdvancePaidAt =
            paymentDate;
        } else {
          parsedAdvancePaidAt =
            new Date();
        }
      }

      /* =====================================
         NORMALIZE VEHICLE
      ===================================== */

      const normalizedVehicleNumber =
        normalizeVehicleNumber(
          vehicleNumber
        );

      if (
        !normalizedVehicleNumber
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Vehicle number is required.",
          });
      }

      let createdTour = null;

      let createdEnquiry = null;

      let enquiryExpired = false;

      /* =====================================
         TRANSACTION

         Either BOTH succeed:
         1. Tour is created
         2. Enquiry becomes closed

         Or BOTH are rolled back.
      ===================================== */

      await session.withTransaction(
        async () => {
          /* =================================
             FIND ENQUIRY INSIDE TRANSACTION
          ================================= */

          const enquiry =
            await Enquiry.findOne({
              _id: enquiryId,
              agencyId,
            }).session(
              session
            );

          if (!enquiry) {
            const error =
              new Error(
                "Enquiry not found."
              );

            error.statusCode =
              404;

            throw error;
          }

          /* =================================
             CHECK CURRENT EXPIRY
          ================================= */

          const enquiryStartDate =
            getEnquiryStartDate(
              enquiry
            );

          if (
            enquiry.status !==
              "closed" &&
            enquiry.status !==
              "expired" &&
            isPastEnquiryDate(
              enquiryStartDate
            )
          ) {
            enquiry.status =
              "expired";

            await enquiry.save({
              session,
            });

            enquiryExpired =
              true;

            return;
          }

          /* =================================
             ENQUIRY LIFECYCLE
          ================================= */

          if (
            enquiry.status !==
            "contacted"
          ) {
            let message =
              "Mark the enquiry as contacted before confirming the tour.";

            if (
              enquiry.status ===
              "closed"
            ) {
              message =
                "This enquiry is already closed.";
            }

            if (
              enquiry.status ===
              "expired"
            ) {
              message =
                "This enquiry has expired and cannot be confirmed.";
            }

            const error =
              new Error(
                message
              );

            error.statusCode =
              409;

            throw error;
          }

          /* =================================
             PREVENT MULTIPLE TOURS
             FROM SAME ENQUIRY
          ================================= */

          const existingTour =
            await Tour.findOne({
              agencyId,

              enquiryId:
                enquiry._id,

              status: {
                $ne:
                  "cancelled",
              },
            })
              .session(
                session
              )
              .lean();

          if (
            existingTour
          ) {
            const error =
              new Error(
                "A tour has already been created from this enquiry."
              );

            error.statusCode =
              409;

            throw error;
          }

          /* =================================
             VEHICLE BOOKING CONFLICT
          ================================= */

          const conflictingTour =
            await Tour.findOne({
              agencyId,

              vehicleNumber:
                normalizedVehicleNumber,

              status: {
                $in: [
                  "confirmed",
                  "active",
                ],
              },

              startDateTime: {
                $lt: end,
              },

              endDateTime: {
                $gt: start,
              },
            })
              .select(
                [
                  "_id",
                  "customerName",
                  "destination",
                  "vehicleNumber",
                  "startDateTime",
                  "endDateTime",
                  "status",
                ].join(" ")
              )
              .session(
                session
              )
              .lean();

          if (
            conflictingTour
          ) {
            const error =
              new Error(
                `Vehicle ${normalizedVehicleNumber} is already booked for another tour during this time.`
              );

            error.statusCode =
              409;

            error.conflict = {
              id:
                conflictingTour._id.toString(),

              customerName:
                conflictingTour.customerName,

              destination:
                conflictingTour.destination,

              vehicleNumber:
                conflictingTour.vehicleNumber,

              startDateTime:
                conflictingTour.startDateTime,

              endDateTime:
                conflictingTour.endDateTime,

              status:
                conflictingTour.status,
            };

            throw error;
          }

          /* =================================
             CREATE TOUR
          ================================= */

          const tours =
            await Tour.create(
              [
                {
                  agencyId,

                  enquiryId:
                    enquiry._id,

                  customerName:
                    customerName.trim(),

                  customerPhone:
                    customerPhone.trim(),

                  destination:
                    destination.trim(),

                  pickupAddress:
                    pickupAddress.trim(),

                  dropLocation:
                    dropLocation.trim(),

                  travellers:
                    parsedTravellers,

                  startDateTime:
                    start,

                  endDateTime:
                    end,

                  agreedPrice:
                    parsedPrice,

                  advanceAmount:
                    parsedAdvance,

                  advancePaid:
                    isAdvancePaid,

                  advancePaidAt:
                    parsedAdvancePaidAt,

                  vehicleName:
                    String(
                      vehicleName
                    ).trim(),

                  vehicleNumber:
                    normalizedVehicleNumber,

                  driverName:
                    String(
                      driverName
                    ).trim(),

                  driverPhone:
                    String(
                      driverPhone
                    ).trim(),

                  notes:
                    String(
                      notes
                    ).trim(),

                  status:
                    "confirmed",
                },
              ],
              {
                session,
              }
            );

          createdTour =
            tours[0];

          /* =================================
             CLOSE ENQUIRY
          ================================= */

          enquiry.status =
            "closed";

          await enquiry.save({
            session,
          });

          createdEnquiry =
            enquiry;
        }
      );

      /* =====================================
         EXPIRED ENQUIRY RESPONSE
      ===================================== */

      if (
        enquiryExpired
      ) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "This enquiry has expired and cannot be confirmed.",
          });
      }

      /* =====================================
         RESPONSE
      ===================================== */

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Tour confirmed successfully.",

          tour: {
            id:
              createdTour._id.toString(),

            enquiryId:
              createdEnquiry._id.toString(),

            customerName:
              createdTour.customerName,

            destination:
              createdTour.destination,

            pickupAddress:
              createdTour.pickupAddress,

            dropLocation:
              createdTour.dropLocation,

            travellers:
              createdTour.travellers,

            startDateTime:
              createdTour.startDateTime,

            endDateTime:
              createdTour.endDateTime,

            vehicleName:
              createdTour.vehicleName,

            vehicleNumber:
              createdTour.vehicleNumber,

            status:
              createdTour.status,
          },
        });
    } catch (error) {
      console.error(
        "Create admin tour error:",
        error
      );

      if (
        error?.code === 11000
      ) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "A tour has already been created from this enquiry.",
          });
      }

      if (
        error?.statusCode
      ) {
        return res
          .status(
            error.statusCode
          )
          .json({
            success: false,

            message:
              error.message,

            ...(error.conflict
              ? {
                  conflict:
                    error.conflict,
                }
              : {}),
          });
      }

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to confirm tour.",
        });
    } finally {
      await session.endSession();
    }
  };

/* =========================================
   CHECK VEHICLE AVAILABILITY
========================================= */

export const checkVehicleAvailability =
  async (
    req,
    res
  ) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        vehicleNumber,
        startDateTime,
        endDateTime,
      } = req.body;

      if (
        !vehicleNumber ||
        !startDateTime ||
        !endDateTime
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Vehicle number, start date/time and end date/time are required.",
          });
      }

      const normalizedVehicleNumber =
        normalizeVehicleNumber(
          vehicleNumber
        );

      if (
        !normalizedVehicleNumber
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Vehicle number is required.",
          });
      }

      const start =
        new Date(
          startDateTime
        );

      const end =
        new Date(
          endDateTime
        );

      if (
        Number.isNaN(
          start.getTime()
        ) ||
        Number.isNaN(
          end.getTime()
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Enter valid tour dates and times.",
          });
      }

      if (
        end <= start
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Tour end date/time must be after the start date/time.",
          });
      }

      const conflictTour =
        await Tour.findOne({
          agencyId,

          vehicleNumber:
            normalizedVehicleNumber,

          status: {
            $in: [
              "confirmed",
              "active",
            ],
          },

          startDateTime: {
            $lt: end,
          },

          endDateTime: {
            $gt: start,
          },
        })
          .select(
            [
              "customerName",
              "customerPhone",
              "destination",
              "startDateTime",
              "endDateTime",
              "vehicleName",
              "vehicleNumber",
              "driverName",
              "driverPhone",
              "status",
            ].join(" ")
          )
          .lean();

      if (
        conflictTour
      ) {
        return res
          .status(409)
          .json({
            success: false,
            available: false,

            message:
              `Vehicle ${normalizedVehicleNumber} is already booked for another tour during this time.`,

            conflict: {
              tourId:
                conflictTour._id.toString(),

              customerName:
                conflictTour.customerName,

              customerPhone:
                conflictTour.customerPhone,

              destination:
                conflictTour.destination,

              startDateTime:
                conflictTour.startDateTime,

              endDateTime:
                conflictTour.endDateTime,

              vehicleName:
                conflictTour.vehicleName,

              vehicleNumber:
                conflictTour.vehicleNumber,

              driverName:
                conflictTour.driverName,

              driverPhone:
                conflictTour.driverPhone,

              status:
                conflictTour.status,
            },
          });
      }

      return res
        .status(200)
        .json({
          success: true,
          available: true,

          message:
            `Vehicle ${normalizedVehicleNumber} is available for the selected date and time.`,

          vehicleNumber:
            normalizedVehicleNumber,

          startDateTime:
            start,

          endDateTime:
            end,
        });
    } catch (error) {
      console.error(
        "Check vehicle availability error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to check vehicle availability.",
        });
    }
  };

/* =========================================
   CANCEL TOUR
========================================= */

export const cancelTour =
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

      const {
        cancellationReason = "",
      } = req.body;

      /* =====================================
         VALIDATE TOUR ID
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
         FIND TOUR FOR THIS AGENCY
      ===================================== */

      const tour =
        await Tour.findOne({
          _id: tourId,
          agencyId,
        });

      if (!tour) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Tour not found.",
          });
      }

      /* =====================================
         ALREADY CANCELLED
      ===================================== */

      if (
        tour.status ===
        "cancelled"
      ) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "This tour has already been cancelled.",
          });
      }

      /* =====================================
         ONLY CONFIRMED TOUR CAN
         BE CANCELLED FOR NOW
      ===================================== */

      if (
        tour.status !==
        "confirmed"
      ) {
        let message =
          "Only a confirmed tour can be cancelled.";

        if (
          tour.status ===
          "active"
        ) {
          message =
            "An active tour cannot be cancelled from this action.";
        }

        if (
          tour.status ===
          "completed"
        ) {
          message =
            "A completed tour cannot be cancelled.";
        }

        if (
          tour.status ===
          "closed"
        ) {
          message =
            "A closed tour cannot be cancelled.";
        }

        return res
          .status(409)
          .json({
            success: false,
            message,
          });
      }

      /* =====================================
         CANCEL TOUR

         Once status becomes "cancelled",
         vehicle availability checks will
         no longer treat this tour as a
         vehicle booking conflict.
      ===================================== */

      const cancelledTour =
        await Tour.findOneAndUpdate(
          {
            _id: tourId,
            agencyId,
            status:
              "confirmed",
          },
          {
            $set: {
              status:
                "cancelled",

              cancelledAt:
                new Date(),

              cancellationReason:
                String(
                  cancellationReason
                ).trim(),
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

      /*
       * This protects against two cancellation
       * requests happening at the same time.
       */

      if (
        !cancelledTour
      ) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "The tour status changed before it could be cancelled. Please refresh and try again.",
          });
      }

      /* =====================================
         RESPONSE
      ===================================== */

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Tour cancelled successfully. The vehicle is now available for other bookings.",

          tour: {
            id:
              cancelledTour._id.toString(),

            customerName:
              cancelledTour.customerName,

            customerPhone:
              cancelledTour.customerPhone,

            destination:
              cancelledTour.destination,

            vehicleName:
              cancelledTour.vehicleName,

            vehicleNumber:
              cancelledTour.vehicleNumber,

            startDateTime:
              cancelledTour.startDateTime,

            endDateTime:
              cancelledTour.endDateTime,

            status:
              cancelledTour.status,

            cancelledAt:
              cancelledTour.cancelledAt,

            cancellationReason:
              cancelledTour.cancellationReason,
          },
        });
    } catch (error) {
      console.error(
        "Cancel admin tour error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to cancel tour.",
        });
    }
  };

/* =========================================
   COMPLETE TOUR
========================================= */

export const completeTour =
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
         VALIDATE TOUR ID
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
         FIND TOUR FOR THIS AGENCY
      ===================================== */

      const tour =
        await Tour.findOne({
          _id: tourId,
          agencyId,
        })
          .select(
            [
              "_id",
              "status",
            ].join(" ")
          )
          .lean();

      if (!tour) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Tour not found.",
          });
      }

      /* =====================================
         ALREADY COMPLETED
      ===================================== */

      if (
        tour.status ===
        "completed"
      ) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "This tour has already been completed.",
          });
      }

      /* =====================================
         ONLY CONFIRMED TOUR CAN
         BE COMPLETED
      ===================================== */

      if (
        tour.status !==
        "confirmed"
      ) {
        let message =
          "Only a confirmed tour can be marked as completed.";

        if (
          tour.status ===
          "cancelled"
        ) {
          message =
            "A cancelled tour cannot be marked as completed.";
        }

        if (
          tour.status ===
          "closed"
        ) {
          message =
            "A closed tour cannot be marked as completed.";
        }

        if (
          tour.status ===
          "active"
        ) {
          message =
            "This tour cannot be marked as completed from its current status.";
        }

        return res
          .status(409)
          .json({
            success: false,
            message,
          });
      }

      /* =====================================
         MARK TOUR AS COMPLETED

         The status condition also protects
         against two requests trying to
         complete the same tour at once.
      ===================================== */

      const completedTour =
        await Tour.findOneAndUpdate(
          {
            _id: tourId,
            agencyId,
            status:
              "confirmed",
          },
          {
            $set: {
              status:
                "completed",

              completedAt:
                new Date(),
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (
        !completedTour
      ) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "The tour status changed before it could be completed. Please refresh and try again.",
          });
      }

      /* =====================================
         RESPONSE
      ===================================== */

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Tour marked as completed successfully.",

          tour: {
            id:
              completedTour._id.toString(),

            customerName:
              completedTour.customerName,

            customerPhone:
              completedTour.customerPhone,

            destination:
              completedTour.destination,

            vehicleName:
              completedTour.vehicleName,

            vehicleNumber:
              completedTour.vehicleNumber,

            startDateTime:
              completedTour.startDateTime,

            endDateTime:
              completedTour.endDateTime,

            status:
              completedTour.status,

            completedAt:
              completedTour.completedAt,
          },
        });
    } catch (error) {
      console.error(
        "Complete admin tour error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to complete tour.",
        });
    }
  };