import {
  Clock3,
  Compass,
  MapPin,
  Sun,
} from "lucide-react";

import type {
  Destination,
} from "@/services/destinationService";

interface DestinationOverviewProps {
  destination: Destination;
}

const DestinationOverview = ({
  destination,
}: DestinationOverviewProps) => {
  const information = [
    {
      label: "Location",
      value: destination.location,
      icon: MapPin,
    },
    {
      label: "Best Time to Visit",
      value: destination.bestTimeToVisit,
      icon: Sun,
    },
    {
      label: "Ideal Duration",
      value: destination.idealDuration,
      icon: Clock3,
    },
    {
      label: "Type",
      value: destination.type,
      icon: Compass,
    },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#06364a] sm:text-3xl">
            Discover {destination.name}
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-600" />

          <p className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-gray-600 sm:text-base">
            {destination.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {information.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-orange-50">
                  <Icon
                    size={22}
                    className="text-orange-600"
                  />
                </div>

                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {item.label}
                </p>

                <p className="mt-1 text-sm font-semibold text-[#06364a]">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DestinationOverview;