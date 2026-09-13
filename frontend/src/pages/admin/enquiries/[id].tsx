import Head from "next/head";
import { useRouter } from "next/router";

import {
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";
import AdminLayout from "@/components/admin/layout/AdminLayout";

import EnquiryCustomerCard from "@/components/admin/enquires/detail/EnquiryCustomerCard";
import EnquiryTravelDetails from "@/components/admin/enquires/detail/EnquiryTravelDetails";
import EnquiryMessageCard from "@/components/admin/enquires/detail/EnquiryMessageCard";
import EnquiryInformationCard from "@/components/admin/enquires/detail/EnquiryInformationCard";
import EnquiryActions from "@/components/admin/enquires/detail/EnquiryActions";
import VehicleAvailabilityCheck from "@/components/admin/enquires/detail/VehicleAvailabilityCheck";

import {
  useAdminEnquiryDetail,
} from "@/hooks/useAdminEnquiryDetail";

interface AvailableVehicleData {
  vehicleNumber: string;
  startDateTime: string;
  endDateTime: string;
}

const AdminEnquiryDetailPage = () => {
  const router = useRouter();

  const enquiryId =
    typeof router.query.id ===
    "string"
      ? router.query.id
      : undefined;

  const [
    showVehicleCheck,
    setShowVehicleCheck,
  ] = useState(false);

  const {
    enquiry,
    isLoading,
    error,
    isUpdatingStatus,
    statusMessage,
    updateStatus,
  } = useAdminEnquiryDetail({
    enquiryId,
  });

  const handleConfirmBooking =
    () => {
      if (
        !enquiry ||
        enquiry.status !==
          "contacted"
      ) {
        return;
      }

      setShowVehicleCheck(true);
    };

  const handleCancelVehicleCheck =
    () => {
      setShowVehicleCheck(false);
    };

  const handleVehicleAvailable =
    async (
      data: AvailableVehicleData
    ) => {
      if (!enquiryId) {
        return;
      }

      await router.push({
        pathname:
          "/admin/enquiries/[id]/confirm",

        query: {
          id: enquiryId,

          vehicleNumber:
            data.vehicleNumber,

          startDateTime:
            data.startDateTime,

          endDateTime:
            data.endDateTime,
        },
      });
    };

  /*
   * Prefill booking dates from the enquiry.
   *
   * Package / Plan Trip:
   * fromDate -> start
   * toDate   -> end
   *
   * Normal / Destination / Cab:
   * travelDate -> start
   *
   * The admin can still change the exact
   * date and time before checking availability.
   */

  const defaultStartDateTime =
    enquiry?.fromDate
      ? `${enquiry.fromDate}T09:00`
      : enquiry?.travelDate
        ? `${enquiry.travelDate}T09:00`
        : "";

  const defaultEndDateTime =
    enquiry?.toDate
      ? `${enquiry.toDate}T18:00`
      : enquiry?.travelDate
        ? `${enquiry.travelDate}T18:00`
        : "";

  return (
    <>
      <Head>
        <title>
          Enquiry Details | Admin
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <ProtectedAdminRoute>
        <AdminLayout
          title="Enquiry Details"
          subtitle="Review the complete customer enquiry."
        >
          <section>
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/enquiries"
                )
              }
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#dce8ec] bg-white px-4 py-2.5 text-sm font-semibold text-[#06364a] transition hover:bg-[#eef8fc]"
            >
              <ArrowLeft
                size={17}
              />

              Back to Enquiries
            </button>

            {isLoading && (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d7e7ed] border-t-[#06364a]" />

                  <p className="text-sm font-medium text-[#52727f]">
                    Loading enquiry...
                  </p>
                </div>
              </div>
            )}

            {!isLoading &&
              error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                  {error}
                </div>
              )}

            {!isLoading &&
              !error &&
              enquiry && (
                <div className="space-y-6">
                  <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                    {/* Left */}

                    <div className="space-y-6">
                      <EnquiryCustomerCard
                        enquiry={
                          enquiry
                        }
                      />

                      <EnquiryTravelDetails
                        enquiry={
                          enquiry
                        }
                      />

                      <EnquiryMessageCard
                        enquiry={
                          enquiry
                        }
                      />
                    </div>

                    {/* Right */}

                    <div className="space-y-6">
                      <EnquiryInformationCard
                        enquiry={
                          enquiry
                        }
                      />

                      <EnquiryActions
                        enquiry={
                          enquiry
                        }
                        isUpdatingStatus={
                          isUpdatingStatus
                        }
                        statusMessage={
                          statusMessage
                        }
                        showVehicleCheck={
                          showVehicleCheck
                        }
                        onStatusChange={(
                          status
                        ) => {
                          void updateStatus(
                            status
                          );
                        }}
                        onConfirmBooking={
                          handleConfirmBooking
                        }
                        onCancelVehicleCheck={
                          handleCancelVehicleCheck
                        }
                      />
                    </div>
                  </div>

                  {/* Vehicle Availability */}

                  {showVehicleCheck &&
                    enquiry.status ===
                      "contacted" && (
                      <VehicleAvailabilityCheck
                        defaultStartDateTime={
                          defaultStartDateTime
                        }
                        defaultEndDateTime={
                          defaultEndDateTime
                        }
                        onAvailable={
                          handleVehicleAvailable
                        }
                        onCancel={
                          handleCancelVehicleCheck
                        }
                      />
                    )}
                </div>
              )}
          </section>
        </AdminLayout>
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminEnquiryDetailPage;