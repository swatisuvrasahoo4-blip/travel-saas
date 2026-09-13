import Tour from "../models/Tour.js";

/* =========================================
   GET ADMIN TOUR CALENDAR
========================================= */

export const getAdminTourCalendar = async (
  req,
  res
) => {
  try {
    const agencyId =
      req.admin.agencyId;

    const tours =
      await Tour.find({
        agencyId,
        status: {
          $in: [
            "confirmed",
            "active",
            "completed",
            "cancelled",
            "closed",
          ],
        },
      })
        .sort({
          startDateTime: 1,
        })
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
            "vehicleName",
            "vehicleNumber",
            "driverName",
            "driverPhone",
            "agreedPrice",
            "advanceAmount",
            "advancePaid",
            "status",
            "notes",
          ].join(" ")
        )
        .lean();

    return res
      .status(200)
      .json({
        success: true,

        tours:
          tours.map(
            (tour) => ({
              id:
                tour._id.toString(),

              customerName:
                tour.customerName,

              customerPhone:
                tour.customerPhone,

              destination:
                tour.destination,

              pickupAddress:
                tour.pickupAddress ||
                "",

              dropLocation:
                tour.dropLocation ||
                "",

              travellers:
                tour.travellers,

              startDateTime:
                tour.startDateTime,

              endDateTime:
                tour.endDateTime,

              vehicleName:
                tour.vehicleName ||
                "",

              vehicleNumber:
                tour.vehicleNumber,

              driverName:
                tour.driverName ||
                "",

              driverPhone:
                tour.driverPhone ||
                "",

              agreedPrice:
                tour.agreedPrice,

              advanceAmount:
                tour.advanceAmount,

              advancePaid:
                tour.advancePaid,

              status:
                tour.status,

              notes:
                tour.notes ||
                "",
            })
          ),
      });
  } catch (error) {
    console.error(
      "Admin tour calendar error:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,

        message:
          "Unable to load tour calendar.",
      });
  }
};