import {
  CalendarDays,
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
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useAgency,
} from "@/context/AgencyContext";

import {
  useEnquiry,
} from "@/components/enquiry/EnquiryProvider";

/* =========================================
   FORM
========================================= */

interface EnquiryFormProps {
  formKey: string;
}

const EnquiryForm = ({
  formKey,
}: EnquiryFormProps) => {
  const {
    agency,
  } = useAgency();

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
    message,
    setMessage,
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

  /*
    If the destination came from
    Destination Details page and is
    not present in enquiryOptions,
    still show it in the dropdown.
  */

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

  const isPackageEnquiry =
    enquiryData.source ===
    "package";

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log({
      source:
        enquiryData.source,

      packageName:
        enquiryData.packageName,

      packageId:
        enquiryData.packageId,

      name,
      phone,
      email,
      destination:
        isPackageEnquiry
          ? ""
          : destination,
      travelDate,
      travellers,
      tripType,
      message,
    });
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
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={name}
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
            required
            value={phone}
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

      {/* Destination */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
          Destination
        </label>

        <div className="relative">
          <MapPin
            size={18}
            className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
              isPackageEnquiry
                ? "text-gray-300"
                : "text-gray-400"
            }`}
          />

          <select
            value={
              isPackageEnquiry
                ? ""
                : destination
            }
            disabled={
              isPackageEnquiry
            }
            onChange={(event) =>
              setDestination(
                event.target.value
              )
            }
            className={`w-full appearance-none rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition ${
              isPackageEnquiry
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "border-gray-200 bg-white text-gray-800 focus:border-orange-400"
            }`}
          >
            <option value="">
              {isPackageEnquiry
                ? "Included in selected package"
                : "Select destination"}
            </option>

            {!isPackageEnquiry &&
              destinationOptions.map(
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

        {isPackageEnquiry && (
          <p className="mt-1.5 text-xs text-gray-400">
            Destination is determined by
            the selected tour package.
          </p>
        )}
      </div>

      {/* Date + Travellers */}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Travel Date */}

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

        {/* Travellers */}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            Travellers
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
              placeholder="No. of travellers"
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400"
            />
          </div>
        </div>
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

      {/* Actions */}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={
            closeEnquiry
          }
          className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90"
          style={{
            backgroundColor:
              agency.accentColor,
          }}
        >
          <Send size={17} />

          Send Enquiry
        </button>
      </div>
    </form>
  );
};

/* =========================================
   MODAL
========================================= */

const EnquiryModal = () => {
  const {
    agency,
  } = useAgency();

  const {
    isOpen,
    enquiryData,
    closeEnquiry,
  } = useEnquiry();

  /* =========================================
     ESCAPE KEY
  ========================================= */

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

  /* =========================================
     HEADING
  ========================================= */

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
      "Tell us your travel details for this tour package.";
  }

  if (
    enquiryData.source ===
    "trip"
  ) {
    title =
      "Plan Your Trip";

    subtitle =
      "Share your travel preferences and we'll help create your journey.";
  }

  const formKey = [
    enquiryData.source,
    enquiryData.destination,
    enquiryData.packageId,
    enquiryData.packageName,
    enquiryData.travelDate,
    enquiryData.travellers,
    enquiryData.tripType,
  ].join("-");

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-5"
      onClick={
        closeEnquiry
      }
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
            onClick={
              closeEnquiry
            }
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

        {/* Package Selected */}

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

        {/* Destination Selected */}

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