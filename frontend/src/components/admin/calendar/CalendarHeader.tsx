import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  MONTH_NAMES,
} from "@/utils/tourCalendar";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader = ({
  currentMonth,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#e1eaee] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <CalendarDays
            size={21}
            className="text-[#06364a]"
          />

          <h2 className="font-serif text-2xl text-[#06364a]">
            {
              MONTH_NAMES[
                currentMonth.getMonth()
              ]
            }{" "}
            {currentMonth.getFullYear()}
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Select a date to view
          scheduled tours.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce7eb] bg-white text-[#06364a] transition hover:bg-[#eef8fc]"
          aria-label="Previous month"
        >
          <ChevronLeft
            size={19}
          />
        </button>

        <button
          type="button"
          onClick={onToday}
          className="h-10 rounded-xl border border-[#dce7eb] bg-white px-4 text-sm font-semibold text-[#06364a] transition hover:bg-[#eef8fc]"
        >
          Today
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce7eb] bg-white text-[#06364a] transition hover:bg-[#eef8fc]"
          aria-label="Next month"
        >
          <ChevronRight
            size={19}
          />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;