import {
  useCallback,
  useState,
} from "react";

import axios from "axios";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

import type {
  AdminEnquiry,
} from "@/services/adminEnquiryService";

import {
  createTourFromEnquiry,
  type CreateTourPayload,
  type CreatedTour,
  type TourConflict,
} from "@/services/adminTourService";

import {
  INITIAL_BOOKING_FORM,
  type BookingFormData,
} from "@/types/enquiryBooking";

interface UseEnquiryBookingParams {
  enquiry: AdminEnquiry | null;

  onTourCreated?: (
    tour: CreatedTour,
    booking: CreateTourPayload
  ) => void;
}

export const useEnquiryBooking = ({
  enquiry,
  onTourCreated,
}: UseEnquiryBookingParams) => {
  const {
    csrfToken,
  } = useAdminAuth();

  const [
    showBookingForm,
    setShowBookingForm,
  ] = useState(false);

  const [
    isCreatingTour,
    setIsCreatingTour,
  ] = useState(false);

  const [
    bookingError,
    setBookingError,
  ] = useState("");

  const [
    bookingSuccess,
    setBookingSuccess,
  ] = useState("");

  const [
    conflict,
    setConflict,
  ] = useState<TourConflict | null>(
    null
  );

  const [
    formData,
    setFormData,
  ] = useState<BookingFormData>(
    INITIAL_BOOKING_FORM
  );

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const updateBookingField =
    useCallback(
      (
        field: keyof BookingFormData,
        value: string | boolean
      ) => {
        setFormData(
          (current) => ({
            ...current,
            [field]: value,
          })
        );

        setBookingError("");
        setConflict(null);
      },
      []
    );

  /* =========================================
     OPEN BOOKING FORM
  ========================================= */

  const openBookingForm =
    useCallback(() => {
      if (!enquiry) {
        return;
      }

      if (
        enquiry.status !==
        "contacted"
      ) {
        setBookingError(
          "Mark the enquiry as contacted before confirming the tour."
        );

        return;
      }

      setFormData({
        ...INITIAL_BOOKING_FORM,

        destination:
          enquiry.destination || "",

        travellers:
          enquiry.travellers || "",
      });

      setBookingError("");
      setBookingSuccess("");
      setConflict(null);

      setShowBookingForm(true);
    }, [enquiry]);

  /* =========================================
     CLOSE BOOKING FORM
  ========================================= */

  const closeBookingForm =
    useCallback(() => {
      setShowBookingForm(false);

      setBookingError("");
      setConflict(null);
    }, []);

  /* =========================================
     TOGGLE BOOKING FORM
  ========================================= */

  const toggleBookingForm =
    useCallback(() => {
      if (showBookingForm) {
        closeBookingForm();
        return;
      }

      openBookingForm();
    }, [
      showBookingForm,
      closeBookingForm,
      openBookingForm,
    ]);

  /* =========================================
     CREATE TOUR
  ========================================= */

  const submitBooking =
    useCallback(
      async () => {
        if (!enquiry) {
          return false;
        }

        if (
          enquiry.status !==
          "contacted"
        ) {
          setBookingError(
            "Mark the enquiry as contacted before confirming the tour."
          );

          return false;
        }

        if (!csrfToken) {
          setBookingError(
            "Security token is unavailable. Please refresh the page and try again."
          );

          return false;
        }

        setBookingError("");
        setBookingSuccess("");
        setConflict(null);

        /* =====================================
           DESTINATION
        ===================================== */

        const destination =
          formData.destination.trim();

        if (!destination) {
          setBookingError(
            "Destination is required."
          );

          return false;
        }

        /* =====================================
           PICKUP ADDRESS
        ===================================== */

        const pickupAddress =
          formData.pickupAddress.trim();

        if (!pickupAddress) {
          setBookingError(
            "Pickup address is required."
          );

          return false;
        }

        /* =====================================
           DROP LOCATION
        ===================================== */

        const dropLocation =
          formData.dropLocation.trim();

        if (!dropLocation) {
          setBookingError(
            "Drop location is required."
          );

          return false;
        }

        /* =====================================
           TRAVELLERS
        ===================================== */

        const travellers =
          Number(
            formData.travellers
          );

        if (
          !Number.isInteger(
            travellers
          ) ||
          travellers < 1
        ) {
          setBookingError(
            "Enter a valid number of travellers."
          );

          return false;
        }

        /* =====================================
           DATE / TIME
        ===================================== */

        if (
          !formData.startDateTime ||
          !formData.endDateTime
        ) {
          setBookingError(
            "Start and end date/time are required."
          );

          return false;
        }

        const start =
          new Date(
            formData.startDateTime
          );

        const end =
          new Date(
            formData.endDateTime
          );

        if (
          Number.isNaN(
            start.getTime()
          ) ||
          Number.isNaN(
            end.getTime()
          )
        ) {
          setBookingError(
            "Enter valid tour dates."
          );

          return false;
        }

        if (end <= start) {
          setBookingError(
            "End date and time must be after the start date and time."
          );

          return false;
        }

        /* =====================================
           PRICE
        ===================================== */

        const agreedPrice =
          Number(
            formData.agreedPrice
          );

        if (
          !Number.isFinite(
            agreedPrice
          ) ||
          agreedPrice < 0
        ) {
          setBookingError(
            "Enter a valid agreed price."
          );

          return false;
        }

        /* =====================================
           ADVANCE
        ===================================== */

        const advanceAmount =
          formData.advanceAmount
            ? Number(
                formData.advanceAmount
              )
            : 0;

        if (
          !Number.isFinite(
            advanceAmount
          ) ||
          advanceAmount < 0
        ) {
          setBookingError(
            "Enter a valid advance amount."
          );

          return false;
        }

        if (
          advanceAmount >
          agreedPrice
        ) {
          setBookingError(
            "Advance amount cannot be greater than the agreed price."
          );

          return false;
        }

        /* =====================================
           VEHICLE
        ===================================== */

        const vehicleNumber =
          formData.vehicleNumber
            .trim()
            .toUpperCase();

        if (!vehicleNumber) {
          setBookingError(
            "Vehicle number is required."
          );

          return false;
        }

        /* =====================================
           PAYLOAD
        ===================================== */

        const payload: CreateTourPayload =
          {
            customerName:
              enquiry.name,

            customerPhone:
              enquiry.phone,

            destination,

            pickupAddress,

            dropLocation,

            travellers,

            startDateTime:
              formData.startDateTime,

            endDateTime:
              formData.endDateTime,

            agreedPrice,

            advanceAmount,

            advancePaid:
              formData.advancePaid,

            advancePaidAt:
              formData.advancePaid
                ? new Date().toISOString()
                : null,

            vehicleName:
              formData.vehicleName.trim(),

            vehicleNumber,

            driverName:
              formData.driverName.trim(),

            driverPhone:
              formData.driverPhone.trim(),

            notes:
              formData.notes.trim(),
          };

        try {
          setIsCreatingTour(true);

          const response =
            await createTourFromEnquiry(
              enquiry.id,
              payload,
              csrfToken
            );

          if (
            !response.success
          ) {
            setBookingError(
              response.message ||
                "Unable to confirm tour."
            );

            return false;
          }

          if (!response.tour) {
            setBookingError(
              "Tour was created, but the booking details were not returned. Please check the tour calendar."
            );

            return false;
          }

          setBookingSuccess(
            response.message
          );

          setShowBookingForm(false);

          onTourCreated?.(
            response.tour,
            payload
          );

          return true;
        } catch (
          createError
        ) {
          if (
            axios.isAxiosError(
              createError
            )
          ) {
            const responseData =
              createError.response
                ?.data as
                | {
                    message?: string;
                    conflict?:
                      TourConflict;
                  }
                | undefined;

            if (
              responseData
                ?.conflict
            ) {
              setConflict(
                responseData
                  .conflict
              );
            }

            setBookingError(
              responseData
                ?.message ||
                "Unable to confirm tour."
            );

            return false;
          }

          setBookingError(
            "Unable to confirm tour."
          );

          return false;
        } finally {
          setIsCreatingTour(false);
        }
      },
      [
        enquiry,
        formData,
        onTourCreated,
        csrfToken,
      ]
    );

  /* =========================================
     RESET
  ========================================= */

  const resetBooking =
    useCallback(() => {
      setFormData(
        INITIAL_BOOKING_FORM
      );

      setBookingError("");
      setBookingSuccess("");
      setConflict(null);

      setShowBookingForm(false);
    }, []);

  return {
    formData,
    updateBookingField,

    showBookingForm,
    openBookingForm,
    closeBookingForm,
    toggleBookingForm,

    isCreatingTour,
    bookingError,
    bookingSuccess,
    conflict,

    submitBooking,
    resetBooking,
  };
};