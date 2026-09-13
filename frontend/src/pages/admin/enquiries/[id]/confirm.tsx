import Head from "next/head";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/router";

import {
  ArrowLeft,
} from "lucide-react";

import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";

import AdminLayout from "@/components/admin/layout/AdminLayout";

import BookingEnquirySummary from "@/components/admin/enquires/confirm/BookingEnquirySummary";

import WhatsAppBookingPreview from "@/components/admin/enquires/confirm/WhatsAppBookingPreview";

import TourBookingForm from "@/components/admin/enquires/detail/TourBookingForm";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

import {
  useAdminEnquiryDetail,
} from "@/hooks/useAdminEnquiryDetail";

import {
  useEnquiryBooking,
} from "@/hooks/useEnquiryBooking";

import type {
  CreatedTour,
  CreateTourPayload,
} from "@/services/adminTourService";

interface ConfirmedBooking {
  tour: CreatedTour;

  booking: CreateTourPayload;
}

const AdminConfirmBookingPage = () => {
  const router = useRouter();

  const {
    agency,
  } = useAdminAuth();

  const [
    confirmedBooking,
    setConfirmedBooking,
  ] = useState<ConfirmedBooking | null>(
    null
  );

  const enquiryId =
    typeof router.query.id ===
    "string"
      ? router.query.id
      : undefined;

  const vehicleNumber =
    typeof router.query
      .vehicleNumber ===
    "string"
      ? router.query
          .vehicleNumber
      : "";

  const startDateTime =
    typeof router.query
      .startDateTime ===
    "string"
      ? router.query
          .startDateTime
      : "";

  const endDateTime =
    typeof router.query
      .endDateTime ===
    "string"
      ? router.query
          .endDateTime
      : "";

  const {
    enquiry,
    isLoading,
    error,
  } = useAdminEnquiryDetail({
    enquiryId,
  });

  const {
    formData,
    updateBookingField,
    isCreatingTour,
    bookingError,
    conflict,
    submitBooking,
  } = useEnquiryBooking({
    enquiry,

    onTourCreated: (
      tour,
      booking
    ) => {
      setConfirmedBooking({
        tour,
        booking,
      });
    },
  });

  /* =========================================
     PREFILL FINAL BOOKING FORM
  ========================================= */

  useEffect(() => {
    if (!enquiry) {
      return;
    }

    updateBookingField(
      "destination",
      enquiry.destination || ""
    );

    updateBookingField(
      "travellers",
      enquiry.travellers || ""
    );

    if (vehicleNumber) {
      updateBookingField(
        "vehicleNumber",
        vehicleNumber
      );
    }

    if (startDateTime) {
      updateBookingField(
        "startDateTime",
        startDateTime
      );
    }

    if (endDateTime) {
      updateBookingField(
        "endDateTime",
        endDateTime
      );
    }
  }, [
    enquiry,
    vehicleNumber,
    startDateTime,
    endDateTime,
    updateBookingField,
  ]);

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit =
    async (
      event:
        React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      await submitBooking();
    };

  /* =========================================
     BACK / CANCEL
  ========================================= */

  const handleCancel = () => {
    if (!enquiryId) {
      void router.push(
        "/admin/enquiries"
      );

      return;
    }

    void router.push(
      `/admin/enquiries/${enquiryId}`
    );
  };

  /* =========================================
     GO TO CALENDAR
  ========================================= */

  const handleGoToCalendar =
    () => {
      void router.push(
        "/admin/calendar"
      );
    };

  return (
    <>
      <Head>
        <title>
          Confirm Tour Booking |
          Admin
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <ProtectedAdminRoute>
        <AdminLayout
          title="Confirm Tour Booking"
          subtitle="Review and enter the final booking details."
        >
          <section>
            <button
              type="button"
              onClick={
                handleCancel
              }
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#dce8ec] bg-white px-4 py-2.5 text-sm font-semibold text-[#06364a] transition hover:bg-[#eef8fc]"
            >
              <ArrowLeft
                size={17}
              />

              Back to Enquiry
            </button>

            {isLoading && (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d7e7ed] border-t-[#06364a]" />

                  <p className="text-sm font-medium text-[#52727f]">
                    Loading booking
                    details...
                  </p>
                </div>
              </div>
            )}

            {!isLoading &&
              error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                  {error}
                </div>
              )}

            {!isLoading &&
              !error &&
              enquiry && (
                <>
                  {enquiry.status !==
                  "contacted" ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                      <p className="text-sm font-semibold text-amber-700">
                        This enquiry
                        cannot be
                        confirmed.
                      </p>

                      <p className="mt-1 text-sm text-amber-600">
                        Only contacted
                        enquiries can
                        be converted
                        into tours.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <BookingEnquirySummary
                        enquiry={
                          enquiry
                        }
                      />

                      <TourBookingForm
                        customerName={
                          enquiry.name
                        }
                        customerPhone={
                          enquiry.phone
                        }
                        formData={
                          formData
                        }
                        isCreatingTour={
                          isCreatingTour
                        }
                        bookingError={
                          bookingError
                        }
                        conflict={
                          conflict
                        }
                        disableDestination={
                          enquiry.source ===
                          "package"
                        }
                        onSubmit={
                          handleSubmit
                        }
                        onChange={
                          updateBookingField
                        }
                        onCancel={
                          handleCancel
                        }
                      />
                    </div>
                  )}
                </>
              )}
          </section>
        </AdminLayout>

        {confirmedBooking &&
          enquiry && (
            <WhatsAppBookingPreview
              tour={
                confirmedBooking.tour
              }
              booking={
                confirmedBooking.booking
              }
              customerPhone={
                enquiry.phone
              }
              agencyName={
                agency?.name ||
                "Travel Agency"
              }
              onClose={
                handleGoToCalendar
              }
              onContinue={
                handleGoToCalendar
              }
            />
          )}
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminConfirmBookingPage;