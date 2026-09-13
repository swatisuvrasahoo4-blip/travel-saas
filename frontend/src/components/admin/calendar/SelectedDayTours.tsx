import {
  CalendarDays,
  Clock,
  Truck,
} from "lucide-react";

import type {
  AdminCalendarTour,
} from "@/services/adminTourCalendarService";

import {
  formatTourTime,
} from "@/utils/tourCalendar";

import TourStatusBadge from "./TourStatusBadge";

interface SelectedDayToursProps {
  selectedDate: Date;
  tours: AdminCalendarTour[];
  onSelectTour: (
    tour: AdminCalendarTour
  ) => void;
}

const SelectedDayTours = ({
  selectedDate,
  tours,
  onSelectTour,
}: SelectedDayToursProps) => {
  return (
    <div className="h-fit rounded-2xl border border-[#e1eaee] bg-white p-5 xl:sticky xl:top-5">
      <div className="border-b border-[#edf2f4] pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78919b]">
          Selected Date
        </p>

        <h3 className="mt-1 font-serif text-2xl text-[#06364a]">
          {selectedDate.toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {tours.length}{" "}
          {tours.length === 1
            ? "tour"
            : "tours"}
        </p>
      </div>

      {tours.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
          <CalendarDays
            size={34}
            className="text-[#aac0c8]"
          />

          <p className="mt-4 font-semibold text-[#31515e]">
            No tours scheduled
          </p>

          <p className="mt-1 text-sm text-slate-500">
            There are no tours for
            this date.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {tours.map(
            (tour) => (
              <button
                key={tour.id}
                type="button"
                onClick={() =>
                  onSelectTour(
                    tour
                  )
                }
                className="w-full rounded-xl border border-[#e2ebee] p-4 text-left transition hover:border-[#b9d4de] hover:bg-[#f8fbfc]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#06364a]">
                      {
                        tour.destination
                      }
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {
                        tour.customerName
                      }
                    </p>
                  </div>

                  <TourStatusBadge
                    status={
                      tour.status
                    }
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-[#607b86]">
                  <Clock
                    size={14}
                  />

                  {formatTourTime(
                    tour.startDateTime
                  )}
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-[#607b86]">
                  <Truck
                    size={14}
                  />

                  {
                    tour.vehicleNumber
                  }
                </div>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SelectedDayTours;