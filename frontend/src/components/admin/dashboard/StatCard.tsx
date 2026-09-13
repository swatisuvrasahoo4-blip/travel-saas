import {
  LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-[#e1eaee] bg-white p-5 shadow-[0_8px_30px_rgba(6,54,74,0.04)]">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef8fc] text-[#0b749c]">
          <Icon
            size={21}
          />
        </div>
      </div>

      <p className="text-3xl font-semibold text-[#06364a]">
        {value}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#264c5c]">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {subtitle}
      </p>
    </div>
  );
};

export default StatCard;