import {
  Clock3,
  User,
} from "lucide-react";

import type {
  AdminEnquiry,
  AdminEnquiryStatus,
} from "@/services/adminEnquiryService";

interface EnquiryActionsProps {
  enquiry: AdminEnquiry;
  isUpdatingStatus: boolean;
  statusMessage: string;
  showVehicleCheck: boolean;

  onStatusChange: (
    status: AdminEnquiryStatus
  ) => void;

  onConfirmBooking: () => void;

  onCancelVehicleCheck: () => void;
}

const EnquiryActions = ({
  enquiry,
  isUpdatingStatus,
  statusMessage,
  showVehicleCheck,
  onStatusChange,
  onConfirmBooking,
  onCancelVehicleCheck,
}: EnquiryActionsProps) => {
  return (
    <div className="rounded-2xl border border-[#dce9ed] bg-[#eef8fc] p-6">
      <div className="flex items-start gap-3">
        <User
          size={21}
          className="mt-0.5 text-[#176b87]"
        />

        <div className="w-full">
          <h4 className="font-semibold text-[#06364a]">
            Enquiry Actions
          </h4>

          <p className="mt-2 text-sm leading-6 text-[#52727f]">
            Update the enquiry status or
            continue with booking confirmation.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            {/* NEW */}

            {enquiry.status ===
              "new" && (
              <button
                type="button"
                disabled={
                  isUpdatingStatus
                }
                onClick={() =>
                  onStatusChange(
                    "contacted"
                  )
                }
                className="rounded-xl bg-[#06364a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0a4a62] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdatingStatus
                  ? "Updating..."
                  : "Mark as Contacted"}
              </button>
            )}

            {/* CONTACTED */}

            {enquiry.status ===
              "contacted" && (
              <>
                {!showVehicleCheck ? (
                  <button
                    type="button"
                    onClick={
                      onConfirmBooking
                    }
                    className="rounded-xl bg-[#ff681f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e95b17]"
                  >
                    Confirm Booking
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={
                      onCancelVehicleCheck
                    }
                    className="rounded-xl border border-[#ff681f] bg-white px-4 py-3 text-sm font-semibold text-[#e95b17] transition hover:bg-orange-50"
                  >
                    Cancel Vehicle Check
                  </button>
                )}

                <button
                  type="button"
                  disabled={
                    isUpdatingStatus
                  }
                  onClick={() =>
                    onStatusChange(
                      "closed"
                    )
                  }
                  className="rounded-xl border border-[#cfdde2] bg-white px-4 py-3 text-sm font-semibold text-[#06364a] transition hover:bg-[#f7fafb] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdatingStatus
                    ? "Updating..."
                    : "Close Enquiry"}
                </button>
              </>
            )}

            {/* EXPIRED */}

            {enquiry.status ===
              "expired" && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                <div className="flex items-start gap-3">
                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      This enquiry has expired.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-600">
                      The travel date has passed,
                      so this enquiry can no longer
                      be confirmed as a booking.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CLOSED */}

            {enquiry.status ===
              "closed" && (
              <div className="rounded-xl border border-[#d7e5e9] bg-white px-4 py-3 text-sm font-medium text-[#52727f]">
                This enquiry is closed.
              </div>
            )}
          </div>

          {statusMessage && (
            <p className="mt-3 text-xs font-medium text-[#52727f]">
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryActions;