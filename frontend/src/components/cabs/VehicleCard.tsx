import Image from "next/image";

import {
  Send,
} from "lucide-react";

import {
  useEnquiry,
} from "@/components/enquiry/EnquiryProvider";

import type {
  Vehicle,
} from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({
  vehicle,
}: VehicleCardProps) => {
  const {
    openEnquiry,
  } = useEnquiry();

  const handleEnquiry = () => {
    openEnquiry({
      source: "cab",
      vehicleType:
        vehicle.name,
    });
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Vehicle Image */}

      <div className="relative h-52 bg-[#f7f7f3]">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Vehicle Details */}

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">
          {vehicle.name}
        </h3>

        <p className="mt-1 font-medium text-emerald-700">
          {vehicle.seater}
        </p>

        {vehicle.features.length >
          0 && (
          <ul className="mt-5 space-y-2">
            {vehicle.features.map(
              (feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />

                  <span>
                    {feature}
                  </span>
                </li>
              )
            )}
          </ul>
        )}

        {/* Enquiry Button */}

        <button
          type="button"
          onClick={
            handleEnquiry
          }
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06364a] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          <Send size={17} />

          Enquire
        </button>
      </div>
    </article>
  );
};

export default VehicleCard;