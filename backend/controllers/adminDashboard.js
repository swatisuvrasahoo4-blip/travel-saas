import Enquiry from "../models/Enquiry.js";
import Tour from "../models/Tour.js";

/* =========================================
   GET ADMIN DASHBOARD DATA
========================================= */

export const getAdminDashboard = async (
  req,
  res
) => {
  try {
    const agencyId =
      req.admin.agencyId;

    /* =====================================
       TODAY RANGE
    ===================================== */

    const now =
      new Date();

    const startOfToday =
      new Date(now);

    startOfToday.setHours(
      0,
      0,
      0,
      0
    );

    const endOfToday =
      new Date(now);

    endOfToday.setHours(
      23,
      59,
      59,
      999
    );

    /* =====================================
       DATABASE QUERIES
    ===================================== */

    const [
      totalEnquiries,
      newEnquiries,
      recentEnquiries,

      activeTours,
      completedTours,
      cancelledTours,

      todaysTours,
      calendarTours,
    ] = await Promise.all([
      /* -----------------------------
         ENQUIRIES
      ----------------------------- */

      Enquiry.countDocuments({
        agencyId,
      }),

      Enquiry.countDocuments({
        agencyId,
        status: "new",
      }),

      Enquiry.find({
        agencyId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .select(
          [
            "_id",
            "name",
            "phone",
            "destination",
            "packageName",
            "source",
            "status",
            "createdAt",
          ].join(" ")
        )
        .lean(),

      /* -----------------------------
         ACTIVE / CONFIRMED TOURS
      ----------------------------- */

      Tour.countDocuments({
        agencyId,

        status: {
          $in: [
            "confirmed",
            "active",
          ],
        },
      }),

      /* -----------------------------
         COMPLETED TOURS
      ----------------------------- */

      Tour.countDocuments({
        agencyId,
        status: "completed",
      }),

      /* -----------------------------
         CANCELLED TOURS
      ----------------------------- */

      Tour.countDocuments({
        agencyId,
        status: "cancelled",
      }),

      /* -----------------------------
         TODAY'S TOURS

         Any confirmed/active tour
         overlapping today's date.
      ----------------------------- */

      Tour.find({
        agencyId,

        status: {
          $in: [
            "confirmed",
            "active",
          ],
        },

        startDateTime: {
          $lte: endOfToday,
        },

        endDateTime: {
          $gte: startOfToday,
        },
      })
        .sort({
          startDateTime: 1,
        })
        .select(
          [
            "_id",
            "destination",
            "customerName",
            "travellers",
            "startDateTime",
            "vehicleNumber",
            "status",
          ].join(" ")
        )
        .lean(),

      /* -----------------------------
         CALENDAR TOURS

         Closed tours are intentionally
         excluded from active calendar.
      ----------------------------- */

      Tour.find({
        agencyId,

        status: {
          $in: [
            "confirmed",
            "active",
            "cancelled",
          ],
        },
      })
        .sort({
          startDateTime: 1,
        })
        .select(
          [
            "_id",
            "destination",
            "startDateTime",
            "endDateTime",
            "status",
          ].join(" ")
        )
        .lean(),
    ]);

    /* =====================================
       RESPONSE
    ===================================== */

    return res
      .status(200)
      .json({
        success: true,

        stats: {
          totalEnquiries,
          newEnquiries,
          activeTours,
          completedTours,
          cancelledTours,
        },

        recentEnquiries:
          recentEnquiries.map(
            (enquiry) => ({
              id:
                enquiry._id.toString(),

              customerName:
                enquiry.name,

              destination:
                enquiry.source ===
                  "package"
                  ? enquiry.packageName ||
                    ""
                  : enquiry.destination ||
                    "",

              phone:
                enquiry.phone,

              source:
                enquiry.source,

              status:
                enquiry.status,

              createdAt:
                enquiry.createdAt,
            })
          ),

        todaysTours:
          todaysTours.map(
            (tour) => ({
              id:
                tour._id.toString(),

              destination:
                tour.destination,

              customerName:
                tour.customerName,

              travellers:
                tour.travellers,

              startTime:
                tour.startDateTime,

              vehicleNumber:
                tour.vehicleNumber,

              status:
                tour.status,
            })
          ),

        calendarTours:
          calendarTours.map(
            (tour) => ({
              id:
                tour._id.toString(),

              destination:
                tour.destination,

              startDate:
                tour.startDateTime,

              endDate:
                tour.endDateTime,

              status:
                tour.status,
            })
          ),
      });
  } catch (error) {
    console.error(
      "Admin dashboard error:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,

        message:
          "Unable to load dashboard.",
      });
  }
};