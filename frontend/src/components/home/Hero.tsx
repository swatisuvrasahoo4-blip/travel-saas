import {
  CalendarDays,
  Check,
  ChevronDown,
  MapPin,
  Search,
  Send,
  Users,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  useAgency,
} from "@/context/AgencyContext";

import {
  useEnquiry,
} from "@/components/enquiry/EnquiryProvider";

/* =========================================
   DESTINATION FIELD
========================================= */

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
  const shouldReduceMotion =
    useReducedMotion();

  const search =
    destination
      .trim()
      .toLowerCase();

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
      className="relative z-50 min-w-0 flex-1"
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
          onFocus={() => {
            setIsOpen(true);
          }}
          placeholder="Where do you want to go?"
          autoComplete="off"
          className="w-full min-w-0 bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
        />

        <motion.div
          animate={{
            rotate: isOpen
              ? 180
              : 0,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 0.2,
          }}
        >
          <ChevronDown
            size={17}
            className="shrink-0 text-gray-400"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen &&
          filteredDestinations.length >
            0 && (
            <motion.div
              initial={
                shouldReduceMotion
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                shouldReduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }
              }
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.2,
              }}
              className="absolute left-0 top-full z-[100] mt-3 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white py-2 shadow-xl"
            >
              {filteredDestinations.map(
                (item) => {
                  const selected =
                    destination ===
                    item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setDestination(
                          item
                        );

                        setIsOpen(
                          false
                        );
                      }}
                      className={`flex min-h-11 w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? "bg-orange-50 font-semibold text-orange-600"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      }`}
                    >
                      <span className="min-w-0 truncate">
                        {item}
                      </span>

                      {selected && (
                        <Check
                          size={16}
                          className="shrink-0 text-orange-600"
                        />
                      )}
                    </button>
                  );
                }
              )}
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================
   DATE FIELD
========================================= */

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
          className="w-full min-w-0 bg-transparent text-sm font-medium text-gray-800 outline-none"
        />
      </div>
    </div>
  );
};

/* =========================================
   TRAVELLER FIELD
========================================= */

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
          className="w-full min-w-0 bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

/* =========================================
   TRIP TYPE FIELD
========================================= */

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
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <div
      ref={containerRef}
      className="relative z-50 min-w-0 flex-1"
    >
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
        Trip Type
      </label>

      <button
        type="button"
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="flex w-full min-w-0 items-center justify-between gap-3 text-left"
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

        <motion.div
          animate={{
            rotate: isOpen
              ? 180
              : 0,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 0.2,
          }}
        >
          <ChevronDown
            size={17}
            className="shrink-0 text-gray-400"
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen &&
          tripTypes.length >
            0 && (
            <motion.div
              initial={
                shouldReduceMotion
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                shouldReduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      y: -6,
                      scale: 0.98,
                    }
              }
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.2,
              }}
              className="absolute left-0 top-full z-[100] mt-3 w-full overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-xl"
            >
              {tripTypes.map(
                (item) => {
                  const selected =
                    tripType === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setTripType(
                          item
                        );

                        setIsOpen(
                          false
                        );
                      }}
                      className={`flex min-h-11 w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        selected
                          ? "bg-orange-50 font-semibold text-orange-600"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      }`}
                    >
                      <span className="min-w-0 truncate">
                        {item}
                      </span>

                      {selected && (
                        <Check
                          size={16}
                          className="shrink-0 text-orange-600"
                        />
                      )}
                    </button>
                  );
                }
              )}
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================
   ENQUIRY BUTTON
========================================= */

interface EnquiryButtonProps {
  accentColor: string;
  destination: string;
  travelDate: string;
  travellers: string;
  tripType: string;
}

const EnquiryButton = ({
  accentColor,
  destination,
  travelDate,
  travellers,
  tripType,
}: EnquiryButtonProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  const {
    openEnquiry,
  } = useEnquiry();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              scale: 1.03,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.97,
            }
      }
      transition={{
        duration: 0.2,
      }}
    >
      <button
        type="button"
        onClick={() => {
          openEnquiry({
            source: "trip",
            destination:
              destination ||
              undefined,
            travelDate:
              travelDate ||
              undefined,
            travellers:
              travellers ||
              undefined,
            tripType:
              tripType ||
              undefined,
          });
        }}
        className="flex min-h-14 w-full shrink-0 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white shadow-md transition-shadow hover:shadow-lg"
        style={{
          backgroundColor:
            accentColor,
        }}
      >
        <Send size={18} />

        Enquire Now
      </button>
    </motion.div>
  );
};

/* =========================================
   HERO
========================================= */

