import Head from "next/head";
import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";
import AdminLayout from "@/components/admin/layout/AdminLayout";

import {
  AdminEnquiry,
  getAdminEnquiries,
} from "@/services/adminEnquiryService";

type StatusFilter =
  | "all"
  | "new"
  | "contacted"
  | "expired"
  | "closed";

type SourceFilter =
  | "all"
  | "general"
  | "trip"
  | "destination"
  | "package"
  | "cab";

const AdminEnquiriesPage = () => {
  const [
    enquiries,
    setEnquiries,
  ] = useState<AdminEnquiry[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>("all");

  const [
    sourceFilter,
    setSourceFilter,
  ] = useState<SourceFilter>("all");

  useEffect(() => {
    const loadEnquiries =
      async () => {
        try {
          setIsLoading(true);
          setError("");

          const response =
            await getAdminEnquiries();

          setEnquiries(
            response.enquiries
          );
        } catch {
          setError(
            "Unable to load enquiries."
          );
        } finally {
          setIsLoading(false);
        }
      };

    void loadEnquiries();
  }, []);

  const filteredEnquiries =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return enquiries.filter(
        (enquiry) => {
          const matchesSearch =
            !query ||
            enquiry.name
              .toLowerCase()
              .includes(query) ||
            enquiry.phone
              .toLowerCase()
              .includes(query) ||
            enquiry.email
              .toLowerCase()
              .includes(query) ||
            enquiry.destination
              .toLowerCase()
              .includes(query) ||
            enquiry.packageName
              .toLowerCase()
              .includes(query) ||
            enquiry.vehicleType
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "all" ||
            enquiry.status ===
              statusFilter;

          const matchesSource =
            sourceFilter ===
              "all" ||
            enquiry.source ===
              sourceFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesSource
          );
        }
      );
    }, [
      enquiries,
      search,
      statusFilter,
      sourceFilter,
    ]);

  const formatDate = (
    value: string
  ) => {
    if (!value) {
      return "Not specified";
    }

    const date =
      new Date(value);

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

  const getSourceLabel = (
    source: AdminEnquiry["source"]
  ) => {
    switch (source) {
      case "trip":
        return "Plan Trip";

      case "destination":
        return "Destination";

      case "package":
        return "Package";

      case "cab":
        return "Cab";

      default:
        return "General";
    }
  };

  const getDisplayDestination = (
    enquiry: AdminEnquiry
  ) => {
    if (
      enquiry.source ===
      "package"
    ) {
      return (
        enquiry.packageName ||
        "Package enquiry"
      );
    }

    if (
      enquiry.source ===
      "cab"
    ) {
      return (
        enquiry.vehicleType ||
        enquiry.destination ||
        "Cab enquiry"
      );
    }

    return (
      enquiry.destination ||
      "Not specified"
    );
  };

  const getTravelDateDisplay = (
    enquiry: AdminEnquiry
  ) => {
    if (
      enquiry.fromDate ||
      enquiry.toDate
    ) {
      if (
        enquiry.fromDate &&
        enquiry.toDate
      ) {
        return `${formatDate(
          enquiry.fromDate
        )} - ${formatDate(
          enquiry.toDate
        )}`;
      }

      if (enquiry.fromDate) {
        return formatDate(
          enquiry.fromDate
        );
      }

      return formatDate(
        enquiry.toDate
      );
    }

    if (
      enquiry.travelDate
    ) {
      return formatDate(
        enquiry.travelDate
      );
    }

    return "Not specified";
  };

  const getStatusClasses = (
    status: AdminEnquiry["status"]
  ) => {
    switch (status) {
      case "new":
        return "bg-orange-50 text-orange-600";

      case "contacted":
        return "bg-blue-50 text-blue-600";

      case "expired":
        return "bg-red-50 text-red-600";

      case "closed":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <>
      <Head>
        <title>
          Enquiries | Admin
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <ProtectedAdminRoute>
        <AdminLayout
          title="Enquiries"
          subtitle="Manage customer travel enquiries."
        >
          <section>
            <div className="mb-6">
              <h2 className="font-serif text-3xl text-[#06364a]">
                Customer Enquiries
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Review and manage
                incoming travel
                requests.
              </p>
            </div>

            {/* Filters */}

            <div className="mb-6 grid gap-3 rounded-2xl border border-[#e1eaee] bg-white p-4 md:grid-cols-[1fr_180px_180px]">
              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by name, phone, email, destination, package or vehicle..."
                className="h-11 rounded-xl border border-[#dbe7eb] px-4 text-sm outline-none transition focus:border-[#06364a]"
              />

              <select
                value={
                  statusFilter
                }
                onChange={(event) =>
                  setStatusFilter(
                    event.target
                      .value as StatusFilter
                  )
                }
                className="h-11 rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a]"
              >
                <option value="all">
                  All Status
                </option>

                <option value="new">
                  New
                </option>

                <option value="contacted">
                  Contacted
                </option>

                <option value="expired">
                  Expired
                </option>

                <option value="closed">
                  Closed
                </option>
              </select>

              <select
                value={
                  sourceFilter
                }
                onChange={(event) =>
                  setSourceFilter(
                    event.target
                      .value as SourceFilter
                  )
                }
                className="h-11 rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a]"
              >
                <option value="all">
                  All Sources
                </option>

                <option value="general">
                  General
                </option>

                <option value="trip">
                  Plan Trip
                </option>

                <option value="destination">
                  Destination
                </option>

                <option value="package">
                  Package
                </option>

                <option value="cab">
                  Cab
                </option>
              </select>
            </div>

            {/* Content */}

            {isLoading ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d7e7ed] border-t-[#06364a]" />

                  <p className="text-sm font-medium text-[#52727f]">
                    Loading enquiries...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                {error}
              </div>
            ) : filteredEnquiries.length ===
              0 ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <p className="text-sm text-slate-500">
                  No enquiries
                  found.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#e1eaee] bg-white">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-[#f4f9fb]">
                      <tr className="text-left text-xs font-semibold uppercase tracking-wide text-[#52727f]">
                        <th className="px-5 py-4">
                          Customer
                        </th>

                        <th className="px-5 py-4">
                          Destination /
                          Package /
                          Vehicle
                        </th>

                        <th className="px-5 py-4">
                          Source
                        </th>

                        <th className="px-5 py-4">
                          Travel Date
                        </th>

                        <th className="px-5 py-4">
                          Status
                        </th>

                        <th className="px-5 py-4">
                          Received
                        </th>

                        <th className="px-5 py-4 text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#edf2f4]">
                      {filteredEnquiries.map(
                        (
                          enquiry
                        ) => (
                          <tr
                            key={
                              enquiry.id
                            }
                            className="transition hover:bg-[#fbfdfe]"
                          >
                            {/* Customer */}

                            <td className="px-5 py-4">
                              <p className="font-semibold text-[#06364a]">
                                {
                                  enquiry.name
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {
                                  enquiry.phone
                                }
                              </p>
                            </td>

                            {/* Destination */}

                            <td className="px-5 py-4">
                              <p className="text-sm font-medium text-slate-700">
                                {getDisplayDestination(
                                  enquiry
                                )}
                              </p>

                              {enquiry.source !==
                                "cab" &&
                                enquiry.vehicleType && (
                                  <p className="mt-1 text-xs text-slate-400">
                                    Vehicle:{" "}
                                    {
                                      enquiry.vehicleType
                                    }
                                  </p>
                                )}
                            </td>

                            {/* Source */}

                            <td className="px-5 py-4">
                              <span className="inline-flex whitespace-nowrap rounded-full bg-[#eef8fc] px-3 py-1 text-xs font-semibold text-[#176b87]">
                                {getSourceLabel(
                                  enquiry.source
                                )}
                              </span>
                            </td>

                            {/* Travel Date */}

                            <td className="px-5 py-4 text-sm text-slate-600">
                              <span className="whitespace-nowrap">
                                {getTravelDateDisplay(
                                  enquiry
                                )}
                              </span>
                            </td>

                            {/* Status */}

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                                  enquiry.status
                                )}`}
                              >
                                {
                                  enquiry.status
                                }
                              </span>
                            </td>

                            {/* Received */}

                            <td className="px-5 py-4 text-sm text-slate-500">
                              <span className="whitespace-nowrap">
                                {formatDate(
                                  enquiry.createdAt
                                )}
                              </span>
                            </td>

                            {/* Action */}

                            <td className="px-5 py-4 text-right">
                              <Link
                                href={`/admin/enquiries/${enquiry.id}`}
                                className="inline-flex rounded-lg border border-[#d8e6eb] px-3 py-2 text-xs font-semibold text-[#06364a] transition hover:bg-[#eef8fc]"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </AdminLayout>
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminEnquiriesPage;