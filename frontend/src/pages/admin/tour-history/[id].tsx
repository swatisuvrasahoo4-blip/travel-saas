import {
  ArrowLeft,
  CalendarDays,
  Car,
  CircleDollarSign,
  MapPin,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/layout/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";

import {
  getAdminTourHistoryById,
  type TourHistoryDetails,
  type TourHistoryStatus,
} from "@/services/adminTourHistoryService";

/* =========================================
   HELPERS
========================================= */

const formatDateTime = (
  value?: string | null
) => {
  if (!value) {
    return "-";
  }

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
   DETAIL FIELD
========================================= */

interface DetailFieldProps {
  label: string;
  value: string | number;
}

const DetailField = ({
  label,
  value,
}: DetailFieldProps) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 wrap-break-word text-sm font-medium text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
};

/* =========================================
   PAGE
========================================= */

const TourHistoryDetailsPage = () => {
  const router = useRouter();

  const [
    tour,
    setTour,
  ] =
    useState<TourHistoryDetails | null>(
      null
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /* =========================================
     ROUTE ID
  ========================================= */

  const tourId =
    router.isReady &&
    typeof router.query.id ===
      "string"
      ? router.query.id
      : "";

  const hasInvalidId =
    router.isReady &&
    !tourId;

  /* =========================================
     LOAD TOUR DETAILS
  ========================================= */

  useEffect(() => {
    if (
      !router.isReady ||
      !tourId
    ) {
      return;
    }

    let isMounted = true;

    const loadTour =
      async () => {
        try {
          const response =
            await getAdminTourHistoryById(
              tourId
            );

          if (!isMounted) {
            return;
          }

          setTour(
            response.tour
          );

          setError("");
        } catch (err) {
          console.error(
            "Load tour history details error:",
            err
          );

          if (!isMounted) {
            return;
          }

          setTour(null);

          setError(
            "Unable to load tour history details."
          );
        } finally {
          if (isMounted) {
            setIsLoading(
              false
            );
          }
        }
      };

    void loadTour();

    return () => {
      isMounted = false;
    };
  }, [
    router.isReady,
    tourId,
  ]);

  /* =========================================
     BACK
  ========================================= */

  const handleBack = () => {
    void router.push(
      "/admin/tour-history"
    );
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout title="Tour History Details">
        <div className="space-y-6">
          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Tour History
          </button>

          {/* INVALID ID */}

          {hasInvalidId && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              Invalid tour history
              record.
            </div>
          )}

          {/* LOADING */}

          {!hasInvalidId &&
            isLoading && (
              <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
                Loading tour
                details...
              </div>
            )}

          {/* ERROR */}

          {!hasInvalidId &&
            !isLoading &&
            error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                {error}
              </div>
            )}

          {/* TOUR DETAILS */}

          {!hasInvalidId &&
            !isLoading &&
            !error &&
            tour && (
              <>
                {/* HEADER */}

                <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                      {
                        tour.customerName
                      }
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                      {
                        tour.destination
                      }
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-medium capitalize ${getStatusClasses(
                      tour.status
                    )}`}
                  >
                    {tour.status}
                  </span>
                </div>

                {/* CUSTOMER + TRIP */}

                <div className="grid gap-6 lg:grid-cols-2">
                  {/* CUSTOMER */}

                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-2">
                      <UserRound className="h-5 w-5 text-blue-600" />

                      <h2 className="font-semibold text-slate-900">
                        Customer
                        Details
                      </h2>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <DetailField
                        label="Customer Name"
                        value={
                          tour.customerName
                        }
                      />

                      <DetailField
                        label="Phone"
                        value={
                          tour.customerPhone
                        }
                      />

                      <DetailField
                        label="Travellers"
                        value={
                          tour.travellers
                        }
                      />

                      <DetailField
                        label="Enquiry ID"
                        value={
                          tour.enquiryId ||
                          "-"
                        }
                      />
                    </div>
                  </div>

                  {/* TRIP */}

                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />

                      <h2 className="font-semibold text-slate-900">
                        Trip Details
                      </h2>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <DetailField
                        label="Destination"
                        value={
                          tour.destination
                        }
                      />

                      <DetailField
                        label="Pickup Address"
                        value={
                          tour.pickupAddress
                        }
                      />

                      <DetailField
                        label="Drop Location"
                        value={
                          tour.dropLocation
                        }
                      />

                      <DetailField
                        label="Status"
                        value={
                          tour.status
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* TOUR SCHEDULE */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-blue-600" />

                    <h2 className="font-semibold text-slate-900">
                      Tour Schedule
                    </h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailField
                      label="Start Date & Time"
                      value={formatDateTime(
                        tour.startDateTime
                      )}
                    />

                    <DetailField
                      label="Scheduled End"
                      value={formatDateTime(
                        tour.endDateTime
                      )}
                    />

                    {tour.status ===
                      "completed" && (
                      <DetailField
                        label="Completed At"
                        value={formatDateTime(
                          tour.completedAt
                        )}
                      />
                    )}

                    {tour.status ===
                      "closed" && (
                      <DetailField
                        label="Closed At"
                        value={formatDateTime(
                          tour.closedAt
                        )}
                      />
                    )}

                    {tour.status ===
                      "cancelled" && (
                      <DetailField
                        label="Cancelled At"
                        value={formatDateTime(
                          tour.cancelledAt
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* VEHICLE */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-600" />

                    <h2 className="font-semibold text-slate-900">
                      Vehicle &
                      Driver
                    </h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailField
                      label="Vehicle Name"
                      value={
                        tour.vehicleName ||
                        "-"
                      }
                    />

                    <DetailField
                      label="Vehicle Number"
                      value={
                        tour.vehicleNumber
                      }
                    />

                    <DetailField
                      label="Driver Name"
                      value={
                        tour.driverName ||
                        "-"
                      }
                    />

                    <DetailField
                      label="Driver Phone"
                      value={
                        tour.driverPhone ||
                        "-"
                      }
                    />
                  </div>
                </div>

                {/* PAYMENT */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5 text-blue-600" />

                    <h2 className="font-semibold text-slate-900">
                      Payment Details
                    </h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailField
                      label="Agreed Price"
                      value={formatCurrency(
                        tour.agreedPrice
                      )}
                    />

                    <DetailField
                      label="Advance Amount"
                      value={formatCurrency(
                        tour.advanceAmount
                      )}
                    />

                    <DetailField
                      label="Remaining Amount"
                      value={formatCurrency(
                        tour.remainingAmount
                      )}
                    />

                    <DetailField
                      label="Advance Paid"
                      value={
                        tour.advancePaid
                          ? "Yes"
                          : "No"
                      }
                    />

                    <DetailField
                      label="Advance Paid At"
                      value={formatDateTime(
                        tour.advancePaidAt
                      )}
                    />
                  </div>
                </div>

                {/* CANCELLATION */}

                {tour.status ===
                  "cancelled" && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <h2 className="font-semibold text-red-800">
                      Cancellation
                      Details
                    </h2>

                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <DetailField
                        label="Cancelled At"
                        value={formatDateTime(
                          tour.cancelledAt
                        )}
                      />

                      <DetailField
                        label="Cancellation Reason"
                        value={
                          tour.cancellationReason ||
                          "No reason provided"
                        }
                      />
                    </div>
                  </div>
                )}

                {/* NOTES */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="font-semibold text-slate-900">
                    Notes
                  </h2>

                  <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600">
                    {tour.notes ||
                      "No notes available."}
                  </p>
                </div>

                {/* RECORD INFORMATION */}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-5 font-semibold text-slate-900">
                    Record
                    Information
                  </h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <DetailField
                      label="Created At"
                      value={formatDateTime(
                        tour.createdAt
                      )}
                    />

                    <DetailField
                      label="Last Updated"
                      value={formatDateTime(
                        tour.updatedAt
                      )}
                    />
                  </div>
                </div>
              </>
            )}
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
};

export default TourHistoryDetailsPage;