import {
  Mail,
  Phone,
} from "lucide-react";

import type {
  AdminEnquiry,
} from "@/services/adminEnquiryService";

import {
  formatAdminEnquiryDate,
} from "@/utils/adminEnquiry";

interface EnquiryCustomerCardProps {
  enquiry: AdminEnquiry;
}

const EnquiryCustomerCard = ({
  enquiry,
}: EnquiryCustomerCardProps) => {
  const statusClass =
    enquiry.status === "new"
      ? "bg-orange-50 text-orange-600"
      : enquiry.status === "contacted"
        ? "bg-blue-50 text-blue-600"
        : "bg-slate-100 text-slate-600";

  return (
    <div className="rounded-2xl border border-[#e1eaee] bg-white p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#79939d]">
            Customer
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#06364a]">
            {enquiry.name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Received on{" "}
            {formatAdminEnquiryDate(
              enquiry.createdAt
            )}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${statusClass}`}
        >
          {enquiry.status}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-[#f7fafb] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#6f8993]">
            <Phone size={15} />

            Phone
          </div>

          <p className="mt-2 font-medium text-[#153f50]">
            {enquiry.phone}
          </p>
        </div>

        <div className="rounded-xl bg-[#f7fafb] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#6f8993]">
            <Mail size={15} />

            Email
          </div>

          <p className="mt-2 break-all font-medium text-[#153f50]">
            {enquiry.email ||
              "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryCustomerCard;