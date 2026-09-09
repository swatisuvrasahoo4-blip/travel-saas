import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  Agency,
  getAgencyByDomain,
} from "@/services/agencyService";

const FeaturedDestinations = () => {
  const [agency, setAgency] =
    useState<Agency | null>(null);

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
          "Unable to load featured destinations:",
          error
        );
      }
    };

    loadAgency();
  }, []);

  if (!agency) {
    return null;
  }

  const destinations =
    agency.featuredDestinations ?? [];

  if (destinations.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-10">
          <h2
            className="text-2xl font-bold sm:text-3xl"
            style={{
              color:
                agency.primaryColor,
            }}
          >
            Popular Destinations in Odisha
          </h2>

          <div
            className="mx-auto mt-3 h-1 w-16 rounded-full"
            style={{
              backgroundColor:
                agency.accentColor,
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-4">
          {destinations.map(
            (destination, index) => (
              <Link
                key={`${destination.slug}-${index}`}
                href={`/destinations/${destination.slug}`}
                className="
                  group
                  block
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-100
                  bg-white
                  shadow-md
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-2
                  hover:shadow-2xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                "
                style={{
                  "--tw-ring-color":
                    agency.accentColor,
                } as React.CSSProperties}
              >
                <div className="relative aspect-3/2 w-full overflow-hidden bg-gray-100">
                  <img
                    src={
                      destination.image
                    }
                    alt={
                      destination.name
                    }
                    className="
                      size-full
                      object-cover
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      transition-colors
                      duration-300
                      group-hover:bg-black/15
                    "
                  />
                </div>

                <div className="px-4 py-4 text-center">
                  <h3
                    className="
                      text-lg
                      font-bold
                      transition-colors
                      duration-300
                    "
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.color =
                        agency.accentColor;
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.color =
                        agency.primaryColor;
                    }}
                  >
                    {destination.name}
                  </h3>

                  {destination.subtitle && (
                    <p className="mt-1 text-sm leading-5 text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                      {
                        destination.subtitle
                      }
                    </p>
                  )}
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;