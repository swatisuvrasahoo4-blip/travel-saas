import type {
  AdminCalendarTour,
} from "@/services/adminTourCalendarService";

/* =========================================
   CONSTANTS
========================================= */

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

/* =========================================
   DATE HELPERS
========================================= */

export const isSameDay = (
  firstDate: Date,
  secondDate: Date
) => {
  return (
    firstDate.getFullYear() ===
      secondDate.getFullYear() &&
    firstDate.getMonth() ===
      secondDate.getMonth() &&
    firstDate.getDate() ===
      secondDate.getDate()
  );
};

export const startOfDay = (
  date: Date
) => {
  const value =
    new Date(date);

  value.setHours(
    0,
    0,
    0,
    0
  );

  return value;
};

export const endOfDay = (
  date: Date
) => {
  const value =
    new Date(date);

  value.setHours(
    23,
    59,
    59,
    999
  );

  return value;
};

/* =========================================
   TOUR DATE CHECK
========================================= */

export const doesTourOverlapDay = (
  tour: AdminCalendarTour,
  date: Date
) => {
  const start =
    new Date(
      tour.startDateTime
    );

  const end =
    new Date(
      tour.endDateTime
    );

  return (
    start <= endOfDay(date) &&
    end >= startOfDay(date)
  );
};

/* =========================================
   CALENDAR DAYS
========================================= */

export const getCalendarDays = (
  currentMonth: Date
) => {
  const year =
    currentMonth.getFullYear();

  const month =
    currentMonth.getMonth();

  const firstDay =
    new Date(
      year,
      month,
      1
    );

  const firstWeekDay =
    firstDay.getDay();

  const calendarStart =
    new Date(
      year,
      month,
      1 - firstWeekDay
    );

  return Array.from(
    {
      length: 42,
    },
    (_, index) => {
      const date =
        new Date(
          calendarStart
        );

      date.setDate(
        calendarStart.getDate() +
          index
      );

      return date;
    }
  );
};

/* =========================================
   FORMATTERS
========================================= */

export const formatTourTime = (
  value: string
) => {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

export const formatTourDate = (
  value: string
) => {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export const formatTourCurrency = (
  value: number
) => {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value);
};