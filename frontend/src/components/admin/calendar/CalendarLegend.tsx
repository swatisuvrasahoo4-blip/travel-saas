interface LegendItemProps {
  label: string;
  className: string;
}

const LegendItem = ({
  label,
  className,
}: LegendItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${className}`}
      />

      <span className="text-xs font-medium text-[#607b86]">
        {label}
      </span>
    </div>
  );
};

const CalendarLegend = () => {
  return (
    <div className="flex flex-wrap gap-4 rounded-2xl border border-[#e1eaee] bg-white px-5 py-4">
      <LegendItem
        label="Confirmed"
        className="bg-blue-100"
      />

      <LegendItem
        label="Active"
        className="bg-green-100"
      />

      <LegendItem
        label="Cancelled"
        className="bg-red-100"
      />
    </div>
  );
};

export default CalendarLegend;