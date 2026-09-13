import type {
  AdminEnquiry,
} from "@/services/adminEnquiryService";

import {
  formatAdminEnquiryDate,
  getAdminEnquirySourceLabel,
} from "@/utils/adminEnquiry";

interface EnquiryInformationCardProps {
  enquiry: AdminEnquiry;
}

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({
  label,
  value,
}: DetailRowProps) => {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#edf2f4] pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold capitalize text-[#06364a]">
        {value}
      </span>
    </div>
  );
};

const EnquiryInformationCard = ({
  enquiry,
}: EnquiryInformationCardProps) => {
  const isPackage =
    enquiry.source === "package";

  const isCab =
    enquiry.source === "cab";

  return (
    <div className="rounded-2xl border border-[#e1eaee] bg-white p-6">
      <h3 className="font-serif text-2xl text-[#06364a]">
        Enquiry Information
      </h3>

      <div className="mt-5 space-y-4">
        <DetailRow
          label="Source"
          value={getAdminEnquirySourceLabel(
            enquiry.source
          )}
        />

        <DetailRow
          label="Status"
          value={enquiry.status}
        />

        {isPackage && (
          <DetailRow
            label="Package"
            value={
              enquiry.packageName ||
              "Not specified"
            }
          />
        )}

        {isCab && (
          <DetailRow
            label="Vehicle"
            value={
              enquiry.vehicleType ||
              "Not specified"
            }
          />
        )}

        <DetailRow
          label="Submitted"
          value={formatAdminEnquiryDate(
            enquiry.createdAt
          )}
        />

        <DetailRow
          label="Last Updated"
          value={formatAdminEnquiryDate(
            enquiry.updatedAt
          )}
        />
      </div>
    </div>
  );
};

export default EnquiryInformationCard;