import {
  ArrowRight,
  Clock3,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  getFeaturedPackages,
  TourPackage,
} from "@/services/packageService";

const TourPackages = () => {
  const [packages, setPackages] =
    useState<TourPackage[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const loadPackages = async () => {
      try {
        const hostname =
          window.location.hostname;

        const packageData =
          await getFeaturedPackages(
            hostname
          );

        if (!isCancelled) {
          setPackages(packageData);
        }
      } catch (error) {
        console.error(
          "Unable to load featured packages:",
          error
        );
      }
    };

    loadPackages();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f8fafb] pb-16 pt-8 md:pb-20 md:pt-10">
      <div className="mx-auto max-w-[1700px] px-3 sm:px-4 lg:px-5">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#06364a] md:text-4xl">
              Our Tour Packages
            </h2>

            <div className="mt-2 h-1 w-16 rounded-full bg-[#ea580c]" />

            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              Handpicked itineraries
              to help you explore the
              best of Odisha.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#06364a] transition hover:text-[#ea580c]"
          >
            View All Packages

            <ArrowRight size={18} />
          </Link>
        </div>

        {/* 5 Card Row */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {packages.map(
            (tourPackage) => (
              <article
                key={tourPackage._id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <Link
                  href={`/packages/${tourPackage.slug}`}
                  className="block"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={
                        tourPackage.cardImage
                      }
                      alt={
                        tourPackage.name
                      }
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <Link
                    href={`/packages/${tourPackage.slug}`}
                  >
                    <h3 className="text-lg font-bold leading-6 text-[#06364a] transition hover:text-[#ea580c]">
                      {
                        tourPackage.name
                      }
                    </h3>
                  </Link>

                  <div className="mt-3 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={16}
                        className="shrink-0 text-[#ea580c]"
                      />

                      <span>
                        {
                          tourPackage.duration
                        }
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-[#ea580c]"
                      />

                      <span className="line-clamp-2">
                        {tourPackage
                          .destinations
                          .map(
                            (
                              destination
                            ) =>
                              destination.name
                          )
                          .join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Actions */}
<div className="mt-auto pt-4">
  <div className="flex items-center justify-between gap-1.5 border-t border-gray-100 pt-3">
    <Link
      href={`/packages/${tourPackage.slug}`}
      className="whitespace-nowrap text-xs font-semibold text-[#06364a] transition hover:text-[#ea580c]"
    >
      View Details
    </Link>

    <Link
      href={`/enquiry?package=${encodeURIComponent(
        tourPackage.slug
      )}`}
      className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-[#ea580c] px-2.5 py-2 text-xs font-semibold text-white transition hover:opacity-90"
    >
      Enquire Now

      <ArrowRight size={13} />
    </Link>
  </div>
</div>
                </div>
              </article>
            )
          )}

          {/* Custom Tour Plan Card */}
          <article
            className="relative flex min-h-[390px] overflow-hidden rounded-2xl border border-orange-100 bg-cover bg-center shadow-sm"
            style={{
              backgroundImage:
                "url('/images/packages/custom-tour-bg.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/76 to-transparent" />

            <div className="relative z-10 flex h-full max-w-[80%] flex-col justify-center p-6">
              <h3 className="text-2xl font-bold leading-tight text-[#06364a]">
                Need a Custom
                <br />
                Tour Plan?
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-700">
                Tell us your
                preferences and
                we&apos;ll create a
                memorable itinerary
                for you.
              </p>

              <Link
                href="/plan-my-trip"
                className="mt-7 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-lg bg-[#f59e0b] px-5 py-3 text-sm font-bold text-[#06364a] transition hover:bg-[#ea8c00]"
              >
                Plan My Trip

                <ArrowRight
                  size={17}
                />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;