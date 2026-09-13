import {
  ArrowRight,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";

interface RecentEnquiry {
  id: string;
  customerName: string;
  destination: string;
  phone: string;
  source:
    | "general"
    | "trip"
    | "destination"
    | "package";
  status:
    | "new"
    | "contacted"
    | "closed";
}

interface RecentEnquiriesProps {
  enquiries?: RecentEnquiry[];
}

const RecentEnquiries = ({
  enquiries = [],
}: RecentEnquiriesProps) => {
  return (
    <section className="rounded-2xl border border-[#e1eaee] bg-white p-5 shadow-[0_8px_30px_rgba(6,54,74,0.04)] sm:p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#06364a]">
            Recent Enquiries
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest customer enquiries
            received by your agency.
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          className="flex items-center gap-1 text-sm font-semibold text-[#0b749c] transition hover:text-[#06364a]"
        >
          View all

          <ArrowRight
            size={15}
          />
        </Link>
      </div>

      {/* Empty state */}

      {enquiries.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7e5ea] bg-[#fbfdfe] px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8fc] text-[#0b749c]">
            <MessageSquareText
              size={25}
            />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-[#264c5c]">
            No enquiries yet
          </h3>

          <p className="mt-2 max-w-[280px] text-xs leading-5 text-slate-400">
            New customer enquiries will
            appear here automatically.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#e4ecef]">
          {/* Desktop headings */}

          <div className="hidden grid-cols-[1.2fr_1.2fr_1fr_0.8fr_0.8fr] gap-4 bg-[#f7fafb] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
            <span>
              Customer
            </span>

            <span>
              Destination
            </span>

            <span>
              Phone
            </span>

            <span>
              Source
            </span>

            <span>
              Status
            </span>
          </div>

          {/* Rows */}

          <div className="divide-y divide-[#edf2f4]">
            {enquiries.map(
              (enquiry) => (
                <Link
                  key={
                    enquiry.id
                  }
                  href={`/admin/enquiries/${enquiry.id}`}
                  className="block px-5 py-4 transition hover:bg-[#fbfdfe]"
                >
                  {/* Desktop */}

                  <div className="hidden grid-cols-[1.2fr_1.2fr_1fr_0.8fr_0.8fr] items-center gap-4 md:grid">
                    <p className="truncate text-sm font-semibold text-[#264c5c]">
                      {
                        enquiry.customerName
                      }
                    </p>

                    <p className="truncate text-sm text-slate-500">
                      {
                        enquiry.destination ||
                        "Not specified"
                      }
                    </p>

                    <p className="text-sm text-slate-500">
                      {
                        enquiry.phone
                      }
                    </p>

                    <p className="text-xs capitalize text-slate-500">
                      {
                        enquiry.source
                      }
                    </p>

                    <div>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                          enquiry.status ===
                          "new"
                            ? "bg-[#eaf7fb] text-[#08739b]"
                            : enquiry.status ===
                                "contacted"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {
                          enquiry.status
                        }
                      </span>
                    </div>
                  </div>

                  {/* Mobile */}

                  <div className="md:hidden">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#264c5c]">
                          {
                            enquiry.customerName
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            enquiry.destination ||
                            "Destination not specified"
                          }
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                          enquiry.status ===
                          "new"
                            ? "bg-[#eaf7fb] text-[#08739b]"
                            : enquiry.status ===
                                "contacted"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {
                          enquiry.status
                        }
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>
                        {
                          enquiry.phone
                        }
                      </span>

                      <span className="capitalize">
                        {
                          enquiry.source
                        }
                      </span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentEnquiries;