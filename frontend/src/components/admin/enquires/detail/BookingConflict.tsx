import type {
  TourConflict,
} from "@/services/adminTourService";

import {
  formatAdminEnquiryDateTime,
} from "@/utils/adminEnquiry";

interface BookingConflictProps {
  conflict: TourConflict;
}

interface ConflictRowProps {
  label: string;
  value: string;
}

const ConflictRow = ({
  label,
  value,
}: ConflictRowProps) => {
  return (
    <div className="rounded-xl bg-white/70 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-[#4b4b4b]">
        {value}
      </p>
    </div>
  );
};

const BookingConflict = ({
  conflict,
}: BookingConflictProps) => {
  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
      <h4 className="font-semibold text-orange-700">
        Vehicle Conflict
      </h4>

      <p className="mt-2 text-sm leading-6 text-orange-700">
        Vehicle{" "}
        <strong>
          {conflict.vehicleNumber}
        </strong>{" "}
        is already assigned to another tour
        during this time.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ConflictRow
          label="Destination"
          value={
            conflict.destination
          }
        />

        <ConflictRow
          label="Customer"
          value={
            conflict.customerName
          }
        />

        <ConflictRow
          label="Start"
          value={formatAdminEnquiryDateTime(
            conflict.startDateTime
          )}
        />

        <ConflictRow
          label="End"
          value={formatAdminEnquiryDateTime(
            conflict.endDateTime
          )}
        />
      </div>

      <p className="mt-4 text-xs font-medium text-orange-700">
        Choose a different vehicle number or a
        non-overlapping tour time.
      </p>
    </div>
  );
};

export default BookingConflict;