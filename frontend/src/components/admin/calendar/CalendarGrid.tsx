import CalendarDay from "@/components/admin/calendar/CalendarDay";

import type {
  AdminCalendarTour,
} from "@/services/adminTourCalendarService";

import {
  WEEK_DAYS,
} from "@/utils/tourCalendar";

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date;
  calendarDays: Date[];
  tours: AdminCalendarTour[];
  onSelectDate: (
    date: Date
  ) => void;
}

const CalendarGrid = ({
  currentMonth,
  selectedDate,
  calendarDays,
  tours,
  onSelectDate,
}: CalendarGridProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e1eaee] bg-white">
      <div className="grid grid-cols-7 border-b border-[#e8eff2] bg-[#f8fbfc]">
        {WEEK_DAYS.map(
          (day) => (
            <div
              key={day}
              className="py-3 text-center text-xs font-bold uppercase tracking-wide text-[#78919b]"
            >
              {day}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map(
          (date) => (
            <CalendarDay
              key={date.toISOString()}
              date={date}
              currentMonth={
                currentMonth
              }
              selectedDate={
                selectedDate
              }
              tours={tours}
              onSelectDate={
                onSelectDate
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;