import {
  CalendarDays,
  CheckCircle2,
  CircleX,
  History,
  Search,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/router";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/layout/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";

import {
  getAdminTourHistory,
  type TourHistoryItem,
  type TourHistoryStatus,
  type TourHistorySummary,
} from "@/services/adminTourHistoryService";

/* =========================================
   DEFAULT SUMMARY
========================================= */

const defaultSummary: TourHistorySummary = {
  completed: 0,
  closed: 0,
  cancelled: 0,
  total: 0,
};

/* =========================================
   HELPERS
========================================= */

const formatDateTime = (
  value: string
) => {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
};

const formatCurrency = (
  value: number
) => {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value);
};

const getStatusClasses = (
  status: TourHistoryStatus
) => {
  if (status === "completed") {
    return "bg-green-100 text-green-700";
  }

  if (status === "cancelled") {
    return "bg-red-100 text-red-700";
  }

  return "bg-slate-100 text-slate-700";
};

/* =========================================
   PAGE
========================================= */

const TourHistoryPage = () => {
  const router = useRouter();

  const [
    tours,
    setTours,
  ] = useState<TourHistoryItem[]>([]);

  const [
    summary,
    setSummary,
  ] = useState<TourHistorySummary>(
    defaultSummary
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<
    TourHistoryStatus | ""
  >("");

  const [
    fromDate,
    setFromDate,
  ] = useState("");

  const [
    toDate,
    setToDate,
  ] = useState("");

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);

  const [
    totalTours,
    setTotalTours,
  ] = useState(0);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /* =========================================
     LOAD TOUR HISTORY
  ========================================= */

  const loadTourHistory =
    useCallback(
      async () => {
        try {
          setIsLoading(true);
          setError("");

          const response =
            await getAdminTourHistory({
              page,
              limit: 10,
              search,
              status,
              fromDate,
              toDate,
            });

          setTours(
            response.tours
          );

          setSummary(
            response.summary
          );

          setTotalTours(
            response.pagination
              .totalTours
          );

          setTotalPages(
            Math.max(
              response.pagination
                .totalPages,
              1
            )
          );
        } catch (err) {
          console.error(
            "Load tour history error:",
            err
          );

          setTours([]);
          setSummary(
            defaultSummary
          );
          setTotalTours(0);
          setTotalPages(1);

          setError(
            "Unable to load tour history."
          );
        } finally {
          setIsLoading(false);
        }
      },
      [
        page,
        search,
        status,
        fromDate,
        toDate,
      ]
    );

  /* =========================================
     LOAD WITH DEBOUNCE
  ========================================= */

  useEffect(() => {
    const timer =
      window.setTimeout(
        () => {
          void loadTourHistory();
        },
        300
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [loadTourHistory]);

  /* =========================================
     FILTER HANDLERS
  ========================================= */

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (
    value: string
  ) => {
    setStatus(
      value as
        | TourHistoryStatus
        | ""
    );

    setPage(1);
  };

  const handleFromDateChange = (
    value: string
  ) => {
    setFromDate(value);

    if (
      toDate &&
      value &&
      toDate < value
    ) {
      setToDate("");
    }

    setPage(1);
  };

  const handleToDateChange = (
    value: string
  ) => {
    setToDate(value);
    setPage(1);
  };

  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const handleClearFilters =
    () => {
      setSearch("");
      setStatus("");
      setFromDate("");
      setToDate("");
      setPage(1);
    };

  const hasFilters =
    Boolean(
      search ||
        status ||
        fromDate ||
        toDate
    );

  /* =========================================
     OPEN DETAILS
  ========================================= */

  const handleOpenTour = (
    tourId: string
  ) => {
    void router.push(
      `/admin/tour-history/${tourId}`
    );
  };

  /* =========================================
     PAGINATION
  ========================================= */

  const handlePreviousPage =
    () => {
      setPage((current) =>
        Math.max(
          current - 1,
          1
        )
      );
    };

  const handleNextPage =
    () => {
      setPage((current) =>
        Math.min(
          current + 1,
          totalPages
        )
      );
    };

  return (
    <ProtectedAdminRoute>
      <AdminLayout title="Tour History">
        <div className="space-y-6">
          {/* HEADER */}

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Tour History
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View completed, closed and
              cancelled tours.
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Total History
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.total}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3">
                  <History className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Completed
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.completed}
                  </p>
                </div>

                <div className="rounded-lg bg-green-50 p-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Closed
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.closed}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-3">
                  <CircleX className="h-5 w-5 text-slate-600" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Cancelled
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {summary.cancelled}
                  </p>
                </div>

                <div className="rounded-lg bg-red-50 p-3">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* FILTERS */}

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-5">
              {/* SEARCH */}

              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    handleSearchChange(
                      event.target.value
                    )
                  }
                  placeholder="Search customer, destination, vehicle..."
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* STATUS */}

              <select
                value={status}
                onChange={(event) =>
                  handleStatusChange(
                    event.target.value
                  )
                }
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  All Statuses
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="closed">
                  Closed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>

              {/* FROM DATE */}

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="date"
                  value={fromDate}
                  onChange={(event) =>
                    handleFromDateChange(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* TO DATE */}

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="date"
                  value={toDate}
                  min={
                    fromDate ||
                    undefined
                  }
                  onChange={(event) =>
                    handleToDateChange(
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {hasFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={
                    handleClearFilters
                  }
                  className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* ERROR */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* TABLE */}

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Previous Tours
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  {totalTours}{" "}
                  {totalTours === 1
                    ? "record"
                    : "records"}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Destination
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Travel Date
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Travellers
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Vehicle
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-sm text-slate-500"
                      >
                        Loading tour
                        history...
                      </td>
                    </tr>
                  ) : tours.length ===
                    0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center"
                      >
                        <History className="mx-auto h-9 w-9 text-slate-300" />

                        <p className="mt-3 text-sm font-medium text-slate-600">
                          No tour history
                          found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Completed,
                          closed and
                          cancelled tours
                          will appear here.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    tours.map(
                      (tour) => (
                        <tr
                          key={
                            tour._id
                          }
                          onClick={() =>
                            handleOpenTour(
                              tour._id
                            )
                          }
                          className="cursor-pointer transition hover:bg-slate-50"
                        >
                          <td className="whitespace-nowrap px-5 py-4">
                            <p className="text-sm font-medium text-slate-900">
                              {
                                tour.customerName
                              }
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {
                                tour.customerPhone
                              }
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-700">
                            {
                              tour.destination
                            }
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            <p className="text-sm text-slate-700">
                              {formatDateTime(
                                tour.startDateTime
                              )}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              to{" "}
                              {formatDateTime(
                                tour.endDateTime
                              )}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-700">
                            {
                              tour.travellers
                            }
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            <p className="text-sm text-slate-700">
                              {tour.vehicleName ||
                                "-"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {
                                tour.vehicleNumber
                              }
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                            {formatCurrency(
                              tour.agreedPrice
                            )}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(
                                tour.status
                              )}`}
                            >
                              {
                                tour.status
                              }
                            </span>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}

            {!isLoading &&
              totalTours > 0 && (
                <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Page {page} of{" "}
                    {totalPages}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={
                        page <= 1
                      }
                      onClick={
                        handlePreviousPage
                      }
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      disabled={
                        page >=
                        totalPages
                      }
                      onClick={
                        handleNextPage
                      }
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
};

export default TourHistoryPage;