const Hero = () => {
  const {
    agency,
    loading,
  } = useAgency();

  const {
    openEnquiry,
  } = useEnquiry();

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

  const shouldReduceMotion =
    useReducedMotion();

  const destinationRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const tripTypeRef =
    useRef<HTMLDivElement | null>(
      null
    );

  /* =========================================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ========================================= */

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
        setDestinationOpen(
          false
        );
      }

      if (
        tripTypeRef.current &&
        !tripTypeRef.current.contains(
          target
        )
      ) {
        setTripTypeOpen(
          false
        );
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

  /* =========================================
     AGENCY LOADING
  ========================================= */

  if (loading) {
    return (
      <section className="flex min-h-128 items-center justify-center bg-gray-100">
        <div
          className="size-7 animate-spin rounded-full border-2 border-gray-300 border-t-orange-600"
          aria-label="Loading"
        />
      </section>
    );
  }

  /* =========================================
     AGENCY NOT FOUND
  ========================================= */

  if (!agency) {
    return (
      <section className="flex min-h-128 items-center justify-center bg-gray-100 px-4">
        <p className="text-center text-sm text-gray-500">
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
      className="relative z-20 min-h-128 overflow-visible bg-cover bg-[85%_center] bg-no-repeat md:bg-center"
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
        <div className="w-full min-w-0">
          <motion.div
            className="max-w-2xl"
            initial={
              shouldReduceMotion
                ? false
                : "hidden"
            }
            animate="visible"
            variants={{
              hidden: {},

              visible: {
                transition: {
                  staggerChildren:
                    shouldReduceMotion
                      ? 0
                      : 0.1,
                },
              },
            }}
          >
            <motion.p
              className="mb-3 text-sm font-bold uppercase tracking-[0.2em]"
              style={{
                color:
                  agency.accentColor,
              }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 16,
                },

                visible: {
                  opacity: 1,
                  y: 0,

                  transition: {
                    duration:
                      0.45,
                  },
                },
              }}
            >
              Discover Incredible
              Journeys
            </motion.p>

            <motion.h1
              className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
              style={{
                color:
                  agency.primaryColor,
              }}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 22,
                },

                visible: {
                  opacity: 1,
                  y: 0,

                  transition: {
                    duration:
                      0.55,
                  },
                },
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
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                },

                visible: {
                  opacity: 1,
                  y: 0,

                  transition: {
                    duration:
                      0.5,
                  },
                },
              }}
            >
              Discover beautiful
              destinations, memorable
              journeys and comfortable
              travel experiences with
              trusted service.
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 18,
                },

                visible: {
                  opacity: 1,
                  y: 0,

                  transition: {
                    duration:
                      0.45,
                  },
                },
              }}
            >
              {/* Explore Tours */}

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.03,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
              >
                <Link
                  href="/packages"
                  className="block rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-shadow hover:shadow-lg"
                  style={{
                    backgroundColor:
                      agency.accentColor,
                  }}
                >
                  Explore Tours
                </Link>
              </motion.div>

              {/* Plan Your Trip */}

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.03,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    openEnquiry({
                      source:
                        "trip",
                    })
                  }
                  className="block rounded-xl border-2 bg-white/80 px-6 py-3 text-sm font-bold backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
                  style={{
                    borderColor:
                      agency.primaryColor,

                    color:
                      agency.primaryColor,
                  }}
                >
                  Plan Your Trip
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* =================================
              SEARCH / ENQUIRY BAR
          ================================= */}

          <motion.div
            className="relative z-50 mt-9 w-full min-w-0"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 35,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.65,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.35,
            }}
          >
            <div className="overflow-visible rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-sm md:p-5">
              <div className="grid min-w-0 gap-5 md:grid-cols-2 lg:flex lg:items-end lg:gap-0">
                {/* Destination */}

                <div className="relative z-50 min-w-0 lg:flex-1 lg:border-r lg:border-gray-200 lg:px-5 lg:first:pl-0">
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

                {/* Date */}

                <div className="min-w-0 lg:flex-1 lg:border-r lg:border-gray-200 lg:px-5">
                  <DateField
                    travelDate={
                      travelDate
                    }
                    setTravelDate={
                      setTravelDate
                    }
                  />
                </div>

                {/* Travellers */}

                <div className="min-w-0 lg:flex-1 lg:border-r lg:border-gray-200 lg:px-5">
                  <TravellerField
                    travellers={
                      travellers
                    }
                    setTravellers={
                      setTravellers
                    }
                  />
                </div>

                {/* Trip Type - desktop only */}

                <div className="relative z-50 hidden min-w-0 lg:block lg:flex-1 lg:px-5">
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

                {/* Enquire */}

                <div className="min-w-0 md:col-span-2 lg:col-span-1 lg:ml-4">
                  <EnquiryButton
                    accentColor={
                      agency.accentColor
                    }
                    destination={
                      destination
                    }
                    travelDate={
                      travelDate
                    }
                    travellers={
                      travellers
                    }
                    tripType={
                      tripType
                    }
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;