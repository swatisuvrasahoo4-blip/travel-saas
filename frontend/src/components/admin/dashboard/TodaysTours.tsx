import {
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

interface TodayTour {
  id: string;
  destination: string;
  customerName: string;
  travellers: number;
  startTime: string;
  vehicleNumber?: string;
  status:
    | "confirmed"
    | "active";
}

interface TodaysToursProps {
  tours?: TodayTour[];
}

const TodaysTours = ({
  tours = [],
}: TodaysToursProps) => {
  return (
    <section className="rounded-2xl border border-[#e1eaee] bg-white p-5 shadow-[0_8px_30px_rgba(6,54,74,0.04)] sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#06364a]">
          Today&apos;s Tours
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Tours scheduled for today.
        </p>
      </div>

      {tours.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7e5ea] bg-[#fbfdfe] px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8fc] text-[#0b749c]">
            <CalendarDays
              size={25}
            />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-[#264c5c]">
            No tours today
          </h3>

          <p className="mt-2 max-w-[250px] text-xs leading-5 text-slate-400">
            Confirmed or active tours
            scheduled for today will
            appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tours.map(
            (tour) => (
              <div
                key={tour.id}
                className="rounded-xl border border-[#e5edf0] bg-[#fbfdfe] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        size={16}
                        className="text-[#0b749c]"
                      />

                      <h3 className="text-sm font-semibold text-[#153d4c]">
                        {
                          tour.destination
                        }
                      </h3>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      {
                        tour.customerName
                      }
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      tour.status ===
                      "active"
                        ? "bg-orange-50 text-orange-600"
                        : "bg-[#eaf7fb] text-[#08739b]"
                    }`}
                  >
                    {tour.status ===
                    "active"
                      ? "Active"
                      : "Confirmed"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#edf2f4] pt-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={14}
                    />

                    <span>
                      {
                        tour.startTime
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users
                      size={14}
                    />

                    <span>
                      {
                        tour.travellers
                      }{" "}
                      travellers
                    </span>
                  </div>
                </div>

                {tour.vehicleNumber && (
                  <p className="mt-3 text-xs text-slate-500">
                    Vehicle:{" "}
                    <span className="font-semibold text-[#264c5c]">
                      {
                        tour.vehicleNumber
                      }
                    </span>
                  </p>
                )}
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default TodaysTours;