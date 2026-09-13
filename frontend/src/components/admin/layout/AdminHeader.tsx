import {
  Menu,
} from "lucide-react";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

const AdminHeader = ({
  title,
  subtitle,
  onMenuClick,
}: AdminHeaderProps) => {
  const {
    admin,
  } = useAdminAuth();

  const initials =
    admin?.name
      ?.split(" ")
      .map((part) =>
        part.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 flex min-h-[88px] items-center justify-between border-b border-[#dfe8ec] bg-white/95 px-5 backdrop-blur-md sm:px-7 lg:px-9">
      {/* Left */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={
            onMenuClick
          }
          aria-label="Open admin menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dce7eb] text-[#06364a] transition hover:bg-[#f3f9fb] lg:hidden"
        >
          <Menu
            size={20}
          />
        </button>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7898a5]">
            Admin Portal
          </p>

          <h1 className="mt-1 text-xl font-semibold text-[#06364a] sm:text-2xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1 hidden text-sm text-slate-500 sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Admin Profile */}

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-[#153d4c]">
            {admin?.name ||
              "Administrator"}
          </p>

          <p className="text-xs text-slate-500">
            {admin?.role ===
            "owner"
              ? "Agency Owner"
              : "Administrator"}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6fb] text-sm font-bold text-[#0b749c]">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;