import axios from "axios";

import {
  CalendarDays,
  Car,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Users,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  useAgency,
} from "@/context/AgencyContext";

import {
  useEnquiry,
} from "@/components/enquiry/EnquiryProvider";

import {
  createEnquiry,
} from "@/services/enquiryService";

const vehicleOptions = [
  "Traveller",
  "Urbania",
  "Innova (Crysta)",
  "SML",
  "Dzire",
];

interface EnquiryFormProps {
  formKey: string;
}

const EnquiryForm = ({
  formKey,
}: EnquiryFormProps) => {
  const { agency } =
    useAgency();

  const {
    enquiryData,
    closeEnquiry,
  } = useEnquiry();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    destination,
    setDestination,
  ] = useState(
    enquiryData.destination || ""
  );

  const [
    travelDate,
    setTravelDate,
  ] = useState(
    enquiryData.travelDate || ""
  );

  const [
    fromDate,
    setFromDate,
  ] = useState(
    enquiryData.fromDate || ""
  );

  const [
    toDate,
    setToDate,
  ] = useState(
    enquiryData.toDate || ""
  );

  const [
    travellers,
    setTravellers,
  ] = useState(
    enquiryData.travellers || ""
  );

  const [
    tripType,
    setTripType,
  ] = useState(
    enquiryData.tripType || ""
  );

  const [
    vehicleType,
    setVehicleType,
  ] = useState(
    enquiryData.vehicleType || ""
  );

  const [
    showVehicleOptions,
    setShowVehicleOptions,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  if (!agency) {
    return null;
  }

  const destinations =
    agency.enquiryOptions
      ?.destinations ?? [];

  const tripTypes =
    agency.enquiryOptions
      ?.tripTypes ?? [];

  const destinationOptions = [
    ...destinations,
  ];

  if (
    destination &&
    !destinationOptions.some(
      (item) =>
        item
          .trim()
          .toLowerCase() ===
        destination
          .trim()
          .toLowerCase()
    )
  ) {
    destinationOptions.unshift(
      destination
    );
  }

  const filteredVehicleOptions =
    vehicleOptions.filter(
      (vehicle) =>
        vehicle
          .toLowerCase()
          .includes(
            vehicleType
              .trim()
              .toLowerCase()
          )
    );

  const isPackageEnquiry =
    enquiryData.source ===
    "package";

  const isTripEnquiry =
    enquiryData.source ===
    "trip";

  const isCabEnquiry =
    enquiryData.source ===
    "cab";

  const usesDateRange =
    isPackageEnquiry ||
    isTripEnquiry;

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage(
        "Please enter your name."
      );
      return;
    }

    if (!phone.trim()) {
      setErrorMessage(
        "Please enter your phone number."
      );
      return;
    }

    if (usesDateRange) {
      if (!fromDate) {
        setErrorMessage(
          "Please select the from date."
        );
        return;
      }

      if (!toDate) {
        setErrorMessage(
          "Please select the to date."
        );
        return;
      }

      if (toDate < fromDate) {
        setErrorMessage(
          "To date cannot be before from date."
        );
        return;
      }
    }

    if (
      isTripEnquiry &&
      !destination.trim()
    ) {
      setErrorMessage(
        "Please enter where you want to go."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const hostname =
        window.location.hostname;

      const response =
        await createEnquiry({
          hostname,

          source:
            enquiryData.source,

          packageId:
            enquiryData.packageId,

          packageName:
            enquiryData.packageName,

          name:
            name.trim(),

          phone:
            phone.trim(),

          email:
            email.trim(),

          destination:
            isPackageEnquiry
              ? ""
              : destination.trim(),

          travelDate:
            usesDateRange
              ? ""
              : travelDate,

          fromDate:
            usesDateRange
              ? fromDate
              : "",

          toDate:
            usesDateRange
              ? toDate
              : "",

          travellers,

          vehicleType:
            vehicleType.trim(),

          tripType,

          message:
            message.trim(),
        });

      setSuccessMessage(
        response.message ||
          "Enquiry submitted successfully."
      );

      window.setTimeout(() => {
        closeEnquiry();
      }, 1500);
    } catch (error) {
      if (
        axios.isAxiosError(error)
      ) {
        if (
          error.response?.status ===
          409
        ) {
          setErrorMessage(
            error.response.data
              ?.message ||
              "You have already submitted an enquiry for this package."
          );

          return;
        }

        setErrorMessage(
          error.response?.data
            ?.message ||
            "Unable to submit enquiry. Please try again."
        );

        return;
      }

      setErrorMessage(
        "Unable to submit enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Name */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Name
          <span className="ml-1 text-red-500">
            *
          </span>
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={name}
            required
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            placeholder="Enter your name"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
          />
        </div>
      </div>

      {/* Phone */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Phone Number
          <span className="ml-1 text-red-500">
            *
          </span>
        </label>

        <div className="relative">
          <Phone
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="tel"
            value={phone}
            required
            onChange={(event) =>
              setPhone(
                event.target.value
              )
            }
            placeholder="Enter phone number"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
          />
        </div>
      </div>

      {/* Email */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="Enter email address"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
          />
        </div>
      </div>

      {/* Custom Tour Destination */}

      {isTripEnquiry && (
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Where do you want to go?
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={destination}
              required
              onChange={(event) =>
                setDestination(
                  event.target.value
                )
              }
              placeholder="e.g. Puri, Konark, Chilika"
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
            />
          </div>

          <p className="mt-1.5 text-xs text-gray-400">
            Enter one place, multiple
            places or your preferred
            route.
          </p>
        </div>
      )}

      {/* Specific Package */}

      {isPackageEnquiry && (
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Destination
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            />

            <input
              type="text"
              disabled
              value="Included in selected package"
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3 pl-10 pr-4 text-sm text-gray-400 outline-none"
            />
          </div>

          <p className="mt-1.5 text-xs text-gray-400">
            Destination is determined
            by the selected package.
          </p>
        </div>
      )}

      {/* Normal Destination */}

      {!isTripEnquiry &&
        !isPackageEnquiry && (
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Destination
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={destination}
                onChange={(event) =>
                  setDestination(
                    event.target.value
                  )
                }
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
              >
                <option value="">
                  Select destination
                </option>

                {destinationOptions.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        )}

      {/* From / To Date */}

      {usesDateRange && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              From Date
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                required
                value={fromDate}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  setFromDate(value);

                  if (
                    toDate &&
                    toDate < value
                  ) {
                    setToDate("");
                  }
                }}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              To Date
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                required
                min={
                  fromDate ||
                  undefined
                }
                value={toDate}
                onChange={(event) =>
                  setToDate(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-orange-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Single Travel Date */}

      {!usesDateRange && (
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Travel Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="date"
              value={travelDate}
              onChange={(event) =>
                setTravelDate(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-orange-400"
            />
          </div>
        </div>
      )}

      {/* No. of Person */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          No. of Person
        </label>

        <div className="relative">
          <Users
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="number"
            min="1"
            value={travellers}
            onChange={(event) =>
              setTravellers(
                event.target.value
              )
            }
            placeholder="Enter number of persons"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
          />
        </div>
      </div>

      {/* Vehicle Type */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Vehicle Type
        </label>

        {/* Icon stays only in this box */}

        <div className="relative">
          <Car
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={vehicleType}
            onFocus={() =>
              setShowVehicleOptions(
                true
              )
            }
            onChange={(event) => {
              setVehicleType(
                event.target.value
              );

              setShowVehicleOptions(
                true
              );
            }}
            onBlur={() => {
              window.setTimeout(
                () => {
                  setShowVehicleOptions(
                    false
                  );
                },
                150
              );
            }}
            placeholder={
              isCabEnquiry
                ? "Selected vehicle"
                : "Select or type vehicle"
            }
            autoComplete="off"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
          />
        </div>

        {/* Text-only Vehicle Suggestions */}

        {showVehicleOptions &&
          filteredVehicleOptions.length >
            0 && (
            <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {filteredVehicleOptions.map(
                (vehicle) => (
                  <button
                    key={vehicle}
                    type="button"
                    onPointerDown={(
                      event
                    ) => {
                      event.preventDefault();

                      setVehicleType(
                        vehicle
                      );

                      setShowVehicleOptions(
                        false
                      );
                    }}
                    className="w-full border-b border-gray-100 px-4 py-3 text-left text-sm text-gray-700 transition last:border-b-0 hover:bg-orange-50 active:bg-orange-100"
                  >
                    {vehicle}
                  </button>
                )
              )}
            </div>
          )}

        <p className="mt-1.5 text-xs text-gray-400">
          Select a suggested vehicle
          or type another vehicle.
        </p>
      </div>

      {/* Trip Type */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Trip Type
        </label>

        <select
          value={tripType}
          onChange={(event) =>
            setTripType(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-orange-400"
        >
          <option value="">
            Select trip type
          </option>

          {tripTypes.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>
      </div>

      {/* Message */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Message
        </label>

        <div className="relative">
          <MessageSquare
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <textarea
            value={message}
            onChange={(event) =>
              setMessage(
                event.target.value
              )
            }
            rows={3}
            placeholder="Tell us about your travel requirements..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
          />
        </div>
      </div>

      {/* Error */}

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Success */}

      {successMessage && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      {/* Buttons */}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={closeEnquiry}
          className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor:
              agency.accentColor,
          }}
        >
          <Send size={17} />

          {isSubmitting
            ? "Sending..."
            : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
};

const EnquiryModal = () => {
  const { agency } =
    useAgency();

  const {
    isOpen,
    enquiryData,
    closeEnquiry,
  } = useEnquiry();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        closeEnquiry();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isOpen,
    closeEnquiry,
  ]);

  if (
    !isOpen ||
    !agency
  ) {
    return null;
  }

  let title =
    "Plan Your Journey";

  let subtitle =
    `Send your enquiry to ${agency.name} and we'll help you plan your trip.`;

  if (
    enquiryData.source ===
    "destination"
  ) {
    title =
      "Plan Your Destination";

    subtitle =
      "Tell us your travel details and we'll help you plan your journey.";
  }

  if (
    enquiryData.source ===
    "package"
  ) {
    title =
      "Package Enquiry";

    subtitle =
      "Choose your dates and send an enquiry for this tour package.";
  }

  if (
    enquiryData.source ===
    "trip"
  ) {
    title =
      "Plan Your Tour";

    subtitle =
      "Tell us where you want to go, your dates and travel preferences.";
  }

  if (
    enquiryData.source ===
    "cab"
  ) {
    title =
      "Cab Enquiry";

    subtitle =
      "Share your travel details and we'll help arrange your vehicle.";
  }

  const formKey = [
    enquiryData.source,
    enquiryData.destination,
    enquiryData.packageId,
    enquiryData.packageName,
    enquiryData.travelDate,
    enquiryData.fromDate,
    enquiryData.toDate,
    enquiryData.travellers,
    enquiryData.tripType,
    enquiryData.vehicleType,
  ].join("-");

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-5"
      onClick={closeEnquiry}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="relative max-h-[95vh] w-full overflow-y-auto rounded-t-3xl bg-[#fffaf3] shadow-2xl sm:max-w-2xl sm:rounded-3xl"
      >
        {/* Header */}

        <div
          className="relative overflow-hidden rounded-t-3xl px-5 py-6 text-white sm:px-7"
          style={{
            backgroundColor:
              agency.primaryColor,
          }}
        >
          <button
            type="button"
            onClick={closeEnquiry}
            aria-label="Close enquiry"
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={19} />
          </button>

          <div className="pr-12">
            <p
              className="mb-1 text-xs font-bold uppercase tracking-[0.18em]"
              style={{
                color:
                  agency.accentColor,
              }}
            >
              {agency.name}
            </p>

            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              {title}
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Package */}

        {enquiryData.source ===
          "package" &&
          enquiryData.packageName && (
            <div className="border-b border-orange-100 bg-orange-50 px-5 py-4 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Selected Package
              </p>

              <p
                className="mt-1 font-bold"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                {
                  enquiryData.packageName
                }
              </p>
            </div>
          )}

        {/* Destination */}

        {enquiryData.source ===
          "destination" &&
          enquiryData.destination && (
            <div className="border-b border-cyan-100 bg-cyan-50 px-5 py-4 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Selected Destination
              </p>

              <p
                className="mt-1 font-bold"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                {
                  enquiryData.destination
                }
              </p>
            </div>
          )}

        {/* Cab */}

        {enquiryData.source ===
          "cab" &&
          enquiryData.vehicleType && (
            <div className="border-b border-cyan-100 bg-cyan-50 px-5 py-4 sm:px-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Selected Vehicle
              </p>

              <p
                className="mt-1 font-bold"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                {
                  enquiryData.vehicleType
                }
              </p>
            </div>
          )}

        {/* Form */}

        <div className="px-5 py-6 sm:px-7">
          <EnquiryForm
            key={formKey}
            formKey={formKey}
          />
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;