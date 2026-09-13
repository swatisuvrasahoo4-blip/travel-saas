import type {
  AdminCalendarTour,
} from "@/services/adminTourCalendarService";

import {
  doesTourOverlapDay,
  isSameDay,
} from "@/utils/tourCalendar";

interface CalendarDayProps {
  date: Date;
  currentMonth: Date;
  selectedDate: Date;
  tours: AdminCalendarTour[];
  onSelectDate: (
    date: Date
  ) => void;
}

const CalendarDay = ({
  date,
  currentMonth,
  selectedDate,
  tours,
  onSelectDate,
}: CalendarDayProps) => {
  const isCurrentMonth =
    date.getMonth() ===
    currentMonth.getMonth();

  const isToday =
    isSameDay(
      date,
      new Date()
    );

  const isSelected =
    isSameDay(
      date,
      selectedDate
    );

  const dayTours =
    tours.filter(
      (tour) =>
        doesTourOverlapDay(
          tour,
          date
        )
    );

  return (
    <button
      type="button"
      onClick={() =>
        onSelectDate(
          new Date(date)
        )
      }
      className={`min-h-[105px] border-b border-r border-[#edf2f4] p-2 text-left transition sm:min-h-[125px] ${
        isSelected
          ? "bg-[#eef8fc]"
          : "bg-white hover:bg-[#f9fcfd]"
      } ${
        !isCurrentMonth
          ? "opacity-45"
          : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
            isToday
              ? "bg-[#06364a] text-white"
              : isSelected
                ? "bg-[#d9eff7] text-[#06364a]"
                : "text-[#31515e]"
          }`}
        >
          {date.getDate()}
        </span>

        {dayTours.length >
          0 && (
          <span className="text-[10px] font-semibold text-[#78919b]">
            {dayTours.length}
          </span>
        )}
      </div>

      <div className="space-y-1">
        {dayTours
          .slice(
            0,
            2
          )
          .map(
            (tour) => (
              <div
                key={
                  tour.id
                }
                className={`truncate rounded-md px-2 py-1 text-[10px] font-semibold sm:text-[11px] ${
                  tour.status ===
                  "active"
                    ? "bg-green-100 text-green-700"
                    : tour.status ===
                        "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {
                  tour.destination
                }
              </div>
            )
          )}

        {dayTours.length >
          2 && (
          <p className="px-1 text-[10px] font-semibold text-[#69838e]">
            +
            {dayTours.length -
              2}{" "}
            more
          </p>
        )}
      </div>
    </button>
  );
};

export default CalendarDay;