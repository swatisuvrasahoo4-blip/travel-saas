import Image from "next/image";

import type { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({
  vehicle,
}: VehicleCardProps) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 bg-[#f7f7f3]">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">
          {vehicle.name}
        </h3>

        <p className="mt-1 font-medium text-emerald-700">
          {vehicle.seater}
        </p>

        {vehicle.features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {vehicle.features.map(
              (feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />

                  <span>{feature}</span>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </article>
  );
};

export default VehicleCard;