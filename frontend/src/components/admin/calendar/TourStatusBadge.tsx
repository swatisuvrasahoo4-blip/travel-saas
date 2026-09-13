import type {
  CalendarTourStatus,
} from "@/services/adminTourCalendarService";

interface TourStatusBadgeProps {
  status: CalendarTourStatus;
}

const TourStatusBadge = ({
  status,
}: TourStatusBadgeProps) => {
  const classes =
    status === "active"
      ? "bg-green-100 text-green-700"
      : status === "cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700";

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${classes}`}
    >
      {status}
    </span>
  );
};

export default TourStatusBadge;