import {
  CalendarDays,
  Car,
  MapPin,
  Package,
  Users,
} from "lucide-react";

import type {
  AdminEnquiry,
} from "@/services/adminEnquiryService";

interface EnquiryTravelDetailsProps {
  enquiry: AdminEnquiry;
}

interface InfoCardProps {
  icon: typeof MapPin;
  label: string;
  value: string;
}

const InfoCard = ({
  icon: Icon,
  label,
  value,
}: InfoCardProps) => {
  return (
    <div className="rounded-xl border border-[#edf2f4] bg-[#fbfdfe] p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#6f8993]">
        <Icon size={15} />

        {label}
      </div>

      <p className="mt-2 font-medium text-[#153f50]">
        {value}
      </p>
    </div>
  );
};

const formatDate = (
  value: string
) => {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const EnquiryTravelDetails = ({
  enquiry,
}: EnquiryTravelDetailsProps) => {
  const isPackage =
    enquiry.source === "package";

  const isTrip =
    enquiry.source === "trip";

  const isCab =
    enquiry.source === "cab";

  const usesDateRange =
    isPackage || isTrip;

  const getLocationLabel = () => {
    if (isPackage) {
      return "Package";
    }

    if (isCab) {
      return "Destination";
    }

    return "Destination";
  };

  const getLocationValue = () => {
    if (isPackage) {
      return (
        enquiry.packageName ||
        "Not specified"
      );
    }

    return (
      enquiry.destination ||
      "Not specified"
    );
  };

  return (
    <div className="rounded-2xl border border-[#e1eaee] bg-white p-6">
      <h3 className="font-serif text-2xl text-[#06364a]">
        Travel Details
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Destination / Package */}

        <InfoCard
          icon={
            isPackage
              ? Package
              : MapPin
          }
          label={getLocationLabel()}
          value={getLocationValue()}
        />

        {/* Travel Date */}

        {!usesDateRange && (
          <InfoCard
            icon={CalendarDays}
            label="Travel Date"
            value={formatDate(
              enquiry.travelDate
            )}
          />
        )}

        {/* From Date */}

        {usesDateRange && (
          <InfoCard
            icon={CalendarDays}
            label="From Date"
            value={formatDate(
              enquiry.fromDate
            )}
          />
        )}

        {/* To Date */}

        {usesDateRange && (
          <InfoCard
            icon={CalendarDays}
            label="To Date"
            value={formatDate(
              enquiry.toDate
            )}
          />
        )}

        {/* No. of Person */}

        <InfoCard
          icon={Users}
          label="No. of Person"
          value={
            enquiry.travellers ||
            "Not specified"
          }
        />

        {/* Vehicle Type */}

        <InfoCard
          icon={Car}
          label="Vehicle Type"
          value={
            enquiry.vehicleType ||
            "Not specified"
          }
        />

        {/* Trip Type */}

        <InfoCard
          icon={Package}
          label="Trip Type"
          value={
            enquiry.tripType ||
            "Not specified"
          }
        />
      </div>
    </div>
  );
};

export default EnquiryTravelDetails;