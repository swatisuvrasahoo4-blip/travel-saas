import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
  Send,
  Users,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";

import {
  Agency,
  getAgencyByDomain,
} from "@/services/agencyService";

interface DestinationFieldProps {
  destination: string;
  setDestination: (
    value: string
  ) => void;
  destinations: string[];
  isOpen: boolean;
  setIsOpen: (
    value: boolean
  ) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const DestinationField = ({
  destination,
  setDestination,
  destinations,
  isOpen,
  setIsOpen,
  containerRef,
}: DestinationFieldProps) => {
  const search =
    destination.trim().toLowerCase();

  const filteredDestinations =
    search
      ? destinations.filter(
          (item) =>
            item
              .toLowerCase()
              .includes(search)
        )
      : destinations;

  return (
    <div
      ref={containerRef}
      className="relative min-w-0 flex-1"
    >
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
        Destination
      </label>

      <div className="flex items-center gap-3">
        <MapPin
          size={20}
          className="shrink-0 text-orange-600"
        />

        <input
          type="text"
          value={destination}
          onChange={(event) => {
            setDestination(
              event.target.value
            );
            setIsOpen(true);
          }}
          onFocus={() =>
            setIsOpen(true)
          }
          placeholder="Where do you want to go?"
          autoComplete="off"
          className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>

      {isOpen &&
        filteredDestinations.length >
          0 && (
          <div className="absolute top-full left-0 z-40 mt-3 max-h-56 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
            {filteredDestinations.map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setDestination(item);
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}
    </div>
  );
};

interface DateFieldProps {
  travelDate: string;
  setTravelDate: (
    value: string
  ) => void;
}

const DateField = ({
  travelDate,
  setTravelDate,
}: DateFieldProps) => {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
        Travel Date
      </label>

      <div className="flex items-center gap-3">
        <CalendarDays
          size={20}
          className="shrink-0 text-orange-600"
        />

        <input
          type="date"
          value={travelDate}
          onChange={(event) =>
            setTravelDate(
              event.target.value
            )
          }
          className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none"
        />
      </div>
    </div>
  );
};

interface TravellerFieldProps {
  travellers: string;
  setTravellers: (
    value: string
  ) => void;
}

const TravellerField = ({
  travellers,
  setTravellers,
}: TravellerFieldProps) => {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
        Travellers
      </label>

      <div className="flex items-center gap-3">
        <Users
          size={20}
          className="shrink-0 text-orange-600"
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
          className="w-full bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

interface TripTypeFieldProps {
  tripType: string;
  setTripType: (
    value: string
  ) => void;
  tripTypes: string[];
  isOpen: boolean;
  setIsOpen: (
    value: boolean
  ) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const TripTypeField = ({
  tripType,
  setTripType,
  tripTypes,
  isOpen,
  setIsOpen,
  containerRef,
}: TripTypeFieldProps) => {
  return (
    <div
      ref={containerRef}
      className="relative min-w-0 flex-1"
    >
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
        Trip Type
      </label>

      <button
        type="button"
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div className="flex min-w-0 items-center gap-3">
          <Search
            size={20}
            className="shrink-0 text-orange-600"
          />

          <span
            className={`truncate text-sm font-medium ${
              tripType
                ? "text-gray-800"
                : "text-gray-400"
            }`}
          >
            {tripType ||
              "Select trip type"}
          </span>
        </div>

        <ChevronDown
          size={17}
          className={`shrink-0 text-gray-400 transition ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      {isOpen &&
        tripTypes.length > 0 && (
          <div className="absolute top-full left-0 z-40 mt-3 w-full rounded-xl border border-gray-200 bg-white py-2 shadow-xl">
            {tripTypes.map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTripType(item);
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}
    </div>
  );
};

interface EnquiryButtonProps {
  accentColor: string;
}

const EnquiryButton = ({
  accentColor,
}: EnquiryButtonProps) => {
  return (
    <Link
      href="/enquiry"
      className="flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white shadow-md transition hover:opacity-90"
      style={{
        backgroundColor:
          accentColor,
      }}
    >
      <Send size={18} />
      Enquire Now
    </Link>
  );
};

const Hero = () => {
  const [agency, setAgency] =
    useState<Agency | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    destination,
    setDestination,
  ] = useState("");

  const [
    travelDate,
    setTravelDate,
  ] = useState("");

  const [
    travellers,
    setTravellers,
  ] = useState("");

  const [
    tripType,
    setTripType,
  ] = useState("");

  const [
    destinationOpen,
    setDestinationOpen,
  ] = useState(false);

  const [
    tripTypeOpen,
    setTripTypeOpen,
  ] = useState(false);

  const destinationRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const tripTypeRef =
    useRef<HTMLDivElement | null>(
      null
    );

  useEffect(() => {
    const loadAgency = async () => {
      try {
        const hostname =
          window.location.hostname;

        const agencyData =
          await getAgencyByDomain(
            hostname
          );

        setAgency(agencyData);
      } catch (error) {
        console.error(
          "Unable to load hero agency:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAgency();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      if (
        destinationRef.current &&
        !destinationRef.current.contains(
          target
        )
      ) {
        setDestinationOpen(false);
      }

      if (
        tripTypeRef.current &&
        !tripTypeRef.current.contains(
          target
        )
      ) {
        setTripTypeOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-128 items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </section>
    );
  }

  if (!agency) {
    return (
      <section className="flex min-h-128 items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">
          Agency not found
        </p>
      </section>
    );
  }

  const destinations =
    agency.enquiryOptions
      ?.destinations ?? [];

  const tripTypes =
    agency.enquiryOptions
      ?.tripTypes ?? [];

  return (
    <section
      className="relative min-h-128 bg-cover bg-[85%_center] bg-no-repeat md:bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(255,255,255,0.98) 0%,
            rgba(255,255,255,0.92) 32%,
            rgba(255,255,255,0.45) 58%,
            rgba(255,255,255,0.08) 100%
          ),
          url("${agency.heroImage || "/images/hero.png"}")
        `,
      }}
    >
      <div className="mx-auto flex min-h-128 max-w-7xl items-center px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="w-full">
          <div className="max-w-2xl">
            <p
              className="mb-3 text-sm font-bold uppercase tracking-[0.2em]"
              style={{
                color:
                  agency.accentColor,
              }}
            >
              Discover Incredible
              Journeys
            </p>

            <h1
              className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
              style={{
                color:
                  agency.primaryColor,
              }}
            >
              Explore Odisha
              <br />
              With{" "}
              <span
                style={{
                  color:
                    agency.accentColor,
                }}
              >
                {agency.name}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Discover beautiful
              destinations, memorable
              journeys and comfortable
              travel experiences with
              trusted service.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/packages"
                className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90"
                style={{
                  backgroundColor:
                    agency.accentColor,
                }}
              >
                Explore Tours
              </Link>

              <Link
                href="/enquiry"
                className="rounded-xl border-2 bg-white/80 px-6 py-3 text-sm font-bold backdrop-blur-sm transition hover:bg-white"
                style={{
                  borderColor:
                    agency.primaryColor,
                  color:
                    agency.primaryColor,
                }}
              >
                Plan Your Trip
              </Link>
            </div>
          </div>

          <div className="mt-9 w-full">
            <div className="rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-sm md:p-5">
              <div className="grid gap-5 md:grid-cols-2 lg:flex lg:items-end lg:gap-0">
                <div className="lg:flex-1 lg:border-r lg:border-gray-200 lg:px-5 lg:first:pl-0">
                  <DestinationField
                    destination={
                      destination
                    }
                    setDestination={
                      setDestination
                    }
                    destinations={
                      destinations
                    }
                    isOpen={
                      destinationOpen
                    }
                    setIsOpen={
                      setDestinationOpen
                    }
                    containerRef={
                      destinationRef
                    }
                  />
                </div>

                <div className="lg:flex-1 lg:border-r lg:border-gray-200 lg:px-5">
                  <DateField
                    travelDate={
                      travelDate
                    }
                    setTravelDate={
                      setTravelDate
                    }
                  />
                </div>

                <div className="lg:flex-1 lg:border-r lg:border-gray-200 lg:px-5">
                  <TravellerField
                    travellers={
                      travellers
                    }
                    setTravellers={
                      setTravellers
                    }
                  />
                </div>

                <div className="lg:flex-1 lg:px-5">
                  <TripTypeField
                    tripType={
                      tripType
                    }
                    setTripType={
                      setTripType
                    }
                    tripTypes={
                      tripTypes
                    }
                    isOpen={
                      tripTypeOpen
                    }
                    setIsOpen={
                      setTripTypeOpen
                    }
                    containerRef={
                      tripTypeRef
                    }
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1 lg:ml-4">
                  <EnquiryButton
                    accentColor={
                      agency.accentColor
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;