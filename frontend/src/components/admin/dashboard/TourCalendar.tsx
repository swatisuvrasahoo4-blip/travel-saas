import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import {
  useMemo,
  useState,
} from "react";

interface CalendarTour {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status:
    | "confirmed"
    | "active"
    | "cancelled";
}

interface CalendarDay {
  day: number;
  currentMonth: boolean;
  date: Date;
}

interface TourCalendarProps {
  tours?: CalendarTour[];
}

const TourCalendar = ({
  tours = [],
}: TourCalendarProps) => {
  const today = new Date();

  const [
    currentDate,
    setCurrentDate,
  ] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )
  );

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const monthName =
    currentDate.toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      }
    );

  const calendarDays =
    useMemo<CalendarDay[]>(() => {
      const firstDay =
        new Date(
          year,
          month,
          1
        ).getDay();

      const daysInMonth =
        new Date(
          year,
          month + 1,
          0
        ).getDate();

      const previousMonthDays =
        new Date(
          year,
          month,
          0
        ).getDate();

      const days: CalendarDay[] =
        [];

      /*
       * Previous month days
       */

      for (
        let index =
          firstDay - 1;
        index >= 0;
        index -= 1
      ) {
        const day =
          previousMonthDays -
          index;

        days.push({
          day,
          currentMonth: false,
          date: new Date(
            year,
            month - 1,
            day
          ),
        });
      }

      /*
       * Current month days
       */

      for (
        let day = 1;
        day <= daysInMonth;
        day += 1
      ) {
        days.push({
          day,
          currentMonth: true,
          date: new Date(
            year,
            month,
            day
          ),
        });
      }

      /*
       * Next month days
       * Fill calendar to 6 rows.
       */

      let nextDay = 1;

      while (
        days.length < 42
      ) {
        days.push({
          day: nextDay,
          currentMonth: false,
          date: new Date(
            year,
            month + 1,
            nextDay
          ),
        });

        nextDay += 1;
      }

      return days;
    }, [
      year,
      month,
    ]);

  const goPreviousMonth =
    () => {
      setCurrentDate(
        new Date(
          year,
          month - 1,
          1
        )
      );
    };

  const goNextMonth =
    () => {
      setCurrentDate(
        new Date(
          year,
          month + 1,
          1
        )
      );
    };

  const isToday = (
    date: Date
  ) => {
    return (
      date.getDate() ===
        today.getDate() &&
      date.getMonth() ===
        today.getMonth() &&
      date.getFullYear() ===
        today.getFullYear()
    );
  };

  const getToursForDate = (
    date: Date
  ) => {
    const selectedDate =
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime();

    return tours.filter(
      (tour) => {
        const tourStart =
          new Date(
            tour.startDate
          );

        const tourEnd =
          new Date(
            tour.endDate
          );

        const start =
          new Date(
            tourStart.getFullYear(),
            tourStart.getMonth(),
            tourStart.getDate()
          ).getTime();

        const end =
          new Date(
            tourEnd.getFullYear(),
            tourEnd.getMonth(),
            tourEnd.getDate()
          ).getTime();

        return (
          selectedDate >= start &&
          selectedDate <= end
        );
      }
    );
  };

  return (
    <section className="rounded-2xl border border-[#e1eaee] bg-white p-5 shadow-[0_8px_30px_rgba(6,54,74,0.04)] sm:p-6">
      {/* Header */}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays
              size={20}
              className="text-[#0b749c]"
            />

            <h2 className="text-lg font-semibold text-[#06364a]">
              Tour Calendar
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Upcoming and active
            tour bookings.
          </p>
        </div>

        <Link
          href="/admin/calendar"
          className="text-sm font-semibold text-[#0b749c] transition hover:text-[#06364a]"
        >
          View full calendar
        </Link>
      </div>

      {/* Month controls */}

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#264c5c]">
          {monthName}
        </h3>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={
              goPreviousMonth
            }
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce7eb] text-[#52727f] transition hover:bg-[#eef8fc] hover:text-[#06364a]"
          >
            <ChevronLeft
              size={18}
            />
          </button>

          <button
            type="button"
            onClick={
              goNextMonth
            }
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dce7eb] text-[#52727f] transition hover:bg-[#eef8fc] hover:text-[#06364a]"
          >
            <ChevronRight
              size={18}
            />
          </button>
        </div>
      </div>

      {/* Calendar */}

      <div className="overflow-hidden rounded-xl border border-[#e4ecef]">
        {/* Week headings */}

        <div className="grid grid-cols-7 bg-[#f7fafb]">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              key={day}
              className="border-r border-[#e4ecef] px-1 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400 last:border-r-0 sm:text-xs"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}

        <div className="grid grid-cols-7">
          {calendarDays.map(
            (
              calendarDay,
              index
            ) => {
              const dayTours =
                getToursForDate(
                  calendarDay.date
                );

              return (
                <div
                  key={`${calendarDay.date.toISOString()}-${index}`}
                  className="min-h-[72px] border-r border-t border-[#edf2f4] p-1.5 sm:min-h-[90px] sm:p-2"
                >
                  {/* Day number */}

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                      isToday(
                        calendarDay.date
                      )
                        ? "bg-[#06364a] text-white"
                        : calendarDay.currentMonth
                          ? "text-[#456775]"
                          : "text-slate-300"
                    }`}
                  >
                    {
                      calendarDay.day
                    }
                  </div>

                  {/* Tours */}

                  <div className="mt-1 space-y-1">
                    {dayTours
                      .slice(0, 2)
                      .map(
                        (tour) => (
                          <div
                            key={
                              tour.id
                            }
                            title={
                              tour.destination
                            }
                            className={`truncate rounded-md px-1.5 py-1 text-[9px] font-medium sm:text-[10px] ${
                              tour.status ===
                              "cancelled"
                                ? "bg-red-50 text-red-600"
                                : tour.status ===
                                    "active"
                                  ? "bg-orange-50 text-orange-600"
                                  : "bg-[#eaf7fb] text-[#08739b]"
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
                      <p className="px-1 text-[9px] font-semibold text-slate-400">
                        +
                        {dayTours.length -
                          2}{" "}
                        more
                      </p>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default TourCalendar;