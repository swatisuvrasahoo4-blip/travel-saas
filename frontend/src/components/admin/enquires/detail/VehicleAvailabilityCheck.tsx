import {
  useState,
  type FormEvent,
} from "react";

import axios from "axios";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

import {
  checkVehicleAvailability,
  type VehicleAvailabilityConflict,
} from "@/services/adminTourService";

import BookingConflict from "./BookingConflict";

interface VehicleAvailabilityCheckProps {
  defaultStartDateTime?: string;
  defaultEndDateTime?: string;

  onAvailable: (data: {
    vehicleNumber: string;
    startDateTime: string;
    endDateTime: string;
  }) => void;

  onCancel: () => void;
}

const VehicleAvailabilityCheck = ({
  defaultStartDateTime = "",
  defaultEndDateTime = "",
  onAvailable,
  onCancel,
}: VehicleAvailabilityCheckProps) => {
  const {
    csrfToken,
  } = useAdminAuth();

  const [
    vehicleNumber,
    setVehicleNumber,
  ] = useState("");

  const [
    startDateTime,
    setStartDateTime,
  ] = useState(
    defaultStartDateTime
  );

  const [
    endDateTime,
    setEndDateTime,
  ] = useState(
    defaultEndDateTime
  );

  const [
    isChecking,
    setIsChecking,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    conflict,
    setConflict,
  ] =
    useState<VehicleAvailabilityConflict | null>(
      null
    );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");
    setConflict(null);

    if (!csrfToken) {
      setError(
        "Security token is unavailable. Please refresh the page and try again."
      );

      return;
    }

    const normalizedVehicleNumber =
      vehicleNumber
        .trim()
        .toUpperCase();

    if (!normalizedVehicleNumber) {
      setError(
        "Vehicle number is required."
      );

      return;
    }

    if (
      !startDateTime ||
      !endDateTime
    ) {
      setError(
        "Tour start and end date/time are required."
      );

      return;
    }

    const start =
      new Date(startDateTime);

    const end =
      new Date(endDateTime);

    if (
      Number.isNaN(
        start.getTime()
      ) ||
      Number.isNaN(
        end.getTime()
      )
    ) {
      setError(
        "Enter valid tour dates and times."
      );

      return;
    }

    if (end <= start) {
      setError(
        "Tour end date/time must be after the start date/time."
      );

      return;
    }

    try {
      setIsChecking(true);

      const response =
        await checkVehicleAvailability(
          {
            vehicleNumber:
              normalizedVehicleNumber,

            startDateTime,
            endDateTime,
          },
          csrfToken
        );

      if (
        response.available
      ) {
        setSuccessMessage(
          response.message
        );

        onAvailable({
          vehicleNumber:
            response.vehicleNumber ||
            normalizedVehicleNumber,

          startDateTime,
          endDateTime,
        });
      }
    } catch (checkError) {
      if (
        axios.isAxiosError(
          checkError
        )
      ) {
        const responseData =
          checkError.response
            ?.data as
            | {
                message?: string;

                conflict?:
                  VehicleAvailabilityConflict;
              }
            | undefined;

        if (
          responseData?.conflict
        ) {
          setConflict(
            responseData.conflict
          );
        }

        setError(
          responseData?.message ||
            "Unable to check vehicle availability."
        );

        return;
      }

      setError(
        "Unable to check vehicle availability."
      );
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#dce8ec] bg-white p-5 sm:p-7">
      <div className="mb-6">
        <h3 className="font-serif text-2xl text-[#06364a]">
          Check Vehicle Availability
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter the vehicle and tour
          date/time before continuing
          with the booking.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#294d5b]">
            Vehicle Number

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <input
            type="text"
            value={vehicleNumber}
            onChange={(event) => {
              setVehicleNumber(
                event.target.value.toUpperCase()
              );

              setError("");
              setConflict(null);
            }}
            placeholder="e.g. OD02AB1234"
            className="h-11 w-full rounded-xl border border-[#dce7eb] px-4 text-sm uppercase text-[#153f50] outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-[#06364a]"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#294d5b]">
              Tour Start

              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(event) => {
                setStartDateTime(
                  event.target.value
                );

                setError("");
                setConflict(null);
              }}
              className="h-11 w-full rounded-xl border border-[#dce7eb] px-4 text-sm text-[#153f50] outline-none transition focus:border-[#06364a]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#294d5b]">
              Tour End

              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(event) => {
                setEndDateTime(
                  event.target.value
                );

                setError("");
                setConflict(null);
              }}
              className="h-11 w-full rounded-xl border border-[#dce7eb] px-4 text-sm text-[#153f50] outline-none transition focus:border-[#06364a]"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {successMessage}
          </div>
        )}

        {conflict && (
          <BookingConflict
            conflict={{
              id:
                conflict.tourId,

              customerName:
                conflict.customerName,

              destination:
                conflict.destination,

              vehicleNumber:
                conflict.vehicleNumber,

              startDateTime:
                conflict.startDateTime,

              endDateTime:
                conflict.endDateTime,

              status:
                conflict.status,
            }}
          />
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f4] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={isChecking}
            onClick={onCancel}
            className="rounded-xl border border-[#d5e2e7] bg-white px-5 py-3 text-sm font-semibold text-[#06364a] transition hover:bg-[#f6fafb] disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isChecking}
            className="rounded-xl bg-[#06364a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a4a62] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isChecking
              ? "Checking..."
              : "Check Availability"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleAvailabilityCheck;