"use client";

import axios from "axios";

import {
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  StickyNote,
  Truck,
  User,
  Users,
  XCircle,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  AdminCalendarTour,
} from "@/services/adminTourCalendarService";

import {
  cancelAdminTour,
} from "@/services/adminTourCalendarService";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

import {
  formatTourCurrency,
  formatTourDate,
  formatTourTime,
} from "@/utils/tourCalendar";

import TourStatusBadge from "@/components/admin/calendar/TourStatusBadge";

interface TourDetailsModalProps {
  tour: AdminCalendarTour | null;

  onClose: () => void;

  onCancelled?: () =>
    void | Promise<void>;
}

interface DetailItemProps {
  icon: typeof User;

  label: string;

  value: string;
}

interface PriceItemProps {
  label: string;

  value: string;
}

interface ApiErrorResponse {
  message?: string;
}

/* =========================================
   DETAIL ITEM
========================================= */

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: DetailItemProps) => {
  return (
    <div className="rounded-xl border border-[#e7eef1] bg-[#fbfdfe] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#78919b]">
        <Icon size={15} />

        {label}
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-[#163f4f]">
        {value || "—"}
      </p>
    </div>
  );
};

/* =========================================
   PRICE ITEM
========================================= */

const PriceItem = ({
  label,
  value,
}: PriceItemProps) => {
  return (
    <div className="rounded-xl bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#78919b]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#06364a]">
        {value}
      </p>
    </div>
  );
};

/* =========================================
   TOUR DETAILS MODAL
========================================= */

const TourDetailsModal = ({
  tour,
  onClose,
  onCancelled,
}: TourDetailsModalProps) => {
  const {
    csrfToken,
  } = useAdminAuth();

  const [
    showCancelForm,
    setShowCancelForm,
  ] = useState(false);

  const [
    cancellationReason,
    setCancellationReason,
  ] = useState("");

  const [
    isCancelling,
    setIsCancelling,
  ] = useState(false);

  const [
    cancelError,
    setCancelError,
  ] = useState("");

  if (!tour) {
    return null;
  }

  const balanceAmount =
    Math.max(
      0,
      Number(
        tour.agreedPrice || 0
      ) -
        Number(
          tour.advanceAmount || 0
        )
    );

  /* =======================================
     CANCEL TOUR
  ======================================= */

  const handleCancelTour =
    async () => {
      if (isCancelling) {
        return;
      }

      if (!csrfToken) {
        setCancelError(
          "Your admin session could not be verified. Please refresh the page and try again."
        );

        return;
      }

      try {
        setIsCancelling(
          true
        );

        setCancelError("");

        await cancelAdminTour(
          tour.id,
          cancellationReason.trim(),
          csrfToken
        );

        if (onCancelled) {
          await onCancelled();
        }

        onClose();
      } catch (error) {
        if (
          axios.isAxiosError<ApiErrorResponse>(
            error
          )
        ) {
          setCancelError(
            error.response?.data
              ?.message ||
              "Unable to cancel the tour."
          );

          return;
        }

        setCancelError(
          "Unable to cancel the tour."
        );
      } finally {
        setIsCancelling(
          false
        );
      }
    };

  /* =======================================
     CLOSE CANCEL FORM
  ======================================= */

  const handleKeepTour =
    () => {
      if (isCancelling) {
        return;
      }

      setShowCancelForm(
        false
      );

      setCancellationReason(
        ""
      );

      setCancelError("");
    };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={
        isCancelling
          ? undefined
          : onClose
      }
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* =================================
            HEADER
        ================================= */}

        <div className="flex items-start justify-between gap-4 border-b border-[#e9eff2] p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78919b]">
              Tour Details
            </p>

            <h3 className="mt-1 font-serif text-3xl text-[#06364a]">
              {tour.destination}
            </h3>
          </div>

          <TourStatusBadge
            status={tour.status}
          />
        </div>

        {/* =================================
            MAIN DETAILS
        ================================= */}

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <DetailItem
            icon={User}
            label="Customer"
            value={
              tour.customerName
            }
          />

          <DetailItem
            icon={Phone}
            label="Customer Phone"
            value={
              tour.customerPhone
            }
          />

          <DetailItem
            icon={MapPin}
            label="Pickup Address"
            value={
              tour.pickupAddress ||
              "Not provided"
            }
          />

          <DetailItem
            icon={MapPin}
            label="Drop Location"
            value={
              tour.dropLocation ||
              "Not provided"
            }
          />

          <DetailItem
            icon={
              CalendarDays
            }
            label="Tour Start"
            value={`${formatTourDate(
              tour.startDateTime
            )} • ${formatTourTime(
              tour.startDateTime
            )}`}
          />

          <DetailItem
            icon={Clock}
            label="Tour End"
            value={`${formatTourDate(
              tour.endDateTime
            )} • ${formatTourTime(
              tour.endDateTime
            )}`}
          />

          <DetailItem
            icon={Users}
            label="No. of Persons"
            value={String(
              tour.travellers
            )}
          />

          <DetailItem
            icon={Truck}
            label="Vehicle"
            value={
              tour.vehicleName
                ? `${tour.vehicleName} • ${tour.vehicleNumber}`
                : tour.vehicleNumber
            }
          />

          <DetailItem
            icon={User}
            label="Driver"
            value={
              tour.driverName ||
              "Not assigned"
            }
          />

          <DetailItem
            icon={Phone}
            label="Driver Phone"
            value={
              tour.driverPhone ||
              "Not provided"
            }
          />
        </div>

        {/* =================================
            PAYMENT DETAILS
        ================================= */}

        <div className="border-t border-[#edf2f4] bg-[#f8fbfc] p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#78919b]">
            Payment Details
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <PriceItem
              label="Agreed Price"
              value={formatTourCurrency(
                tour.agreedPrice
              )}
            />

            <PriceItem
              label="Advance Amount"
              value={formatTourCurrency(
                tour.advanceAmount
              )}
            />

            <PriceItem
              label="Remaining Balance"
              value={formatTourCurrency(
                balanceAmount
              )}
            />

            <PriceItem
              label="Advance Status"
              value={
                tour.advancePaid
                  ? "Advance Paid"
                  : "Not Paid"
              }
            />
          </div>
        </div>

        {/* =================================
            NOTES
        ================================= */}

        <div className="border-t border-[#edf2f4] p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#78919b]">
            <StickyNote
              size={15}
            />

            Internal Notes
          </div>

          <div className="mt-3 rounded-xl border border-[#e7eef1] bg-[#fbfdfe] p-4">
            <p className="whitespace-pre-wrap text-sm leading-6 text-[#31515e]">
              {tour.notes?.trim()
                ? tour.notes
                : "No internal notes added."}
            </p>
          </div>
        </div>

        {/* =================================
            CANCEL TOUR FORM
        ================================= */}

        {tour.status ===
          "confirmed" &&
          showCancelForm && (
            <div className="border-t border-red-100 bg-red-50/60 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <XCircle
                    size={20}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-red-700">
                    Cancel this
                    tour?
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-red-600">
                    The booking will
                    remain in your
                    records, but the
                    vehicle will become
                    available for other
                    bookings during
                    these dates.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="cancellation-reason"
                  className="text-sm font-semibold text-[#163f4f]"
                >
                  Cancellation
                  reason
                  <span className="ml-1 font-normal text-[#78919b]">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="cancellation-reason"
                  rows={4}
                  maxLength={500}
                  value={
                    cancellationReason
                  }
                  onChange={(
                    event
                  ) =>
                    setCancellationReason(
                      event.target
                        .value
                    )
                  }
                  disabled={
                    isCancelling
                  }
                  placeholder="Example: Customer requested cancellation."
                  className="mt-2 w-full resize-none rounded-xl border border-[#d8e3e7] bg-white px-4 py-3 text-sm text-[#163f4f] outline-none transition placeholder:text-[#9aadb5] focus:border-[#06364a] focus:ring-2 focus:ring-[#06364a]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <div className="mt-1 text-right text-xs text-[#78919b]">
                  {
                    cancellationReason.length
                  }
                  /500
                </div>
              </div>

              {cancelError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-600">
                  {cancelError}
                </div>
              )}

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={
                    handleKeepTour
                  }
                  disabled={
                    isCancelling
                  }
                  className="rounded-xl border border-[#d9e4e8] bg-white px-5 py-2.5 text-sm font-semibold text-[#31515e] transition hover:bg-[#f5f8f9] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Keep Tour
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void handleCancelTour()
                  }
                  disabled={
                    isCancelling
                  }
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCancelling
                    ? "Cancelling..."
                    : "Confirm Cancellation"}
                </button>
              </div>
            </div>
          )}

        {/* =================================
            FOOTER
        ================================= */}

        <div className="flex flex-col-reverse gap-3 border-t border-[#e9eff2] p-5 sm:flex-row sm:justify-end">
          {tour.status ===
            "confirmed" &&
            !showCancelForm && (
              <button
                type="button"
                onClick={() => {
                  setCancelError(
                    ""
                  );

                  setShowCancelForm(
                    true
                  );
                }}
                className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Cancel Tour
              </button>
            )}

          <button
            type="button"
            onClick={onClose}
            disabled={
              isCancelling
            }
            className="rounded-xl bg-[#06364a] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a4a62] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetailsModal;