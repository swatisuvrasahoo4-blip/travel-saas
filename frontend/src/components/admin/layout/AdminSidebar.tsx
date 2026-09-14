import {
  CalendarDays,
  Clock3,
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareText,
  Star,
  User,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({
  isOpen = true,
  onClose,
}: AdminSidebarProps) => {
  const router = useRouter();

  const {
    agency,
    logout,
  } = useAdminAuth();

  const sidebarItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },

    {
      label: "Enquiries",
      href: "/admin/enquiries",
      icon: MessageSquareText,
    },

    {
      label: "Reviews",
      href: "/admin/reviews",
      icon: Star,
    },

    {
      label: "Gallery",
      href: "/admin/gallery",
      icon: Images,
    },

    {
      label: "Tour Calendar",
      href: "/admin/calendar",
      icon: CalendarDays,
    },

    {
      label: "Tour History",
      href: "/admin/tour-history",
      icon: Clock3,
    },

    {
      label: "Contact Messages",
      href: "/admin/contact-messages",
      icon: Mail,
    },

    {
      label: "Profile",
      href: "/admin/profile",
      icon: User,
    },
  ];

  const handleLogout =
    async () => {
      try {
        await logout();

        await router.replace(
          "/admin/login"
        );
      } catch {
        // Context already clears
        // local auth state.
      }
    };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-[#06364a] text-white transition-transform duration-300 lg:translate-x-0 ${
        isOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      {/* Branding */}

      <div className="flex h-[88px] items-center border-b border-white/10 px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Admin Portal
          </p>

          <h2 className="mt-1 text-lg font-semibold">
            {agency?.name ||
              "Travel Agency"}
          </h2>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {sidebarItems.map(
          ({
            label,
            href,
            icon: Icon,
          }) => {
            const isActive =
              router.pathname ===
                href ||
              router.pathname.startsWith(
                `${href}/`
              );

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-[#06364a]"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  size={19}
                />

                <span>
                  {label}
                </span>
              </Link>
            );
          }
        )}
      </nav>

      {/* Logout */}

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={
            handleLogout
          }
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut
            size={19}
          />

          <span>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;