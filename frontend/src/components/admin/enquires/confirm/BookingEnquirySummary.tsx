import {
  CalendarDays,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";

import type {
  AdminEnquiry,
} from "@/services/adminEnquiryService";

interface BookingEnquirySummaryProps {
  enquiry: AdminEnquiry;
}

interface SummaryItemProps {
  icon: React.ReactNode;

  label: string;

  value: string;
}

const SummaryItem = ({
  icon,
  label,
  value,
}: SummaryItemProps) => {
  return (
    <div className="flex gap-3 rounded-xl border border-[#e3ecef] bg-[#f9fcfd] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef8fc] text-[#06364a]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-[#153f50]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
};

const BookingEnquirySummary = ({
  enquiry,
}: BookingEnquirySummaryProps) => {
  const travelDate =
    enquiry.fromDate && enquiry.toDate
      ? `${enquiry.fromDate} - ${enquiry.toDate}`
      : enquiry.travelDate ||
        "Not specified";

  return (
    <div className="rounded-2xl border border-[#dce8ec] bg-white p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="font-serif text-xl text-[#06364a] sm:text-2xl">
          Enquiry Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review the customer enquiry before
          confirming the final booking.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryItem
          icon={
            <User size={18} />
          }
          label="Customer"
          value={enquiry.name}
        />

        <SummaryItem
          icon={
            <Phone size={18} />
          }
          label="Phone"
          value={enquiry.phone}
        />

        <SummaryItem
          icon={
            <MapPin size={18} />
          }
          label="Destination"
          value={
            enquiry.destination ||
            "Not specified"
          }
        />

        <SummaryItem
          icon={
            <Users size={18} />
          }
          label="No. of Persons"
          value={
            enquiry.travellers ||
            "Not specified"
          }
        />

        <SummaryItem
          icon={
            <CalendarDays
              size={18}
            />
          }
          label="Travel Date"
          value={travelDate}
        />

        <SummaryItem
          icon={
            <MapPin size={18} />
          }
          label="Source"
          value={
            enquiry.source
              ? enquiry.source
                  .charAt(0)
                  .toUpperCase() +
                enquiry.source.slice(1)
              : "General"
          }
        />
      </div>
    </div>
  );
};

export default BookingEnquirySummary;