import type {
  FormEvent,
} from "react";

import type {
  BookingFormData,
} from "@/types/enquiryBooking";

import type {
  TourConflict,
} from "@/services/adminTourService";

import BookingConflict from "./BookingConflict";

interface TourBookingFormProps {
  customerName: string;

  customerPhone: string;

  formData: BookingFormData;

  isCreatingTour: boolean;

  bookingError: string;

  conflict: TourConflict | null;

  disableDestination?: boolean;

  onSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;

  onChange: (
    field: keyof BookingFormData,
    value: string | boolean
  ) => void;

  onCancel: () => void;
}

interface FormFieldProps {
  label: string;

  value: string;

  type?: string;

  placeholder?: string;

  required?: boolean;

  disabled?: boolean;

  min?: string;

  step?: string;

  onChange?: (
    value: string
  ) => void;
}

const FormField = ({
  label,
  value,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  min,
  step,
  onChange,
}: FormFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#294d5b]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        step={step}
        onChange={(event) =>
          onChange?.(
            event.target.value
          )
        }
        className="h-11 w-full rounded-xl border border-[#dce7eb] bg-white px-4 text-sm text-[#153f50] outline-none transition placeholder:text-slate-400 focus:border-[#06364a] disabled:cursor-not-allowed disabled:bg-[#f2f6f7] disabled:text-slate-500"
      />
    </div>
  );
};

const TourBookingForm = ({
  customerName,
  customerPhone,
  formData,
  isCreatingTour,
  bookingError,
  conflict,
  disableDestination = false,
  onSubmit,
  onChange,
  onCancel,
}: TourBookingFormProps) => {
  return (
    <div className="rounded-2xl border border-[#dce8ec] bg-white p-5 sm:p-7">
      <div className="mb-6">
        <h3 className="font-serif text-2xl text-[#06364a]">
          Confirm Tour Booking
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Enter the final agreed booking details.
          Vehicle availability will be checked
          before the tour is confirmed.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Customer Name"
            value={customerName}
            disabled
          />

          <FormField
            label="Customer Phone"
            value={customerPhone}
            disabled
          />

          <FormField
            label="Destination"
            value={
              formData.destination
            }
            onChange={(value) =>
              onChange(
                "destination",
                value
              )
            }
            placeholder="e.g. Puri"
            required
            disabled={
              disableDestination
            }
          />

          <FormField
            label="No. of Persons"
            type="number"
            min="1"
            value={
              formData.travellers
            }
            onChange={(value) =>
              onChange(
                "travellers",
                value
              )
            }
            required
          />

          <FormField
            label="Pickup Address"
            value={
              formData.pickupAddress
            }
            onChange={(value) =>
              onChange(
                "pickupAddress",
                value
              )
            }
            placeholder="Enter pickup address"
            required
          />

          <FormField
            label="Drop Location"
            value={
              formData.dropLocation
            }
            onChange={(value) =>
              onChange(
                "dropLocation",
                value
              )
            }
            placeholder="Enter drop location"
            required
          />

          <FormField
            label="Tour Start"
            type="datetime-local"
            value={
              formData.startDateTime
            }
            onChange={(value) =>
              onChange(
                "startDateTime",
                value
              )
            }
            required
          />

          <FormField
            label="Tour End"
            type="datetime-local"
            value={
              formData.endDateTime
            }
            onChange={(value) =>
              onChange(
                "endDateTime",
                value
              )
            }
            required
          />

          <FormField
            label="Agreed Price (₹)"
            type="number"
            min="0"
            step="0.01"
            value={
              formData.agreedPrice
            }
            onChange={(value) =>
              onChange(
                "agreedPrice",
                value
              )
            }
            required
          />

          <FormField
            label="Advance Amount (₹)"
            type="number"
            min="0"
            step="0.01"
            value={
              formData.advanceAmount
            }
            onChange={(value) =>
              onChange(
                "advanceAmount",
                value
              )
            }
          />

          <FormField
            label="Vehicle Name"
            value={
              formData.vehicleName
            }
            onChange={(value) =>
              onChange(
                "vehicleName",
                value
              )
            }
            placeholder="e.g. Innova Crysta"
          />

          <FormField
            label="Vehicle Number"
            value={
              formData.vehicleNumber
            }
            onChange={(value) =>
              onChange(
                "vehicleNumber",
                value.toUpperCase()
              )
            }
            placeholder="e.g. OD02AB1234"
            required
          />

          <FormField
            label="Driver Name"
            value={
              formData.driverName
            }
            onChange={(value) =>
              onChange(
                "driverName",
                value
              )
            }
            placeholder="Enter driver name"
          />

          <FormField
            label="Driver Phone"
            type="tel"
            value={
              formData.driverPhone
            }
            onChange={(value) =>
              onChange(
                "driverPhone",
                value
              )
            }
            placeholder="Enter driver phone"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#dfe9ed] bg-[#f9fcfd] p-4">
          <input
            type="checkbox"
            checked={
              formData.advancePaid
            }
            onChange={(event) =>
              onChange(
                "advancePaid",
                event.target.checked
              )
            }
            className="h-4 w-4 accent-[#06364a]"
          />

          <div>
            <p className="text-sm font-semibold text-[#06364a]">
              Advance payment received
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Enable this only if the advance has
              already been paid.
            </p>
          </div>
        </label>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#294d5b]">
            Internal Notes
          </label>

          <textarea
            rows={4}
            value={formData.notes}
            onChange={(event) =>
              onChange(
                "notes",
                event.target.value
              )
            }
            placeholder="Optional booking notes..."
            className="w-full resize-none rounded-xl border border-[#dce7eb] px-4 py-3 text-sm text-[#153f50] outline-none transition placeholder:text-slate-400 focus:border-[#06364a]"
          />
        </div>

        {bookingError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {bookingError}
          </div>
        )}

        {conflict && (
          <BookingConflict
            conflict={conflict}
          />
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-[#edf2f4] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={
              isCreatingTour
            }
            onClick={onCancel}
            className="rounded-xl border border-[#d5e2e7] bg-white px-5 py-3 text-sm font-semibold text-[#06364a] transition hover:bg-[#f6fafb] disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isCreatingTour
            }
            className="rounded-xl bg-[#ff681f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e95b17] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreatingTour
              ? "Checking & Confirming..."
              : "Confirm Tour Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TourBookingForm;