import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  MessageSquareText,
  XCircle,
} from "lucide-react";

import StatCard from "./StatCard";

interface DashboardStatsProps {
  totalEnquiries: number;
  newEnquiries: number;
  activeTours: number;
  completedTours: number;
  cancelledTours: number;
}

const DashboardStats = ({
  totalEnquiries,
  newEnquiries,
  activeTours,
  completedTours,
  cancelledTours,
}: DashboardStatsProps) => {
  const stats = [
    {
      title: "Total Enquiries",
      value: totalEnquiries,
      subtitle: "All customer enquiries",
      icon: MessageSquareText,
    },
    {
      title: "New Enquiries",
      value: newEnquiries,
      subtitle: "Waiting for review",
      icon: ClipboardList,
    },
    {
      title: "Active Tours",
      value: activeTours,
      subtitle: "Currently ongoing",
      icon: CalendarDays,
    },
    {
      title: "Completed Tours",
      value: completedTours,
      subtitle: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Cancelled Tours",
      value: cancelledTours,
      subtitle: "Cancelled bookings",
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default DashboardStats;