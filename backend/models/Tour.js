import mongoose from "mongoose";

const tourSchema =
  new mongoose.Schema(
    {
      agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
        index: true,
      },

      enquiryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enquiry",
        default: null,
      },

      customerName: {
        type: String,
        required: true,
        trim: true,
      },

      customerPhone: {
        type: String,
        required: true,
        trim: true,
      },

      destination: {
        type: String,
        required: true,
        trim: true,
      },

      pickupAddress: {
        type: String,
        required: true,
        trim: true,
      },

      dropLocation: {
        type: String,
        required: true,
        trim: true,
      },

      travellers: {
        type: Number,
        required: true,
        min: 1,
      },

      startDateTime: {
        type: Date,
        required: true,
      },

      endDateTime: {
        type: Date,
        required: true,
      },

      agreedPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      advanceAmount: {
        type: Number,
        default: 0,
        min: 0,
      },

      advancePaid: {
        type: Boolean,
        default: false,
      },

      advancePaidAt: {
        type: Date,
        default: null,
      },

      vehicleName: {
        type: String,
        trim: true,
        default: "",
      },

      vehicleNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
      },

      driverName: {
        type: String,
        trim: true,
        default: "",
      },

      driverPhone: {
        type: String,
        trim: true,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "confirmed",
          "active",
          "completed",
          "cancelled",
          "closed",
        ],
        default: "confirmed",
      },

      notes: {
        type: String,
        trim: true,
        default: "",
      },

      completedAt: {
        type: Date,
        default: null,
      },

      closedAt: {
        type: Date,
        default: null,
      },

      cancelledAt: {
        type: Date,
        default: null,
      },

      cancellationReason: {
        type: String,
        trim: true,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

/* =========================================
   INDEXES
========================================= */

tourSchema.index({
  agencyId: 1,
  startDateTime: 1,
  endDateTime: 1,
});

tourSchema.index({
  agencyId: 1,
  vehicleNumber: 1,
  status: 1,
});

/*
 * One enquiry can create only one tour
 * for the same agency.
 *
 * The partial filter means tours created
 * without an enquiryId are still allowed.
 */

tourSchema.index(
  {
    agencyId: 1,
    enquiryId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      enquiryId: {
        $type: "objectId",
      },
    },
  }
);

/* =========================================
   VALIDATION
========================================= */

tourSchema.pre(
  "validate",
  function () {
    if (
      this.startDateTime &&
      this.endDateTime &&
      this.endDateTime <=
        this.startDateTime
    ) {
      this.invalidate(
        "endDateTime",
        "End date and time must be after start date and time."
      );
    }

    if (
      this.advanceAmount >
      this.agreedPrice
    ) {
      this.invalidate(
        "advanceAmount",
        "Advance amount cannot be greater than agreed price."
      );
    }
  }
);

const Tour =
  mongoose.models.Tour ||
  mongoose.model(
    "Tour",
    tourSchema
  );

export default Tour;