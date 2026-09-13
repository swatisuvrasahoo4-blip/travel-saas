import {
  MessageSquareText,
} from "lucide-react";

import type {
  AdminEnquiry,
} from "@/services/adminEnquiryService";

interface EnquiryMessageCardProps {
  enquiry: AdminEnquiry;
}

const EnquiryMessageCard = ({
  enquiry,
}: EnquiryMessageCardProps) => {
  return (
    <div className="rounded-2xl border border-[#e1eaee] bg-white p-6">
      <div className="flex items-center gap-2">
        <MessageSquareText
          size={20}
          className="text-[#06364a]"
        />

        <h3 className="font-serif text-2xl text-[#06364a]">
          Customer Message
        </h3>
      </div>

      <div className="mt-4 min-h-[110px] rounded-xl bg-[#f7fafb] p-4 text-sm leading-7 text-slate-600">
        {enquiry.message ||
          "No additional message was provided."}
      </div>
    </div>
  );
};

export default EnquiryMessageCard;